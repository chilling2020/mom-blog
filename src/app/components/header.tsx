"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dictionary, LOCALE_COOKIE, type Locale } from "@/lib/i18n";

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dict = dictionary[locale];
  const links = [
    { href: "/", label: dict.nav.home },
    { href: "/blog", label: dict.nav.blog },
    { href: "/about", label: dict.nav.about },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function switchLocale(next: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  const floating = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
        floating
          ? "border-b border-white/15 bg-black/10 backdrop-blur-md"
          : "border-b border-neutral-200/70 bg-[#f8f5ef]/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.03)]"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className={`font-display text-xl tracking-tight transition-colors duration-500 ${
            floating ? "text-white" : "text-neutral-950"
          }`}
        >
          {dict.siteName}
        </Link>

        <div className="flex items-center gap-6">
          <nav
            className={`hidden gap-8 text-sm sm:flex transition-colors duration-500 ${
              floating ? "text-white/90" : "text-neutral-700"
            }`}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-opacity hover:opacity-60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            className={`hidden items-center gap-1 rounded-full border px-1 py-1 text-xs font-medium sm:flex ${
              floating
                ? "border-white/30 text-white/90"
                : "border-neutral-300 text-neutral-700"
            }`}
          >
            <button
              onClick={() => switchLocale("ru")}
              className={`rounded-full px-2.5 py-1 transition ${
                locale === "ru"
                  ? floating
                    ? "bg-white text-black"
                    : "bg-neutral-950 text-white"
                  : "hover:opacity-70"
              }`}
            >
              RU
            </button>
            <button
              onClick={() => switchLocale("en")}
              className={`rounded-full px-2.5 py-1 transition ${
                locale === "en"
                  ? floating
                    ? "bg-white text-black"
                    : "bg-neutral-950 text-white"
                  : "hover:opacity-70"
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden"
        >
          <span
            className={`h-[1.5px] w-5 transition-all duration-300 ${
              floating ? "bg-white" : "bg-neutral-950"
            } ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-[1.5px] w-5 transition-all duration-300 ${
              floating ? "bg-white" : "bg-neutral-950"
            } ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 sm:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } ${floating ? "bg-black/20 backdrop-blur-md" : "bg-[#f8f5ef]/95 backdrop-blur-xl"}`}
      >
        <nav
          className={`flex flex-col gap-1 px-6 pb-3 pt-1 ${
            floating ? "text-white" : "text-neutral-800"
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-2.5 text-base transition hover:bg-black/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div
          className={`flex gap-2 px-6 pb-5 text-sm font-medium ${
            floating ? "text-white/90" : "text-neutral-700"
          }`}
        >
          <button
            onClick={() => switchLocale("ru")}
            className={`rounded-full border px-3 py-1.5 ${
              locale === "ru" ? "bg-neutral-950 text-white border-neutral-950" : "border-current"
            }`}
          >
            RU
          </button>
          <button
            onClick={() => switchLocale("en")}
            className={`rounded-full border px-3 py-1.5 ${
              locale === "en" ? "bg-neutral-950 text-white border-neutral-950" : "border-current"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
