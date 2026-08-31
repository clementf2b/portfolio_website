"use client"

import React from 'react'
import Image from 'next/image'
import { HiArrowDown } from 'react-icons/hi'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi2'

const IntroSection = () => {
  return (
    <section id="home" className="pb-4 pt-12 sm:pb-6 sm:pt-16">
      <div>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="order-2 pt-2 lg:order-1 lg:-translate-y-6 lg:pt-4">
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
            <h1 className="mb-6 font-sans text-3xl font-semibold leading-[1.08] tracking-[-0.033em] text-[var(--foreground)] dark:text-white sm:text-4xl lg:text-5xl">
              <span className="block">9+ years of cross-platform engineering,</span>
              <span className="block text-[var(--accent)]">with AI-assisted coding in my workflow.</span>
            </h1>

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

          <div className="order-1 lg:order-2">
            <div className="mx-auto max-w-sm">
              <div className="relative mx-auto flex w-fit items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--surface-strong)] p-2 shadow-[var(--shadow)]">
                <div className="absolute inset-x-8 top-4 h-20 rounded-full bg-amber-500/20 blur-3xl" />
                <div className="relative rounded-full border border-white/20 bg-white/40 p-2 dark:bg-slate-950/30">
                  <Image
                    src="/avatar.png"
                    alt="Portrait of Clement Ng"
                    width={420}
                    height={420}
                    priority
                    className="mx-auto rounded-[1.75rem] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <a href="#about" aria-label="Scroll to about section" className="group p-3">
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
