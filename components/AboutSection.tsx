"use client"

import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import {
  BiLogoCPlusPlus,
  BiLogoDocker,
  BiLogoGoLang,
  BiLogoJava,
  BiLogoReact,
} from 'react-icons/bi'
import { SiOpenai } from 'react-icons/si'
import { SiApple, SiNextdotjs, SiSwift } from 'react-icons/si'

const sectionHeadingClassName =
  'font-sans text-3xl font-semibold leading-none tracking-[-0.04em] text-[var(--foreground)] dark:text-white sm:text-4xl lg:text-5xl'

const accordIconDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAZCAMAAAAVHr4VAAAAjVBMVEX////7+/vNzc3e3t5PS05dWlxcWVtVUVSura5bWFpnZGZoZWfz+/3R7/Z+fH5iX2GioKF4dnfs+fuV2uq85/Hp6elZVVfX1tbs7Oxmy+LEw8S8u7tXx+DF6vOFgYOL1ujf9Pl0z+T69fSCeHikoqOx4+/O5+7ByczP1tnF3OGY3/F+2/Br0umpn52LiYttCJRUAAABH0lEQVR4Aa2PVYKDQBBEB2mkkMHd43r/2yVBo3+7hXXxpo39gwRx0G8oyUSkqNJPqOkwAEUbjGmZb1VtcMfl3B2t5wcvMCREsUNQk4mm/ktVBSRkuhHlbJRflEvVisNmIYCKjaofqeYYShykDUeUsW6TpgErvSHOFaPfQiPo+cDatDWZVw+5jxQuMBbroOrxDdKi7rPK1hJYGOlR36wDX629oC3SjTlWr9vNdpevxX75/WFzTIt206cJI97Up1P9UJuez6dj0LBBI2TdJdsfrLK0rGafX1bJG8zkSL6OISKKsjd45aDpz5oMfmUv6jiAcIxjFUDyAsUI3J7bE8YqsxwyaD0bm+O1bgciVZxdrhJFz7qhs16vFxs+jBOyv+kOJucVEUwoH9QAAAAASUVORK5CYII='

const skills = [
  { skill: 'C++', level: 90, icon: <BiLogoCPlusPlus size={20} /> },
  { skill: 'Java', level: 74, icon: <BiLogoJava size={20} /> },
  { skill: 'Objective-C', level: 70, icon: <SiApple size={20} /> },
  { skill: 'Swift', level: 64, icon: <SiSwift size={20} /> },
  { skill: 'Go', level: 58, icon: <BiLogoGoLang size={20} /> },
  { skill: 'React', level: 66, icon: <BiLogoReact size={20} /> },
  { skill: 'Next.js', level: 60, icon: <SiNextdotjs size={20} /> },
  {
    skill: 'Claude Code',
    level: 80,
    icon: (
      <Image
        src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/claudecode-color.png"
        alt="Claude Code icon"
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
        style={{
          filter:
            'brightness(0) saturate(100%) invert(67%) sepia(88%) saturate(337%) hue-rotate(96deg) brightness(91%) contrast(92%)',
        }}
      />
    ),
  },
  { skill: 'Codex', level: 88, icon: <SiOpenai size={18} /> },
  { skill: 'Docker', level: 62, icon: <BiLogoDocker size={20} /> },
]

