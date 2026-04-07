"use client"

import React from 'react'
import Image from 'next/image'
import { Link } from 'react-scroll/modules'
import { HiArrowDown } from 'react-icons/hi'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi2'

const IntroSection = () => {
  return (
    <section id="home" className="pb-4 pt-12 sm:pb-6 sm:pt-16">
      <div className="section-shell">
        <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-teal-400/12 blur-3xl" />
        <div className="absolute right-10 top-8 h-32 w-32 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="order-2 pt-2 lg:order-1 lg:-translate-y-6 lg:pt-4">
            <span className="mb-6 block font-sans text-3xl font-semibold leading-none tracking-[-0.04em] text-[var(--foreground)] dark:text-white sm:text-4xl lg:text-5xl">
              About me
            </span>
            <p className="section-copy mt-2 max-w-2xl">
              I&apos;m Ng Kai Hong, Clement, and I enjoy building software that is
              stable, practical, and thoughtfully crafted. My background spans{' '}
              <strong className="font-semibold text-[var(--foreground)]">C++</strong>,{' '}
              <strong className="font-semibold text-[var(--foreground)]">Swift</strong>,{' '}
              <strong className="font-semibold text-[var(--foreground)]">Objective-C</strong>,
              and{' '}
              <strong className="font-semibold text-[var(--foreground)]">modern web tooling</strong>.
              I also actively incorporate{' '}
              <strong className="font-semibold text-[var(--foreground)]">AI-assisted coding</strong>{' '}
              into my workflow to{' '}
              <strong className="font-semibold text-[var(--foreground)]">prototype faster</strong>,
              refine ideas, and deliver{' '}
              <strong className="font-semibold text-[var(--foreground)]">maintainable solutions</strong>{' '}
              with high standards. Over the past{' '}
              <strong className="font-semibold text-[var(--foreground)]">9+ years</strong>, I
              have focused on{' '}
              <strong className="font-semibold text-[var(--foreground)]">cross-platform engineering</strong>{' '}
              across desktop and mobile products while collaborating with{' '}
              <strong className="font-semibold text-[var(--foreground)]">global teams</strong>{' '}
              from Hong Kong.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="projects"
                className="primary-button cursor-pointer"
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                Explore projects
              </Link>
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
            <div className="mx-auto max-w-md">
              <div className="relative mx-auto flex w-fit items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--surface-strong)] p-2.5 shadow-[var(--shadow)]">
                <div className="absolute inset-x-8 top-4 h-20 rounded-full bg-teal-400/20 blur-3xl" />
                <div className="relative rounded-full border border-white/20 bg-white/40 p-2 dark:bg-slate-950/30">
                  <Image
                    src="/avatar.png"
                    alt="Portrait of Clement Ng"
                    width={520}
                    height={520}
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
        <Link
          to="about"
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          className="group cursor-pointer rounded-full border border-[var(--card-border)] bg-white/40 p-3 backdrop-blur dark:bg-white/5"
        >
          <HiArrowDown
            size={26}
            className="animate-bounce text-[var(--accent)] transition-transform duration-300 group-hover:translate-y-1"
          />
        </Link>
      </div>
    </section>
  )
}

export default IntroSection
