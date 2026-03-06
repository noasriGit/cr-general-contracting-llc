"use client";

import { contrastTextForBackground, DEFAULT_ACCENT } from "@/lib/color-utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";
import { SafeImage } from "./safe-image";

export function IntroSplash({
  businessName,
  bgClass = "bg-[#0a0a0a]",
  accentColor = DEFAULT_ACCENT,
}: {
  businessName: string;
  bgClass?: string;
  accentColor?: string;
}) {
  const color = accentColor || DEFAULT_ACCENT;
  const [show, setShow] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) { setShow(false); return; }
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${bgClass}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-center text-3xl font-bold tracking-tight md:text-5xl"
            style={{ color }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {businessName}
          </motion.p>
          <motion.div
            className="mt-4 h-px"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SplitTextReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  mode = "words",
  triggerOnMount = false,
  style,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  mode?: "words" | "chars";
  triggerOnMount?: boolean;
  style?: CSSProperties;
}) {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const shouldAnimate = triggerOnMount || isInView;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (prefersReduced || isMobile) {
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  const units = mode === "chars" ? text.split("") : text.split(" ");

  return (
    <Tag ref={ref as any} className={className} aria-label={text} style={style}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={shouldAnimate ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            {unit}
            {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  style,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) { setDisplay(value); return; }
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, duration, prefersReduced]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  );
}

export function ScrollProgress({ color = DEFAULT_ACCENT }: { color?: string }) {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const springScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const transformScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleX = isMobile ? transformScale : springScale;

  if (prefersReduced) return null;

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scaleX, backgroundColor: color || DEFAULT_ACCENT }}
    />
  );
}

export function MagneticButton({
  children,
  className = "",
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / (rect.width / 2)) * strength;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * strength;
      x.set(dx);
      y.set(dy);
    },
    [isTouch, strength, x, y],
  );

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

export function ImageReveal({
  src,
  alt,
  revealColor = DEFAULT_ACCENT,
  className = "",
  direction = "left",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  revealColor?: string;
  className?: string;
  direction?: "left" | "top";
  imgClassName?: string;
}) {
  const color = revealColor || DEFAULT_ACCENT;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const overlayAnim = inView
    ? direction === "left" ? { x: "100%" } : { y: "100%" }
    : direction === "left" ? { x: "0%" } : { y: "0%" };

  if (prefersReduced) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <SafeImage src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} loading="lazy" />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`}>
        <motion.div
          className={`h-full w-full object-cover ${imgClassName}`}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SafeImage src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} loading="lazy" />
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={{ scale: 1.1 }}
        animate={inView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <SafeImage src={src} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} loading="lazy" />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: color }}
        initial={direction === "left" ? { x: "0%" } : { y: "0%" }}
        animate={overlayAnim}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 5,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (isTouch || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(x * maxTilt * 2);
      rotateX.set(-y * maxTilt * 2);
    },
    [isTouch, maxTilt, rotateX, rotateY],
  );

  const handleLeave = useCallback(() => { rotateX.set(0); rotateY.set(0); }, [rotateX, rotateY]);

  if (isTouch) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: 800, rotateX: springRX, rotateY: springRY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCheckmark({
  size = 64,
  color = DEFAULT_ACCENT,
}: {
  size?: number;
  color?: string;
}) {
  const safeColor = color || DEFAULT_ACCENT;
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="24" stroke={safeColor} strokeWidth="2" fill="none" />
        <path d="M14 27l8 8 16-16" stroke={safeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
      <motion.circle cx="26" cy="26" r="24" stroke={safeColor} strokeWidth="2" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} />
      <motion.path d="M14 27l8 8 16-16" stroke={safeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }} />
    </svg>
  );
}

export function RevealFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return <div ref={ref} className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ContractorDecorations({ accentColor = DEFAULT_ACCENT }: { accentColor?: string }) {
  const color = accentColor || DEFAULT_ACCENT;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={color} strokeWidth="0.5" />
          </pattern>
        </defs>
        <motion.rect
          width="100%" height="100%" fill="url(#bp-grid)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>
    </div>
  );
}
