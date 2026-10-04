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
