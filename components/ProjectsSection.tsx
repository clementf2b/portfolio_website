/*
 * ProjectsSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the #projects section: a vertical list of project cards, each with:
 *   - An always-visible header: hero image (opens the full-screen zoom
 *     viewer), icon, title, year badge, subtitle, copy, repository link
 *   - A <ScreenPicker> gallery of that project's screens
 *
 * "use client" is required because the component holds the zoom target in
 * state and handles clicks — browser-only APIs.
 */
"use client"

import React, { useState } from 'react'
import { sectionHeadingClassName } from '../lib/classNames'
import { projects } from '../lib/content'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowUpRight } from 'react-icons/bs'
import ImageZoom, { type ZoomTarget } from './ImageZoom'
import ScreenPicker from './ScreenPicker'
import SlideUp from './SlideUp'


const ProjectsSection = () => {
  /*
   * zoomedImage — tracks which image is currently open in the full-screen overlay.
   * null  → overlay is hidden
   * { src, alt } → overlay is visible, showing that image
   */
  const [zoomedImage, setZoomedImage] = useState<ZoomTarget>(null)

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
                <article className="overflow-hidden rounded-card bg-[var(--surface-strong)]">

                  {/*
                   * Always-visible header. Two columns on large screens:
                   *   Left  (1.1fr) — hero image
                   *   Right (0.9fr) — icon, name, year, context, copy, link
                   * Everything a visitor needs to judge the project without
                   * expanding anything; only the screen gallery hides.
                   */}
                  <div className="grid gap-0 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">

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
                      className="group block w-full self-start overflow-hidden rounded-card bg-[var(--surface)]"
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

                  {/*
                   * ── Interface snapshots ──────────────────────────────────
                   * No disclosure any more. The gallery was collapsed because
                   * it rendered every screenshot at full size and ran the page
                   * past 25,000px; the picker holds all of them in about one
                   * screen's height, so there is nothing left to hide behind a
                   * "3 screens" bar.
                   */}
                  {/*
                   * The gallery takes the dimmer surface while the header
                   * keeps the raised one, so the card reads light at the top
                   * and settles into the screenshots. No rule as well as the
                   * colour: either divides the two regions, and both together
                   * state it twice.
                   */}
                  <div className="bg-[var(--surface)] px-6 pt-6 sm:px-8 sm:pt-8">
                    <ScreenPicker screens={project.extraImageList} />
                  </div>
                </article>
              </SlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Hero images only — each gallery carries its own viewer. */}
      <ImageZoom image={zoomedImage} onClose={() => setZoomedImage(null)} />
    </>
  )
}

export default ProjectsSection
