"use client" // this is a client component
import React from 'react'
import Image from "next/image"
import { Link } from "react-scroll/modules"
import { HiArrowDown } from "react-icons/hi"

const IntroSection = () => {
  return (
    <section id="home">
      <div className="flex flex-col text-center items-center justify-center animate-fadeIn animation-delay-2 my-10 py-12 sm:py-16 md:py-24 md:flex-row md:space-x-4 md:text-left">
        <div className="md:mt-0 md:w-1/2">
          <Image
            src="/avatar.png"
            alt=""
            width={325}
            height={325}
            className="rounded-full shadow-2xl"
          />
        </div>
        <div className="md:mt-2 md:w-3/5">
          <h1 className="text-4xl font-bold mt-6 md:mt-0 md:text-7xl">Ng Kai Hong, Clement</h1>
          <br />
          <p className="font-semibold text-teal-500 text-3xl">
            Senior Software Engineer
          </p>
          <br />
          <p className="text-1xl">
            Passionate software developer with 7 years of professional experience building mobile and desktop applications. Learning the latest cutting edge development tools and procedures. Able to effectively self-manage during independent projects, as well as collaborate as part of a productive team. Target to write high-quality code.
          </p>
          <br />
          <Link
            to="projects"
            className="text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700 cursor-pointer"
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}>
            Projects
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center text-center justify-center ">
        <Link
          to="about"
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}>
          <HiArrowDown size={35} className="animate-bounce cursor-pointer"/>
        </Link>
      </div>
    </section>
  )
}

export default IntroSection
