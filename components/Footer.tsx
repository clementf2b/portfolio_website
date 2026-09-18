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
       text-pretty keeps the wrap from leaving one word on its own line.
       Same width as the navbar pill (both max-w-7xl in the same gutters).
       Padding scales with the 40px icon discs (was 12/24 around 46px ones),
       so it sits a little shorter than the navbar: 62px against 72px. */
    <footer className="w-full px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-card border border-(--color-line) lg:rounded-full bg-(--color-bg) px-5 py-2.5 dark:bg-(--color-surface)">
        <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-pretty text-body-sm text-(--color-muted)">
            © Clement Ng. Crafted for thoughtful product engineering and long-term software quality.
          </p>
          <div className="flex flex-row items-center justify-center gap-2 md:justify-end">
            <a
              href="https://github.com/clementf2b"
              rel="noreferrer"
              target="_blank"
              aria-label="GitHub (opens in a new tab)"
              className="icon-button"
            >
              <AiOutlineGithub aria-hidden size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/clement-ng-0872b3141/"
              rel="noreferrer"
              target="_blank"
              aria-label="LinkedIn (opens in a new tab)"
              className="icon-button"
            >
              <AiOutlineLinkedin aria-hidden size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
