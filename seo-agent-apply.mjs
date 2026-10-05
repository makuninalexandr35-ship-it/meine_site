#!/usr/bin/env node
// SEO Agent static-site kit (ADR-063): applies seo/overrides.json to the built HTML of a static site (Astro, Next.js `output: "export"`,
// any generator that writes .html files). Same rules as the WordPress connector, so the agent reads back exactly what it wrote:
//   title, meta description, canonical          replaced in <head> (or inserted before </head>)
//   alt_text  { "<img src>": "alt" }            only for images without a meaningful alt
//   links     { "<old href>": "<new href>" }    an existing internal link is pointed to the right page
//   links_added { "<phrase>": "<url>" }          the first free occurrence of the phrase inside a paragraph becomes a link
//                                               (never inside another link, a heading, a button or the navigation)
//   schema    { JSON-LD object }                one <script type="application/ld+json" id="seo-agent-ld"> in <head>
//   h1        "text"                            the TEXT of the page's one <h1> is replaced (a page with none or several is left alone)
//   sections  { "<block id>": {items, where, anchor} }  a text block the owner wrote, as <section data-seo-agent-section="id"> before or after the first paragraph
//                                               that holds the anchor words, or after the last paragraph of <main> (else <article>, else <body>)
// Removing an entry from the file and rebuilding restores the page exactly. No dependencies; Node.js 18 or newer.
//
// Usage (after the build):  node seo-agent-apply.mjs dist            (Astro)
//                           node seo-agent-apply.mjs out             (Next.js static export)
//                           node seo-agent-apply.mjs <dir> <overrides.json>
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";

const SCHEMA_TYPES = new Set(["Bakery", "LocalBusiness", "FoodEstablishment"]);
const SKIP_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "button", "nav", "select", "textarea", "option", "label", "figcaption", "title"]);

const escHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
const decode = (s) => String(s).replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const plain = (s) => typeof s === "string" && !/[<>]/.test(s);
const https = (s) => typeof s === "string" && /^https:\/\/[^\s"<>]+$/.test(s);

// "/Wedding-Cakes" and "/wedding-cakes/" are one page: lower case, one trailing slash.
export function pathKey(path) {
  const trimmed = "/" + String(path).toLowerCase().replace(/^\/+|\/+$/g, "");
  return trimmed === "/" ? "/" : `${trimmed}/`;
}

// dist/index.html -> "/", dist/cakes/index.html -> "/cakes/", out/cakes.html -> "/cakes/", 404.html is skipped by the caller.
export function pagePathFromFile(rel) {
  const parts = rel.split(sep).join("/").replace(/\.html$/i, "");
  const path = parts === "index" ? "/" : parts.endsWith("/index") ? parts.slice(0, -"index".length) : parts;
  return pathKey("/" + path);
}

// Replaces the first match, or inserts the tag before </head>.
function replaceFirst(html, pattern, tag) {
  const match = pattern.exec(html);
  if (match) return html.slice(0, match.index) + tag + html.slice(match.index + match[0].length);
  const at = html.search(/<\/head>/i);
  return at < 0 ? html : html.slice(0, at) + tag + "\n" + html.slice(at);
}

function schemaOk(node) {
  if (!node || typeof node !== "object" || Array.isArray(node)) return false;
  if (node["@context"] !== "https://schema.org" || !SCHEMA_TYPES.has(node["@type"]) || !plain(node.name) || !node.name.trim()) return false;
  if (JSON.stringify(node).length > 8000) return false;
  const walk = (v, d) => d <= 5 && (typeof v === "string" ? plain(v) : typeof v === "number" || typeof v === "boolean" ? true : Array.isArray(v) ? v.every((x) => walk(x, d + 1)) : v && typeof v === "object" ? Object.values(v).every((x) => walk(x, d + 1)) : false);
  if (!walk(node, 0)) return false;
  for (const key of ["url", "image", "logo", "hasMap"]) if (key in node && !https(node[key])) return false;
  if (/"(aggregateRating|review|offers|availability)"\s*:/.test(JSON.stringify(node))) return false;
  return true;
}

// The JSON is encoded so it can never close the script tag (as PHP's JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS).
export function encodeJsonLd(node) {
  return JSON.stringify(node).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026").replace(/'/g, "\\u0027");
}

export function addLinks(html, links) {
  const pending = Object.entries(links ?? {}).filter(([anchor, url]) => typeof anchor === "string" && anchor && plain(anchor) && https(url));
  if (pending.length === 0) return html;
  const tokens = html.split(/(<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<[^>]*>)/i);
  let inA = 0, inP = 0, inSkip = 0;
  for (let i = 0; i < tokens.length && pending.length > 0; i++) {
    const token = tokens[i];
    if (!token) continue;
    if (token[0] === "<") {
      const tag = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/.exec(token);
      if (tag) {
        const name = tag[2].toLowerCase();
        const closing = tag[1] === "/";
        if (name === "a") inA = closing ? Math.max(0, inA - 1) : inA + 1;
        else if (name === "p") inP = closing ? Math.max(0, inP - 1) : inP + 1;
        else if (SKIP_TAGS.has(name)) inSkip = closing ? Math.max(0, inSkip - 1) : inSkip + 1;
      }
      continue;
    }
    if (inP < 1 || inA > 0 || inSkip > 0) continue;
    for (let k = 0; k < pending.length; k++) {
      const [anchor, url] = pending[k];
      const escaped = anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "iu");
      const m = re.exec(token);
      if (m) {
        tokens[i] = token.slice(0, m.index) + `<a href="${escHtml(url)}">${m[0]}</a>` + token.slice(m.index + m[0].length);
        pending.splice(k, 1);
        break;
      }
    }
  }
  return tokens.join("");
}

