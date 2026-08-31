/*
 * AboutSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders three stacked sub-sections inside the #about scroll target:
 *   1. Education journey  – text timeline
 *   2. Experiences        – job history with bullet lists and tag pills
 *   3. Technical strengths – skill bars grouped by Languages and Tools
 *
 * No "use client" — the education timeline was the last thing in here that
 * needed a hook (useTheme, to pick between the light and dark PNG). With the
 * images gone this component is pure markup, so it renders on the server and
 * ships no JavaScript.
 */
import React from 'react'
import { sectionHeadingClassName } from '../lib/classNames'
import { education, experiences, skillGroups } from '../lib/content'
import Image from 'next/image'


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
                  {education.blurb}
                </p>
              </div>
            </div>

            {/*
             * Text timeline, replacing the former /edu.png + /edu-dm.png pair.
             *
             * <ol> because the entries are chronological — the order carries
             * meaning, so a list that says so is the honest markup.
             *
             * The border-t on every <li> forms one continuous rule across the
             * four columns on desktop, which is the connecting line the old
             * image drew by hand. On mobile the columns stack and each rule
             * becomes a plain separator. No pseudo-elements needed.
             *
             * Styling uses the current token set. The revamp Epic drops borders
             * in favour of surface bands and will restyle this block then.
             */}
            <ol className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {education.timeline.map((entry) => (
                <li key={entry.period} className="border-t-2 border-[var(--card-border)] pt-4">
                  <p className="text-sm font-semibold tracking-wide text-[var(--accent)]">
                    {entry.period}
                  </p>
                  <p className="mt-2 font-semibold leading-snug text-[var(--foreground)]">
                    {entry.school}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    {entry.qualification}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Experiences ────────────────────────────────────────────────── */}
          <div className="grid gap-12">
            <div className="mt-8 border-t border-[var(--card-border)] pt-10 sm:mt-10 sm:pt-12">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className={sectionHeadingClassName}>Experiences</h3>
              </div>

              {/*
               * Experience entries come from `experiences` in lib/content.tsx.
               * Adding a role means adding one object there — this markup is
               * written once and reused for every entry, replacing the three
               * hand-copied blocks that used to live here.
               *
               * mt-6 on every entry after the first reproduces the spacing the
               * copied blocks had.
               */}
              {experiences.map((job, index) => (
                <div key={`${job.company}-${job.period}`} className={index > 0 ? 'mt-6' : undefined}>
                  <div className="flex flex-col gap-3">
                    <h4 className="text-2xl">{job.title}</h4>

                    {/*
                     * Company meta row: logo + company name (linked) + location + dates.
                     * normal-case / tracking-normal override the parent uppercase
                     * styles so the company name renders in sentence case.
                     */}
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      <span className="inline-flex items-center gap-3 normal-case tracking-normal">
                        <Image
                          src={job.logo.src}
                          alt={job.logo.alt}
                          width={job.logo.width}
                          height={job.logo.height}
                          className={job.logo.className}
                        />
                        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                          {/* rel="noopener noreferrer" stops the new tab reaching window.opener */}
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4"
                          >
                            {job.company}
                          </a>{' '}
                          | {job.location} | {job.period}
                        </span>
                      </span>
                    </p>

                    <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
                      {job.summary}
                    </p>
                  </div>

                  {/*
                   * Each <li> is a flex row so the dot and the text share a centre
                   * line.  shrink-0 stops the 6px dot collapsing when text wraps.
                   */}
                  <ul className="mt-3 space-y-1 text-sm leading-6 text-[var(--muted)]">
                    {job.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <TagList tags={job.tags} />
                </div>
              ))}
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
