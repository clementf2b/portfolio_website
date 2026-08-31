/*
 * content.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for the site's written content.
 *
 * Everything here was moved verbatim out of the components — no wording,
 * date, company name, link or figure has been changed. When adding a new
 * entry, add an object to the array; never copy the markup again.
 *
 * Why .tsx and not .ts: some bullets highlight a proper noun mid-sentence.
 * Keeping those as JSX means the text is copied exactly as it was, with no
 * marker syntax to parse and nothing to get subtly wrong at 3am.
 */
import React from 'react'
import Image from 'next/image'
import {
  BiLogoCPlusPlus,
  BiLogoDocker,
  BiLogoGoLang,
  BiLogoJava,
  BiLogoReact,
} from 'react-icons/bi'
import { SiApple, SiNextdotjs, SiOpenai, SiSwift } from 'react-icons/si'

/* Accent-coloured emphasis used inside experience bullets. */
export const Em = ({ children }: { children: React.ReactNode }) => (
  <b className="font-semibold text-[var(--accent)]">{children}</b>
)

/*
 * The Accord HK company logo is embedded as a base64 data URL instead of
 * a hosted file.  This avoids making a network request to a third-party
 * server while keeping the image self-contained in the bundle.
 */
const accordIconDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAZCAMAAAAVHr4VAAAAjVBMVEX////7+/vNzc3e3t5PS05dWlxcWVtVUVSura5bWFpnZGZoZWfz+/3R7/Z+fH5iX2GioKF4dnfs+fuV2uq85/Hp6elZVVfX1tbs7Oxmy+LEw8S8u7tXx+DF6vOFgYOL1ujf9Pl0z+T69fSCeHikoqOx4+/O5+7ByczP1tnF3OGY3/F+2/Br0umpn52LiYttCJRUAAABH0lEQVR4Aa2PVYKDQBBEB2mkkMHd43r/2yVBo3+7hXXxpo39gwRx0G8oyUSkqNJPqOkwAEUbjGmZb1VtcMfl3B2t5wcvMCREsUNQk4mm/ktVBSRkuhHlbJRflEvVisNmIYCKjaofqeYYShykDUeUsW6TpgErvSHOFaPfQiPo+cDatDWZVw+5jxQuMBbroOrxDdKi7rPK1hJYGOlR36wDX629oC3SjTlWr9vNdpevxX75/WFzTIt206cJI97Up1P9UJuez6dj0LBBI2TdJdsfrLK0rGafX1bJG8zkSL6OISKKsjd45aDpz5oMfmUv6jiAcIxjFUDyAsUI3J7bE8YqsxwyaD0bm+O1bgciVZxdrhJFz7qhs16vFxs+jBOyv+kOJucVEUwoH9QAAAAASUVORK5CYII='

/*
 * Two levels, company then role, rather than one flat list of jobs.
 *
 * Two of the three roles are at the same company, so a flat list printed the
 * same company name, logo and summary paragraph twice in a row — and, worse,
 * hid the fact that the second one was a promotion. Grouping is how LinkedIn
 * and every CV convention handle this, and it puts the progression from
 * Software Developer to Senior Software Developer on one screen.
 */
export type Role = {
  title: string
  period: string
  bullets: React.ReactNode[]
  tags: string[]
}

export type Company = {
  name: string
  url: string
  location: string
  /* Spans every role below, so it reads as total tenure at the company. */
  period: string
  logo: { src: string; alt: string; width: number; height: number; className: string }
  summary: string
  /* Newest first. */
  roles: Role[]
}

const navicatLogo = {
  src: '/icons/navicat.png',
  alt: 'Navicat logo',
  width: 112,
  height: 28,
  className: 'h-7 w-auto object-contain',
}

const premiumsoftSummary =
  'A leading software company developing Navicat, a premier multi-connection database administration tool used by millions of enterprise professionals globally.'

