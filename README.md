# Portfolio — Clement Ng

A single-page portfolio for Clement Ng, a senior software developer working on
cross-platform desktop and mobile products from Hong Kong. The page covers an
introduction, an education timeline, work history grouped by company, technical
strengths, and selected projects, in a light and a dark theme.

Built with Next.js 14 (App Router), React 18, TypeScript 5 and Tailwind CSS 3.4.

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build
```

`npm run lint` runs `next lint`, and `npm start` serves a production build.

## Where things live

**All written content is in `lib/content.tsx`** — work history, education,
skills and projects. It is the single source of truth: components read from it
and hold no copy of their own, so text is edited in one place. The file is
`.tsx` rather than `.ts` because some bullets emphasise a proper noun
mid-sentence, and keeping those as JSX means the wording is stored exactly as
it reads, with no markup syntax to parse.

**Design tokens are in `styles/globals.css`** — the colour palette, radii,
z-index layers and motion timings, defined as CSS custom properties and
remapped under `.dark`. `tailwind.config.ts` exposes the type scale and the
semantic colour names on top of them. Components reference the tokens rather
than literal values, so a palette change is a change in one file.
