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
import { sectionClassName, sectionHeadingClassName } from '../lib/classNames'
import { companies, education, skillGroups } from '../lib/content'
import ScreenPicker from './ScreenPicker'
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
      <span key={tag} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-caption font-semibold tracking-wide text-[var(--accent)]">
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
    <section id="about" className={`${sectionClassName} pb-8 sm:pb-12`}>
      <div>
        <div className="grid gap-12">

          {/* ── Education ──────────────────────────────────────────────────── */}
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className={sectionHeadingClassName}>Education journey</h3>
                <p className="mt-2 text-body-sm leading-6 text-[var(--muted)]">
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
             * The rule is drawn once on the <ol> and the nodes are positioned
             * back up onto it, rather than a border-top per <li>. A per-item
             * border breaks at every grid gap, which read as four separate
             * columns instead of one timeline — the connecting line was the
             * whole point of the image this replaces.
             *
             * The line and nodes only appear at lg, where the four entries sit
             * in a row. Stacked, a vertical run of dots down the left would be
             * decoration, not a timeline.
             */}
            <ol className="relative mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7 lg:pt-9 lg:before:absolute lg:before:inset-x-0 lg:before:top-0 lg:before:h-0.5 lg:before:bg-[var(--card-border)] lg:before:content-['']">
              {education.timeline.map((entry) => (
                <li
                  key={entry.period}
                  className="relative border-t-2 border-[var(--card-border)] pt-4 lg:border-t-0 lg:pt-0 lg:before:absolute lg:before:-top-[2.4375rem] lg:before:left-0 lg:before:h-2.5 lg:before:w-2.5 lg:before:rounded-full lg:before:bg-[var(--accent)] lg:before:content-['']"
                >
                  <p className="text-caption font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                    {entry.period}
                  </p>
                  <p className="mt-2.5 font-display text-body-lg font-semibold leading-snug tracking-[-0.02em] text-[var(--foreground)]">
                    {entry.school}
                  </p>
                  <p className="mt-1.5 text-body-sm leading-6 text-[var(--muted)]">
                    {entry.qualification}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* ── Experiences ────────────────────────────────────────────────── */}
          <div className="grid gap-12">
            <div className={sectionClassName}>
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className={sectionHeadingClassName}>Experiences</h3>
              </div>

              {/*
               * Two levels: company, then the roles held there.
               *
               * The company header — logo, name, location, overall dates and
               * the summary paragraph — prints once. Two of the three roles
               * are at PremiumSoft, so the flat list used to repeat that whole
               * paragraph verbatim, and the promotion from Software Developer
               * to Senior Software Developer read as two unrelated jobs.
               *
               * Roles are indented under a left rule. The approved direction
               * avoids borders, but the education timeline already uses the
               * same token for its rule, and pure indentation did not make the
               * nesting legible on its own.
               */}
              {companies.map((company, companyIndex) => (
                <div key={company.name} className={companyIndex > 0 ? 'mt-14' : undefined}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Image
                      src={company.logo.src}
                      alt={company.logo.alt}
                      width={company.logo.width}
                      height={company.logo.height}
                      className={company.logo.className}
                    />
                    {/* rel="noopener noreferrer" stops the new tab reaching window.opener */}
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-title font-semibold tracking-[-0.025em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                    >
                      {company.name}
                    </a>
                    {/*
                     * Location and dates split apart. Run together as one
                     * 12px muted line they were the quietest thing beside a
                     * 24px company name — and the tenure is the number a
                     * recruiter scans for. The dates carry the weight now;
                     * the location stays small and sits ahead of them.
                     */}
                    <span className="text-caption font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      {company.location}
                    </span>
                    {/*
                     * A rule, not a middot: the two sides are 12px and 20px,
                     * and a dot sized for either one floats against the
                     * other. This is the one place the design direction's
                     * "separate with surface colour, never lines" is broken
                     * — a divider inside a line, not a region boundary.
                     */}
                    <span aria-hidden className="h-[18px] w-px bg-[var(--card-border)]" />
                    <span className="text-title-sm font-semibold tracking-[-0.01em] text-[var(--muted)]">
                      {company.period}
                    </span>
                  </div>

                  <p className="mt-3 max-w-[76ch] text-body-sm leading-7 text-[var(--muted)] sm:text-body">
                    {company.summary}
                  </p>

                  <div className="mt-7 border-l border-[var(--card-border)] pl-4 sm:pl-6">
                    {company.roles.map((role, roleIndex) => (
                      <div key={role.title} className={roleIndex > 0 ? 'mt-8' : undefined}>
                        {/*
                         * 600, not the global h4 700: the 甲 variant's title
                         * weight. It sits one step under the company name
                         * above it, which carries the 24px.
                         */}
                        <h4 className="text-title-sm font-semibold tracking-[-0.025em]">{role.title}</h4>
                        <p className="mt-1.5 text-caption font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                          {role.period}
                        </p>

                        {/*
                         * items-start, not items-center: on a bullet that wraps
                         * to two lines the dot belongs beside the first line,
                         * not floating in the middle of the block. mt-2 lines it
                         * up with the cap height. shrink-0 stops it collapsing.
                         */}
                        <ul className="mt-4 space-y-2.5 text-body-sm leading-7 text-[var(--muted)]">
                          {role.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="flex items-start gap-2.5">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                              <span className="max-w-[76ch]">{bullet}</span>
                            </li>
                          ))}
                        </ul>

                        <TagList tags={role.tags} />
                      </div>
                    ))}

                    {/*
                     * The product the roles are about, at the foot of the
                     * company block. A carousel rather than a grid: these are
                     * wide desktop screenshots, and one at a time is the only
                     * size at which they can actually be read.
                     */}
                    {company.showcase && (
                      <div className="mt-8">
                        <h5 className="font-display text-body-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]">
                          {company.showcase.title}
                        </h5>
                        <p className="mt-1.5 text-caption text-[var(--muted)]">
                          {company.showcase.note}
                        </p>
                        {/*
                         * The same picker the projects use, in its rail
                         * layout: these screenshots are landscape, so the
                         * main image already fills the row and the
                         * thumbnails only need a narrow strip beside it.
                         *
                         * It replaced a carousel whose slides were not bound
                         * by the viewport — on a 375px screen the track ran
                         * to 2,416px and took the whole page into horizontal
                         * scroll.
                         */}
                        <div className="mt-4 rounded-card bg-[var(--surface)] px-6 pt-6 sm:px-8 sm:pt-8">
                          <ScreenPicker screens={company.showcase.images} layout="rail" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Technical Strengths ──────────────────────────────────────── */}
            <div className={sectionClassName}>
              <div className="flex items-center justify-between gap-4">
                <h3 className={sectionHeadingClassName}>Technical strengths</h3>
              </div>

              {/*
               * skillGroups maps to two labelled sub-sections: Languages + Tools.
               * One row each: name, a five-segment meter, and what the skill
               * was used to build.
               *
               * The meter sits beside the name rather than at the right edge.
               * The two things a reader compares — which skill, how deep — are
               * the two that have to be next to each other; parked at opposite
               * ends of a 1,200px row they cannot be read as one fact.
               *
               * The prose wraps under the name on phones, where a three-column
               * row has nowhere to go.
               */}
              {skillGroups.map((group) => (
                <div key={group.label} className="mt-6">
                  <p className="mb-1 text-caption font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {group.label}
                  </p>
                  <div>
                    {group.items.map((item) => (
                      <div
                        key={item.parts.map((part) => part.name).join('/')}
                        className="flex flex-col items-start gap-y-2 border-t border-[var(--card-border)] py-3 sm:flex-row sm:items-center sm:gap-x-5 sm:gap-y-0"
                      >
                        {/* Each mark sits with the name it belongs to. */}
                        <span className="flex flex-wrap items-center gap-x-1.5 text-body font-semibold tracking-[-0.01em] text-[var(--foreground)] sm:w-[14.5rem] sm:shrink-0">
                          {item.parts.map((part, index) => (
                            <React.Fragment key={part.name}>
                              {index > 0 && <span className="text-[var(--muted)]">/</span>}
                              <span className="flex items-center gap-1.5">
                                <span className="text-[var(--accent)]">{part.icon}</span>
                                {part.name}
                              </span>
                            </React.Fragment>
                          ))}
                        </span>
                        {/*
                         * The meter is the only place the level exists, and
                         * it encodes it in background colour alone, so the
                         * segments are hidden and the number is spelled out
                         * for anything not reading pixels.
                         */}
                        <span className="sr-only">{item.level} out of 5</span>
                        <span aria-hidden className="flex shrink-0 gap-1.5">
                          {[1, 2, 3, 4, 5].map((step) => (
                            <span
                              key={step}
                              className={`h-1.5 w-6 rounded-full ${
                                step <= item.level
                                  ? 'bg-[var(--accent)]'
                                  : 'bg-[var(--card-border)]'
                              }`}
                            />
                          ))}
                        </span>
                        <span className="min-w-0 flex-1 text-body-sm leading-6 text-[var(--muted)]">
                          {item.use}
                        </span>
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
