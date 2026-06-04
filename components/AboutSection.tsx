/*
 * AboutSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders three stacked sub-sections inside the #about scroll target:
 *   1. Education journey  – static image (light / dark variants)
 *   2. Experiences        – job history with bullet lists and tag pills
 *   3. Technical strengths – skill bars grouped by Languages and Tools
 *
 * "use client" is required because we call useTheme() (a React hook provided
 * by next-themes) to detect the current colour scheme.
 */
"use client"

import React from 'react'
import { sectionHeadingClassName } from '../lib/classNames'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import {
  BiLogoCPlusPlus,
  BiLogoDocker,
  BiLogoGoLang,
  BiLogoJava,
  BiLogoReact,
} from 'react-icons/bi'
import { SiOpenai } from 'react-icons/si'
import { SiApple, SiNextdotjs, SiSwift } from 'react-icons/si'


/*
 * accordIconDataUrl
 * ─────────────────
 * The Accord HK company logo is embedded as a base64 data URL instead of
 * a hosted file.  This avoids making a network request to a third-party
 * server while keeping the image self-contained in the bundle.
 */
const accordIconDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAZCAMAAAAVHr4VAAAAjVBMVEX////7+/vNzc3e3t5PS05dWlxcWVtVUVSura5bWFpnZGZoZWfz+/3R7/Z+fH5iX2GioKF4dnfs+fuV2uq85/Hp6elZVVfX1tbs7Oxmy+LEw8S8u7tXx+DF6vOFgYOL1ujf9Pl0z+T69fSCeHikoqOx4+/O5+7ByczP1tnF3OGY3/F+2/Br0umpn52LiYttCJRUAAABH0lEQVR4Aa2PVYKDQBBEB2mkkMHd43r/2yVBo3+7hXXxpo39gwRx0G8oyUSkqNJPqOkwAEUbjGmZb1VtcMfl3B2t5wcvMCREsUNQk4mm/ktVBSRkuhHlbJRflEvVisNmIYCKjaofqeYYShykDUeUsW6TpgErvSHOFaPfQiPo+cDatDWZVw+5jxQuMBbroOrxDdKi7rPK1hJYGOlR36wDX629oC3SjTlWr9vNdpevxX75/WFzTIt206cJI97Up1P9UJuez6dj0LBBI2TdJdsfrLK0rGafX1bJG8zkSL6OISKKsjd45aDpz5oMfmUv6jiAcIxjFUDyAsUI3J7bE8YqsxwyaD0bm+O1bgciVZxdrhJFz7qhs16vFxs+jBOyv+kOJucVEUwoH9QAAAAASUVORK5CYII='

/*
 * languages / tools
 * ──────────────────
 * Each entry drives one skill bar row in the "Technical strengths" section.
 *   skill – display label inside the bar
 *   level – 0-100 integer; controls how wide the coloured fill renders
 *   icon  – React element shown to the left of the label inside the bar
 *
 * Kept sorted by `level` descending so the strongest skill appears first.
 */
const languages = [
  { skill: 'C++',         level: 90, icon: <BiLogoCPlusPlus size={20} /> },
  { skill: 'Java',        level: 74, icon: <BiLogoJava size={20} /> },
  { skill: 'Objective-C', level: 70, icon: <SiApple size={20} /> },
  { skill: 'React',       level: 66, icon: <BiLogoReact size={20} /> },
  { skill: 'Swift',       level: 64, icon: <SiSwift size={20} /> },
  { skill: 'Next.js',     level: 60, icon: <SiNextdotjs size={20} /> },
  { skill: 'Go',          level: 58, icon: <BiLogoGoLang size={20} /> },
]

