"use client";

import { useEffect, useMemo, useState, type ImgHTMLAttributes } from "react";

type SafeImageProps = {
  src: string;
  fallbackUrls?: string[];
  alt: string;
  placeholderLabel?: string;
  placeholderClassName?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

const DEFAULT_UNSPLASH_FALLBACK =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";

export function SafeImage({
  src,
  fallbackUrls = [],
  alt,
  placeholderLabel = "Image unavailable",
  placeholderClassName = "flex h-full w-full items-center justify-center bg-black/20 text-xs text-white/60",
  onError,
  ...rest
}: SafeImageProps) {
  const sources = useMemo(() => {
    const seen = new Set<string>();
    const base = [src, ...fallbackUrls, DEFAULT_UNSPLASH_FALLBACK];
    return base
      .map((u) => (u ?? "").trim())
      .filter((u) => {
        if (!u || seen.has(u)) return false;
        seen.add(u);
        return true;
      });
  }, [src, fallbackUrls]);

  const [tryIndex, setTryIndex] = useState(0);

  useEffect(() => {
    setTryIndex(0);
  }, [sources]);

  const currentSrc = sources[tryIndex];

  if (!currentSrc) {
    return <div className={placeholderClassName}>{placeholderLabel}</div>;
  }

  return (
    <img
      key={currentSrc}
      src={currentSrc}
      alt={alt}
      onError={(e) => {
        onError?.(e);
        setTryIndex((i) => i + 1);
      }}
      {...rest}
    />
  );
}
