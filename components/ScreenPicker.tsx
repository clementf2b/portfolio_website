/*
 * ScreenPicker.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A gallery of app screenshots: one shown large, the rest pickable beside it.
 *
 * It replaced a grid that rendered every screenshot at full size. Three of
 * those galleries ran the page past 25,000px, and the fix at the time was to
 * collapse them behind a disclosure — which hid the work instead of showing
 * it. From sm up this shows all of it in roughly one screen's height, so
 * nothing is hidden there.
 *
 * On phones the picker is dropped entirely: a thumbnail small enough to fit
 * beside the main image is too small to choose from, so every screen is
 * stacked at full width. Stacked, the galleries were four in ten pixels of
 * the page, so they start collapsed behind a bar that previews the screens.
 */
"use client"

import React, { useId, useRef, useState } from 'react'
import Image from 'next/image'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import ImageZoom from './ImageZoom'

/* width/height are the file's real pixel size: the browser reserves that box before the image arrives. */
export type Screen = { image: string; width: number; height: number; title: string; description?: string }

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
  const [expanded, setExpanded] = useState(false)
  const listId = useId()
  const barRef = useRef<HTMLButtonElement>(null)
  const active = screens[current]

  if (screens.length === 0) return null

  return (
    <div className="pb-6 sm:pb-8">
      {/* ── Phones: a bar that expands to every screen, stacked ─────────── */}
      <button
        ref={barRef}
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls={listId}
        className="flex w-full items-center rounded-card bg-(--color-surface-raised) py-3 pl-3 pr-4 text-left sm:hidden"
      >
        {/* A preview, not a picker: decorative, the list below carries the titles. */}
        <span className="flex shrink-0" aria-hidden>
          {screens.slice(0, 4).map((screen, index) => (
            <Image
              key={screen.image}
              src={screen.image}
              alt=""
              width={screen.width}
              height={screen.height}
              sizes="32px"
              /* Fixed box, cropped: Navicat's landscape shots at natural width pushed the label off a phone. */
              className={`h-11 w-8 rounded-md bg-(--color-surface) object-cover object-top ring-2 ring-(--color-surface-raised) ${index ? '-ml-3' : ''}`}
            />
          ))}
        </span>
        <span className="ml-4 text-body-sm font-semibold text-(--color-ink)">
          {expanded ? 'Hide screenshots' : `View ${screens.length} screenshots`}
        </span>
        {/* Up while collapsed, down once open: the direction picked in review. */}
        {expanded ? (
          <BsChevronDown className="ml-auto shrink-0" size={16} aria-hidden />
        ) : (
          <BsChevronUp className="ml-auto shrink-0" size={16} aria-hidden />
        )}
      </button>

      <div id={listId} hidden={!expanded} className="mt-6 grid gap-6 sm:hidden">
        {screens.map((screen) => (
          <figure key={screen.image}>
            <Image
              src={screen.image}
              alt={screen.title}
              width={screen.width}
              height={screen.height}
              /* Only rendered below sm, where it spans the column. */
              sizes="100vw"
              className="w-full rounded-card bg-(--color-surface-raised) object-contain"
            />
            <figcaption className="mt-2.5 text-body-sm leading-6 text-(--color-muted)">
              <span className="font-semibold text-(--color-ink)">{screen.title}</span>
              {screen.description && <span className="mt-1 block">{screen.description}</span>}
            </figcaption>
          </figure>
        ))}
        {/*
         * A second way out at the bottom, so closing a long gallery doesn't
         * mean scrolling back up to the bar. Closing from here would leave the
         * reader far below the collapsed bar, so it scrolls the bar back in.
         */}
        <button
          type="button"
          onClick={() => {
            setExpanded(false)
            barRef.current?.scrollIntoView({ block: 'center' })
          }}
          aria-controls={listId}
          className="secondary-button w-full gap-2 bg-(--color-surface-raised)"
        >
          Hide screenshots
          <BsChevronUp size={14} aria-hidden />
        </button>
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
            className="block w-full overflow-hidden rounded-card bg-(--color-surface-raised) p-4"
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
              width={active.width}
              height={active.height}
              /* rail takes most of the row; grid is a fixed 18rem column. */
              sizes={layout === 'rail' ? '(min-width: 640px) 62vw, 100vw' : '288px'}
              className={`h-auto w-full object-contain ${
                layout === 'rail' ? 'max-h-128' : ''
              }`}
            />
          </button>
          <p className="mt-3 text-caption font-semibold uppercase tracking-[0.16em] text-(--color-muted)">
            Screen {current + 1} of {screens.length}
          </p>
          <p className="mt-1.5 font-display text-body-lg font-semibold tracking-[-0.02em] text-(--color-ink)">
            {active.title}
          </p>
          {active.description && (
            <p className="mt-2 max-w-[68ch] text-body-sm leading-6 text-(--color-muted)">
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
              ? 'flex w-30 shrink-0 flex-col gap-3'
              : 'grid max-w-136 flex-1 grid-cols-2 gap-4'
          }
        >
          {screens.map((screen, index) => (
            <button
              key={screen.image}
              type="button"
              onClick={() => setCurrent(index)}
              aria-current={index === current}
              aria-label={`Show ${screen.title}`}
              className={`group overflow-hidden rounded-card bg-(--color-surface-raised) text-left outline outline-2 outline-offset-2 transition-[outline-color] duration-(--dur-base) focus-visible:outline-(--color-focus) ${
                index === current ? 'outline-(--color-accent)' : 'outline-transparent'
              }`}
            >
              {/*
               * Only the picture dims on the unselected thumbnails. Dimming the
               * whole button took the caption under it to 3.05:1.
               */}
              <span
                className={`flex items-center justify-center bg-(--color-surface-raised) transition-opacity duration-(--dur-base) ${
                  layout === 'rail' ? 'h-13' : 'h-54'
                } ${index === current ? '' : 'opacity-70 group-hover:opacity-100'}`}
              >
                <Image
                  src={screen.image}
                  alt=""
                  width={screen.width}
                  height={screen.height}
                  /* Rendered width at h-13 / h-54 for a 9:16 screen; without it the thumbnail fetched the 750px file. */
                  sizes={layout === 'rail' ? '30px' : '122px'}
                  className="max-h-full w-auto object-contain"
                />
              </span>
              {layout === 'grid' && (
                <span className="block px-3 pb-3 pt-2.5 text-caption leading-5 text-(--color-muted)">
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