const AboutSection = () => {
  const { systemTheme, theme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <section id="about" className="py-4 sm:py-6">
      <div className="section-shell">
        <div className="grid gap-12">
          <div className="info-card overflow-hidden">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h3 className={sectionHeadingClassName}>Education journey</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  A quick look at the academic path behind my software foundation.
                </p>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <Image
                src={currentTheme === 'dark' ? '/edu-dm.png' : '/edu.png'}
                alt="Education roadmap"
                width={1400}
                height={700}
                sizes="100vw"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-12">
            <div className="info-card pt-6 sm:pt-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className={sectionHeadingClassName}>Experiences</h3>
              </div>
              <div className="flex flex-col gap-3 border-b border-[var(--card-border)] pb-5">
                <h4 className="text-2xl">Senior Software Developer</h4>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                  <span className="inline-flex items-center gap-3 normal-case tracking-normal">
                    <Image
                      src="https://www.yhxs3344.net/wp-content/uploads/2023/12/Navicat-Premium-logo.png"
                      alt="Navicat logo"
                      width={112}
                      height={28}
                      className="h-7 w-auto object-contain"
                    />
                    <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      <a
                        href="https://www.navicat.com/en/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline underline-offset-4"
                      >
                        PremiumSoft CyberTech Ltd.
                      </a>{' '}
                      | Hong Kong | 03/2021 - Now
                    </span>
                  </span>
                </p>
                <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
                  A leading software company developing Navicat, a premier
                  multi-connection database administration tool used by millions of
                  enterprise professionals globally.
                </p>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
                <li className="flex gap-3 py-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>
                    Lead the end-to-end development and ongoing maintenance of{' '}
                    <span className="font-semibold text-[var(--foreground)]">Navicat</span>{' '}
                    for macOS and Linux environments.
                  </span>
                </li>
                <li className="flex gap-3 py-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>
                    Design and implement backend architectures supporting{' '}
                    <span className="font-semibold text-[var(--foreground)]">
                      multi-connection database integrations
                    </span>{' '}
                    including Snowflake and PostgreSQL.
                  </span>
                </li>
                <li className="flex gap-3 py-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>
                    Designed algorithms and UI for{' '}
                    <span className="font-semibold text-[var(--foreground)]">Data Generation</span>{' '}
                    to produce realistic sample datasets, enabling faster testing and
                    demo workflows for customers.
                  </span>
                </li>
                <li className="flex gap-3 py-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>
                    Integrated external{' '}
                    <span className="font-semibold text-[var(--foreground)]">C++ libraries</span>{' '}
                    to support passive Data Dictionary export, increasing third-party
                    system interoperability by 25%.
                  </span>
                </li>
                <li className="flex gap-3 py-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>
                    Built a{' '}
                    <span className="font-semibold text-[var(--foreground)]">BI workspace</span>{' '}
                    to turn raw data into actionable insights, helping users identify
                    trends and make data-driven decisions.
                  </span>
                </li>
                <li className="flex gap-3 py-0">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>
                    Conduct code reviews to ensure high standards of maintainability and
                    performance.
                  </span>
                </li>
              </ul>

              <div className="mt-8 pt-2">
                <div className="flex flex-col gap-3 border-b border-[var(--card-border)] pb-5">
                  <h4 className="text-2xl">Software Developer</h4>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    <span className="inline-flex items-center gap-3 normal-case tracking-normal">
                      <Image
                        src="https://www.yhxs3344.net/wp-content/uploads/2023/12/Navicat-Premium-logo.png"
                        alt="Navicat logo"
                        width={112}
                        height={28}
                        className="h-7 w-auto object-contain"
                      />
                      <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                        <a
                          href="https://www.navicat.com/en/"
                          target="_blank"
                          rel="noreferrer"
                          className="underline underline-offset-4"
                        >
                          PremiumSoft CyberTech Ltd.
                        </a>{' '}
                        | Hong Kong | 06/2017 - 02/2021
                      </span>
                    </span>
                  </p>
                  <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
                    A leading software company developing Navicat, a premier
                    multi-connection database administration tool used by millions of
                    enterprise professionals globally.
                  </p>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
                  <li className="flex gap-3 py-0">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>
                      Investigated and resolved{' '}
                      <span className="font-semibold text-[var(--foreground)]">
                        complex customer-reported software defects
                      </span>{' '}
                      across{' '}
                      <span className="font-semibold text-[var(--foreground)]">
                        macOS and Linux platforms
                      </span>.
                    </span>
                  </li>
                  <li className="flex gap-3 py-0">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>
                      Optimized{' '}
                      <span className="font-semibold text-[var(--foreground)]">
                        application performance
                      </span>{' '}
                      and refined{' '}
                      <span className="font-semibold text-[var(--foreground)]">
                        database query execution pathways
                      </span>.
                    </span>
                  </li>
                  <li className="flex gap-3 py-0">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>
                      Participated in{' '}
                      <span className="font-semibold text-[var(--foreground)]">
                        agile development cycles
                      </span>
                      , delivering incremental updates to improve{' '}
                      <span className="font-semibold text-[var(--foreground)]">
                        product stability
                      </span>.
                    </span>
                  </li>
                </ul>

                <div className="mt-8 pt-2">
                  <div className="flex flex-col gap-3 border-b border-[var(--card-border)] pb-5">
                    <h4 className="text-2xl">Junior Mobile Application Developer</h4>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      <span className="inline-flex items-center gap-3 normal-case tracking-normal">
                        <Image
                          src={accordIconDataUrl}
                          alt="Accord HK icon"
                          width={28}
                          height={25}
                          className="h-6 w-auto object-contain"
                        />
                        <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                          <a
                            href="https://www.accordhk.com/zh-hant/"
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-4"
                          >
                            Accord HK
                          </a>{' '}
                          | Hong Kong | 12/2016 - 02/2017
                        </span>
                      </span>
                    </p>
                    <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
                      A boutique technology agency specializing in custom mobile
                      application development for retail and consumer-facing brands.
                    </p>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
                    <li className="flex gap-3 py-0">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>
                        Designed and built{' '}
                        <span className="font-semibold text-[var(--foreground)]">
                          native mobile applications
                        </span>{' '}
                        for Android and iOS using{' '}
                        <span className="font-semibold text-[var(--foreground)]">
                          Java and Objective-C
                        </span>.
                      </span>
                    </li>
                    <li className="flex gap-3 py-0">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>
                        Implemented{' '}
                        <span className="font-semibold text-[var(--foreground)]">
                          local data storage solutions
                        </span>{' '}
                        utilizing SQLite and native mobile SDKs.
                      </span>
                    </li>
                    <li className="flex gap-3 py-0">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>
                        Managed the{' '}
                        <span className="font-semibold text-[var(--foreground)]">
                          end-to-end app packaging and submission process
                        </span>{' '}
                        for the Google Play Store.
                      </span>
                    </li>
                    <li className="flex gap-3 py-0">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>
                        Collaborated directly with{' '}
                        <span className="font-semibold text-[var(--foreground)]">
                          clients
                        </span>{' '}
                        to translate business requirements into technical features.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="info-card pt-6 sm:pt-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className={sectionHeadingClassName}>Technical strengths</h3>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {skills.map((item) => (
                  <div
                    key={item.skill}
                    className="rounded-[1.5rem] border border-[var(--card-border)] bg-white/30 px-4 py-4 dark:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <div className="text-[var(--accent)]">{item.icon}</div>
                        <span className="font-semibold">{item.skill}</span>
                      </div>
                    </div>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-300"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
