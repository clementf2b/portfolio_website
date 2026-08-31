/*
 * Card.tsx — S4 component library
 * ─────────────────────────────────────────────────────────────────────────────
 * Built for the approved style direction: Apple structure × warm palette.
 * Regions are separated by surface colour — this component has no border and
 * no shadow, and must not grow either. Depth is one choice, not three.
 *
 * Every value comes from an S3 token. There are no one-off colours, radii or
 * spacings here; if something is missing, extend the token set rather than
 * hardcoding it locally.
 *
 * NOT WIRED INTO ANY PAGE YET. The 「視覺改版套用」 epic swaps the existing
 * inline markup over to this component; until then the site renders unchanged.
 */
import React from 'react'

type CardProps = {
  children: React.ReactNode
  /*
   * interactive — set when the whole card is a link or button. It adds the
   * hover and focus treatment; a plain content card stays inert so it does not
   * advertise an affordance it does not have.
   */
  interactive?: boolean
  /* raised — for a card sitting on top of a surface band rather than the page. */
  raised?: boolean
  as?: 'div' | 'article' | 'section'
  className?: string
}

export default function Card({
  children,
  interactive = false,
  raised = false,
  as: Tag = 'div',
  className = '',
}: CardProps) {
  const base = 'rounded-card p-6'
  const surface = raised ? 'bg-panel-raised' : 'bg-panel'
  const behaviour = interactive
    ? 'focus-ring cursor-pointer transition-colors duration-base ease-out hover:bg-panel-raised'
    : ''

  return (
    <Tag className={`${base} ${surface} ${behaviour} ${className}`.trim()}>
      {children}
    </Tag>
  )
}

/* Optional slots, so callers do not re-invent the internal type scale. */

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-title-sm text-ink">{children}</h3>
}

export function CardMeta({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-caption text-subtle">{children}</p>
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-body-sm text-subtle">{children}</p>
}
