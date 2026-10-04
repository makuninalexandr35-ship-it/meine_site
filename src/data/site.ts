export const site = {
  siteName: '',
  siteUrl: 'https://example.ru', // TODO: replace before production deployment
  ownerName: '', // TODO: add a real name when it is ready for publication
  telegramUrl: 'https://t.me/Makunin68',
  email: 'makuninalexandr35@gmail.com',
  defaultDescription:
    'Проектирую и разрабатываю сайты, веб-приложения, AI-решения и Telegram-ботов для бизнеса, стартапов и экспертов — от структуры до запуска.',
  navigation: [
    { label: 'Проекты', href: '/#works', id: 'works' },
    { label: 'Услуги', href: '/#services', id: 'services' },
    { label: 'Обо мне', href: '/#about', id: 'about' },
    { label: 'Контакты', href: '/#contact', id: 'contact' },
  ],
} as const;

export const isConfiguredContact = (value: string) => !value.endsWith('_HERE');
