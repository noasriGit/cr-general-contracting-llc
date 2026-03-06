"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { REVIEWS } from "@/lib/site-config";
import { hexWithOpacity } from "@/lib/color-utils";
import { TiltCard } from "./demo-effects";

function StarRating({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="h-4 w-4"
          fill={star <= rating ? color : "#d1d5db"}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewSection({ accentColor = "#f97316" }: { accentColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? REVIEWS : REVIEWS.slice(0, 3);

  return (
    <section ref={ref} className="bg-gray-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
            Client Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Don&apos;t just take our word for it. Here&apos;s what homeowners across the Fredericksburg area have to say about working with CR General Contracting.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard>
                <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <StarRating rating={review.rating} color={accentColor} />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.project} &middot; {review.location}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {REVIEWS.length > 3 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              {showAll ? "Show Less" : `View All ${REVIEWS.length} Reviews`}
              <svg className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-14 flex max-w-md items-center justify-center gap-8 rounded-lg p-6"
          style={{ backgroundColor: hexWithOpacity(accentColor, 0.08) }}
        >
          <div className="text-center">
            <p className="text-3xl font-extrabold" style={{ color: accentColor }}>4.9</p>
            <StarRating rating={5} color={accentColor} />
            <p className="mt-1 text-xs text-gray-500">Average Rating</p>
          </div>
          <div className="h-12 w-px bg-gray-300" />
          <div className="text-center">
            <p className="text-3xl font-extrabold" style={{ color: accentColor }}>50+</p>
            <p className="text-xs text-gray-500">Verified Reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
