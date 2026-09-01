/*
 * ProjectsSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the #projects section: a vertical list of project cards, each with:
 *   - A clickable main image (opens the full-screen zoom viewer)
 *   - A header row: icon, title, year badge, subtitle
 *   - A short description + detail paragraph
 *   - A "View repository" / "Private" button
 *   - An "Interface snapshots" gallery of thumbnail screens
 *
 * A global Escape key listener dismisses the zoom overlay without needing
 * a close button click.
 *
 * "use client" is required because the component uses useState, useEffect,
 * and click/keyboard event handlers — all browser-only APIs.
 */
"use client"

import React, { useEffect, useState } from 'react'
import { sectionHeadingClassName } from '../lib/classNames'
import { projects } from '../lib/content'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowUpRight, BsChevronDown } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import SlideUp from './SlideUp'


const ProjectsSection = () => {
  /*
   * zoomedImage — tracks which image is currently open in the full-screen overlay.
   * null  → overlay is hidden
   * { src, alt } → overlay is visible, showing that image
   */
  const [zoomedImage, setZoomedImage] = useState<{
    src: string
    alt: string
  } | null>(null)

  /*
   * Escape key listener — dismisses the zoom overlay without clicking the × button.
   *
   * Why [] dependency array?
   *   setZoomedImage is a stable reference (React guarantees this for state setters),
   *   so the effect never needs to re-run.  The guard `if (event.key === 'Escape')`
   *   is inside the handler, which means the listener can safely stay attached
   *   even when zoomedImage changes value.
   *
   * Cleanup: the listener is removed when the component unmounts to avoid
   * a memory leak or stale handler.
   */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setZoomedImage(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      {/*
       * id="projects" — watched by the IntersectionObserver in Navbar to
       * highlight the "Projects" nav pill when this section is in view.
       */}
      <section id="projects" className="mt-8 border-t border-[var(--card-border)] pt-10 pb-0 sm:mt-10 sm:pt-14 sm:pb-2">
        <div>
          {/* Section heading + subtitle */}
          <div className="mb-8">
            <h2 className={sectionHeadingClassName}>Projects</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              A selection of projects that reflects my approach to product thinking,
              engineering execution, and interface design.
            </p>
          </div>

          {/*
           * Project cards — space-y-6 adds vertical gap between cards.
           * Each card is wrapped in <SlideUp> which applies a CSS animation
           * (fade + translate-y) as the card enters the viewport.
           */}
          <div className="space-y-6">
            {projects.map((project) => (
              <SlideUp key={project.name} offset="-150px 0px -100px 0px">
                {/*
                 * Card shell — a native <details>, so open/close, keyboard
                 * support and the collapsed state in print all come from the
                 * browser. `open` is set from the `featured` flag in
                 * lib/content.tsx: the flagship starts expanded, the rest
                 * start collapsed. React only writes the attribute on first
                 * render, so a visitor's own toggling is never overridden.
                 */}
                <details
                  open={project.featured}
                  className="group overflow-hidden rounded-[2rem] border border-[var(--card-border)]"
                >
                  {/*
                   * Summary — always visible: icon, name, year, context and
                   * the lead sentence. list-none plus the webkit rule removes
                   * the default disclosure triangle in favour of the chevron.
                   */}
                  <summary className="flex cursor-pointer list-none items-start gap-3 p-6 transition-colors hover:bg-[var(--surface)] sm:p-8 [&::-webkit-details-marker]:hidden">
                    <Image
                      src={project.listIcon}
                      alt={`${project.name} icon`}
                      width={40}
                      height={40}
                      className="mt-0.5 h-10 w-10 shrink-0 rounded-xl"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-sans text-2xl font-semibold leading-none tracking-[-0.04em] text-[var(--foreground)]">
                          {project.name}
                        </h3>
                        {/*
                         * Year badge — soft accent background so it reads as
                         * a secondary label rather than a primary action.
                         */}
                        <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-4 py-1 text-sm font-semibold tracking-[0.14em] text-[var(--accent)]">
                          {project.yearTag}
                        </span>
                      </div>
                      {/* Subtitle — small caps style via uppercase + tracking */}
                      <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {project.subtitle}
                      </p>
                      {/* Lead sentence — the one line that survives collapsing */}
                      <p className="mt-3 text-sm font-medium leading-6 text-[var(--foreground)]">
                        {project.description}
                      </p>
                    </div>
                    {/* Chevron flips when the card is open (group-open) */}
                    <BsChevronDown
                      size={16}
                      className="mt-2 shrink-0 text-[var(--muted)] transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>

                  {/*
                   * Two-column grid on large screens:
                   *   Left  (1.1fr) — hero image panel
                   *   Right (0.9fr) — text content panel
                   * On smaller screens this collapses to a single column.
                   */}
                  <div className="grid gap-0 border-t border-[var(--card-border)] lg:grid-cols-[1.1fr_0.9fr]">

                    {/* ── Hero image (left panel) ─────────────────────────── */}
                    <div className="relative p-5 lg:p-6">
                      {/*
                       * Wrapping the image in a <button> makes the entire image
                       * clickable (and keyboard-accessible) to open the zoom overlay.
                       * The `group` class lets child elements respond to the button's
                       * hover state — here, the image scales slightly on hover.
                       */}
                      <button
                        type="button"
                        onClick={() =>
                          setZoomedImage({
                            src: project.image,
                            alt: `${project.name} project preview`,
                          })
                        }
                        className="group block w-full overflow-hidden rounded-[1.5rem]"
                      >
                        <Image
                          src={project.image}
                          alt={`${project.name} project preview`}
                          width={1200}
                          height={900}
                          className="h-full w-full rounded-[1.5rem] object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      </button>
                    </div>

                    {/* ── Text content (right panel) ──────────────────────── */}
                    <div className="flex flex-col justify-center p-6 sm:p-8">

                      {/*
                       * Detail sentence — the header and lead sentence now live
                       * in the <summary>, so the expanded panel carries only
                       * what collapsing hides.
                       */}
                      <p className="text-sm leading-6 text-[var(--muted)]">
                        {project.detail}
                      </p>

                      {/* Action button — "View repository" or "Private academic project" */}
                      <div className="mt-4 flex flex-wrap gap-3">
                        {project.link ? (
                          /*
                           * Next.js <Link> with target="_blank" opens GitHub in a new tab.
                           * rel="noopener noreferrer" prevents the new tab from accessing
                           * window.opener and stops the Referer header from being sent.
                           */
                          <Link href={project.link} target="_blank" rel="noopener noreferrer" className="secondary-button gap-2">
                            View repository
                            <BsArrowUpRight size={14} />
                          </Link>
                        ) : (
                          /* Not a real button — cursor-default signals it isn't clickable */
                          <span className="secondary-button cursor-default">Private academic project</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── Interface snapshots gallery ────────────────────────── */}
                  {/*
                   * Sits below the two-column grid, spanning the full card width.
                   * A top border visually separates it from the main card content.
                   */}
                  <div className="border-t border-[var(--card-border)] p-6 sm:p-8">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h4 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]">
                        Interface snapshots
                      </h4>
                      {/* Screen count badge — accent colour matches the year badge style */}
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        {project.extraImageList.length} screens
                      </p>
                    </div>

                    {/*
                     * Thumbnail grid:
                     *   mobile   – 1 column (grid default)
                     *   sm+      – 2 columns
                     *   xl+      – 3 columns
                     * max-w-[22rem] keeps portrait screenshots from becoming too wide.
                     * Each thumbnail is also a button that opens the zoom overlay.
                     */}
                    <div className="grid justify-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {project.extraImageList.map((imageItem) => (
                        <button
                          key={imageItem.image}
                          type="button"
                          onClick={() =>
                            setZoomedImage({
                              src: imageItem.image,
                              alt: imageItem.title,
                            })
                          }
                          className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-[1.5rem] bg-white/30 text-left transition duration-300 hover:-translate-y-1 dark:bg-white/5"
                        >
                          {/*
                           * Fixed-height container (28rem) centres the screenshot
                           * vertically regardless of its actual aspect ratio.
                           * object-contain inside max-h/max-w preserves proportions.
                           */}
                          <div className="flex h-[28rem] items-center justify-center bg-black/5 p-4 dark:bg-white/5">
                            <Image
                              src={imageItem.image}
                              alt={imageItem.title}
                              width={720}
                              height={1280}
                              className="max-h-full w-auto max-w-full object-contain"
                            />
                          </div>
                          {/* Caption below the screenshot */}
                          <div className="p-4">
                            <p className="text-sm leading-6 text-[var(--muted)]">{imageItem.title}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </details>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/*
       * Full-screen zoom overlay
       * ─────────────────────────
       * Rendered via a React portal-like conditional at the root of the fragment
       * so it sits above everything else (z-[100]).
       *
       * Clicking the dark backdrop (the outer div) closes the overlay.
       * Clicking the image itself does NOT close it — stopPropagation() on the
       * inner div prevents the click from bubbling up to the backdrop.
       *
       * The × button in the top-right corner is an additional explicit close target.
       * The Escape key handler (registered in useEffect above) also closes it.
       */}
      {zoomedImage ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setZoomedImage(null)}
        >
          {/* Close button — top-right corner */}
          <button
            type="button"
            onClick={() => setZoomedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close image viewer"
          >
            <IoMdClose size={28} />
          </button>

          {/* Image container — stopPropagation prevents backdrop click-through */}
          <div
            className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-[1.5rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              width={1800}
              height={1400}
              className="max-h-[90vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ProjectsSection
