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
import { HiOutlineUser, HiSparkles } from 'react-icons/hi2'
import { BsArrowDown, BsArrowRepeat, BsArrowRight, BsArrowUp, BsCheck2, BsPauseFill } from 'react-icons/bs'
import { process } from '../lib/content'

/* The four verbs of the loop, lifted out of the caption prose. */
const Verb = ({ children }: { children: React.ReactNode }) => (
  <b className="font-semibold text-(--foreground)">{children}</b>
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
         * The loop drawn as the card's trip across the board: each step is a
         * column holding a small picture of what exists at that point.
         *
         * HTML rather than the inline SVG it replaced. A viewBox scales its
         * text with the width, so on a tablet the labels shrank to around
         * 9px; real markup reflows instead — four columns on a desktop, two
         * on a tablet, one on a phone — and the text stays its own size.
         * It also retires the second, screen-reader-only copy of the steps:
         * this list is the accessible version.
         *
         * Arrows and connectors use --color-line-strong. The old diagram drew
         * them in --card-border, 1.25:1 in both themes and lost in dark.
         */}
        <div className="relative mt-6">
          <ol className="grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-14">
            {process.loop.map((step, index) => (
              <LoopStep key={step.title} step={step} index={index} last={index === process.loop.length - 1} />
            ))}
          </ol>

          {/*
           * Back to the start. On a desktop it is drawn: a dashed return from
           * the last column to the first, with the label on the line. Below
           * that the columns wrap, so it is said instead.
           */}
          <div aria-hidden className="relative mx-[12.5%] hidden h-10 rounded-b-[18px] border-2 border-t-0 border-dashed border-(--color-line-strong) lg:block">
            <BsArrowUp size={18} className="absolute -left-2.5 -top-2.5 text-(--color-line-strong)" />
            <span className="absolute left-1/2 top-full flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-(--background) px-3 text-caption font-semibold text-(--muted)">
              <BsArrowRepeat size={14} />
              next card
            </span>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-caption text-(--muted) lg:hidden">
            <BsArrowRepeat size={14} aria-hidden />
            then the next card starts from the top
          </p>
        </div>

        {/*
         * No max-w here, unlike the rest of the section's prose: these two
         * lines are captions on the diagram above and each is meant to hold
         * one line on a desktop width. They wrap on narrow screens like
         * anything else.
         */}
        <p className="mt-5 text-body-sm leading-7 text-(--muted)">
          The agent <Verb>proposes</Verb> and <Verb>builds</Verb>. I <Verb>choose</Verb> and{' '}
          <Verb>review</Verb>. It follows my rules and shows me the mockup for each change.
        </p>
        <p className="mt-3 text-body-sm leading-7 text-(--muted)">
          AI agent waits at both of my steps. It cannot pick which option wins and cannot mark its
          own work done.
        </p>
      </div>

      {/* ── 2 · One card, end to end ─────────────────────────────────────── */}
      <div className="mt-14">
        <h3 className="font-display text-title-sm font-semibold tracking-[-0.02em] text-(--foreground)">
          What a single decision actually looked like
        </h3>
        <p className="mt-2.5 max-w-[74ch] text-body-sm leading-7 text-(--muted)">
          The card: should the work history be promoted into project cards? Four steps, four real
          artefacts — variants, decision, commit, board.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Step who="agent" title="Three variants" caption="Built with the real bullets">
            <a href="/process/experience-variants.html" className="block rounded-lg">
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

          <Step who="me" title="Rejected two" caption="Recorded in the decision log">
            <div className="p-4 text-body-sm leading-6 text-(--foreground)">
              “Cards wrap six long sentences. The frame adds weight, not information.”
              <span className="mt-2 block text-body-sm text-(--muted)">
                Variant A kept. The card format was dropped.
              </span>
            </div>
          </Step>

          <Step who="agent" title="One commit" caption="Format fixed by my rules">
            {/*
             * Verbatim from the commit, ellipsis where lines are omitted.
             * If the section says "this is the commit", it cannot be reworded.
             */}
            <pre className="whitespace-pre-wrap p-4 font-mono text-label leading-[1.55] text-(--muted)">
              <b className="font-medium text-(--foreground)">4a1ab7c</b>
              {`
[Experience] group roles
under their company and
make the education line
continuous

`}
              <b className="font-medium text-(--foreground)">No wording, date, tag
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

          <Step who="me" title="Moved the card" caption="Dragged from Verify to Done">
            <div className="p-3">
              <div className="flex items-center justify-between px-1 pb-2 text-label font-semibold text-(--foreground)">
                <span>Done</span>
                <span className="text-(--muted)">13</span>
              </div>
              <BoardCard id="TASK-014" title="Experience layout gate" moved />
              <BoardCard id="TASK-018" title="Education timeline" />
            </div>
          </Step>
        </div>

        <p className="mt-5 max-w-[80ch] text-body-sm leading-7 text-(--muted)">
          The variants are live, and the commit text is verbatim from the public history. The board
          is redrawn rather than screenshotted — but the drag is real, and it is the one step in
          the loop the agent cannot do.
        </p>
      </div>

      {/* ── House rules ──────────────────────────────────────────────────── */}
      <div className="mt-10 rounded-card bg-(--surface) p-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-body font-semibold tracking-[-0.02em] text-(--foreground)">
            The rules it works under
          </h3>
          <p className="text-body-sm text-(--muted)">
            written by me, in the repo, before any of this ran
          </p>
        </div>
        <ol className="mt-3.5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-8">
          {process.rules.map((rule, index) => (
            <li key={rule} className="flex gap-2.5 text-body-sm leading-6 text-(--muted)">
              <span className="pt-0.5 text-label font-semibold tracking-[0.06em] text-(--accent)">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{rule}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-6 text-body-sm leading-6 text-(--muted)">
        {process.credit.text}
        <a
          href={process.credit.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xs font-semibold text-(--accent) hover:underline"
        >
          {process.credit.linkLabel}
        </a>
        {process.credit.tail}
      </p>
    </section>
  )
}

/*
 * One column of the end-to-end strip. `who` drives the tint and the role chip,
 * so the owner's two steps read heavier than the agent's, the same split the
 * loop above uses.
 */
const Step = ({
  who,
  title,
  caption,
  children,
}: {
  who: 'agent' | 'me'
  title: string
  caption: string
  children: React.ReactNode
}) => (
  <div
    className={`flex flex-col rounded-card p-4 ${
      who === 'me' ? 'bg-(--accent-soft)' : 'bg-(--surface)'
    }`}
  >
    <RoleChip me={who === 'me'} className="self-start" />
    <h4 className="mt-3 font-display text-body font-semibold tracking-[-0.02em] text-(--foreground)">
      {title}
    </h4>
    <div className="mt-3 flex-1 overflow-hidden rounded-lg bg-(--surface-strong)">
      {children}
    </div>
    <p className="mt-2.5 flex items-center gap-2 text-body-sm text-(--muted)">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
      {caption}
    </p>
  </div>
)

/* A card on the board panel. `moved` marks the one that just arrived. */
const BoardCard = ({ id, title, moved }: { id: string; title: string; moved?: boolean }) => (
  <div
    className={`mt-2 rounded-lg bg-(--background) p-2.5 ${
      moved ? 'border-l-[3px] border-(--accent)' : ''
    }`}
  >
    <p className="text-label font-semibold tracking-wider text-(--muted)">{id}</p>
    <p className="mt-0.5 text-label font-semibold leading-tight text-(--foreground)">
      {title}
    </p>
    <div className="mt-1.5 flex flex-wrap gap-1">
      <Pill>low risk</Pill>
      <Pill>frontend</Pill>
    </div>
  </div>
)

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-(--surface) px-1.5 py-px text-label text-(--muted)">
    {children}
  </span>
)

/*
 * Who does a step, in words beside the icon. Shared by the loop and the
 * end-to-end strip so the two parts of the section name the roles the same
 * way: "AI agent" and "Me", never Agent / You in one place and the other
 * pair in the next.
 */
const RoleChip = ({ me, className = '' }: { me: boolean; className?: string }) => (
  <span
    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full py-1 pl-2 pr-3 text-caption font-semibold ${
      me ? 'bg-(--accent) text-(--color-on-accent)' : 'bg-(--surface-strong) text-(--muted)'
    } ${className}`}
  >
    {me ? <HiOutlineUser size={14} aria-hidden /> : <HiSparkles size={14} aria-hidden />}
    {me ? 'Me' : 'AI agent'}
  </span>
)

type LoopStepData = (typeof process.loop)[number]

/*
 * One column of the loop. The owner's two steps take the accent tint and a
 * "waits" pill — they are where the agent stops — and the agent's take the
 * plain surface. Who does each step is written next to its icon — "AI agent"
 * or "Me" — so none of it rests on colour or an icon alone.
 */
const LoopStep = ({ step, index, last }: { step: LoopStepData; index: number; last: boolean }) => {
  const you = step.lane === 'you'
  const Art = LOOP_ART[index]
  return (
    <li className="relative">
      <div
        /*
         * sm:h-full, not h-full: on a phone the li also holds the down arrow,
         * and a full-height card pushed it under the next step.
         */
        className={`flex flex-col rounded-card p-5 sm:h-full ${
          you ? 'bg-(--accent-soft)' : 'bg-(--surface)'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            className={`text-label font-semibold uppercase tracking-[0.16em] ${
              you ? 'text-(--accent-strong)' : 'text-(--muted)'
            }`}
          >
            {step.column}
          </p>
          <RoleChip me={you} />
        </div>

        <p className="mt-4 font-display text-body font-semibold tracking-[-0.02em] text-(--foreground)">
          {step.title}
        </p>
        <p className={`mt-0.5 text-body-sm ${you ? 'text-(--accent-strong)' : 'text-(--muted)'}`}>
          {step.note}
        </p>

        {/* The picture is decoration on top of the words; phones get the words. */}
        <div aria-hidden className="mt-6 hidden sm:block">
          <Art />
        </div>

        {you && (
          /* mt-auto pins the pill to the foot, so both owner columns line up. */
          <div className="mt-4 sm:mt-auto sm:pt-5">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-(--accent) px-3 py-1 text-caption font-semibold text-(--color-on-accent)">
              <BsPauseFill size={12} aria-hidden />
              agent waits
            </p>
          </div>
        )}
      </div>

      {!last && (
        <>
          {/* Wide: an arrow in the gap to the next column. */}
          <BsArrowRight
            aria-hidden
            size={22}
            className="absolute -right-[39px] top-1/2 hidden -translate-y-1/2 text-(--color-line-strong) lg:block"
          />
          {/* Phone: the columns stack, so the arrow points down. */}
          <span aria-hidden className="flex h-8 items-center justify-center text-(--color-line-strong) sm:hidden">
            <BsArrowDown size={18} />
          </span>
        </>
      )}
    </li>
  )
}

/* A rough page: a heading bar and two lines of text. */
const Sketch = ({ picked, faded }: { picked?: boolean; faded?: boolean }) => (
  <span className={`block h-16 flex-1 rounded-lg bg-(--background) p-2 ${faded ? 'opacity-40' : ''}`}>
    <span className={`block h-1.5 rounded-full ${picked ? 'bg-(--accent)' : 'bg-(--color-line-strong) opacity-60'}`} />
    <span className="mt-2 block h-1 w-3/4 rounded-full bg-(--color-line-strong) opacity-40" />
    <span className="mt-1.5 block h-1 w-5/6 rounded-full bg-(--color-line-strong) opacity-40" />
  </span>
)

const Tick = () => (
  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-(--accent) text-(--color-on-accent)">
    <BsCheck2 size={14} strokeWidth={0.6} />
  </span>
)

/*
 * What exists at each step, drawn from the same card the section follows
 * below: three drafts, one kept, the commit that built it, the card in Done.
 */
const LOOP_ART = [
  () => (
    <div className="flex gap-2">
      <Sketch />
      <Sketch />
      <Sketch />
    </div>
  ),
  () => (
    <div className="relative flex gap-2">
      <Sketch picked />
      <Sketch faded />
      <Sketch faded />
      <span className="absolute -top-2.5 left-[calc(33%-18px)]">
        <Tick />
      </span>
    </div>
  ),
  () => (
    <div className="h-16 rounded-lg bg-(--background) px-3 py-2.5">
      <p className="font-mono text-label font-semibold text-(--foreground)">4a1ab7c [Experience]</p>
      <p className="mt-2 flex flex-wrap gap-x-3 text-label text-(--muted)">
        {['tsc', 'build', '390px'].map((check) => (
          <span key={check} className="inline-flex items-center gap-1">
            <BsCheck2 size={13} className="text-(--accent)" />
            {check}
          </span>
        ))}
      </p>
    </div>
  ),
  () => (
    <div className="flex h-16 items-center gap-3 rounded-lg border-l-[3px] border-(--accent) bg-(--background) px-3">
      <div className="min-w-0 flex-1">
        <p className="text-label font-semibold tracking-wider text-(--muted)">TASK-014</p>
        <p className="truncate text-body-sm font-semibold text-(--foreground)">Experience layout gate</p>
      </div>
      <Tick />
    </div>
  ),
]

export default ProcessSection
