import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/get-locale";

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = dictionary[locale].about;

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 pb-20 pt-32 sm:pt-40">
      <section className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <img
              src="/1.jpg"
              alt={dict.eyebrow}
              className="h-[320px] w-full rounded-[2rem] object-cover sm:h-[420px] md:h-[500px]"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-neutral-500">
              {dict.eyebrow}
            </p>

            <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              {dict.heading}
            </h1>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              {dict.paragraph1}
            </p>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              {dict.paragraph2}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
