import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        /*
         * S3 display stack. --font-display is wired to Inter Tight when the
         * 「視覺改版套用」 epic loads it via next/font; until then this falls
         * back to the system stack. PingFang TC is Apple's own Chinese face,
         * so it sits naturally next to Inter Tight.
         */
        display: ['var(--font-display)', 'PingFang TC', 'Microsoft JhengHei', 'system-ui', 'sans-serif'],
      },
      /*
       * S3 semantic type scale. Sizes come from the design-craft scale
       * (11/12/14/16/18/20/24/30/36/48/64); tracking tightens as size grows,
       * which is the single most recognisable part of the chosen direction.
       * Chinese text takes letter-spacing 0 — the tight tracking applies to
       * Latin display text only.
       */
      fontSize: {
        label:        ['11px', { lineHeight: '16px', letterSpacing: '0.06em' }],
        caption:      ['12px', { lineHeight: '18px', letterSpacing: '0' }],
        'body-sm':    ['14px', { lineHeight: '22px', letterSpacing: '0' }],
        body:         ['16px', { lineHeight: '26px', letterSpacing: '0' }],
        'body-lg':    ['18px', { lineHeight: '30px', letterSpacing: '-0.01em' }],
        'title-sm':   ['20px', { lineHeight: '26px', letterSpacing: '-0.02em' }],
        title:        ['24px', { lineHeight: '30px', letterSpacing: '-0.024em' }],
        'title-lg':   ['30px', { lineHeight: '36px', letterSpacing: '-0.028em' }],
        'display-sm': ['36px', { lineHeight: '40px', letterSpacing: '-0.03em' }],
        display:      ['48px', { lineHeight: '52px', letterSpacing: '-0.033em' }],
        'display-lg': ['64px', { lineHeight: '66px', letterSpacing: '-0.035em' }],
      },
      /* S3 colours. Values live in globals.css so light/dark swap in one place. */
      colors: {
        warm: {
          0: 'var(--warm-0)', 50: 'var(--warm-50)', 100: 'var(--warm-100)',
          200: 'var(--warm-200)', 300: 'var(--warm-300)', 400: 'var(--warm-400)',
          500: 'var(--warm-500)', 600: 'var(--warm-600)', 700: 'var(--warm-700)',
          800: 'var(--warm-800)', 850: 'var(--warm-850)', 900: 'var(--warm-900)',
          950: 'var(--warm-950)',
        },
        copper: {
          50: 'var(--copper-50)', 100: 'var(--copper-100)', 200: 'var(--copper-200)',
          300: 'var(--copper-300)', 400: 'var(--copper-400)', 500: 'var(--copper-500)',
          600: 'var(--copper-600)', 700: 'var(--copper-700)', 800: 'var(--copper-800)',
          900: 'var(--copper-900)',
        },
        ink: 'var(--color-ink)',
        subtle: 'var(--color-muted)',
        canvas: 'var(--color-bg)',
        panel: 'var(--color-surface)',
        'panel-raised': 'var(--color-surface-raised)',
        hairline: 'var(--color-line)',
        scrim: 'var(--color-scrim)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          on: 'var(--color-on-accent)',
          soft: 'var(--color-accent-soft)',
          ink: 'var(--color-accent-ink)',
        },
      },
      borderRadius: {
        card: 'var(--radius-card)',
        pill: 'var(--radius-full)',
      },
      zIndex: {
        sticky: 'var(--z-sticky)',
        nav: 'var(--z-nav)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },
      transitionDuration: {
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
      },
      screens: { sm: "480px", md: "768px", lg: "976px", xl: "1440px" },
      animation: {
        fadeIn: "fadeIn 1.5s",
        bounce:
          "bounce 0.5s alternate cubic-bezier(0.95, 0.05, 0.795, 0.035) infinite",
        slideUp: "slideUp 0.5s",
        slideUpEaseInOut: "slideUp 0.5s ease-in-out",
        slideUpCubiBezier: "slideUp 1s cubic-bezier(0.165, 0.84, 0.44, 1)",
      },
      animationDelay: {
        0: "0s",
        2: "0.2s",
        4: "0.4s",
        6: "0.6s",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        bounce: {
          from: { transform: "translateY(10px)" },
          to: { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