const tools = [
  { skill: 'Codex',  level: 88, icon: <SiOpenai size={18} /> },
  {
    skill: 'Claude Code',
    level: 80,
    /*
     * Claude Code has no dedicated react-icons entry, so we load the icon
     * from an external PNG and apply a CSS filter to shift it to the warm
     * caramel/orange accent colour that matches the site palette.
     * The filter chain: desaturate → re-saturate → rotate hue → fine-tune.
     */
    icon: (
      <Image
        src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/claudecode-color.png"
        alt="Claude Code icon"
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
        style={{
          filter:
            'brightness(0) saturate(100%) invert(58%) sepia(50%) saturate(500%) hue-rotate(350deg) brightness(95%) contrast(90%)',
        }}
      />
    ),
  },
  { skill: 'Docker', level: 62, icon: <BiLogoDocker size={20} /> },
]

/*
 * skillGroups
 * ───────────
 * Groups the two skill arrays under labelled sections ("Languages", "Tools").
 * Defined at module level (outside the component function) so React never
 * re-allocates this array during re-renders — it's a stable constant reference.
 */
const skillGroups = [
  { label: 'Languages', items: languages },
  { label: 'Tools',     items: tools },
]

/*
 * TagList
 * ───────
 * A small presentational component that renders a row of accent-coloured
 * pill badges.  Extracted here because the same markup repeats for every
 * experience entry.  Accepting `tags` as a string array keeps the call sites
 * concise:  <TagList tags={['C++', 'Qt', …]} />
 */
const TagList = ({ tags }: { tags: string[] }) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {tags.map((tag) => (
      /*
       * key=tag is safe here because each tag is unique within a single list.
       * bg-[var(--accent-soft)] is a translucent version of the accent colour
       * (defined in globals.css) so the pill tint adapts to light/dark mode
       * without any extra logic.
       */
      <span key={tag} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold tracking-wide text-[var(--accent)]">
        {tag}
      </span>
    ))}
  </div>
)

