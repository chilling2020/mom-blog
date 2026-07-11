import { getAllPosts, readingTime } from "./lib/posts";
import HeroSection from "./components/hero-section";

export default async function Home() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 2);

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-neutral-950">
      <HeroSection />

      <section className="bg-[#f8f5ef] px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-4xl font-medium sm:text-5xl">
              Последние статьи
            </h2>
            <a
              href="/blog"
              className="hidden text-neutral-600 transition hover:text-neutral-950 md:block"
            >
              Все статьи →
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
                    alt={post.title}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{readingTime(post.content)}</span>
                  </div>

                  <p className="mt-4 text-neutral-500">{post.date}</p>

                  <h3 className="font-display mt-3 text-3xl font-medium">
                    {post.title}
                  </h3>

                  <p className="line-clamp-2 mt-4 leading-7 text-neutral-600">
                    {post.excerpt}
                  </p>

                  <p className="mt-6 inline-flex items-center gap-1 font-medium transition-transform duration-300 group-hover:translate-x-1">
                    Читать далее →
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-white/70 p-8 shadow-sm md:p-12">
            <h2 className="font-display text-3xl font-medium">
              Немного обо мне
            </h2>
            <p className="mt-4 max-w-3xl leading-8 text-neutral-600">
              Привет! Я веду этот блог, чтобы делиться настоящими историями о
              жизни в Америке: что удивляет, что помогает, где сложно и где
              красиво.
            </p>

            <a
              href="/about"
              className="mt-6 inline-block rounded-full bg-neutral-950 px-6 py-3 text-white transition hover:bg-neutral-800"
            >
              Узнать больше
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
