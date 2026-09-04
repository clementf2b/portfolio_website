import React from 'react'
import Image from 'next/image'
import { HiArrowDown } from 'react-icons/hi'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi2'

const IntroSection = () => {
  return (
    <section id="home" className="pb-0 pt-12 sm:pt-16">
      <div>
        {/*
         * The heading sits outside the grid so it spans the full width. Inside
         * the text column it only had about 55% to work with, which pushed it
         * onto three ragged lines; across the full measure it sets on two and
         * fills them, which is what the approved mockup showed.
         */}
        <div>
          {/*
             * Two-line statement replacing the old "About me", which collided
             * with the #about section heading further down the page.
             *
             * Every claim here already existed in the bio below — the years,
             * the discipline, the AI-assisted workflow — so this is a
             * restructure, not a new assertion. The second line carries the
             * accent so the AI half reads as the emphasis without any extra
             * decoration.
             *
             * <h1> because this is the page's title. The old markup used a
             * <span>, which left the document with no h1 at all.
             *
             * The 52px display treatment agreed in the mockup belongs to the
             * visual revamp Epic; this keeps the current type scale.
             */}
          <h1 className="mb-10 font-display text-3xl font-semibold leading-[1.06] tracking-[-0.033em] text-[var(--foreground)] sm:text-4xl lg:text-5xl xl:text-[4rem]">
            <span className="block">9+ years of cross-platform engineering.</span>
            <span className="block text-[var(--accent)]">AI-assisted workflow.</span>
          </h1>
        </div>

        {/*
         * Two columns, but the right one is now sized to the portrait rather
         * than to a share of the row.
         *
         * The portrait was a 304px circle in a 0.85fr column. Shrinking it
         * inside that column left a band of empty space between the copy and
         * a picture pinned to the far edge, which read as a layout fault
         * rather than a placement. The column is a fixed 16rem, the picture
         * 200px inside it, right-aligned with a margin so a little ground
         * still shows past it.
         *
         * items-center: aligned to the copy's mid-line, not its first line,
         * so the two halves balance instead of the picture hanging from the
         * top.
         */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_425px]">
          <div className="order-2 lg:order-1">
            {/*
             * Description text — only 2-3 key phrases are highlighted
             * in accent color for a cleaner, more professional look.
             *
             * Shorter than before: the years and the AI clause moved up into
             * the title, so repeating them four lines apart read as padding.
             * "global teams" became "an overseas team" at the owner's
             * instruction — the engineering team spans two countries, which
             * "global" overstated.
             */}
            <p className="section-copy mt-2 max-w-2xl">
              I&apos;m Ng Kai Hong (Clement), and I enjoy building software that is
              stable, practical, and thoughtfully crafted. My background spans
              C++, Swift, Objective-C, and modern web tooling. I also incorporate
              AI-assisted coding into my workflow to prototype faster and refine
              ideas. I focus on{' '}
              <span className="font-semibold text-[var(--accent)]">cross-platform engineering</span>{' '}
              across desktop and mobile products, working from{' '}
              <span className="font-semibold text-[var(--accent)]">Hong Kong</span>{' '}
              with an overseas team.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/*
               * Native anchor. Smooth scrolling comes from
               * `html { scroll-behavior: smooth }` in globals.css, and the
               * fixed navbar is cleared by `scroll-margin-top` on the target
               * section — no scrolling library needed.
               */}
              <a href="#projects" className="primary-button">
                Explore projects
              </a>
              <a
                href="/cv.pdf"
                download="CV.pdf"
                className="secondary-button gap-2"
              >
                <HiOutlineDocumentText size={18} />
                CV file
              </a>
              <a
                href="https://github.com/clementf2b"
                target="_blank"
                rel="noreferrer"
                className="secondary-button gap-2"
              >
                <BsGithub size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/clement-ng-0872b3141/"
                target="_blank"
                rel="noreferrer"
                className="secondary-button gap-2"
              >
                <BsLinkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>

          {/*
           * The column is 425px so that its left edge — where the picture
           * starts — lands on the "g" of "engineering." in the heading above.
           * The alignment is exact once the container reaches its 1280px
           * maximum; below that the heading rewraps and the two stop being
           * related, which is why the picture is centred rather than aligned
           * on small screens.
           *
           * -mt-12 off the centre line: aligned dead centre the circle sat
           * low against the copy, whose optical mass is in its first lines
           * rather than the button row.
           */}
          <div className="order-1 flex justify-center lg:order-2 lg:-mt-12 lg:justify-start">
            <div className="rounded-full bg-[var(--surface)] p-1.5">
              {/*
               * The inner ring is one step up from the outer, so the frame
               * reads as two quiet bands rather than a halo. The amber glow
               * and the drop shadow that used to sit here are gone with the
               * rest of the shadows.
               *
               * Greyscale: at full colour the portrait was the most saturated
               * thing on the page, which put the weight on the wrong half of
               * the hero. Drained, the strongest colour goes back to the
               * accent line in the title.
               */}
              <div className="rounded-full bg-[var(--surface-strong)] p-1.5">
                <Image
                  src="/avatar.png"
                  alt="Portrait of Clement Ng"
                  width={310}
                  height={310}
                  priority
                  sizes="350px"
                  className="h-[13rem] w-[13rem] rounded-full object-cover grayscale sm:h-[21.875rem] sm:w-[21.875rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The gap under the buttons was a third larger than it needed to be. */}
      <div className="mt-5 flex justify-center">
        <a href="#about" aria-label="Scroll to about section" className="group p-2">
          <HiArrowDown
            size={26}
            className="animate-bounce text-[var(--accent)] transition-transform duration-300 group-hover:translate-y-1"
          />
        </a>
      </div>
    </section>
  )
}

export default IntroSection
