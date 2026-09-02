/*
 * ImageZoom.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The full-screen image viewer, shared by the project hero images and the
 * screenshot galleries.
 *
 * The frame scrolls. Fitting a 2,200px-wide product screenshot into 90vh
 * makes its UI text unreadable, which defeats the point of enlarging it, so
 * the image is drawn at its own size and the frame scrolls in both
 * directions when that overflows.
 *
 * It takes the whole set rather than one image, so the reader can walk the
 * gallery without closing and reopening: arrows either side, ← and →, and
 * the caption saying where they are. A set of one hides all of that.
 *
 * Dismissal: backdrop click, the × button, or Escape.
 */
"use client"

import React, { useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

export type ZoomTarget = { src: string; alt: string } | null

type Props = {
  images: { src: string; alt: string }[]
  /* null = closed. */
  index: number | null
  onClose: () => void
  onIndex: (next: number) => void
}

const ImageZoom = ({ images, index, onClose, onIndex }: Props) => {
  const open = index !== null && images.length > 0
  const many = images.length > 1

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

    const step = (delta: number) =>
      onIndex((index! + delta + images.length) % images.length)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (!many) return
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key === 'ArrowRight') step(1)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, many, index, images.length, onClose, onIndex])

  if (!open) return null

  const image = images[index!]
  const go = (delta: number) => onIndex((index! + delta + images.length) % images.length)

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close image viewer"
      >
        <IoMdClose size={28} />
      </button>

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

      {/* stopPropagation so a click on the image itself does not dismiss */}
      <div
        className="max-h-[82vh] max-w-[86vw] overflow-auto rounded-card"
        onClick={(event) => event.stopPropagation()}
      >
        {/*
         * A plain <img>, not next/image: the viewer wants the file at its
         * own intrinsic size, and next/image needs the dimensions declared
         * up front — one pair of numbers cannot fit a 2,200px desktop
         * capture and a 720px phone screen.
         */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} className="block max-w-none" />
      </div>

      <p
        className="max-w-[86vw] text-center text-sm text-white/70"
        onClick={(event) => event.stopPropagation()}
      >
        {many && <span className="mr-2 text-white/50">{index! + 1} / {images.length}</span>}
        {image.alt}
      </p>
    </div>
  )
}

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
    className={`absolute top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 ${
      side === 'left' ? 'left-4' : 'right-4'
    }`}
  >
    {side === 'left' ? <BsChevronLeft size={22} /> : <BsChevronRight size={22} />}
  </button>
)

export default ImageZoom