// The text of the page's ONE <h1>; with none or several the page is left alone (the agent's own check then rolls the change back).
export function replaceH1(html, text) {
  const all = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi);
  if (!all || all.length !== 1) return html;
  return html.replace(/(<h1\b[^>]*>)[\s\S]*?(<\/h1>)/i, (_m, open, close) => open + escHtml(text) + close);
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const clean = (s) => typeof s === "string" && s === s.replace(/\s+/g, " ").trim() && plain(s);
const len = (s) => [...s].length;

// The same rules as the agent's validator and the WordPress connector: plain text, single spaces, bounded sizes.
export function sectionOk(block) {
  if (!block || typeof block !== "object" || Array.isArray(block)) return false;
  const keys = Object.keys(block).sort().join(",");
  if (keys !== "anchor,items,where" && keys !== "items,where") return false;
  if (!["end", "before", "after"].includes(block.where)) return false;
  if (block.where === "end" && "anchor" in block) return false;
  if (block.where !== "end" && !(clean(block.anchor) && len(block.anchor) >= 8 && len(block.anchor) <= 120)) return false;
  if (!Array.isArray(block.items) || block.items.length < 1 || block.items.length > 8) return false;
  let total = 0;
  for (const item of block.items) {
    if (!item || typeof item !== "object" || Object.keys(item).length !== 2 || !clean(item.h) || len(item.h) < 3 || len(item.h) > 120) return false;
    total += len(item.h);
    if (!Array.isArray(item.p) || item.p.length < 1 || item.p.length > 6) return false;
    for (const p of item.p) {
      if (!clean(p) || len(p) < 20 || len(p) > 1200) return false;
      total += len(p);
    }
  }
  return total <= 8000;
}

const textOf = (markup) => decode(markup.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

// Where a block goes: before or after the first paragraph that holds the anchor words, or after the last paragraph of the main content.
export function sectionPosition(html, where, anchor) {
  let start = 0, end = html.length;
  for (const tag of ["main", "article", "body"]) {
    const open = html.search(new RegExp(`<${tag}\\b`, "i"));
    const close = html.toLowerCase().lastIndexOf(`</${tag}>`);
    if (open >= 0 && close > open) { start = open; end = close; break; }
  }
  const region = html.slice(start, end);
  const paragraphs = [...region.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)];
  if (paragraphs.length === 0) return null;
  if (where === "end") {
    const last = paragraphs[paragraphs.length - 1];
    return start + last.index + last[0].length;
  }
  const needle = String(anchor ?? "").replace(/\s+/g, " ").trim().toLowerCase();
  for (const p of paragraphs) {
    if (textOf(p[1]).toLowerCase().includes(needle)) return where === "before" ? start + p.index : start + p.index + p[0].length;
  }
  return null;
}

export function addSections(html, sections) {
  let out = html;
  for (const [id, block] of Object.entries(sections ?? {})) {
    if (!UUID.test(id) || !sectionOk(block) || out.includes(`data-seo-agent-section="${id}"`)) continue;
    let markup = `<section class="seo-agent-section" data-seo-agent-section="${id}">`;
    for (const item of block.items) markup += `<h2>${escHtml(item.h)}</h2>` + item.p.map((p) => `<p>${escHtml(p)}</p>`).join("");
    markup += "</section>";
    const at = sectionPosition(out, block.where, block.anchor);
    if (at === null) continue;
    out = out.slice(0, at) + markup + out.slice(at);
  }
  return out;
}

