export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  year?: string;
  client?: string;
  role: string[];
  services?: string[];
  technologies?: string[];
  challenge?: string;
  solution?: string;
  result?: string;
  cover: string;
  coverAlt: string;
  gallery?: { src: string; alt: string }[];
  video?: { src: string; title: string };
  liveUrl?: string;
  published: boolean;
};

// Add real projects here. Keep `published: false` until all content and assets are approved.
export const projects: Project[] = [
  {
    slug: 'domashnyaya-konditerskaya',
    title: 'Домашняя кондитерская',
    shortDescription: 'Сайт для заказа авторских тортов и десертов в Москве.',
    description: 'Разработал и запустил сайт домашней кондитерской для заказа авторских тортов и десертов.',
    category: 'Сайт услуг',
    role: ['Дизайн', 'Адаптивная вёрстка', 'Разработка', 'SEO-настройка'],
    services: ['Главная страница', 'Каталог работ', 'Карточки продукции', 'Страницы начинок и цен', 'FAQ', 'Контакты', 'Заказ через MAX'],
    challenge: 'Собрать в одном сайте каталог работ, информацию о продукции и понятный путь к оформлению заказа.',
    solution: 'Оформил главную страницу, каталог работ, карточки продукции и блоки заказа. Добавил ссылки на социальные сети, MAX, отзывы на Яндекс Картах и Авито, а также отдельные SEO-страницы «Торты на день рождения» и «Свадебные торты» с внутренними ссылками.',
    result: 'Сайт запущен. Настроены мета-данные, sitemap, robots.txt, Schema-разметка, Open Graph, alt-тексты, 301-редиректы и обновление через GitHub с автоматической публикацией на хостинг.',
    cover: '/media/photos/konditer-site/1-ezgif.com-jpg-to-webp-converter.webp',
    coverAlt: 'Первый экран сайта домашней кондитерской с тортом с малиной',
    gallery: [
      { src: '/media/photos/konditer-site/2-ezgif.com-png-to-webp-converter.webp', alt: 'Раздел сайта домашней кондитерской с категориями десертов' },
      { src: '/media/photos/konditer-site/3-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта домашней кондитерской' },
      { src: '/media/photos/konditer-site/4-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта домашней кондитерской' },
      { src: '/media/photos/konditer-site/5-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта домашней кондитерской' },
      { src: '/media/photos/konditer-site/6-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта домашней кондитерской' },
      { src: '/media/photos/konditer-site/7-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта домашней кондитерской' },
      { src: '/media/photos/konditer-site/8-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта домашней кондитерской' },
      { src: '/media/photos/konditer-site/9-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта домашней кондитерской' },
      { src: '/media/photos/konditer-site/10-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта домашней кондитерской' },
    ],
    video: { src: '/media/videos/konditer-site-video.mp4', title: 'Видеообзор сайта домашней кондитерской' },
    published: true,
  },
  {
    slug: 'remont-kvartir',
    title: 'Ремонт квартир',
    shortDescription: 'Одностраничный сайт для услуг ремонта квартир под ключ с понятным путём к заявке.',
    description: 'Создал современный продающий сайт для компании, которая занимается ремонтом квартир под ключ.',
    category: 'Сайт услуг',
    role: ['Структура', 'Дизайн', 'Адаптивная вёрстка', 'Разработка'],
    services: ['Главный экран', 'Услуги', 'Преимущества', 'Этапы работы', 'Портфолио', 'Отзывы', 'О компании', 'FAQ', 'Форма связи', 'Telegram и MAX'],
    technologies: ['WordPress'],
    challenge: 'Показать услуги ремонта, вызвать доверие через выполненные работы и отзывы, объяснить процесс и привести посетителя к обращению.',
    solution: 'Оформил и настроил основные блоки главной страницы: первый экран, услуги, преимущества, этапы работы, примеры работ, отзывы, раздел «О компании», вопросы и ответы, форму связи и нижнее меню. Добавил реальные изображения ремонтных работ, отредактировал их размеры и расположение, убрал демонстрационные подписи и заменил тексты на информацию об услугах ремонта.',
    result: 'Сайт адаптирован под понятную структуру для будущих клиентов: посетитель быстро переходит к услугам, портфолио, контактам и форме заявки. В подвале добавлены Telegram и MAX, а также подготовлена полная резервная копия WordPress-файлов и базы данных для переноса сайта на хостинг будущего клиента.',
    cover: '/media/photos/remont-site/1-ezgif.com-png-to-webp-converter.webp',
    coverAlt: 'Главный экран сайта услуг ремонта квартир',
    gallery: [
      { src: '/media/photos/remont-site/2-ezgif.com-png-to-webp-converter.webp', alt: 'Раздел сайта ремонта квартир' },
      { src: '/media/photos/remont-site/3-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта услуг ремонта квартир' },
      { src: '/media/photos/remont-site/4-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта услуг ремонта квартир' },
      { src: '/media/photos/remont-site/5-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта услуг ремонта квартир' },
      { src: '/media/photos/remont-site/6-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта услуг ремонта квартир' },
    ],
    video: { src: '/media/videos/remont-site-video.mp4', title: 'Видеообзор сайта ремонта квартир' },
    published: true,
  },
  {
    slug: 'gastronomicheskaya-stanciya',
    title: 'Гастрономическая станция',
    shortDescription: 'Многостраничный сайт бренда Plombir для презентации гастрономических станций и приёма заявок.',
    description: 'Разработал и опубликовал многостраничный сайт бренда Plombir на Astro и Node.js.',
    category: 'Многостраничный сайт',
    role: ['Структура', 'Дизайн', 'Адаптивная вёрстка', 'Разработка', 'SEO-настройка'],
    services: ['13 страниц', 'Главная страница', 'Услуги', 'Кейсы', 'Техническая информация', 'Отзывы', 'О нас', 'Контакты', 'Заявка', 'Политика', 'Общие header и footer'],
    technologies: ['Astro', 'Node.js'],
    challenge: 'Собрать понятный сайт для презентации гастрономических станций: показать продукт, кейсы и процесс работы, а затем привести посетителя к заявке.',
    solution: 'Собрал 13 страниц с общей навигацией, логотипом, footer, кнопками и переходами. Оформил главную страницу с hero-фотографией, блоками станций, кейсами, этапами работы, техническим разделом, отзывами и CTA. Настроил тёплую светлую палитру, крупную типографику, мобильную версию с burger-меню, а также исправил переносы, переполнения и отображение меню.',
    result: 'Код размещён в GitHub и настроена автоматическая публикация на Beget. Подключён технический адрес, а также SEO-основа: уникальные title и description, Open Graph, sitemap, robots.txt, понятные URL, семантическая разметка, один h1 на страницу и alt-тексты. Форма заявки пока демонстрационная: проверяет обязательные поля и выбор станции, но не отправляет данные.',
    cover: '/media/photos/gastro-site/2026-10-05014228-ezgif.com-png-to-webp-converter.webp',
    coverAlt: 'Первый экран сайта гастрономической станции Plombir с candy bar',
    gallery: [
      { src: '/media/photos/gastro-site/2026-10-05014253-ezgif.com-png-to-webp-converter.webp', alt: 'Раздел сайта бренда Plombir' },
      { src: '/media/photos/gastro-site/2026-10-05014335-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта гастрономической станции' },
      { src: '/media/photos/gastro-site/2026-10-05014352-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта гастрономической станции' },
      { src: '/media/photos/gastro-site/2026-10-05014417-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта гастрономической станции' },
      { src: '/media/photos/gastro-site/2026-10-05014455-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта гастрономической станции' },
      { src: '/media/photos/gastro-site/8-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта гастрономической станции' },
      { src: '/media/photos/gastro-site/9-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта гастрономической станции' },
      { src: '/media/photos/gastro-site/10-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта гастрономической станции' },
    ],
    video: { src: '/media/videos/gastronom-site-video.mp4', title: 'Видеообзор сайта гастрономической станции' },
    liveUrl: 'http://plombir.bar.makuni3u.beget.tech',
    published: true,
  },
  {
    slug: 'himchistka-mebeli',
    title: 'Химчистка мебели',
    shortDescription: 'Продающий лендинг, который ведёт клиента от выбора мебели к расчёту стоимости по фотографии.',
    description: 'Разработал дизайн и вёрстку продающего лендинга для услуг химчистки мягкой мебели.',
    category: 'Лендинг услуг',
    role: ['Структура', 'UX-копирайтинг', 'UI-дизайн', 'Адаптивная вёрстка'],
    services: ['Главный экран', 'Виды мебели', 'Преимущества', 'Технология чистки', 'Этапы работы', 'Расчёт стоимости', 'Форма заявки', 'FAQ', 'CTA-блоки', 'Footer'],
    challenge: 'Сделать понятный коммерческий сайт, который отвечает на вопросы о безопасности чистки, снимает сомнения клиента и приводит к заявке по фотографии мебели.',
    solution: 'Спроектировал последовательность коммерческих блоков: услуги для диванов, кресел, матрасов и стульев, блок доверия «сначала проверяем мебель», объяснение технологии, этапы работы, время высыхания, форму заявки и FAQ. Создал единый UI-стиль с тёмно-зелёной палитрой, светлым фоном, салатовыми CTA, крупной типографикой, SVG-иконками и закруглёнными карточками. Главный экран собран в двухколоночной композиции с оффером, кнопками, фотографией и акцентной карточкой.',
    result: 'На странице выстроена воронка «получить расчёт по фото»: пользователь выбирает тип мебели, добавляет фотографии, оставляет комментарий и телефон либо переходит к альтернативной отправке через WhatsApp. Пользовательский путь показывает четыре шага: фото, расчёт, согласование выезда, проверка и чистка мастером.',
    cover: '/media/photos/mebel=site/1-ezgif.com-png-to-webp-converter.webp',
    coverAlt: 'Первый экран сайта услуг химчистки мебели',
    gallery: [
      { src: '/media/photos/mebel=site/2-ezgif.com-png-to-webp-converter.webp', alt: 'Раздел сайта услуг химчистки мебели' },
      { src: '/media/photos/mebel=site/3-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта услуг химчистки мебели' },
      { src: '/media/photos/mebel=site/4-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта услуг химчистки мебели' },
      { src: '/media/photos/mebel=site/5-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта услуг химчистки мебели' },
      { src: '/media/photos/mebel=site/6-ezgif.com-png-to-webp-converter.webp', alt: 'Страница сайта услуг химчистки мебели' },
    ],
    published: true,
  },
  {
    slug: 'project-slug',
    title: 'TODO: название проекта',
    shortDescription: 'TODO: краткое описание проекта.',
    description: 'TODO: расскажите о проекте и его контексте.',
    category: 'TODO: категория',
    role: ['TODO: ваша роль'],
    services: ['TODO: оказанные услуги'],
    technologies: ['TODO: технологии'],
    challenge: 'TODO: задача проекта.',
    solution: 'TODO: решение проекта.',
    result: 'TODO: подтверждённый результат без неподтверждённых цифр.',
    cover: '/media/photos/project-slug/cover.webp',
    coverAlt: 'TODO: описание обложки проекта',
    gallery: [],
    published: false,
  },
];

export const publishedProjects = projects.filter((project) => project.published);
