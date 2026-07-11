"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "admin_session";

type ActionState = { error?: string };

export async function login(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const password = formData.get("password")?.toString() ?? "";

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return { error: "Неверный пароль" };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, process.env.ADMIN_SESSION_SECRET ?? "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 дней
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  redirect("/admin/login");
}

// Транслитерация кириллицы -> латиница для человекочитаемых URL
const translitMap: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function makeSlug(title: string) {
  const transliterated = title
    .toLowerCase()
    .split("")
    .map((char) => translitMap[char] ?? char)
    .join("");

  return transliterated
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createPost(formData: FormData): Promise<ActionState | void> {
  const title = formData.get("title")?.toString().trim() ?? "";
  const category = formData.get("category")?.toString().trim() ?? "";
  const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";
  const images = formData.getAll("imageUrls").map(String).filter(Boolean);

  if (!title || !content) {
    return { error: "Заполните заголовок и текст статьи" };
  }

  let slug = makeSlug(title) || `post-${Date.now().toString(36)}`;
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  await prisma.post.create({
    data: {
      slug,
      title,
      category: category || "Без категории",
      excerpt: excerpt || content.slice(0, 140),
      content,
      images,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePost(
  id: string,
  formData: FormData
): Promise<ActionState | void> {
  const title = formData.get("title")?.toString().trim() ?? "";
  const category = formData.get("category")?.toString().trim() ?? "";
  const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";
  const images = formData.getAll("imageUrls").map(String).filter(Boolean);

  if (!title || !content) {
    return { error: "Заполните заголовок и текст статьи" };
  }

  const post = await prisma.post.update({
    where: { id },
    data: {
      title,
      category: category || "Без категории",
      excerpt: excerpt || content.slice(0, 140),
      content,
      images,
    },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePost(id: string) {
  const post = await prisma.post.delete({ where: { id } });

  // Best-effort: подчищаем фото из хранилища (не критично, если не выйдет)
  await Promise.allSettled(
    post.images
      .filter((url) => url.includes("blob.vercel-storage.com"))
      .map((url) => del(url))
  );

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
}

export async function uploadImage(
  formData: FormData
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) {
    return { error: "Файл не выбран" };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "Можно загружать только изображения" };
  }

  try {
    const blob = await put(`posts/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    return { url: blob.url };
  } catch {
    return { error: "Не удалось загрузить фото. Попробуйте ещё раз." };
  }
}
