"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "../actions";

type PostFormValues = {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  images: string[];
};

export default function PostForm({
  initialValues,
  action,
}: {
  initialValues?: PostFormValues;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
}) {
  const [images, setImages] = useState<string[]>(initialValues?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadImage(fd);

      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        setImages((prev) => [...prev, result.url as string]);
      }
    }

    setUploading(false);
    e.target.value = "";
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((img) => img !== url));
  }

  function handleSubmit(formData: FormData) {
    images.forEach((url) => formData.append("imageUrls", url));
    startTransition(async () => {
      const result = await action(formData);
      if (result && result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Заголовок
        </label>
        <input
          name="title"
          defaultValue={initialValues?.title}
          required
          className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-2.5 focus:border-neutral-950 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Категория
        </label>
        <input
          name="category"
          defaultValue={initialValues?.category}
          placeholder="Например: Жизнь в США"
          className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-2.5 focus:border-neutral-950 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Краткое описание
        </label>
        <textarea
          name="excerpt"
          defaultValue={initialValues?.excerpt}
          rows={2}
          placeholder="Если оставить пустым — возьмётся начало текста статьи"
          className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-2.5 focus:border-neutral-950 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Текст статьи
        </label>
        <textarea
          name="content"
          defaultValue={initialValues?.content}
          required
          rows={10}
          className="mt-1.5 w-full rounded-xl border border-neutral-300 px-4 py-2.5 focus:border-neutral-950 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700">
          Фотографии
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
          className="mt-1.5 block w-full text-sm"
        />
        {uploading && (
          <p className="mt-2 text-sm text-neutral-500">Загрузка фото…</p>
        )}

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((url) => (
              <div key={url} className="group relative">
                <img
                  src={url}
                  alt=""
                  className="h-24 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs text-white opacity-0 transition group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="mt-2 text-xs text-neutral-400">
          Первое фото в списке становится обложкой статьи.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending || uploading}
          className="rounded-full bg-neutral-950 px-6 py-3 font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
        >
          {isPending ? "Сохранение…" : "Сохранить"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-full border border-neutral-300 px-6 py-3 transition hover:bg-neutral-100"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
