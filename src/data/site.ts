export const site = {
  siteName: '[ВАШЕ ИМЯ / БРЕНД]',
  siteUrl: 'https://example.ru', // TODO: replace before production deployment
  ownerName: '', // TODO: add a real name when it is ready for publication
  telegramUrl: 'https://t.me/Makunin68',
  email: 'makuninalexandr35@gmail.com',
  defaultDescription:
    'Создание современных сайтов, веб-сервисов, AI-решений и цифровых продуктов — от структуры и проектирования до запуска.',
  navigation: [
    { label: 'Проекты', href: '/#works', id: 'works' },
    { label: 'Услуги', href: '/#services', id: 'services' },
    { label: 'Обо мне', href: '/#about', id: 'about' },
    { label: 'Контакт', href: '/#contact', id: 'contact' },
  ],
} as const;

export const isConfiguredContact = (value: string) => !value.endsWith('_HERE');