const AboutSection = () => {
  /*
   * resolvedTheme — provided by next-themes
   * ────────────────────────────────────────
   * Returns 'light' | 'dark' | undefined.
   * It is `undefined` during server-side rendering (before hydration), which
   * acts as a natural guard — any conditional that checks resolvedTheme is
   * automatically skipped on the first pass, preventing a flash of wrong
   * content.
   *
   * We only need it here to pick the correct education image (light vs dark).
   */
  const { resolvedTheme } = useTheme()

  return (
    /*
     * id="about" — the IntersectionObserver in Navbar watches this element to
     * decide which nav pill should appear active.
     *
     * The top border + padding creates a visual separator between sections
     * without requiring a standalone <hr> element.
     * mt-8 / sm:mt-10 — tighter on mobile, slightly looser on tablets+.
     */
    <section id="about" className="mt-8 border-t border-[var(--card-border)] pt-10 pb-8 sm:mt-10 sm:pt-14 sm:pb-12">
      <div>
        <div className="grid gap-12">

          {/* ── Education ──────────────────────────────────────────────────── */}
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className={sectionHeadingClassName}>Education journey</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  A quick look at the academic path behind my software foundation.
                </p>
              </div>
            </div>

            {/*
             * Two separate image files for light and dark modes:
             *   /edu.png    — the default (light background) version
             *   /edu-dm.png — a variant tuned for dark backgrounds
             *
             * The Tailwind dark: filter classes (sepia + hue-rotate + brightness)
             * correct any leftover teal/cyan tones in edu-dm.png so they match
             * the warm caramel palette used across the site.
             */}
            <div className="p-3 sm:p-4">
              <Image
                src={resolvedTheme === 'dark' ? '/edu-dm.png' : '/edu.png'}
                alt="Education roadmap"
                width={1400}
                height={700}
                sizes="100vw"
                className="w-full dark:sepia-[.25] dark:hue-rotate-[340deg] dark:brightness-110"
              />
            </div>
          </div>

          {/* ── Experiences ────────────────────────────────────────────────── */}
          <div className="grid gap-12">
            <div className="mt-8 border-t border-[var(--card-border)] pt-10 sm:mt-10 sm:pt-12">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className={sectionHeadingClassName}>Experiences</h3>
              </div>

              {/* ── Job 1: Senior Software Developer @ PremiumSoft ─────────── */}
              <div className="flex flex-col gap-3">
                <h4 className="text-2xl">Senior Software Developer</h4>

                {/*
                 * Company meta row: logo + company name (linked) + location + dates.
                 * inline-flex with gap keeps the logo and text on the same baseline.
                 * normal-case / tracking-normal override the parent uppercase styles
                 * so the company name renders in sentence case.
                 */}
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  <span className="inline-flex items-center gap-3 normal-case tracking-normal">
                    {/* Logo served from /public/icons/ — no external dependency */}
                    <Image
                      src="/icons/navicat.png"
                      alt="Navicat logo"
                      width={112}
                      height={28}
                      className="h-7 w-auto object-contain"
                    />
                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      <a
                        href="https://www.navicat.com/en/"
                        target="_blank"
                        rel="noopener noreferrer"  /* prevents the new tab from accessing window.opener */
                        className="underline underline-offset-4"
                      >
                        PremiumSoft CyberTech Ltd.
                      </a>{' '}
                      | Hong Kong | 03/2021 - Now
                    </span>
                  </span>
                </p>

                <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
                  A leading software company developing Navicat, a premier
                  multi-connection database administration tool used by millions of
                  enterprise professionals globally.
                </p>
              </div>

              {/*
               * Bullet list — each <li> uses a flex row so the dot and text are
               * vertically centred together.
               * The dot is a 6×6px circle (<span h-1.5 w-1.5 rounded-full>).
               * shrink-0 prevents the dot from collapsing when the text wraps.
               * Proper-noun highlights use <b> with text-[var(--accent)] so they
               * stand out without adding bold weight globally.
               */}
              <ul className="mt-3 space-y-1 text-sm leading-6 text-[var(--muted)]">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>Led end-to-end development and maintenance of <b className="font-semibold text-[var(--accent)]">Navicat</b> for MacOS and Linux environments.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>Designed backend architectures supporting multi-connection database integrations including <b className="font-semibold text-[var(--accent)]">Snowflake</b> and <b className="font-semibold text-[var(--accent)]">PostgreSQL</b>.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>Built a Data Generation feature with custom algorithms and UI to produce realistic sample datasets for testing and demos.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>Integrated <b className="font-semibold text-[var(--accent)]">C++</b> libraries to enable Data Dictionary export, improving third-party interoperability by 25%.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>Delivered a BI workspace that transforms raw data into actionable insights to support data-driven decisions.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>Conducted code reviews to maintain high standards of quality and long-term maintainability.</span>
                </li>
              </ul>

              {/* Tech stack pills for this role */}
              <TagList tags={['C++', 'Objective-C', 'Qt', 'MacOS', 'Linux', 'Snowflake', 'PostgreSQL']} />

              {/* ── Job 2: Software Developer @ PremiumSoft ────────────────── */}
              <div className="mt-6">
                <div className="flex flex-col gap-3">
                  <h4 className="text-2xl">Software Developer</h4>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    <span className="inline-flex items-center gap-3 normal-case tracking-normal">
                      <Image
                        src="/icons/navicat.png"
                        alt="Navicat logo"
                        width={112}
                        height={28}
                        className="h-7 w-auto object-contain"
                      />
                      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        <a
                          href="https://www.navicat.com/en/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4"
                        >
                          PremiumSoft CyberTech Ltd.
                        </a>{' '}
                        | Hong Kong | 06/2017 - 02/2021
                      </span>
                    </span>
                  </p>
                  <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
                    A leading software company developing Navicat, a premier
                    multi-connection database administration tool used by millions of
                    enterprise professionals globally.
                  </p>
                </div>
                <ul className="mt-3 space-y-1 text-sm leading-6 text-[var(--muted)]">
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>Investigated and resolved complex customer-reported defects across <b className="font-semibold text-[var(--accent)]">MacOS</b> and <b className="font-semibold text-[var(--accent)]">Linux</b> platforms.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>Optimized application performance and refined database query execution pathways.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>Participated in agile development cycles, delivering incremental updates to improve product stability.</span>
                  </li>
                </ul>
                <TagList tags={['C++', 'Objective-C', 'Qt', 'MacOS', 'Linux']} />

                {/* ── Job 3: Junior Mobile Developer @ Accord HK ─────────── */}
                <div className="mt-6">
                  <div className="flex flex-col gap-3">
                    <h4 className="text-2xl">Junior Mobile Application Developer</h4>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      <span className="inline-flex items-center gap-3 normal-case tracking-normal">
                        {/*
                         * Accord HK logo is a base64 data URL (see top of file).
                         * Using a data URL avoids a network request to an
                         * untrusted third-party host while keeping the image
                         * available even if the company's website goes offline.
                         */}
                        <Image
                          src={accordIconDataUrl}
                          alt="Accord HK icon"
                          width={28}
                          height={25}
                          className="h-6 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                          <a
                            href="https://www.accordhk.com/zh-hant/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4"
                          >
                            Accord HK
                          </a>{' '}
                          | Hong Kong | 12/2016 - 02/2017
                        </span>
                      </span>
                    </p>
                    <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
                      A boutique technology agency specializing in custom mobile
                      application development for retail and consumer-facing brands.
                    </p>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm leading-6 text-[var(--muted)]">
                    <li className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>Designed and built native mobile applications for <b className="font-semibold text-[var(--accent)]">Android</b> and <b className="font-semibold text-[var(--accent)]">iOS</b> using <b className="font-semibold text-[var(--accent)]">Java</b> and <b className="font-semibold text-[var(--accent)]">Objective-C</b>.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>Implemented local data storage solutions utilizing <b className="font-semibold text-[var(--accent)]">SQLite</b> and native mobile SDKs.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>Managed end-to-end app packaging and submission to the <b className="font-semibold text-[var(--accent)]">Google Play Store</b>.</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>Collaborated directly with clients to translate business requirements into technical features.</span>
                    </li>
                  </ul>
                  <TagList tags={['Java', 'Objective-C', 'Android', 'iOS', 'SQLite']} />
                </div>
              </div>
            </div>

            {/* ── Technical Strengths ──────────────────────────────────────── */}
            <div className="mt-8 border-t border-[var(--card-border)] pt-10 sm:mt-10 sm:pt-12">
              <div className="flex items-center justify-between gap-4">
                <h3 className={sectionHeadingClassName}>Technical strengths</h3>
              </div>

              {/*
               * skillGroups maps to two labelled sub-sections: Languages + Tools.
               * Each item renders as a horizontal bar:
               *   - Outer div: grey track (bg-black/5 in light, bg-white/10 in dark)
               *   - .skill-bar-fill div: coloured fill, width driven by item.level (%)
               *     The gradient and colour are defined in globals.css via CSS
               *     custom properties so they automatically update in dark mode.
               *   - Inner div (absolute): icon + label overlaid on top of the fill
               *     using white text with a subtle drop-shadow for legibility.
               *
               * grid-cols-2 puts two bars side-by-side on all screen sizes.
               */}
              {skillGroups.map((group) => (
                <div key={group.label} className="mt-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {group.label}
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {group.items.map((item) => (
                      /* Track — sets the max-width and clips the fill to rounded ends */
                      <div key={item.skill} className="relative h-[32px] overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                        {/* Coloured fill — width percentage = proficiency level */}
                        <div
                          className="skill-bar-fill absolute inset-y-0 left-0"
                          style={{ width: `${item.level}%` }}
                        />
                        {/* Icon + label overlaid on the fill, always left-aligned */}
                        <div className="absolute inset-y-0 left-3.5 flex items-center gap-2 text-white">
                          <div className="opacity-90">{item.icon}</div>
                          <span className="text-sm font-semibold tracking-wide drop-shadow-sm">{item.skill}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
