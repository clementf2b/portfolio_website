import React from "react"
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-8 pt-0 sm:px-6 lg:px-8">
      <div className="section-shell rounded-[1.75rem] px-6 py-4 shadow-none">
        <div className="mx-auto flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="text-sm leading-7 text-[var(--muted)]">
          © Clement Ng. Crafted for thoughtful product engineering and long-term software quality.
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 mb-1 md:justify-end">
          <a href="https://github.com/clementf2b" rel="noreferrer" target="_blank">
            <AiOutlineGithub
              className="cursor-pointer rounded-full border border-[var(--card-border)] p-2 text-[var(--foreground)] transition-transform hover:-translate-y-1"
              size={30}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/clement-ng-0872b3141/"
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineLinkedin
              className="cursor-pointer rounded-full border border-[var(--card-border)] p-2 text-[var(--foreground)] transition-transform hover:-translate-y-1"
              size={30}
            />
          </a>
        </div>
      </div>
      </div>
    </footer>
  )
}

export default Footer