export const companies: Company[] = [
  {
    name: 'PremiumSoft CyberTech Ltd.',
    url: 'https://www.navicat.com/en/',
    location: 'Hong Kong',
    period: '06/2017 - Now',
    logo: navicatLogo,
    summary: premiumsoftSummary,
    roles: [
      {
        title: 'Senior Software Developer',
        period: '03/2021 - Now',
        bullets: [
          <>Led end-to-end development and maintenance of <Em>Navicat</Em> for MacOS and Linux environments.</>,
          <>Designed backend architectures supporting multi-connection database integrations including <Em>Snowflake</Em> and <Em>PostgreSQL</Em>.</>,
          <>Built a Data Generation feature with custom algorithms and UI to produce realistic sample datasets for testing and demos.</>,
          <>Integrated <Em>C++</Em> libraries to enable Data Dictionary export, improving third-party interoperability by 25%.</>,
          <>Delivered a BI workspace that transforms raw data into actionable insights to support data-driven decisions.</>,
          <>Conducted code reviews to maintain high standards of quality and long-term maintainability.</>,
        ],
        tags: ['C++', 'Objective-C', 'Qt', 'MacOS', 'Linux', 'Snowflake', 'PostgreSQL'],
      },
      {
        title: 'Software Developer',
        period: '06/2017 - 02/2021',
        bullets: [
          <>Investigated and resolved complex customer-reported defects across <Em>MacOS</Em> and <Em>Linux</Em> platforms.</>,
          <>Optimized application performance and refined database query execution pathways.</>,
          <>Participated in agile development cycles, delivering incremental updates to improve product stability.</>,
        ],
        tags: ['C++', 'Objective-C', 'Qt', 'MacOS', 'Linux'],
      },
    ],
  },
  {
    name: 'Accord HK',
    url: 'https://www.accordhk.com/zh-hant/',
    location: 'Hong Kong',
    period: '12/2016 - 02/2017',
    logo: {
      src: accordIconDataUrl,
      alt: 'Accord HK icon',
      width: 28,
      height: 25,
      className: 'h-6 w-auto object-contain',
    },
    summary:
      'A boutique technology agency specializing in custom mobile application development for retail and consumer-facing brands.',
    roles: [
      {
        title: 'Junior Mobile Application Developer',
        period: '12/2016 - 02/2017',
        bullets: [
          <>Designed and built native mobile applications for <Em>Android</Em> and <Em>iOS</Em> using <Em>Java</Em> and <Em>Objective-C</Em>.</>,
          <>Implemented local data storage solutions utilizing <Em>SQLite</Em> and native mobile SDKs.</>,
          <>Managed end-to-end app packaging and submission to the <Em>Google Play Store</Em>.</>,
          <>Collaborated directly with clients to translate business requirements into technical features.</>,
        ],
        tags: ['Java', 'Objective-C', 'Android', 'iOS', 'SQLite'],
      },
    ],
  },
]

/*
 * education
 * ─────────
 * Transcribed verbatim from the former edu.png / edu-dm.png pair. The spelling
 * is exactly as it appeared in the image — "Asc" is left as-is rather than
 * silently corrected to "ASc", because the wording is the owner's, not ours.
 * Confirmed against the original image by the owner on 2026-08-28.
 *
 * As text this is readable by search engines and applicant tracking systems,
 * and it removes the two image files, the theme branch, and the CSS filter
 * chain that used to correct the dark variant's colours.
 */
export type EducationEntry = { period: string; school: string; qualification: string }

export const education = {
  blurb: 'A quick look at the academic path behind my software foundation.',
  timeline: [
    { period: '2005～2010', school: 'Salesian English School', qualification: 'HKCEE' },
    { period: '2010～2012', school: 'Modern College', qualification: 'HKAL' },
    {
      period: '2013～2015',
      school: 'Community College of City University',
      qualification: 'Asc in Information Systems Development',
    },
    {
      period: '2015～2017',
      school: 'The Hong Kong University of Science and Technology(HKUST)',
      qualification: 'BEng in Computer Science',
    },
  ] as EducationEntry[],
}

/*
 * languages / tools
 * ──────────────────
 * Each entry drives one skill bar row in the "Technical strengths" section.
 *   skill – display label inside the bar
 *   level – 0-100 integer; controls how wide the coloured fill renders
 *   icon  – React element shown to the left of the label inside the bar
 *
 * Kept sorted by `level` descending so the strongest skill appears first.
 * The levels are the owner's own figures and are carried over unchanged.
 */
const languages = [
  { skill: 'C++',         level: 90, icon: <BiLogoCPlusPlus size={20} /> },
  { skill: 'Java',        level: 74, icon: <BiLogoJava size={20} /> },
  { skill: 'Objective-C', level: 70, icon: <SiApple size={20} /> },
  { skill: 'React',       level: 66, icon: <BiLogoReact size={20} /> },
  { skill: 'Swift',       level: 64, icon: <SiSwift size={20} /> },
  { skill: 'Next.js',     level: 60, icon: <SiNextdotjs size={20} /> },
  { skill: 'Go',          level: 58, icon: <BiLogoGoLang size={20} /> },
]

