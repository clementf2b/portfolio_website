/*
 * ImageCarousel.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A horizontal strip of screenshots with arrows, position dots, and a
 * full-screen viewer that can be paged with its own arrows.
 *
 * The strip is a plain overflow-x container with CSS scroll snapping, not a
 * transform-driven track. That buys trackpad scrolling, touch swiping,
 * keyboard scrolling and momentum from the browser; the arrows and dots only
 * need to call scrollTo. A scroll the user starts is read back out of
 * scrollLeft, so swiping keeps the dots in step.
 */
"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

export type CarouselImage = { image: string; title: string }

/* Round, translucent control used by both the strip and the viewer. */
const arrowClassName =
  'flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-strong)] text-[var(--foreground)] transition hover:bg-[var(--surface)] disabled:cursor-default disabled:opacity-30'

const ImageCarousel = ({ images }: { images: CarouselImage[] }) => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)

  /* null = viewer closed; a number = that slide is open full screen. */
  const [zoomed, setZoomed] = useState<number | null>(null)

  /*
   * Inside the viewer the screenshot is scaled to fit by default, which on a
   * 2400px-wide desktop capture leaves the UI text too small to read. Clicking
   * it switches to natural size; the container then scrolls, so the image can
   * be panned. Changing slide or closing goes back to fit.
   */
  const [actualSize, setActualSize] = useState(false)

  /*
   * The slides are exactly one track-width wide, so the visible index is
   * scrollLeft divided by that width. A swipe or a trackpad flick moves the
   * strip without going through goTo, and this is what keeps the dots honest
   * when that happens.
   */
  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    setIndex(Math.round(track.scrollLeft / track.clientWidth))
  }

  /*
   * Arrows and dots set the index themselves rather than waiting for the
   * scroll event they cause. Smooth scrolling can be suppressed — reduced
   * motion, an embedded viewer — and the dots should not go dead when it is.
   * Clamped, so the arrows disable at the ends instead of wrapping.
   */
  const goTo = (next: number) => {
    const clamped = Math.min(images.length - 1, Math.max(0, next))
    setIndex(clamped)
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' })
  }

  const stepZoom = useCallback(
    (delta: number) => {
      setActualSize(false)
      setZoomed((current) =>
        current === null
          ? current
          : Math.min(images.length - 1, Math.max(0, current + delta))
      )
    },
    [images.length]
  )

  const openViewer = (at: number) => {
    setActualSize(false)
    setZoomed(at)
  }

  const closeViewer = () => {
    setActualSize(false)
    setZoomed(null)
  }

  /*
   * Escape closes the viewer, the arrow keys page it. The listener stays
   * attached and checks `zoomed` instead of being added and removed, which
   * would re-run on every slide change.
   */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (zoomed === null) return
      if (event.key === 'Escape') closeViewer()
      if (event.key === 'ArrowRight') stepZoom(1)
      if (event.key === 'ArrowLeft') stepZoom(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [zoomed, stepZoom])

  return (
    <div>
      <div className="relative">
        {/*
         * snap-x snap-mandatory + snap-center on each slide: the strip always
         * settles on a whole screenshot. scrollbar-none is not a Tailwind
         * default, so the scrollbar is hidden with the two vendor rules.
         */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto rounded-card bg-[var(--surface-strong)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((item, itemIndex) => (
            <button
              key={item.image}
              type="button"
              onClick={() => openViewer(itemIndex)}
              className="w-full shrink-0 snap-center p-4"
              aria-label={`Enlarge: ${item.title}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={2400}
                height={1440}
                className="mx-auto max-h-[26rem] w-auto max-w-full rounded-lg object-contain"
              />
            </button>
          ))}
        </div>

        {/* Arrows sit over the strip, vertically centred. */}
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous screenshot"
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${arrowClassName}`}
        >
          <BsChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === images.length - 1}
          aria-label="Next screenshot"
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${arrowClassName}`}
        >
          <BsChevronRight size={16} />
        </button>
      </div>

      {/* Caption for the slide currently in view, then the position dots. */}
      <p className="mt-3 text-center text-sm leading-6 text-[var(--muted)]">
        {images[index]?.title}
      </p>

      <div className="mt-3 flex justify-center gap-2">
        {images.map((item, itemIndex) => (
          <button
            key={item.image}
            type="button"
            onClick={() => goTo(itemIndex)}
            aria-label={`Go to screenshot ${itemIndex + 1}`}
            aria-current={itemIndex === index}
            className={`h-2 w-2 rounded-full transition ${
              itemIndex === index
                ? 'bg-[var(--accent)]'
                : 'bg-[var(--card-border)] hover:bg-[var(--muted)]'
            }`}
          />
        ))}
      </div>

      {/*
       * Full-screen viewer. Clicking the backdrop closes it; clicks on the
       * image and the arrows are stopped from bubbling up to the backdrop so
       * paging does not also dismiss the viewer.
       */}
      {zoomed !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeViewer}
        >
          <button
            type="button"
            onClick={closeViewer}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close image viewer"
          >
            <IoMdClose size={28} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              stepZoom(-1)
            }}
            disabled={zoomed === 0}
            aria-label="Previous screenshot"
            className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:cursor-default disabled:opacity-30"
          >
            <BsChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              stepZoom(1)
            }}
            disabled={zoomed === images.length - 1}
            aria-label="Next screenshot"
            className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 disabled:cursor-default disabled:opacity-30"
          >
            <BsChevronRight size={22} />
          </button>

          {/*
           * The box is what scrolls once the image is bigger than it. Clicking
           * the image toggles between fitting and natural size rather than
           * closing, so the backdrop stays the only click that dismisses.
           */}
          <div
            className="relative max-h-[90vh] max-w-[92vw] overflow-auto rounded-card"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[zoomed].image}
              alt={images[zoomed].title}
              width={2400}
              height={1440}
              /*
               * next/image lazy-loads by default, which in a modal means the
               * viewer can open on an empty box until the observer catches up.
               * The image is on screen the moment it renders, so load it now.
               */
              loading="eager"
              onClick={() => setActualSize((current) => !current)}
              className={
                actualSize
                  ? 'max-w-none cursor-zoom-out'
                  : 'max-h-[86vh] w-auto max-w-full cursor-zoom-in object-contain'
              }
            />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 text-center text-sm text-white/80">
            {zoomed + 1} / {images.length} · {images[zoomed].title}
            <span className="ml-2 text-white/50">
              {actualSize ? 'Click to fit · scroll to pan' : 'Click to zoom'}
            </span>
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default ImageCarousel
