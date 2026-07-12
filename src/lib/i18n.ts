export type Locale = "ru" | "en";

export const LOCALE_COOKIE = "lang";

export const dictionary = {
  ru: {
    siteName: "Мама в Америке",
    nav: {
      home: "Главная",
      blog: "Блог",
      about: "О нас",
    },
    hero: {
      eyebrow: "Life in America Blog",
      title: ["Жизнь состоит", "из моментов ♡"],
      subtitle:
        "Этот блог — о жизни, переезде, покупках, семье, документах и маленьких победах каждый день.",
      readArticles: "Читать статьи →",
      aboutMe: "Обо мне",
    },
    home: {
      latestPosts: "Последние статьи",
      allPosts: "Все статьи →",
      readMore: "Читать далее →",
      aboutHeading: "Немного обо мне",
      aboutText:
        "Привет! Я веду этот блог, чтобы делиться настоящими историями о жизни в Америке: что удивляет, что помогает, где сложно и где красиво.",
      learnMore: "Узнать больше",
    },
    blog: {
      eyebrow: "Блог",
      heading: "Последние статьи",
    },
    post: {
      backToBlog: "← Назад к блогу",
    },
    about: {
      eyebrow: "О нас",
      heading: "Привет, я мама, которая рассказывает о жизни в Америке",
      paragraph1:
        "Этот блог посвящен переезду в США, повседневной жизни, покупкам, документам, адаптации и семейным историям.",
      paragraph2:
        "Здесь будут честные впечатления, полезные советы, фотографии и видео из реальной жизни.",
    },
    readingTimeSuffix: "мин чтения",
  },
  en: {
    siteName: "Mom in America",
    nav: {
      home: "Home",
      blog: "Blog",
      about: "About",
    },
    hero: {
      eyebrow: "Life in America Blog",
      title: ["Life is made", "of moments ♡"],
      subtitle:
        "This blog is about life, moving, shopping, family, paperwork, and small victories every day.",
      readArticles: "Read articles →",
      aboutMe: "About me",
    },
    home: {
      latestPosts: "Latest posts",
      allPosts: "All posts →",
      readMore: "Read more →",
      aboutHeading: "A little about me",
      aboutText:
        "Hi! I write this blog to share real stories about life in America: what surprises me, what helps, and where it's hard and where it's beautiful.",
      learnMore: "Learn more",
    },
    blog: {
      eyebrow: "Blog",
      heading: "Latest posts",
    },
    post: {
      backToBlog: "← Back to blog",
    },
    about: {
      eyebrow: "About",
      heading: "Hi, I'm a mom writing about life in America",
      paragraph1:
        "This blog is about moving to the US, everyday life, shopping, paperwork, adapting, and family stories.",
      paragraph2:
        "You'll find honest impressions, useful tips, and photos and videos from real life.",
    },
    readingTimeSuffix: "min read",
  },
} as const;

export function t(locale: Locale) {
  return dictionary[locale];
}
