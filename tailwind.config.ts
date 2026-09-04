import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    /*
     * lib/ holds class strings too — content.tsx carries the logo sizing and
     * classNames.ts the shared heading style. Leaving it out silently dropped
     * any class that appears nowhere else, which is how the company logos
     * ended up rendering at their intrinsic 128px.
     */
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        /*
         * No serif key: the style gate ruled the editorial serif out, and
         * nothing referenced font-serif once h1–h4 moved to the display stack.
         *
         * --font-display is Inter Tight, loaded via next/font in layout.tsx.
         * PingFang TC is Apple's own Chinese face, so it sits naturally
         * alongside it.
         */
        display: ['var(--font-display)', 'PingFang TC', 'Microsoft JhengHei', 'system-ui', 'sans-serif'],
      },
      /*
       * Only what the site renders.
       *
       * A full S3 layer used to live here — warm/copper colour ramps,
       * ink/subtle/canvas/panel aliases, z-index and motion keys — read by
       * exactly two files, components/ui/Card.tsx and Modal.tsx, which
       * nothing imported. It went with them; the site reads the CSS custom
       * properties directly. The type scale below is the part that came
       * back, because call sites now use it.
       */
      /*
       * S3 type scale — size only.
       *
       * Deliberately no lineHeight or letterSpacing in these tuples. Every
       * call site already sets leading-* and tracking-* where it matters,
       * and a fontSize utility that also emits those two properties would
       * race the explicit ones in the cascade. This does one job: it gives
       * the sizes names, so a heading is text-title rather than text-2xl in
       * one place and text-[24px] in another.
       *
       * Eleven steps, all of them in use. The site had seventeen sizes
       * before this, eight of them one-off arbitrary values differing by as
       * little as half a pixel.
       */
      fontSize: {
        label: '11px',
        caption: '12px',
        'body-sm': '14px',
        body: '16px',
        'body-lg': '18px',
        'title-sm': '20px',
        title: '24px',
        'title-lg': '30px',
        'display-sm': '36px',
        display: '48px',
        'display-lg': '64px',
      },
      borderRadius: {
        card: 'var(--radius-card)',
      },
      /*
       * The two things that stack above the page, named so the order is
       * stated rather than inferred from 50 < 100. Everything else stacks
       * inside its own context and stays a plain z-10.
       */
      zIndex: {
        nav: '50',
        overlay: '100',
      },
      screens: { sm: "480px", md: "768px", lg: "976px", xl: "1440px" },
      /* bounce is the scroll cue under the hero, and the only one left. */
      animation: {
        bounce:
          "bounce 0.5s alternate cubic-bezier(0.95, 0.05, 0.795, 0.035) infinite",
      },
      keyframes: {
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
