/**
 * classNames.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared Tailwind class strings used across multiple components.
 * Centralised here so a single edit updates every usage site automatically.
 *
 * Why a .ts file instead of a CSS class?
 *   Tailwind's JIT compiler tree-shakes classes from JSX files.  A class string
 *   defined here is still picked up by the scanner as long as the string is
 *   written out in full (not built dynamically at runtime).
 */

/**
 * sectionHeadingClassName
 * ────────────────────────
 * The large heading style shared by "Projects", "Experiences", "Technical
 * strengths", etc.
 *
 * font-sans        — uses Inter (the sans-serif variable font set in layout.tsx)
 *                    h1–h4 default to the serif font (Playfair Display) via
 *                    globals.css, so we explicitly override that here.
 * text-title-lg → 4xl → 5xl — responsive size scale (mobile → tablet → desktop)
 * tracking-[-0.04em] — tight letter-spacing for a modern editorial look
 * dark:text-white  — ensures maximum contrast on dark backgrounds
 */
export const sectionHeadingClassName =
  'font-sans text-title-lg font-semibold leading-none tracking-[-0.04em] text-[var(--foreground)] dark:text-white sm:text-display-sm lg:text-display'
