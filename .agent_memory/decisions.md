# Decisions

- 2026-10-04: Kept MCP configuration in project-local `.mcp.json` so it is scoped to this site and versioned with it.
- 2026-10-04: Kept projects unpublished until real client-approved content and assets are provided; no fictitious cases, metrics, clients, or contacts are shown.
- 2026-10-04: Kept the site static with Telegram and email links only; no form or personal-data storage is implemented. A future form must use a Russian-hosted endpoint and immediately delete received data after delivery.
- 2026-10-04: Do not label unpublished portfolio items as real cases. Use neutral wording until the owner publishes verified materials.
- 2026-10-04: Price ranges require owner approval. The public `/prices/` page may describe the format of work, but must not state a minimum budget until one is provided.
- 2026-10-05: Public starting prices on `/prices/` follow the owner-provided source-of-truth table and always display the `от` qualifier. Supplementary work remains a compact list rather than large cards.
- 2026-10-11: At the owner's request every case-study page lists the other published projects ("Другие проекты") so the cases link to each other; only projects from `publishedProjects` are listed. Structured data (WebSite, WebPage, BreadcrumbList, and Person on the home page) is built in `BaseLayout.astro` only from facts the site already states (name, address, title, description, owner name, Telegram link); the 404 page has none. The logo images got descriptive alt text.
