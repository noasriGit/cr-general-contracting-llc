"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contrastTextForBackground } from "@/lib/color-utils";

type NavLink = { href: string; label: string };

type Props = {
  businessName: string;
  ctaText: string;
  ctaHref?: string;
  navLinks: NavLink[];
  accentColor?: string;
  activePage?: string;
  onNavigate?: (page: string) => void;
};

export function Navigation({
  businessName,
  ctaText,
  ctaHref = "contact",
  navLinks,
  accentColor = "#f97316",
  activePage,
  onNavigate,
}: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick(href: string) {
    setOpen(false);
    onNavigate?.(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-gray-200/50 bg-white/90 backdrop-blur-xl shadow-sm" : "border-b border-transparent bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => handleClick("home")}
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-gray-900 transition-opacity hover:opacity-80"
        >
          {businessName}
        </button>

        <div className="hidden items-center gap-1 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleClick(link.href)}
              className={`rounded-lg px-3 py-2 transition-colors ${
                activePage === link.href
                  ? "bg-gray-900/10 text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => handleClick(ctaHref)}
          className="hidden rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-105 md:inline-flex"
          style={{ backgroundColor: accentColor, color: contrastTextForBackground(accentColor) }}
        >
          {ctaText}
        </button>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <svg className="h-6 w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-black/60 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-16 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => handleClick(link.href)}
                    className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      activePage === link.href
                        ? "bg-gray-900/10 text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => handleClick(ctaHref)}
                  className="mt-2 rounded-full px-5 py-2.5 text-center text-sm font-semibold"
                  style={{ backgroundColor: accentColor, color: contrastTextForBackground(accentColor) }}
                >
                  {ctaText}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
