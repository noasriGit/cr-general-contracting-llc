"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contrastTextForBackground, hexWithOpacity } from "@/lib/color-utils";
import {
  SITE_CONFIG,
  SERVICES,
  PORTFOLIO_PROJECTS,
  STATS,
  VALUES,
  NAV_LINKS,
} from "@/lib/site-config";
import {
  IntroSplash,
  SplitTextReveal,
  CountUp,
  ScrollProgress,
  MagneticButton,
  ImageReveal,
  TiltCard,
  AnimatedCheckmark,
  RevealFooter,
  ContractorDecorations,
} from "./demo-effects";
import { SafeImage } from "./safe-image";
import {
  FadeIn,
  StaggerChildren,
  StaggerItem,
  HeroText,
  ScaleOnHover,
  PageTransition,
} from "./motion-utils";
import { Navigation } from "./navigation";
import { BeforeAfterSection } from "./before-after-slider";
import { ReviewSection } from "./review-section";
import { QuoteGenerator } from "./quote-generator";

const ACCENT = SITE_CONFIG.accentColor;

const HERO_IMG = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80";
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
];
const ABOUT_IMG = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80";

function HomePage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-white">
        <div className="absolute inset-0">
          <ImageReveal src={HERO_IMG} alt="" revealColor={ACCENT} className="h-full w-full" imgClassName="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" />
        </div>
        <ContractorDecorations accentColor={ACCENT} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32">
          <HeroText>
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: hexWithOpacity(ACCENT, 0.12), color: ACCENT }}>
              Licensed & Insured General Contractor
            </span>
          </HeroText>
          <HeroText delay={0.15}>
            <SplitTextReveal text={SITE_CONFIG.heroHeadline} as="h1" className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900 md:text-6xl" />
          </HeroText>
          <HeroText delay={0.3}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500">{SITE_CONFIG.heroSubhead}</p>
          </HeroText>
          <HeroText delay={0.45}>
            <div className="mt-8 flex flex-wrap gap-4">
              <MagneticButton>
                <button type="button" onClick={() => onNavigate("contact")}
                  className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:scale-105 hover:brightness-110"
                  style={{ backgroundColor: ACCENT, color: contrastTextForBackground(ACCENT), boxShadow: `${hexWithOpacity(ACCENT, 0.25)} 0 10px 20px` }}>
                  Get a Free Quote
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </MagneticButton>
              <button type="button" onClick={() => onNavigate("services")}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                Our Services
              </button>
            </div>
          </HeroText>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <StaggerChildren className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <CountUp value={stat.value} suffix={stat.suffix} className="text-4xl font-extrabold tracking-tight" style={{ color: ACCENT }} />
                  <p className="mt-2 text-sm font-medium text-gray-500">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <SplitTextReveal text="What We Do Best" as="h2" className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl" />
          </FadeIn>
          <StaggerChildren className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((s) => (
              <StaggerItem key={s.title}>
                <TiltCard>
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: hexWithOpacity(ACCENT, 0.12) }}>
                      <svg className="h-6 w-6" style={{ color: ACCENT }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.description}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <StaggerChildren className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Licensed", sub: "Fully licensed in the state of Virginia" },
              { icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z", label: "Insured", sub: "Comprehensive general liability coverage" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "15+ Years Experience", sub: "Decades of expertise across the Fredericksburg area" },
            ].map((badge) => (
              <StaggerItem key={badge.label}>
                <TiltCard>
                  <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: hexWithOpacity(ACCENT, 0.12), color: ACCENT }}>
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{badge.label}</p>
                      <p className="text-xs text-gray-500">{badge.sub}</p>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16" style={{ backgroundColor: ACCENT }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <SplitTextReveal text="Ready to Start Your Project?" as="h2" className="text-3xl font-extrabold text-white md:text-4xl" />
            <p className="mt-4 text-white/90">Get a free, no-obligation quote today. We serve Fredericksburg, Stafford, Spotsylvania, and surrounding areas.</p>
            <MagneticButton>
              <button type="button" onClick={() => onNavigate("contact")}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:scale-105"
                style={{ color: ACCENT }}>
                Get a Free Quote
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </MagneticButton>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function ServicesPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>What We Offer</span>
          <SplitTextReveal text="Our Services" as="h2" className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl" />
          <p className="mt-4 max-w-xl text-gray-500">
            CR General Contracting provides end-to-end construction services for residential and commercial projects of all sizes across the Fredericksburg, Virginia area.
          </p>
        </FadeIn>
        <StaggerChildren className="mt-14 space-y-5">
          {SERVICES.map((service, i) => (
            <StaggerItem key={service.title}>
              <TiltCard>
                <div className="flex gap-5 rounded-lg border-l-4 bg-gray-50 p-6 shadow-sm transition-shadow hover:shadow-md" style={{ borderLeftColor: ACCENT }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold" style={{ backgroundColor: ACCENT, color: contrastTextForBackground(ACCENT) }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{service.description}</p>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
        <FadeIn delay={0.2}>
          <div className="mt-16 text-center">
            <MagneticButton>
              <button type="button" onClick={() => onNavigate("contact")}
                className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:scale-105 hover:brightness-110"
                style={{ backgroundColor: ACCENT, color: contrastTextForBackground(ACCENT), boxShadow: `${hexWithOpacity(ACCENT, 0.25)} 0 10px 20px` }}>
                Request a Quote
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PortfolioPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <>
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Our Work</span>
            <SplitTextReveal text="Featured Projects" as="h2" className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl" />
            <p className="mt-4 max-w-xl text-gray-500">Browse our portfolio of completed residential and commercial projects across the Fredericksburg area.</p>
          </FadeIn>
          <StaggerChildren className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <StaggerItem key={project.title}>
                <ScaleOnHover>
                  <div className="overflow-hidden rounded-lg bg-white shadow-md">
                    <SafeImage src={GALLERY_IMAGES[i] || HERO_IMG} alt={project.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                    <div className="p-5">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: ACCENT }}>{project.category}</span>
                      <h3 className="mt-1 text-base font-bold text-gray-900">{project.title}</h3>
                      <p className="mt-2 text-sm text-gray-500">{project.description}</p>
                    </div>
                  </div>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerChildren>
          <FadeIn delay={0.2}>
            <div className="mt-16 text-center">
              <MagneticButton>
                <button type="button" onClick={() => onNavigate("contact")}
                  className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:scale-105 hover:brightness-110"
                  style={{ backgroundColor: ACCENT, color: contrastTextForBackground(ACCENT), boxShadow: `${hexWithOpacity(ACCENT, 0.25)} 0 10px 20px` }}>
                  Start Your Project
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>
      <BeforeAfterSection accentColor={ACCENT} />
    </>
  );
}

function ReviewsPage() {
  return <ReviewSection accentColor={ACCENT} />;
}

function AboutPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <SafeImage src={ABOUT_IMG} alt={SITE_CONFIG.businessName} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>About Us</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900">
                Building With Integrity Since Day One
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                CR General Contracting LLC has been serving the Fredericksburg, Virginia area with dependable, high-quality construction services. From small bathroom remodels to large-scale commercial build-outs, we bring the same level of dedication and craftsmanship to every job.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Our team consists of experienced professionals who take pride in their work. We believe in transparent communication, honest pricing, and delivering results that stand the test of time. When you work with CR General Contracting, you&apos;re working with people who care about doing the job right.
              </p>
              <div className="mt-6 border-l-4 pl-6" style={{ borderLeftColor: ACCENT }}>
                <blockquote className="text-lg font-semibold leading-relaxed text-gray-800">
                  &ldquo;We don&apos;t just build structures — we build trust. Every project is a promise kept.&rdquo;
                </blockquote>
              </div>
              <p className="mt-4 font-semibold text-gray-900">&mdash; CR General Contracting</p>
            </div>
          </div>
        </FadeIn>

        <StaggerChildren className="mt-20 grid gap-6 sm:grid-cols-3">
          {VALUES.map((v) => (
            <StaggerItem key={v.title}>
              <TiltCard>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                  <div className="mb-3 h-1 w-8 rounded-full" style={{ backgroundColor: ACCENT }} />
                  <h3 className="text-base font-bold text-gray-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{v.desc}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeIn delay={0.2}>
          <div className="mt-16 text-center">
            <MagneticButton>
              <button type="button" onClick={() => onNavigate("contact")}
                className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:scale-105 hover:brightness-110"
                style={{ backgroundColor: ACCENT, color: contrastTextForBackground(ACCENT), boxShadow: `${hexWithOpacity(ACCENT, 0.25)} 0 10px 20px` }}>
                Work With Us
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </MagneticButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    timeline: "",
    name: "",
    contact: "",
    message: "",
  });

  return (
    <>
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Get In Touch</span>
            <SplitTextReveal text="Let's Talk About Your Project" as="h2" className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl" />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Phone</p>
                  <p className="mt-1.5 text-lg font-semibold text-gray-900">{SITE_CONFIG.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Email</p>
                  <p className="mt-1.5 text-lg font-semibold text-gray-900">{SITE_CONFIG.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Address</p>
                  <p className="mt-1.5 text-lg font-semibold text-gray-900">{SITE_CONFIG.address}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Service Area</p>
                  <p className="mt-1.5 text-lg font-semibold text-gray-900">{SITE_CONFIG.serviceArea}</p>
                </div>
                <div className="flex h-48 items-center justify-center rounded-lg bg-gray-200">
                  <div className="text-center text-gray-400">
                    <svg className="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="mt-2 text-xs font-medium">Fredericksburg, VA</p>
                  </div>
                </div>
              </div>

              <div>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div key="confirmation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center rounded-lg border p-12 text-center"
                      style={{ borderColor: hexWithOpacity(ACCENT, 0.3), backgroundColor: hexWithOpacity(ACCENT, 0.05) }}>
                      <AnimatedCheckmark size={64} color={ACCENT} />
                      <h3 className="mt-6 text-2xl font-extrabold text-gray-900">Thank You!</h3>
                      <p className="mt-2 text-gray-500">We&rsquo;ll review your message and get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid gap-4">
                      <select value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition-colors">
                        <option value="">Project Type</option>
                        <option>Kitchen Remodel</option><option>Bathroom Renovation</option><option>Home Addition</option>
                        <option>Deck/Patio</option><option>Roofing</option><option>Basement Finishing</option>
                        <option>Full Renovation</option><option>Commercial Build-out</option><option>Other</option>
                      </select>
                      <select value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition-colors">
                        <option value="">Timeline</option>
                        <option>ASAP</option><option>1-3 months</option><option>3-6 months</option><option>6+ months</option><option>Just exploring</option>
                      </select>
                      <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none" />
                      <input type="text" placeholder="Email / Phone" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none" />
                      <textarea placeholder="Tell us about your project..." rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none" />
                      <MagneticButton className="w-full">
                        <button type="submit" className="w-full rounded-lg px-8 py-3.5 text-sm font-semibold shadow-lg transition-transform hover:scale-105 hover:brightness-110"
                          style={{ backgroundColor: ACCENT, color: contrastTextForBackground(ACCENT), boxShadow: `${hexWithOpacity(ACCENT, 0.25)} 0 10px 20px` }}>
                          Send Message
                        </button>
                      </MagneticButton>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      <QuoteGenerator accentColor={ACCENT} />
    </>
  );
}

export default function Site() {
  const [activePage, setActivePage] = useState("home");

  function navigate(page: string) {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const cssVars = { ["--accent"]: ACCENT } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" style={cssVars}>
      <IntroSplash businessName={SITE_CONFIG.businessName} bgClass="bg-white" accentColor={ACCENT} />
      <ScrollProgress color={ACCENT} />

      <Navigation
        businessName={SITE_CONFIG.businessName}
        ctaText={SITE_CONFIG.ctaText}
        ctaHref="contact"
        navLinks={NAV_LINKS}
        accentColor={ACCENT}
        activePage={activePage}
        onNavigate={navigate}
      />

      <PageTransition pageKey={activePage} variant="curtain" accentColor={ACCENT}>
        {activePage === "home" && <HomePage onNavigate={navigate} />}
        {activePage === "services" && <ServicesPage onNavigate={navigate} />}
        {activePage === "portfolio" && <PortfolioPage onNavigate={navigate} />}
        {activePage === "reviews" && <ReviewsPage />}
        {activePage === "about" && <AboutPage onNavigate={navigate} />}
        {activePage === "contact" && <ContactPage />}
      </PageTransition>

      <RevealFooter>
        <footer className="border-t border-gray-200 bg-gray-100 py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-1 w-12 rounded-full" style={{ backgroundColor: ACCENT }} />
              <p className="text-sm font-semibold text-gray-700">{SITE_CONFIG.businessName}</p>
              <p className="text-xs text-gray-500">{SITE_CONFIG.address}</p>
              <p className="text-xs text-gray-500">{SITE_CONFIG.footerTagline}</p>
              <p className="text-xs text-gray-400">{SITE_CONFIG.footerText}</p>
            </div>
          </div>
        </footer>
      </RevealFooter>
    </div>
  );
}
