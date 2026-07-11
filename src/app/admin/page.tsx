import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost, logout } from "./actions";

export default async function AdminPage() {
  const posts = await prisma.post.findMany({ orderBy: { date: "desc" } });

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-medium">Посты блога</h1>
          <form action={logout}>
            <button className="text-sm text-neutral-500 transition hover:text-neutral-950">
              Выйти
            </button>
          </form>
        </div>

        <Link
          href="/admin/posts/new"
          className="mt-6 inline-block rounded-full bg-neutral-950 px-6 py-3 font-medium text-white transition hover:bg-neutral-800"
        >
          + Новая статья
        </Link>

        <div className="mt-8 space-y-3">
          {posts.length === 0 && (
            <p className="text-neutral-500">Пока нет ни одной статьи.</p>
          )}

          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                {post.images[0] && (
                  <img
                    src={post.images[0]}
                    alt=""
                    className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
                  />
                )}
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-neutral-500">
                    {post.category} ·{" "}
                    {new Date(post.date).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/posts/${post.slug}/edit`}
                  className="rounded-full border border-neutral-300 px-4 py-2 text-sm transition hover:bg-neutral-100"
                >
                  Редактировать
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await deletePost(post.id);
                  }}
                >
                  <button className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50">
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
