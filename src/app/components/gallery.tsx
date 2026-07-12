"use client";

import { useEffect, useState } from "react";

export default function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  const lightboxPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  const lightboxNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      {/* Main slider */}
      <div className="relative mt-10">
        <img
          key={activeIndex}
          src={images[activeIndex]}
          alt={alt}
          onClick={() => setLightboxIndex(activeIndex)}
          className="animate-fade-in h-[300px] w-full cursor-zoom-in rounded-3xl object-cover sm:h-[420px] md:h-[500px]"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {activeIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip — every photo visible at once, smaller */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <button
              key={image}
              onClick={() => setActiveIndex(i)}
              aria-label={`Фото ${i + 1}`}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition sm:h-20 sm:w-20 ${
                i === activeIndex
                  ? "border-neutral-950"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen lightbox */}
      {lightboxIndex !== null && (
        <div
          className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Закрыть"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/10 hover:text-white sm:right-6 sm:top-6"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxPrev();
                }}
                aria-label="Предыдущее фото"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/10 hover:text-white sm:left-5"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  lightboxNext();
                }}
                aria-label="Следующее фото"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/10 hover:text-white sm:right-5"
              >
                ›
              </button>
            </>
          )}

          <img
            key={lightboxIndex}
            src={images[lightboxIndex]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="animate-scale-in max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />

          {images.length > 1 && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {lightboxIndex + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  );
}
