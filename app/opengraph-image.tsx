/*
 * opengraph-image.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The 1200×630 card a pasted link renders as. Drawn here with next/og rather
 * than kept as a PNG, so the wording can never drift from the site's own —
 * both read the same constants — and there is no image to re-export when a
 * line changes.
 *
 * The palette is the site's, written out as literals: this runs in the Edge
 * runtime with no stylesheet, so the CSS custom properties are not available.
 */
import { ImageResponse } from 'next/og'
import { siteDescription } from '../lib/site'

export const runtime = 'edge'
export const alt = 'Clement Ng — Senior Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#f6f4f1',
          padding: '76px 84px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#8f5518',
            fontWeight: 600,
          }}
        >
          Clement Ng
        </div>

        <div
          style={{
            marginTop: 26,
            display: 'flex',
            flexDirection: 'column',
            fontSize: 68,
            lineHeight: 1.08,
            letterSpacing: -2.4,
            fontWeight: 700,
            color: '#171514',
          }}
        >
          <span>9+ years of cross-platform</span>
          <span>engineering.</span>
          <span style={{ color: '#8f5518' }}>AI-assisted workflow.</span>
        </div>

        <div style={{ marginTop: 34, fontSize: 26, lineHeight: 1.5, color: '#6a645d' }}>
          {siteDescription}
        </div>
      </div>
    ),
    size
  )
}
