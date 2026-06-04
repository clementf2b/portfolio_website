import React from "react"
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai"

const Footer = () => {
  return (
    /* Matches the navbar pill style — same border, surface, and backdrop blur.
       Static position (not fixed) so it stays at the bottom of the page. */
    <footer className="w-full px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-full border border-[var(--card-border)] bg-[var(--background)] px-6 py-3 dark:bg-[var(--surface)]">
        <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-sm text-[var(--muted)]">
            © Clement Ng. Crafted for thoughtful product engineering and long-term software quality.
          </p>
          <div className="flex flex-row items-center justify-center gap-2 md:justify-end">
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
