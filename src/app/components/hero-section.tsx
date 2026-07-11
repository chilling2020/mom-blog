"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Flowers: drift outward + downward, shrink, and fade as you scroll.
  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const flowerOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const flowerScale = useTransform(scrollYProgress, [0, 1], [1.15, 0.8]);

  // Text: gentle upward drift + fade.
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.35]);

  // Video: subtle parallax scale/shift.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Reduced-motion fallback: static values, no scroll-linked transforms.
  const staticTransform = { x: "0%", y: "0%", opacity: 1, scale: 1 };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
    >
      <motion.video
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="animate-hero-zoom absolute inset-0 h-full w-full object-cover"
        style={
          prefersReducedMotion
            ? undefined
            : { scale: videoScale, y: videoY }
        }
      />

      <div className="animate-fade-in absolute inset-0 bg-black/60" />
      <div className="animate-fade-in absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

      {/* Decorative foreground flowers — purely visual, never intercept clicks */}
      <motion.img
        src="/flowers-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -left-10 z-20 w-48 sm:w-64 md:w-80 lg:w-96"
        style={
          prefersReducedMotion
            ? staticTransform
            : {
                x: leftX,
                y: leftY,
                opacity: flowerOpacity,
                scale: flowerScale,
              }
        }
      />
      <motion.img
        src="/flowers-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 z-20 w-40 sm:w-56 md:w-72 lg:w-80"
        style={
          prefersReducedMotion
            ? staticTransform
            : {
                x: rightX,
                y: rightY,
                opacity: flowerOpacity,
                scale: flowerScale,
              }
        }
      />

      <motion.div
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-24"
        style={
          prefersReducedMotion
            ? undefined
            : { y: textY, opacity: textOpacity }
        }
      >
        <div className="max-w-3xl text-white">
          <p
            className="animate-fade-in-up mb-5 text-sm uppercase tracking-[0.35em] text-neutral-300"
            style={{ animationDelay: "150ms" }}
          >
            Life in America Blog
          </p>

          <h1
            className="font-display animate-fade-in-up text-5xl font-medium leading-tight tracking-tight sm:text-6xl md:text-8xl"
            style={{ animationDelay: "300ms" }}
          >
            Жизнь состоит
            <br />
            из моментов ♡
          </h1>

          <p
            className="animate-fade-in-up mt-8 max-w-2xl text-lg leading-8 text-neutral-200 md:text-xl"
            style={{ animationDelay: "500ms" }}
          >
            Этот блог — о жизни, переезде, покупках, семье, документах и
            маленьких победах каждый день.
          </p>

          <div
            className="animate-fade-in-up mt-10 flex flex-wrap gap-4"
            style={{ animationDelay: "700ms" }}
          >
            <a
              href="/blog"
              className="rounded-full bg-[#f5d7a5] px-8 py-4 font-medium text-black transition hover:scale-105"
            >
              Читать статьи →
            </a>

            <a
              href="/about"
              className="rounded-full border border-white/70 px-8 py-4 text-white transition hover:bg-white hover:text-black"
            >
              Обо мне
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
