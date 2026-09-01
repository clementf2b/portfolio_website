/*
 * ProjectsSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the #projects section: a vertical list of project cards, each with:
 *   - An always-visible header: hero image (opens the full-screen zoom
 *     viewer), icon, title, year badge, subtitle, copy, repository link
 *   - A collapsible "Interface snapshots" gallery of thumbnail screens,
 *     closed by default
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
           * Project cards — the same gap the Workflow cards use.
           * Each card is wrapped in <SlideUp> which applies a CSS animation
           * (fade + translate-y) as the card enters the viewport.
           */}
          <div className="space-y-4">
            {projects.map((project) => (
              <SlideUp key={project.name} offset="-150px 0px -100px 0px">
                {/*
                 * Card shell — surface colour, no border. The rest of the app
                 * (ProcessSection, About) separates regions the same way, per
                 * the S3 direction: "surface colour, never shadows or borders".
                 */}
                <article className="overflow-hidden rounded-card bg-[var(--surface)]">

                  {/*
                   * Always-visible header. Two columns on large screens:
                   *   Left  (1.1fr) — hero image
                   *   Right (0.9fr) — icon, name, year, context, copy, link
                   * Everything a visitor needs to judge the project without
                   * expanding anything; only the screen gallery hides.
                   */}
                  <div className="grid gap-0 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">

                    {/* ── Hero image ──────────────────────────────────────── */}
                    {/*
                     * A <button> wrapper makes the whole image clickable and
                     * keyboard-reachable for the zoom overlay.
                     */}
                    <button
                      type="button"
                      onClick={() =>
                        setZoomedImage({
                          src: project.image,
                          alt: `${project.name} project preview`,
                        })
                      }
                      className="group block w-full self-start overflow-hidden rounded-card bg-[var(--surface-strong)]"
                    >
                      <Image
                        src={project.image}
                        alt={`${project.name} project preview`}
                        width={1200}
                        height={900}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    </button>

                    {/* ── Text column ─────────────────────────────────────── */}
                    <div className="flex flex-col justify-center gap-3 p-3 sm:p-4 lg:p-2">
                      <div className="flex items-start gap-3">
                        <Image
                          src={project.listIcon}
                          alt={`${project.name} icon`}
                          width={40}
                          height={40}
                          className="mt-0.5 h-10 w-10 shrink-0 rounded-xl"
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-2xl font-semibold leading-none tracking-[-0.02em] text-[var(--foreground)]">
                              {project.name}
                            </h3>
                            {/* Year badge — soft accent, reads as a label not an action */}
                            <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold tracking-[0.14em] text-[var(--accent)]">
                              {project.yearTag}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                            {project.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm font-medium leading-6 text-[var(--foreground)]">
                        {project.description}
                      </p>
                      <p className="text-sm leading-7 text-[var(--muted)]">
                        {project.detail}
                      </p>

                      <div className="mt-1 flex flex-wrap gap-3">
                        {project.link ? (
                          /*
                           * target="_blank" + rel="noopener noreferrer": the new
                           * tab cannot reach window.opener and sends no Referer.
                           */
                          <Link href={project.link} target="_blank" rel="noopener noreferrer" className="secondary-button gap-2">
                            {project.linkLabel ?? 'View repository'}
                            <BsArrowUpRight size={14} />
                          </Link>
                        ) : (
                          /* Not a real button — cursor-default signals it isn't clickable */
                          <span className="secondary-button cursor-default">Private academic project</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/*
                   * ── Interface snapshots (the disclosure) ─────────────────
                   * A native <details>, so open/close, keyboard support and
                   * find-in-page expansion all come from the browser. Every
                   * gallery starts closed: the header alone already says what
                   * the project is, and three open galleries pushed the rest
                   * of the page off the screen.
                   *
                   * The disclosure holds only the gallery — no interactive
                   * element sits inside <summary>, which would otherwise
                   * toggle the card on every click.
                   */}
                  <details className="group bg-[var(--surface-strong)]">
                    {/* list-none + the webkit rule drop the default triangle */}
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[var(--surface)] sm:px-6 [&::-webkit-details-marker]:hidden">
                      <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]">
                        Interface snapshots
                      </h4>
                      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        {project.extraImageList.length} screens
                        {/* Chevron flips when the card is open (group-open) */}
                        <BsChevronDown
                          size={14}
                          className="transition-transform duration-300 group-open:rotate-180"
                        />
                      </span>
                    </summary>

                    {/*
                     * Thumbnail grid:
                     *   mobile – 1 column · sm+ – 2 · xl+ – 3
                     * max-w-[22rem] keeps portrait screenshots from going wide.
                     */}
                    <div
                      className={`grid justify-center gap-6 px-5 pb-6 sm:grid-cols-2 sm:px-6 ${
                        project.wideScreens ? '' : 'xl:grid-cols-3'
                      }`}
                    >
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
                          className={`mx-auto w-full overflow-hidden rounded-card bg-[var(--background)] text-left transition duration-300 hover:-translate-y-1 ${
                            project.wideScreens ? '' : 'max-w-[22rem]'
                          }`}
                        >
                          {/*
                           * Fixed-height container (28rem) centres the screenshot
                           * vertically whatever its aspect ratio.
                           */}
                          <div
                            className={`flex items-center justify-center p-4 ${
                              project.wideScreens ? 'h-[16rem]' : 'h-[28rem]'
                            }`}
                          >
                            <Image
                              src={imageItem.image}
                              alt={imageItem.title}
                              width={720}
                              height={1280}
                              className="max-h-full w-auto max-w-full object-contain"
                            />
                          </div>
                          <div className="p-4 pt-0">
                            <p className="text-sm leading-6 text-[var(--muted)]">{imageItem.title}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </details>
                </article>
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
            className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-card"
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
