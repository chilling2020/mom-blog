import { getAllPosts, readingTime, postTitle, postCategory, postExcerpt, postDate } from "./lib/posts";
import HeroSection from "./components/hero-section";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";

export default async function Home() {
  const locale = await getLocale();
  const dict = dictionary[locale].home;
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 2);

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-neutral-950">
      <HeroSection locale={locale} />

      <section className="bg-[#f8f5ef] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-4xl font-medium sm:text-5xl">
              {dict.latestPosts}
            </h2>
            <a
              href="/blog"
              className="hidden text-neutral-600 transition hover:text-neutral-950 md:block"
            >
              {dict.allPosts}
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {latestPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.images[0]}
                    alt={postTitle(post, locale)}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span>{postCategory(post, locale)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{readingTime(post.content, locale)}</span>
                  </div>

                  <p className="mt-4 text-neutral-500">{postDate(post, locale)}</p>

                  <h3 className="font-display mt-3 text-3xl font-medium">
                    {postTitle(post, locale)}
                  </h3>

                  <p className="line-clamp-2 mt-4 leading-7 text-neutral-600">
                    {postExcerpt(post, locale)}
                  </p>

                  <p className="mt-6 inline-flex items-center gap-1 font-medium transition-transform duration-300 group-hover:translate-x-1">
                    {dict.readMore}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-white/70 p-8 shadow-sm md:p-12">
            <h2 className="font-display text-3xl font-medium">
              {dict.aboutHeading}
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-neutral-600">
              {dict.aboutText}
            </p>

            <a
              href="/about"
              className="mt-6 inline-block rounded-full bg-neutral-950 px-6 py-3 text-white transition hover:bg-neutral-800"
            >
              {dict.learnMore}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
