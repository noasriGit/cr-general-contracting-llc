"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

type BeforeAfterPair = {
  before: string;
  after: string;
  label: string;
};

const DEMO_PAIRS: BeforeAfterPair[] = [
  {
    before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
    label: "Kitchen Renovation",
  },
  {
    before: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    label: "Bathroom Remodel",
  },
  {
    before: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80",
    after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    label: "Exterior Renovation",
  },
];

function Slider({ pair, accentColor }: { pair: BeforeAfterPair; accentColor: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback(() => { isDragging.current = true; }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX);
    };
    const handleMouseUp = () => { isDragging.current = false; };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current && e.touches[0]) handleMove(e.touches[0].clientX);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMove]);

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-lg shadow-lg"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <img src={pair.after} alt="After" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={pair.before}
            alt="Before"
            className="h-full object-cover"
            style={{ width: `${containerRef.current?.offsetWidth || 800}px`, maxWidth: "none" }}
          />
        </div>
        <div
          className="absolute top-0 bottom-0 z-10 w-1"
          style={{ left: `${position}%`, transform: "translateX(-50%)", backgroundColor: accentColor }}
        >
          <div
            className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
        <div className="absolute left-3 top-3 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">
          BEFORE
        </div>
        <div className="absolute right-3 top-3 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white">
          AFTER
        </div>
      </div>
      <p className="text-center text-sm font-semibold text-gray-700">{pair.label}</p>
    </div>
  );
}

export function BeforeAfterSection({ accentColor = "#f97316" }: { accentColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
            See the Difference
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Before & After
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Drag the slider to see the transformation. Every project reflects our commitment to quality craftsmanship.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {DEMO_PAIRS.map((pair) => (
            <Slider key={pair.label} pair={pair} accentColor={accentColor} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