export function renderOverrides(html, page) {
  if (typeof html !== "string" || !/<\/head>/i.test(html) || !page || typeof page !== "object") return html;
  let out = html;
  if (plain(page.title) && page.title.trim()) out = replaceFirst(out, /<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${escHtml(page.title)}</title>`);
  if (plain(page.meta_description) && page.meta_description.trim()) out = replaceFirst(out, /<meta\s+name=(["'])description\1[^>]*>/i, `<meta name="description" content="${escHtml(page.meta_description)}" />`);
  if (https(page.canonical_url)) out = replaceFirst(out, /<link\s+rel=(["'])canonical\1[^>]*>/i, `<link rel="canonical" href="${escHtml(page.canonical_url)}" />`);
  if (page.alt_text && typeof page.alt_text === "object") {
    out = out.replace(/<img\b[^>]*>/gi, (img) => {
      const src = /\bsrc=(["'])(.*?)\1/i.exec(img);
      if (!src) return img;
      const alt = page.alt_text[decode(src[2])];
      if (!plain(alt) || !alt.trim()) return img;
      if (/\balt=(["'])\s*\S[\s\S]*?\1/i.test(img)) return img; // a meaningful alt is never replaced
      return `<img alt="${escHtml(alt)}"` + img.replace(/\salt=(["'])[\s\S]*?\1/i, "").slice(4);
    });
  }
  if (page.schema && schemaOk(page.schema)) {
    out = replaceFirst(out, /<script\b[^>]*\bid=(["'])seo-agent-ld\1[^>]*>[\s\S]*?<\/script>/i, `<script type="application/ld+json" id="seo-agent-ld">${encodeJsonLd(page.schema)}</script>`);
  }
  if (page.links_added && typeof page.links_added === "object") out = addLinks(out, page.links_added);
  if (typeof page.h1 === "string" && plain(page.h1) && page.h1.trim()) out = replaceH1(out, page.h1);
  if (page.sections && typeof page.sections === "object") out = addSections(out, page.sections);
  if (page.links && typeof page.links === "object") {
    for (const [from, to] of Object.entries(page.links)) {
      if (!https(from) || !https(to)) continue;
      const variants = new Set([from, new URL(from).pathname]);
      for (const v of variants) out = out.split(`href="${v}"`).join(`href="${escHtml(to)}"`).split(`href='${v}'`).join(`href='${escHtml(to)}'`);
    }
  }
  return out;
}

function htmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (/\.html$/i.test(name)) out.push(full);
  }
  return out;
}

export function applyToDirectory(dir, overrides) {
  const changed = [];
  for (const file of htmlFiles(dir)) {
    const rel = relative(dir, file);
    if (/^(404|500)\.html$/i.test(rel)) continue;
    const page = overrides[pagePathFromFile(rel)];
    if (!page) continue;
    const before = readFileSync(file, "utf8");
    const after = renderOverrides(before, page);
    if (after !== before) {
      writeFileSync(file, after);
      changed.push(pagePathFromFile(rel));
    }
  }
  return changed;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const dir = process.argv[2];
  const file = process.argv[3] ?? "seo/overrides.json";
  if (!dir) {
    console.error("usage: node seo-agent-apply.mjs <build dir> [seo/overrides.json]");
    process.exit(2);
  }
  let overrides = {};
  try {
    overrides = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") {
      // A broken overrides file fails the build: the previous version of the site stays online and the agent sees the change was not published.
      console.error(`seo-agent: ${file} is not valid JSON: ${error.message}`);
      process.exit(1);
    }
  }
  if (!overrides || typeof overrides !== "object" || Array.isArray(overrides)) {
    console.error(`seo-agent: ${file} must hold an object`);
    process.exit(1);
  }
  const changed = applyToDirectory(dir, overrides);
  console.log(`seo-agent: overrides applied to ${changed.length} page(s)${changed.length ? ": " + changed.join(", ") : ""}`);
  // IndexNow: the key file lets Yandex trust the agent's notice that a page changed (ADR-064).
  const key = writeIndexNowKey(dir);
  if (key) console.log("seo-agent: IndexNow key file written");
}

export function writeIndexNowKey(dir, configFile = "seo-agent.config.json") {
  let key = null;
  try {
    key = JSON.parse(readFileSync(configFile, "utf8")).indexnow_key ?? null;
  } catch (_) {
    return null;
  }
  if (typeof key !== "string" || !/^[A-Za-z0-9-]{8,128}$/.test(key)) return null;
  writeFileSync(join(dir, `${key}.txt`), key);
  return key;
}
