"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { contrastTextForBackground, hexWithOpacity } from "@/lib/color-utils";
import { AnimatedCheckmark, MagneticButton } from "./demo-effects";

type FormData = {
  projectType: string;
  squareFootage: string;
  timeline: string;
  finishLevel: string;
  name: string;
  phone: string;
  email: string;
  details: string;
};

const PROJECT_TYPES = [
  { label: "Kitchen Remodel", baseCostPerSqFt: 150, defaultSqFt: 200 },
  { label: "Bathroom Renovation", baseCostPerSqFt: 175, defaultSqFt: 80 },
  { label: "Basement Finishing", baseCostPerSqFt: 60, defaultSqFt: 800 },
  { label: "Home Addition", baseCostPerSqFt: 200, defaultSqFt: 400 },
  { label: "Deck / Patio", baseCostPerSqFt: 40, defaultSqFt: 300 },
  { label: "Roofing", baseCostPerSqFt: 8, defaultSqFt: 2000 },
  { label: "Full Renovation", baseCostPerSqFt: 125, defaultSqFt: 1500 },
  { label: "Commercial Build-Out", baseCostPerSqFt: 100, defaultSqFt: 2000 },
  { label: "Other", baseCostPerSqFt: 0, defaultSqFt: 0 },
];

const FINISH_MULTIPLIERS: Record<string, number> = {
  standard: 1,
  mid: 1.35,
  premium: 1.8,
};

const TIMELINE_ADJUSTMENTS: Record<string, number> = {
  asap: 1.15,
  "1-3": 1.05,
  "3-6": 1,
  "6+": 0.95,
  exploring: 1,
};

function calculateEstimate(form: FormData): { low: number; high: number } | null {
  const project = PROJECT_TYPES.find((p) => p.label === form.projectType);
  if (!project || project.baseCostPerSqFt === 0) return null;

  const sqFt = parseInt(form.squareFootage) || project.defaultSqFt;
  const finishMult = FINISH_MULTIPLIERS[form.finishLevel] || 1;
  const timelineMult = TIMELINE_ADJUSTMENTS[form.timeline] || 1;

  const base = sqFt * project.baseCostPerSqFt * finishMult * timelineMult;
  const low = Math.round(base * 0.85 / 100) * 100;
  const high = Math.round(base * 1.15 / 100) * 100;

  return { low, high };
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function QuoteGenerator({ accentColor = "#f97316" }: { accentColor?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [step, setStep] = useState<"form" | "estimate" | "submitted">("form");
  const [form, setForm] = useState<FormData>({
    projectType: "",
    squareFootage: "",
    timeline: "",
    finishLevel: "standard",
    name: "",
    phone: "",
    email: "",
    details: "",
  });

  const estimate = calculateEstimate(form);

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:ring-1";

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
            Free Estimate
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Get Your Instant Quote
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Tell us about your project and get an estimated cost range instantly. No obligation — just honest numbers to help you plan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-sm"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Project Type
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => update("projectType", e.target.value)}
                      className={inputClass}
                      style={{ borderColor: form.projectType ? accentColor : undefined }}
                    >
                      <option value="">Select a project type...</option>
                      {PROJECT_TYPES.map((p) => (
                        <option key={p.label} value={p.label}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Approximate Sq. Footage
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 200"
                      value={form.squareFootage}
                      onChange={(e) => update("squareFootage", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Timeline
                    </label>
                    <select
                      value={form.timeline}
                      onChange={(e) => update("timeline", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">When do you need this done?</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3">1-3 Months</option>
                      <option value="3-6">3-6 Months</option>
                      <option value="6+">6+ Months</option>
                      <option value="exploring">Just Exploring</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Finish Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { key: "standard", label: "Standard", desc: "Builder-grade materials" },
                        { key: "mid", label: "Mid-Range", desc: "Quality upgrades" },
                        { key: "premium", label: "Premium", desc: "Top-tier finishes" },
                      ].map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => update("finishLevel", opt.key)}
                          className={`rounded-lg border p-4 text-left transition-all ${
                            form.finishLevel === opt.key
                              ? "shadow-md"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                          style={
                            form.finishLevel === opt.key
                              ? { borderColor: accentColor, backgroundColor: hexWithOpacity(accentColor, 0.05) }
                              : undefined
                          }
                        >
                          <p className="text-sm font-bold text-gray-900">{opt.label}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {estimate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-8 overflow-hidden rounded-lg p-6 text-center"
                    style={{ backgroundColor: hexWithOpacity(accentColor, 0.08) }}
                  >
                    <p className="text-sm font-semibold text-gray-600">Estimated Range</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight" style={{ color: accentColor }}>
                      {formatCurrency(estimate.low)} — {formatCurrency(estimate.high)}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      This is a rough estimate. Final pricing depends on materials, site conditions, and scope.
                    </p>
                  </motion.div>
                )}

                <div className="mt-8">
                  <MagneticButton className="w-full">
                    <button
                      type="button"
                      onClick={() => setStep("estimate")}
                      disabled={!form.projectType}
                      className="w-full rounded-lg px-8 py-3.5 text-sm font-semibold shadow-lg transition-all hover:scale-[1.02] hover:brightness-110 disabled:opacity-50 disabled:hover:scale-100"
                      style={{ backgroundColor: accentColor, color: contrastTextForBackground(accentColor) }}
                    >
                      {estimate ? "Get Detailed Quote" : "Continue"}
                    </button>
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {step === "estimate" && (
              <motion.div
                key="estimate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-sm"
              >
                {estimate && (
                  <div className="mb-8 rounded-lg p-6 text-center" style={{ backgroundColor: hexWithOpacity(accentColor, 0.08) }}>
                    <p className="text-sm font-semibold text-gray-600">Your Estimated Range for {form.projectType}</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight" style={{ color: accentColor }}>
                      {formatCurrency(estimate.low)} — {formatCurrency(estimate.high)}
                    </p>
                  </div>
                )}

                <p className="mb-6 text-center text-sm text-gray-600">
                  Fill in your contact details and we&apos;ll send you a detailed, no-obligation quote within 24 hours.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
                  <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
                  <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => update("email", e.target.value)} className={`${inputClass} md:col-span-2`} />
                  <textarea
                    placeholder="Tell us more about your project (optional)..."
                    rows={4}
                    value={form.details}
                    onChange={(e) => update("details", e.target.value)}
                    className={`${inputClass} md:col-span-2`}
                  />
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <MagneticButton className="flex-1">
                    <button
                      type="button"
                      onClick={() => setStep("submitted")}
                      className="w-full rounded-lg px-8 py-3.5 text-sm font-semibold shadow-lg transition-all hover:scale-[1.02] hover:brightness-110"
                      style={{ backgroundColor: accentColor, color: contrastTextForBackground(accentColor) }}
                    >
                      Submit Quote Request
                    </button>
                  </MagneticButton>
                </div>
              </motion.div>
            )}

            {step === "submitted" && (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center rounded-xl border p-12 text-center"
                style={{ borderColor: hexWithOpacity(accentColor, 0.3), backgroundColor: hexWithOpacity(accentColor, 0.05) }}
              >
                <AnimatedCheckmark size={80} color={accentColor} />
                <h3 className="mt-6 text-2xl font-extrabold text-gray-900">Quote Request Submitted!</h3>
                <p className="mt-3 max-w-md text-gray-500">
                  Thank you for your interest. Our team will review your project details and send you a comprehensive quote within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => { setStep("form"); setForm({ projectType: "", squareFootage: "", timeline: "", finishLevel: "standard", name: "", phone: "", email: "", details: "" }); }}
                  className="mt-8 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Start Another Quote
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
