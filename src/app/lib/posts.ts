import { prisma } from "@/lib/prisma";

export type Post = {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  images: string[];
  content: string;
};

export function readingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 150));
  return `${minutes} мин чтения`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({ orderBy: { date: "desc" } });

  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: formatDate(post.date),
    excerpt: post.excerpt,
    images: post.images,
    content: post.content,
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) return null;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: formatDate(post.date),
    excerpt: post.excerpt,
    images: post.images,
    content: post.content,
  };
}
