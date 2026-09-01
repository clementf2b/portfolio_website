"use client" // this is a client component

import React, { useEffect, useLayoutEffect, useRef, ReactNode } from "react"

interface Props {
  offset?: string
  children?: ReactNode
}

/*
 * The markup no longer ships `opacity-0`: hiding is done here, by the same
 * code that can undo it. Without JS — or in a headless screenshot, where the
 * IntersectionObserver never fires — the content simply stays visible instead
 * of being permanently invisible.
 *
 * useLayoutEffect so the class lands before the browser paints (no flash of
 * un-hidden content); useEffect on the server, where useLayoutEffect warns.
 */
const useHideBeforePaint =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export default function SlideUp({ children, offset = "0px" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  useHideBeforePaint(() => {
    ref.current?.classList.add("opacity-0")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0")
            entry.target.classList.add("animate-slideUpCubiBezier")
          }
        })
      },
      { rootMargin: offset }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [offset])

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  )
}
