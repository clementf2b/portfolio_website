/*
 * ImageZoom.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The full-screen image viewer, shared by the project hero images and the
 * screenshot galleries.
 *
 * The frame scrolls. Fitting a 3,800px-wide product screenshot into 90vh
 * makes its UI text unreadable, which defeats the point of enlarging it, so
 * the image is drawn up to 1600px wide and the frame scrolls in both
 * directions when that overflows.
 *
 * Dismissal: backdrop click, the × button, or Escape.
 */
"use client"

import React, { useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'

export type ZoomTarget = { src: string; alt: string } | null

const ImageZoom = ({ image, onClose }: { image: ZoomTarget; onClose: () => void }) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!image) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
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

      {/* stopPropagation so a click on the image itself does not dismiss */}
      <div
        className="max-h-[90vh] max-w-[95vw] overflow-auto rounded-card"
        onClick={(event) => event.stopPropagation()}
      >
        {/*
         * A plain <img>, not next/image: the viewer wants the file at its
         * own intrinsic size, and next/image needs the dimensions declared
         * up front — one pair of numbers cannot fit a 3,800px desktop
         * capture and a 720px phone screen. It costs the original file
         * rather than a resized one, which is the point of the viewer.
         */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} className="block max-w-none" />
      </div>
    </div>
  )
}

export default ImageZoom
