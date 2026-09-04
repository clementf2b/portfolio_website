/*
 * ScreenPicker.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A gallery of app screenshots: one shown large, the rest pickable beside it.
 *
 * It replaced a grid that rendered every screenshot at full size. Three of
 * those galleries ran the page past 25,000px, and the fix at the time was to
 * collapse them behind a disclosure — which hid the work instead of showing
 * it. This shows all of it in roughly one screen's height, so nothing needs
 * hiding.
 *
 * On phones the picker is dropped entirely: a thumbnail small enough to fit
 * beside the main image is too small to choose from, so every screen is
 * stacked at full width and the reader scrolls.
 */
"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import ImageZoom from './ImageZoom'

export type Screen = { image: string; title: string; description?: string }

type Props = {
  screens: Screen[]
  /*
   * grid – portrait phone screens: a 2-up picker beside the main image,
   *        because one portrait screenshot cannot fill a desktop row.
   * rail – landscape desktop screens: a narrow strip of thumbnails, since
   *        the main image is already wide enough to carry the row.
   */
  layout?: 'grid' | 'rail'
}

const ScreenPicker = ({ screens, layout = 'grid' }: Props) => {
  const [current, setCurrent] = useState(0)
  /*
   * The viewer lives here so every gallery gets it, not only the projects,
   * and it drives `current` rather than keeping its own index — walking the
   * set with the arrows leaves the picker on whatever you stopped at.
   */
  const [zoomOpen, setZoomOpen] = useState(false)
  const active = screens[current]

  if (screens.length === 0) return null

  return (
    <div className="pb-6 sm:pb-8">
      {/* ── Phones: every screen, stacked ───────────────────────────────── */}
      <div className="grid gap-6 sm:hidden">
        {screens.map((screen) => (
          <figure key={screen.image}>
            <Image
              src={screen.image}
              alt={screen.title}
              width={720}
              height={1280}
              /* Only rendered below sm, where it spans the column. */
              sizes="100vw"
              className="w-full rounded-card bg-[var(--surface-strong)] object-contain"
            />
            <figcaption className="mt-2.5 text-body-sm leading-6 text-[var(--muted)]">
              <span className="font-semibold text-[var(--foreground)]">{screen.title}</span>
              {screen.description && <span className="mt-1 block">{screen.description}</span>}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* ── sm and up: one large, the rest pickable ─────────────────────── */}
      <div
        className={`hidden gap-7 sm:flex ${
          layout === 'rail' ? 'flex-row-reverse items-start' : 'items-start'
        }`}
      >
        <div className={layout === 'rail' ? 'min-w-0 flex-1' : 'w-[18rem] shrink-0'}>
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="focus-ring block w-full overflow-hidden rounded-card bg-[var(--surface-strong)] p-4"
          >
            {/*
             * rail: a height cap. The landscape screens are not all the same
             * aspect — the AI Assistant shot is much squarer than the rest —
             * so a width-driven height made one screen tower over the others
             * and shifted the caption down with it. Capped, they all occupy
             * the same block.
             */}
            <Image
              src={active.image}
              alt={active.title}
              width={1440}
              height={1280}
              /* rail takes most of the row; grid is a fixed 18rem column. */
              sizes={layout === 'rail' ? '(min-width: 640px) 62vw, 100vw' : '288px'}
              className={`h-auto w-full object-contain ${
                layout === 'rail' ? 'max-h-[32rem]' : ''
              }`}
            />
          </button>
          <p className="mt-3 text-caption font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Screen {current + 1} of {screens.length}
          </p>
          <p className="mt-1.5 font-display text-body-lg font-semibold tracking-[-0.02em] text-[var(--foreground)]">
            {active.title}
          </p>
          {active.description && (
            <p className="mt-2 max-w-[68ch] text-body-sm leading-6 text-[var(--muted)]">
              {active.description}
            </p>
          )}
        </div>

        {/*
         * object-contain, not cover: cropping portrait screens to a landscape
         * thumbnail leaves only the status bar and header, which every screen
         * shares — they all looked identical.
         */}
        <div
          className={
            layout === 'rail'
              ? 'flex w-[7.5rem] shrink-0 flex-col gap-3'
              : 'grid max-w-[34rem] flex-1 grid-cols-2 gap-4'
          }
        >
          {screens.map((screen, index) => (
            <button
              key={screen.image}
              type="button"
              onClick={() => setCurrent(index)}
              aria-current={index === current}
              aria-label={`Show ${screen.title}`}
              className={`focus-ring overflow-hidden rounded-card bg-[var(--surface-strong)] text-left outline outline-2 outline-offset-2 transition-[outline-color,opacity] duration-[var(--dur-base)] ${
                index === current
                  ? 'outline-[var(--accent)]'
                  : 'opacity-70 outline-transparent hover:opacity-100'
              }`}
            >
              <span
                className={`flex items-center justify-center bg-[var(--surface-strong)] ${
                  layout === 'rail' ? 'h-[3.25rem]' : 'h-[13.5rem]'
                }`}
              >
                <Image
                  src={screen.image}
                  alt=""
                  width={720}
                  height={1280}
                  className="max-h-full w-auto object-contain"
                />
              </span>
              {layout === 'grid' && (
                <span className="block px-3 pb-3 pt-2.5 text-caption leading-5 text-[var(--muted)]">
                  {screen.title}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <ImageZoom
        images={screens.map((screen) => ({
          src: screen.image,
          alt: screen.title,
          caption: screen.description,
        }))}
        index={zoomOpen ? current : null}
        onClose={() => setZoomOpen(false)}
        onIndex={setCurrent}
      />
    </div>
  )
}

export default ScreenPicker
