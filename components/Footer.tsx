import React from "react"
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
} from "react-icons/ai"

const Footer = () => {
  return (
    /* Matches the navbar pill style — same border, surface, and backdrop blur.
       Static position (not fixed) so it stays at the bottom of the page.
       A pill only from lg: below that the text wraps (three lines on a phone,
       two at tablet width) and a full radius turned it into an oval.
       text-pretty keeps the wrap from leaving one word on its own line. */
    <footer className="w-full px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-card border border-(--color-line) lg:rounded-full bg-(--color-bg) px-6 py-3 dark:bg-(--color-surface)">
        <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-pretty text-body-sm text-(--color-muted)">
            © Clement Ng. Crafted for thoughtful product engineering and long-term software quality.
          </p>
          <div className="flex flex-row items-center justify-center gap-2 md:justify-end">
            <a href="https://github.com/clementf2b" rel="noreferrer" target="_blank" aria-label="GitHub (opens in a new tab)">
              <AiOutlineGithub
                aria-hidden
                className="cursor-pointer rounded-full border border-(--color-line-strong) p-2 text-(--color-ink) transition-transform hover:-translate-y-1"
                size={30}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/clement-ng-0872b3141/"
              rel="noreferrer"
              target="_blank"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <AiOutlineLinkedin
                aria-hidden
                className="cursor-pointer rounded-full border border-(--color-line-strong) p-2 text-(--color-ink) transition-transform hover:-translate-y-1"
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
