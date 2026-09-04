/*
 * ImageZoom.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The full-screen image viewer, shared by the project hero images and the
 * screenshot galleries.
 *
 * It opens at fit — the whole screen inside the frame — and zooms from
 * there, because a 2,200px capture shown at its own size is mostly
 * scrolling. 25% a click, up to 150%; past the frame the image scrolls in
 * both directions.
 *
 * It takes the whole set rather than one image, so the reader can walk the
 * gallery without closing and reopening: arrows either side, ← and →, and
 * a caption bar over the foot of the image saying which screen this is.
 * A set of one hides all of that.
 *
 * Dismissal: backdrop click, the × button, or Escape.
 */
"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BsChevronLeft, BsChevronRight, BsZoomIn, BsZoomOut } from 'react-icons/bs'

export type ZoomTarget = { src: string; alt: string } | null

/*
 * Multiples of the fitted size: 100% is the whole screen in the frame,
 * and a click moves 25% either way.
 *
 * The ceiling is 150%. Past that the frame shows so little of the screen
 * that finding your place costs more than the detail is worth — and the
 * captures are not high-resolution enough to reward it.
 */
const STEP = 0.25
const MIN = 0.25
const MAX = 1.5

type Props = {
  /* caption: the screen's own description, shown under its title. */
  images: { src: string; alt: string; caption?: string }[]
  /* null = closed. */
  index: number | null
  onClose: () => void
  onIndex: (next: number) => void
}