const tools = [
  { skill: 'Codex',  level: 88, icon: <SiOpenai size={18} /> },
  {
    skill: 'Claude Code',
    level: 80,
    /*
     * Claude Code has no dedicated react-icons entry, so we load the icon
     * from an external PNG and apply a CSS filter to shift it to the warm
     * caramel/orange accent colour that matches the site palette.
     * The filter chain: desaturate → re-saturate → rotate hue → fine-tune.
     */
    icon: (
      <Image
        src="https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/claudecode-color.png"
        alt="Claude Code icon"
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
        style={{
          filter:
            'brightness(0) saturate(100%) invert(58%) sepia(50%) saturate(500%) hue-rotate(350deg) brightness(95%) contrast(90%)',
        }}
      />
    ),
  },
  { skill: 'Docker', level: 62, icon: <BiLogoDocker size={20} /> },
]

/*
 * skillGroups
 * ───────────
 * Groups the two skill arrays under labelled sections ("Languages", "Tools").
 */
export const skillGroups = [
  { label: 'Languages', items: languages },
  { label: 'Tools',     items: tools },
]

export type Project = {
  listIcon: string
  name: string
  image: string
  link: string
  subtitle: string
  description: string
  detail: string
  yearTag: string
  extraImageList: { image: string; title: string }[]
}

/*
 * projects
 * ─────────
 * Static data array — one object per project card.
 * Keeping data here (rather than in a separate JSON file) avoids an extra
 * import step and is fine at this scale (3 projects).
 *
 * Fields:
 *   listIcon       – small square icon shown in the card header
 *   name           – project title
 *   image          – hero image shown on the left panel of the card
 *   link           – GitHub URL; empty string "" means a private/academic project
 *   subtitle       – short context label (e.g. "HKUST Final Year Project")
 *   description    – lead sentence shown in bold
 *   detail         – secondary paragraph in muted colour
 *   yearTag        – year badge rendered next to the title
 *   extraImageList – screenshots shown in the "Interface snapshots" gallery
 */
export const projects: Project[] = [
  {
    listIcon: '/projects/hkust_fyp.png',
    name: 'FaceT',
    image: '/projects/faceTImg.png',
    link: 'https://github.com/clementf2b/FaceT',
    subtitle: 'HKUST Final Year Project',
    description:
      'A cosmetic discovery mobile app that helps users understand product fit, compare effects, and make more confident shopping decisions.',
    detail:
      'The goal was to reduce the friction involved in choosing suitable cosmetic products. The app combined recommendation flows, product contribution, effect previewing, store lookup, and community feedback into one mobile experience.',
    yearTag: '2017',
    extraImageList: [
      { image: '/projects/faceT/mainPage.png', title: 'Main page with quick access to core flows' },
      { image: '/projects/faceT/predictColor.png', title: 'Skin tone prediction experience' },
      { image: '/projects/faceT/recommedation.png', title: 'Personalized product recommendation screen' },
      { image: '/projects/faceT/applyResult.png', title: 'Product effect preview before purchase' },
    ],
  },
  {
    listIcon: '/projects/ecare.png',
    name: 'E-Care',
    image: '/projects/ecareImg.png',
    link: 'https://github.com/ysoseerius/e_care_new',
    subtitle: 'HKUST Mobile Application Design Contest',
    description:
      'A care coordination platform for appointment handling, medicine reminders, and patient communication.',
    detail:
      'E-Care focused on making healthcare interactions less fragmented for patients and care groups. It introduced account onboarding, appointment flow support, secure record handling, medication reminders, and side-effect reporting.',
    yearTag: '2016',
    extraImageList: [
      { image: '/projects/ecare/ecare1.png', title: 'Medication report shared with doctors' },
      { image: '/projects/ecare/ecare2.png', title: 'Medication reminder and alarm flow' },
      { image: '/projects/ecare/ecare3.png', title: 'Urgent side-effect reporting screen' },
    ],
  },
  {
    listIcon: '/projects/cccu_fyp.png',
    name: '耆樂寶',
    image: '/projects/cccufypImg.png',
    link: '',
    subtitle: 'CCCU Final Year Project',
    description:
      'A communication and entertainment platform designed to help elderly residents stay connected, informed, and engaged.',
    detail:
      'This project supported event sharing, chat, games, media browsing, and family communication for elderly residents in nursing homes. The product aimed to improve connection, reduce isolation, and give caregivers better visibility into daily life.',
    yearTag: '2014',
    extraImageList: [
      { image: '/projects/cccufyp/photo3.png', title: 'Built for nursing home usage scenarios' },
      { image: '/projects/cccufyp/photo1.png', title: 'Account information view' },
      { image: '/projects/cccufyp/photo5.png', title: 'Login page for users' },
      { image: '/projects/cccufyp/photo4.png', title: 'Photo upload and sharing flow' },
    ],
  },
]
