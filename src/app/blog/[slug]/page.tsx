import { getPostBySlug, readingTime, postTitle, postCategory, postContent, postDate } from "../../lib/posts";
import { notFound } from "next/navigation";
import Gallery from "../../components/gallery";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = dictionary[locale].post;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 pb-20 pt-32 text-neutral-950 sm:pt-40">
      <article className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          {postCategory(post, locale)}
        </p>

        <h1 className="font-display mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          {postTitle(post, locale)}
        </h1>

        <div className="mt-4 flex items-center gap-3 text-neutral-500">
          <span>{postDate(post, locale)}</span>
          <span aria-hidden="true">·</span>
          <span>{readingTime(post.content, locale)}</span>
        </div>

        <Gallery images={post.images} alt={postTitle(post, locale)} />

        <p className="mt-10 text-lg leading-8 text-neutral-700 sm:text-xl sm:leading-9">
          {postContent(post, locale)}
        </p>

        <a
          href="/blog"
          className="mt-12 inline-block rounded-full border border-neutral-300 px-6 py-3 transition hover:bg-white"
        >
          {dict.backToBlog}
        </a>
      </article>
    </main>
  );
}
