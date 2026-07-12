"use client";

import { useEffect, useState } from "react";

export default function Gallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = () => setIndex(null);
  const prev = () =>
    setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () =>
    setIndex((i) => (i === null ? null : (i + 1) % images.length));

  useEffect(() => {
    if (index === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index]);

  return (
    <>
      <img
        src={images[0]}
        alt={alt}
        onClick={() => setIndex(0)}
        className="mt-10 h-[300px] w-full cursor-zoom-in rounded-3xl object-cover transition hover:brightness-95 sm:h-[420px] md:h-[500px]"
      />

      {images.length > 1 && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {images.slice(1).map((image, i) => (
            <img
              key={image}
              src={image}
              alt={alt}
              onClick={() => setIndex(i + 1)}
              className="h-40 w-full cursor-zoom-in rounded-2xl object-cover transition hover:brightness-95 sm:h-64"
            />
          ))}
        </div>
      )}

      {index !== null && (
        <div
          className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              close();
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
                  prev();
                }}
                aria-label="Предыдущее фото"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/10 hover:text-white sm:left-5"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Следующее фото"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/10 hover:text-white sm:right-5"
              >
                ›
              </button>
            </>
          )}

          <img
            key={index}
            src={images[index]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="animate-scale-in max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />

          {images.length > 1 && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {index + 1} / {images.length}
            </p>
          )}
        </div>
      )}
    </>
  );
}
