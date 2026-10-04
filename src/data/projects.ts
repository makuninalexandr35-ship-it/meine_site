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
  liveUrl?: string;
  published: boolean;
};

// Add real projects here. Keep `published: false` until all content and assets are approved.
export const projects: Project[] = [
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
