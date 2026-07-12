import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/i18n";

export type Post = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  date: string;
  dateEn: string;
  excerpt: string;
  excerptEn: string;
  images: string[];
  content: string;
  contentEn: string;
};

export function readingTime(content: string, locale: Locale = "ru"): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 150));
  return locale === "en" ? `${minutes} min read` : `${minutes} мин чтения`;
}

// Convenience getters: pick the right-language field, falling back to
// Russian if an English translation hasn't been filled in yet.
export function postTitle(post: Post, locale: Locale) {
  return locale === "en" && post.titleEn ? post.titleEn : post.title;
}
export function postCategory(post: Post, locale: Locale) {
  return locale === "en" && post.categoryEn ? post.categoryEn : post.category;
}
export function postExcerpt(post: Post, locale: Locale) {
  return locale === "en" && post.excerptEn ? post.excerptEn : post.excerpt;
}
export function postContent(post: Post, locale: Locale) {
  return locale === "en" && post.contentEn ? post.contentEn : post.content;
}
export function postDate(post: Post, locale: Locale) {
  return locale === "en" ? post.dateEn : post.date;
}

function formatDate(date: Date, locale: Locale) {
  return date.toLocaleDateString(locale === "en" ? "en-US" : "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function toPost(post: {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  images: string[];
  date: Date;
}): Post {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    titleEn: post.titleEn,
    category: post.category,
    categoryEn: post.categoryEn,
    date: formatDate(post.date, "ru"),
    dateEn: formatDate(post.date, "en"),
    excerpt: post.excerpt,
    excerptEn: post.excerptEn,
    images: post.images,
    content: post.content,
    contentEn: post.contentEn,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({ orderBy: { date: "desc" } });
  return posts.map(toPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return null;
  return toPost(post);
}
