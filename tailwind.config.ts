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
       * A full S3 layer used to live here — an 11-step semantic type scale,
       * warm/copper colour ramps, ink/subtle/canvas/panel aliases, z-index
       * and motion keys. Every one of them was read by exactly two files,
       * components/ui/Card.tsx and Modal.tsx, which nothing imported. The
       * site itself reads the CSS custom properties directly. Deleted with
       * those two components; the tokens stay in globals.css, so the
       * migration this was built for can add back what it needs.
       */
      borderRadius: {
        card: 'var(--radius-card)',
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