const ImageZoom = ({ images, index, onClose, onIndex }: Props) => {
  const open = index !== null && images.length > 0
  const many = images.length > 1

  /* Fitted width in px, measured on load; null until the image arrives. */
  const [fitWidth, setFitWidth] = useState<number | null>(null)
  const [zoom, setZoom] = useState(1)
  /* The field's text, kept apart from `zoom` so a half-typed "1" is not 1%. */
  const [draft, setDraft] = useState('100')
  const frame = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  const setZoomTo = useCallback((next: number) => {
    const clamped = Math.min(Math.max(next, MIN), MAX)
    setZoom(clamped)
    /*
     * Written here as well as by the effect below: committing an empty or
     * out-of-range field lands on the zoom it already had, so the effect
     * never fires and the field would keep showing what was rejected.
     */
    setDraft(String(Math.round(clamped * 100)))
  }, [])

  /*
   * Functional, so two clicks landing in one frame step twice — reading
   * `zoom` from the closure made the second click recompute from the value
   * the first one replaced.
   */
  const stepZoom = useCallback((direction: 1 | -1) => {
    setZoom((prev) => Math.min(Math.max(nextStep(prev, direction), MIN), MAX))
  }, [])

  /* The field follows the zoom; typing into it is the only other writer. */
  useEffect(() => setDraft(String(Math.round(zoom * 100))), [zoom])

  /* A new screen starts fitted again. */
  useEffect(() => {
    setFitWidth(null)
    setZoom(1)
  }, [index])

  /*
   * Fit is computed from the natural size rather than left to CSS, because
   * the zoom steps multiply it — object-contain would give the browser the
   * fitted size but not this component.
   *
   * Never above 1: a 720px phone screenshot blown up to fill the frame is
   * just blur, so small images open at their own size.
   */
  const measure = useCallback((img: HTMLImageElement) => {
    const box = frame.current
    if (!box || !img.naturalWidth) return
    const scale = Math.min(
      box.clientWidth / img.naturalWidth,
      box.clientHeight / img.naturalHeight,
      1
    )
    setFitWidth(img.naturalWidth * scale)
  }, [])

  /*
   * Guarded on `open`, not just mounted: a page carries one of these per
   * gallery plus one for the project heroes, and an unguarded effect left
   * five window listeners attached with nothing open.
   *
   * The body lock is here too — the frame scrolls, so without it a wheel
   * that reaches the image's end carries on scrolling the page behind.
   */
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()

      /*
       * Tab is trapped. The page behind is still in the document and
       * still tabbable, so without this the third Tab took the reader out
       * of a dialog they could see but were no longer inside.
       *
       * Queried on each press rather than cached: the zoom buttons
       * disable at the ends of the range, and the arrows are absent on a
       * set of one.
       */
      if (event.key === 'Tab' && panel.current) {
        const stops = Array.from(
          panel.current.querySelectorAll<HTMLElement>('button:not([disabled]), input')
        )
        if (stops.length === 0) return
        const first = stops[0]
        const last = stops[stops.length - 1]
        const active = document.activeElement as HTMLElement | null

        if (!active || !panel.current.contains(active)) {
          event.preventDefault()
          first.focus()
        } else if (event.shiftKey && active === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        }
        return
      }

      /* While the percentage field has focus its keys belong to it. */
      if (event.target instanceof HTMLInputElement) return
      if (event.key === '+' || event.key === '=') stepZoom(1)
      if (event.key === '-') stepZoom(-1)
      if (!many) return
      if (event.key === 'ArrowLeft') onIndex((index! - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight') onIndex((index! + 1) % images.length)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, many, index, images.length, onClose, onIndex, stepZoom])

  /*
   * Focus moves into the dialog on open and back to whatever opened it on
   * close — otherwise closing dropped the caret at the top of the document
   * and the reader had to tab back down to where they were.
   */
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    panel.current?.querySelector<HTMLElement>('button')?.focus()
    return () => opener?.focus?.()
  }, [open])

  if (!open) return null

  const image = images[index!]
  const go = (delta: number) => onIndex((index! + delta + images.length) % images.length)

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-overlay flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/*
       * The zoom group sits in the middle of the top edge and the close
       * button in the corner: one is a control you reach for repeatedly
       * while reading, the other is the way out. Putting them in one
       * cluster made × the fourth zoom button.
       */}
      <div
        className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center gap-2"
        onClick={(event) => event.stopPropagation()}
      >
        <Round
          onClick={() => stepZoom(-1)}
          disabled={zoom <= MIN}
          label="Zoom out"
        >
          <BsZoomOut size={18} />
        </Round>

        {/*
         * Typed, not just stepped: reading a screenshot at some particular
         * size is a thing people want to ask for directly. The field holds
         * text until it is committed, so a half-typed "1" does not render
         * the image at 1%.
         */}
        <span className="flex items-center rounded-full bg-white/10 pr-2.5 text-caption font-semibold text-white">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value.replace(/[^\d]/g, ''))}
            onBlur={() => commit(draft, zoom, setZoomTo)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return
              /* Commit here rather than leaning on blur() to do it. */
              commit(draft, zoom, setZoomTo)
              event.currentTarget.blur()
            }}
            inputMode="numeric"
            aria-label="Zoom percentage"
            className="focus-ring w-12 rounded-full bg-transparent py-2 pl-3 text-right tabular-nums outline-none"
          />
          %
        </span>

        <Round onClick={() => stepZoom(1)} disabled={zoom >= MAX} label="Zoom in">
          <BsZoomIn size={18} />
        </Round>
      </div>

      <div className="absolute right-4 top-4 z-10" onClick={(event) => event.stopPropagation()}>
        <Round onClick={onClose} label="Close image viewer">
          <IoMdClose size={22} />
        </Round>
      </div>

      {/*
       * The arrows sit against the viewport edges rather than the image, so
       * they stay put as the frame changes size from one screen to the next.
       */}
      {many && (
        <>
          <Arrow side="left" onClick={() => go(-1)} label="Previous screen" />
          <Arrow side="right" onClick={() => go(1)} label="Next screen" />
        </>
      )}

      {/*
       * Fixed frame, so the measurement above has something stable to fit
       * into; m-auto rather than justify-center, which clips the top and
       * left of an overflowing child.
       *
       * No click handler on the frame — only on the image below. The frame
       * is a fixed 86vw × 80vh while the image inside it is usually
       * smaller, and swallowing clicks here made a wide band of apparently
       * empty backdrop refuse to close the viewer.
       */}
      <div ref={frame} className="flex h-[80vh] w-[86vw] overflow-auto rounded-card">
        {/*
         * A plain <img>, not next/image: the width is decided here, at run
         * time, from the file's own dimensions — next/image needs one pair
         * of numbers declared up front, and one pair cannot fit a 2,200px
         * desktop capture and a 720px phone screen.
         */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          onLoad={(event) => measure(event.currentTarget)}
          /*
           * Click the picture to zoom in, right-click to zoom out — the
           * same two steps as the buttons, without leaving the image.
           *
           * stopPropagation as well: the picture is the one thing a click
           * must not dismiss.
           *
           * The cost is the browser's own context menu on this element,
           * so "Save image as…" is gone from the viewer. The thumbnails
           * behind it still have it.
           */
          onClick={(event) => {
            event.stopPropagation()
            stepZoom(1)
          }}
          onContextMenu={(event) => {
            event.preventDefault()
            event.stopPropagation()
            stepZoom(-1)
          }}
          style={fitWidth ? { width: fitWidth * zoom } : undefined}
          className={`m-auto block h-auto max-w-none ${
            zoom < MAX ? 'cursor-zoom-in' : 'cursor-zoom-out'
          }`}
        />
      </div>

      {/*
       * The caption rides over the foot of the image rather than sitting
       * under it: it belongs to the screen being read, and at 150% the
       * image fills the frame, so a line below it would be off-screen.
       * Translucent, so what it covers is still visible through it — and
       * outside the frame, so zooming never touches the words.
       */}
      <div
        className="absolute inset-x-0 bottom-0 flex justify-center p-5"
        onClick={(event) => event.stopPropagation()}
      >
        {/* 86vw: the frame's own width, so the bar reads as the picture's foot. */}
        <div className="w-[86vw] rounded-card bg-black/50 px-5 py-3 text-center backdrop-blur-md">
          <p className="text-body-sm font-semibold text-white">
            {many && (
              <span className="mr-2.5 font-normal tabular-nums text-white/50">
                {index! + 1} / {images.length}
              </span>
            )}
            {image.alt}
          </p>
          {/*
           * No measure cap on the description, unlike the section's prose:
           * the bar is one or two sentences and already bounded by the
           * frame, and an 80ch limit wrapped it a second time inside a bar
           * wide enough to hold it.
           */}
          {image.caption && (
            <p className="mt-1 text-body-sm leading-6 text-white/70">
              {image.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/*
 * The next 25% mark past where the zoom sits — rounded onto the grid, so
 * a typed 137% steps to 150 rather than 162.
 */
const nextStep = (zoom: number, direction: 1 | -1) =>
  (direction === 1 ? Math.floor(zoom / STEP + 0.001) + 1 : Math.ceil(zoom / STEP - 0.001) - 1) *
  STEP

/* Empty or nonsense in the field leaves the zoom where it was. */
const commit = (draft: string, zoom: number, apply: (next: number) => void) => {
  const percent = Number(draft)
  apply(Number.isFinite(percent) && percent > 0 ? percent / 100 : zoom)
}

const Round = ({
  onClick,
  label,
  disabled,
  children,
}: {
  onClick: () => void
  label: string
  disabled?: boolean
  children: React.ReactNode
}) => (
  <button
    type="button"
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className="focus-ring rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10"
  >
    {children}
  </button>
)

const Arrow = ({
  side,
  onClick,
  label,
}: {
  side: 'left' | 'right'
  onClick: () => void
  label: string
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={(event) => {
      /* Without this the click reaches the backdrop and closes the viewer. */
      event.stopPropagation()
      onClick()
    }}
    className={`focus-ring absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 ${
      side === 'left' ? 'left-4' : 'right-4'
    }`}
  >
    {side === 'left' ? <BsChevronLeft size={22} /> : <BsChevronRight size={22} />}
  </button>
)

export default ImageZoom
