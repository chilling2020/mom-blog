export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 pb-20 pt-32 sm:pt-40">
      <section className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <img
              src="/1.jpg"
              alt="О нас"
              className="h-[320px] w-full rounded-[2rem] object-cover sm:h-[420px] md:h-[500px]"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-neutral-500">
              О нас
            </p>

            <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Привет, я мама, которая рассказывает о жизни в Америке
            </h1>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Этот блог посвящен переезду в США, повседневной жизни,
              покупкам, документам, адаптации и семейным историям.
            </p>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Здесь будут честные впечатления, полезные советы,
              фотографии и видео из реальной жизни.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
