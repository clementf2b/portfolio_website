/*
 * Modal.tsx — S4 component library
 * ─────────────────────────────────────────────────────────────────────────────
 * Visual shell only. Every value comes from an S3 token; no border, no shadow —
 * the panel separates from the scrim by surface colour alone.
 *
 * SCOPE BOUNDARY — read before adding anything here.
 * This component deliberately does NOT implement:
 *   - role="dialog" / aria-modal
 *   - focus trap
 *   - focus restoration on close
 *   - Escape-to-close
 * Those belong to the 「可及性與互動品質」 epic (card: 圖片檢視層 a11y). Adding
 * them here would have two epics editing the same behaviour. Until that card
 * lands, this is a presentational shell and should not be shipped as the only
 * modal implementation.
 *
 * NOT WIRED INTO ANY PAGE YET.
 */
import React from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  /* Rendered as the panel heading; also what the close button refers to. */
  label: string
}

export default function Modal({ open, onClose, children, label }: ModalProps) {
  if (!open) return null

  return (
    /*
     * The scrim is its own token (--color-scrim) rather than a black/opacity
     * literal, so it keeps the warm cast in both themes.
     */
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-scrim p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-card bg-canvas p-8"
        /* Clicks inside the panel must not reach the scrim's close handler. */
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <h2 className="font-display text-title text-ink">{label}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${label}`}
            className="focus-ring shrink-0 rounded-pill px-4 py-2 text-body-sm font-semibold text-subtle transition-colors duration-base ease-out hover:bg-panel hover:text-ink"
          >
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
