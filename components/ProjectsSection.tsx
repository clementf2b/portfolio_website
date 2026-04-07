"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowUpRight } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import SlideUp from './SlideUp'

const sectionHeadingClassName =
  'font-sans text-3xl font-semibold leading-none tracking-[-0.04em] text-[var(--foreground)] dark:text-white sm:text-4xl lg:text-5xl'

const projects = [
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

const ProjectsSection = () => {
  const [zoomedImage, setZoomedImage] = useState<{
    src: string
    alt: string
  } | null>(null)

  useEffect(() => {
    if (!zoomedImage) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setZoomedImage(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [zoomedImage])

  return (
    <>
      <section id="projects" className="pt-10 pb-0 sm:pt-14 sm:pb-2">
        <div className="section-shell">
        <div className="mb-12">
          <h2 className={sectionHeadingClassName}>Projects</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            A selection of projects that reflects my approach to product thinking,
            engineering execution, and interface design.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <SlideUp key={project.name} offset="-150px 0px -100px 0px">
              <article className="overflow-hidden rounded-[2rem] bg-[var(--surface-strong)]">
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative p-5 lg:p-6">
                    <button
                      type="button"
                      onClick={() =>
                        setZoomedImage({
                          src: project.image,
                          alt: `${project.name} project preview`,
                        })
                      }
                      className="group block w-full overflow-hidden rounded-[1.5rem]"
                    >
                      <Image
                        src={project.image}
                        alt={`${project.name} project preview`}
                        width={1200}
                        height={900}
                        className="h-full w-full rounded-[1.5rem] object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    </button>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-4">
                      <Image
                        src={project.listIcon}
                        alt={`${project.name} icon`}
                        width={56}
                        height={56}
                        className="rounded-2xl"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-3xl">{project.name}</h3>
                          <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-5 py-1.5 text-sm font-semibold tracking-[0.14em] text-[var(--accent)]">
                            {project.yearTag}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="mt-6 text-lg leading-8 text-[var(--foreground)]">
                      {project.description}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
                      {project.detail}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.link ? (
                        <Link href={project.link} target="_blank" className="secondary-button gap-2">
                          View repository
                          <BsArrowUpRight size={14} />
                        </Link>
                      ) : (
                        <span className="secondary-button cursor-default">Private academic project</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h4 className="text-2xl">Interface snapshots</h4>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                      {project.extraImageList.length} screens
                    </p>
                  </div>

                  <div className="grid justify-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {project.extraImageList.map((imageItem) => (
                      <button
                        key={imageItem.image}
                        type="button"
                        onClick={() =>
                          setZoomedImage({
                            src: imageItem.image,
                            alt: imageItem.title,
                          })
                        }
                        className="mx-auto w-full max-w-[22rem] overflow-hidden rounded-[1.5rem] bg-white/30 text-left transition duration-300 hover:-translate-y-1 dark:bg-white/5"
                      >
                        <div className="flex h-[28rem] items-center justify-center bg-black/5 p-4 dark:bg-white/5">
                          <Image
                            src={imageItem.image}
                            alt={imageItem.title}
                            width={720}
                            height={1280}
                            className="max-h-full w-auto max-w-full object-contain"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm leading-6 text-[var(--muted)]">{imageItem.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            </SlideUp>
          ))}
        </div>
        </div>
      </section>

      {zoomedImage ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setZoomedImage(null)}
        >
          <button
            type="button"
            onClick={() => setZoomedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close image viewer"
          >
            <IoMdClose size={28} />
          </button>
          <div
            className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-[1.5rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={zoomedImage.src}
              alt={zoomedImage.alt}
              width={1800}
              height={1400}
              className="max-h-[90vh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ProjectsSection
