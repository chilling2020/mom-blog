import { getAllPosts, readingTime, postTitle, postCategory, postExcerpt } from "../lib/posts";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";

export default async function BlogPage() {
  const locale = await getLocale();
  const dict = dictionary[locale].blog;
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 pb-20 pt-32 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-neutral-500">
          {dict.eyebrow}
        </p>
        <h1 className="font-display text-4xl font-medium sm:text-5xl">
          {dict.heading}
        </h1>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={post.images[0]}
                  alt={postTitle(post, locale)}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <span>{postCategory(post, locale)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{readingTime(post.content, locale)}</span>
                </div>

                <h2 className="font-display mt-2 text-2xl font-medium">
                  {postTitle(post, locale)}
                </h2>

                <p className="line-clamp-2 mt-4 text-neutral-600">
                  {postExcerpt(post, locale)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
