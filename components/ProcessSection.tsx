/*
 * ProcessSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * "How this site was built" — the section behind the hero's claim about an
 * AI-assisted workflow.
 *
 * Two parts:
 *   1. The loop             – the shape of the collaboration
 *   2. One card, end to end – the artefacts, so none of it is only a claim
 *
 * A third part led here once: three "decision moments", each a paragraph
 * about a time the process changed the outcome. It was cut. Part 2 already
 * walks one decision through the same loop with four real artefacts, so the
 * moments were the same argument made in prose, and weaker for it.
 *
 * No "use client": this is static markup, so it renders on the server.
 */
import React from 'react'
import Image from 'next/image'
import { sectionClassName, sectionHeadingClassName } from '../lib/classNames'
import { process } from '../lib/content'

/* Arrow marker id, referenced from the paths below. */
const MARKER = 'process-arrow'

/* The four verbs of the loop, lifted out of the caption prose. */
const Verb = ({ children }: { children: React.ReactNode }) => (
  <b className="font-semibold text-[var(--foreground)]">{children}</b>
)

const ProcessSection = () => {
  return (
    <section
      id="workflow"
      className={`${sectionClassName} pb-4 sm:pb-6`}
    >
      <h2 className={sectionHeadingClassName}>Workflow</h2>
      <p className="section-copy mt-4 max-w-[74ch]">{process.lede}</p>

      {/* ── 1 · The loop ─────────────────────────────────────────────────── */}
      <div className="mt-10">
        {/*
         * Inline SVG rather than an image so the strokes and fills read from
         * the tokens and follow the theme. currentColor is set per group; the
         * two lanes use different tokens so the owner's steps carry more
         * weight than the agent's.
         *
         * Hidden from assistive tech: the list underneath says the same thing
         * in text, so announcing both would be a duplicate.
         */}
        <svg
          viewBox="0 0 1020 340"
          className="mt-6 hidden w-full sm:block"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <marker
              id={MARKER}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--card-border)" />
            </marker>
          </defs>

          <text x="0" y="52" className="fill-[var(--accent)] text-label font-semibold [letter-spacing:1.6px]">
            AGENT
          </text>
          <text x="0" y="196" className="fill-[var(--muted)] text-label font-semibold [letter-spacing:1.6px]">
            YOU
          </text>

          <g fill="none" stroke="var(--card-border)" strokeWidth="1.5" markerEnd={`url(#${MARKER})`}>
            <path d="M258,96 C300,96 310,150 330,180" />
            <path d="M508,180 C528,150 538,96 580,96" />
            <path d="M758,96 C800,96 810,150 830,180" />
            {/* Loop back: down from the last box, along the foot, up into the first. */}
            <path
              d="M919,210 C919,286 919,300 800,300 L160,300 C40,300 40,286 40,180 L40,110"
              strokeDasharray="5 5"
            />
          </g>
          <text x="480" y="322" textAnchor="middle" className="fill-[var(--muted)] text-label">
            next card
          </text>

          {process.loop.map((step, index) => {
            const x = [80, 330, 580, 830][index]
            const y = step.lane === 'agent' ? 66 : 150
            const fill = step.lane === 'agent' ? 'var(--surface-strong)' : 'var(--accent-soft)'
            const noteFill = step.lane === 'agent' ? 'var(--muted)' : 'var(--accent)'
            return (
              <g key={step.title}>
                <rect x={x} y={y} width="178" height="60" rx="12" fill={fill} />
                <text x={x + 19} y={y + 28} fill="var(--foreground)" className="text-body font-semibold">
                  {step.title}
                </text>
                <text x={x + 19} y={y + 46} fill={noteFill} className="text-caption">
                  {step.note}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Mobile, and the accessible version of the diagram above. */}
        <ol className="mt-6 grid gap-3 sm:hidden">
          {process.loop.map((step) => (
            <li
              key={step.title}
              className={`rounded-card p-4 ${
                step.lane === 'agent'
                  ? 'bg-[var(--surface-strong)]'
                  : 'bg-[var(--accent-soft)]'
              }`}
            >
              <p className="text-label font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {step.lane === 'agent' ? 'Agent' : 'You'}
              </p>
              <p className="mt-1.5 font-display font-semibold text-[var(--foreground)]">
                {step.title}
              </p>
              <p className="mt-0.5 text-body-sm text-[var(--muted)]">{step.note}</p>
            </li>
          ))}
        </ol>

        {/*
         * No max-w here, unlike the rest of the section's prose: these two
         * lines are captions on the diagram above and each is meant to hold
         * one line on a desktop width. They wrap on narrow screens like
         * anything else.
         */}
        <p className="mt-5 text-body-sm leading-7 text-[var(--muted)]">
          The agent <Verb>proposes</Verb> and <Verb>builds</Verb>. I <Verb>choose</Verb> and{' '}
          <Verb>review</Verb>. It follows my rules and shows me the mockup for each change.
        </p>
        <p className="mt-3 text-body-sm leading-7 text-[var(--muted)]">
          AI agent waits at both of my steps. It cannot pick which option wins and cannot mark its
          own work done.
        </p>
      </div>

      {/* ── 2 · One card, end to end ─────────────────────────────────────── */}
      <div className="mt-14">
        <h3 className="font-display text-title-sm font-semibold tracking-[-0.02em] text-[var(--foreground)]">
          What a single decision actually looked like
        </h3>
        <p className="mt-2.5 max-w-[74ch] text-body-sm leading-7 text-[var(--muted)]">
          The card: should the work history be promoted into project cards? Four steps, four real
          artefacts — variants, decision, commit, board.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Step who="Agent" title="Three variants" caption="Built with the real bullets">
            <a href="/process/experience-variants.html" className="focus-ring block rounded-lg">
              {/*
                * The thumbnail is the whole page, so it is tall. Cropped from
                * the top rather than squashed — it is a preview, and the link
                * goes to the page itself.
                */}
              <Image
                src="/process/variants-thumb.png"
                alt="Three layout variants rendered with the real bullet text"
                width={560}
                height={1349}
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                className="h-[260px] w-full rounded-lg object-cover object-top"
              />
            </a>
          </Step>

          <Step who="You" title="Rejected two" caption="Recorded in the decision log">
            <div className="p-4 text-body-sm leading-6 text-[var(--foreground)]">
              “Cards wrap six long sentences. The frame adds weight, not information.”
              <span className="mt-2 block text-body-sm text-[var(--muted)]">
                Variant A kept. The card format was dropped.
              </span>
            </div>
          </Step>

          <Step who="Agent" title="One commit" caption="Format fixed by your rules">
            {/*
             * Verbatim from the commit, ellipsis where lines are omitted.
             * If the section says "this is the commit", it cannot be reworded.
             */}
            <pre className="whitespace-pre-wrap p-4 font-mono text-label leading-[1.55] text-[var(--muted)]">
              <b className="font-medium text-[var(--foreground)]">4a1ab7c</b>
              {`
[Experience] group roles
under their company and
make the education line
continuous

`}
              <b className="font-medium text-[var(--foreground)]">No wording, date, tag
or link changed</b>
              {` — the
bullets moved as they
were, all thirteen of
them.

Verified: tsc clean,
build passes, 13 bullets
render, no horizontal
overflow at 390px.`}
            </pre>
          </Step>

          <Step who="You" title="Moved the card" caption="Dragged from Verify to Done">
            <div className="p-3">
              <div className="flex items-center justify-between px-1 pb-2 text-label font-semibold text-[var(--foreground)]">
                <span>Done</span>
                <span className="text-[var(--muted)]">13</span>
              </div>
              <BoardCard id="TASK-014" title="Experience layout gate" moved />
              <BoardCard id="TASK-018" title="Education timeline" />
            </div>
          </Step>
        </div>

        <p className="mt-5 max-w-[80ch] text-body-sm leading-7 text-[var(--muted)]">
          The variants are live, and the commit text is verbatim from the public history. The board
          is redrawn rather than screenshotted — but the drag is real, and it is the one step in
          the loop the agent cannot do.
        </p>
      </div>

      {/* ── House rules ──────────────────────────────────────────────────── */}
      <div className="mt-10 rounded-card bg-[var(--surface)] p-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-body font-semibold tracking-[-0.02em] text-[var(--foreground)]">
            The rules it works under
          </h3>
          <p className="text-body-sm text-[var(--muted)]">
            written by me, in the repo, before any of this ran
          </p>
        </div>
        <ol className="mt-3.5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-8">
          {process.rules.map((rule, index) => (
            <li key={rule} className="flex gap-2.5 text-body-sm leading-6 text-[var(--muted)]">
              <span className="pt-0.5 text-label font-semibold tracking-[0.06em] text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-6 text-body-sm leading-6 text-[var(--muted)]">
        {process.credit.text}
        <a
          href={process.credit.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring rounded-sm font-semibold text-[var(--accent)] hover:underline"
        >
          {process.credit.linkLabel}
        </a>
        {process.credit.tail}
      </p>
    </section>
  )
}

/*
 * One column of the end-to-end strip. `who` drives the tint so the owner's two
 * steps read heavier than the agent's, the same split the diagram uses.
 */
const Step = ({
  who,
  title,
  caption,
  children,
}: {
  who: 'Agent' | 'You'
  title: string
  caption: string
  children: React.ReactNode
}) => (
  <div
    className={`flex flex-col rounded-card p-4 ${
      who === 'You' ? 'bg-[var(--accent-soft)]' : 'bg-[var(--surface)]'
    }`}
  >
    <p
      className={`text-label font-semibold uppercase tracking-[0.16em] ${
        who === 'You' ? 'text-[var(--accent-strong)]' : 'text-[var(--muted)]'
      }`}
    >
      {who}
    </p>
    <h4 className="mt-1.5 font-display text-body font-semibold tracking-[-0.02em] text-[var(--foreground)]">
      {title}
    </h4>
    <div className="mt-3 flex-1 overflow-hidden rounded-lg bg-[var(--surface-strong)]">
      {children}
    </div>
    <p className="mt-2.5 flex items-center gap-2 text-body-sm text-[var(--muted)]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
      {caption}
    </p>
  </div>
)

/* A card on the board panel. `moved` marks the one that just arrived. */
const BoardCard = ({ id, title, moved }: { id: string; title: string; moved?: boolean }) => (
  <div
    className={`mt-2 rounded-lg bg-[var(--background)] p-2.5 ${
      moved ? 'border-l-[3px] border-[var(--accent)]' : ''
    }`}
  >
    <p className="text-label font-semibold tracking-[0.05em] text-[var(--muted)]">{id}</p>
    <p className="mt-0.5 text-label font-semibold leading-tight text-[var(--foreground)]">
      {title}
    </p>
    <div className="mt-1.5 flex flex-wrap gap-1">
      <Pill>low risk</Pill>
      <Pill>frontend</Pill>
    </div>
  </div>
)

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-[var(--surface)] px-1.5 py-px text-label text-[var(--muted)]">
    {children}
  </span>
)

export default ProcessSection
