export const DEFAULT_ACCENT = "#f97316";

export function contrastTextForBackground(hex: string): "#ffffff" | "#000000" {
  const normalized = hex && String(hex).trim() ? hex : DEFAULT_ACCENT;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  if (!result) return "#ffffff";
  const [r, g, b] = [parseInt(result[1]!, 16), parseInt(result[2]!, 16), parseInt(result[3]!, 16)].map(
    (c) => (c / 255 <= 0.03928 ? c / 255 / 12.92 : Math.pow((c / 255 + 0.055) / 1.055, 2.4)),
  );
  const luminance = 0.2126 * r + 0.7147 * g + 0.0693 * b;
  return luminance > 0.4 ? "#000000" : "#ffffff";
}

export function hexWithOpacity(hex: string, opacity: number): string {
  const normalized = hex && String(hex).trim() && /^#?[a-f\d]{6}$/i.test(hex.trim()) ? hex.trim() : DEFAULT_ACCENT;
  const base = normalized.startsWith("#") ? normalized : `#${normalized}`;
  const alpha = Math.round(Math.min(1, Math.max(0, opacity)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${base}${alpha}`;
}
