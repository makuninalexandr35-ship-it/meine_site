export const site = {
  siteName: 'Александр Макунин',
  siteUrl: 'https://aleksandrmakunin.ru',
  ownerName: 'Александр Макунин',
  defaultTitle: 'Разработка сайтов и AI-решений — Александр Макунин',
  telegramUrl: 'https://t.me/Makunin68',
  projectRequestUrl: 'https://srm-test.aleksandrmakunin.ru/request/forma/?test=2aRzQEJgvj2E3EkMVcellEsR',
  email: 'makuninalexandr35@gmail.com',
  defaultDescription:
    'Разрабатываю сайты, веб-сервисы, AI-решения и Telegram-ботов для бизнеса: от структуры и дизайна до запуска проекта.',
  navigation: [
    { label: 'Проекты', href: '/#works', id: 'works' },
    { label: 'Услуги', href: '/#services', id: 'services' },
    { label: 'Цены', href: '/prices/', id: 'prices' },
    { label: 'Обо мне', href: '/#about', id: 'about' },
    { label: 'Контакты', href: '/#contact', id: 'contact' },
  ],
} as const;

export const isConfiguredContact = (value: string) => !value.endsWith('_HERE');
