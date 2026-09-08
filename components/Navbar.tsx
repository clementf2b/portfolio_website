/*
 * Navbar.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed top navigation bar with:
 *   - Logo (display sans, scrolls to #home on click)
 *   - Desktop nav pills (Home / About / Projects) — pill highlights the active section
 *   - Light/Dark theme toggle (sun/moon icon)
 *   - Mobile hamburger menu (collapses into a vertical list)
 *
 * Active section detection uses the browser's IntersectionObserver API so the
 * correct pill stays highlighted as the user scrolls — no scroll event listeners.
 *
 * "use client" is required because this component:
 *   - Reads browser state (scroll position, DOM)
 *   - Calls React hooks (useState, useEffect, useCallback)
 *   - Uses next-themes (which only works in the browser)
 */
"use client"
import React from "react"
import { useEffect, useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { RiMoonFill, RiSunLine } from 'react-icons/ri'
import { IoMdMenu, IoMdClose } from 'react-icons/io'

interface NavItem {
    label: string   // text shown in the button, e.g. "Home"
    page: string    // matches the id="" of the corresponding <section>, e.g. "home"
}

/*
 * NavItems — source of truth for both the desktop pills and the mobile menu.
 * Adding or renaming a section only requires editing this array.
 */
const NavItems: Array<NavItem> = [
    { label: "Home",     page: "home"     },
    { label: "About",    page: "about"    },
    { label: "Projects", page: "projects" },
    { label: "Workflow", page: "workflow" },
]

/*
 * navBtnClass
 * ───────────
 * Returns a Tailwind class string for a nav pill button.
 * Defined at module level (outside the component) so it is never
 * re-created on each render — it's just a pure function.
 *
 * Active state  → ink text
 * Inactive state → muted text
 *
 * The active pill used to be filled with --surface-strong, which made it the
 * lightest thing on an otherwise warm-grey page — a lot of visual weight for
 * "you are in this section". Colour and weight carry that on their own.
 *
 * The border is kept transparent in both states rather than removed: it still
 * reserves its 1px so the pill never shifts, but it is never painted, which is
 * what the no-borders direction asks for.
 *
 * extraClass — optional classes added to the end, used by the mobile menu
 *              to add "text-left" so the text aligns to the left edge.
 */
const navBtnClass = (isActive: boolean, extraClass = '') =>
    `cursor-pointer rounded-full border px-5 py-2 text-body-sm font-semibold uppercase tracking-[0.16em] transition hover:-translate-y-1 ${extraClass} ${
        isActive
            ? 'border-transparent text-[var(--foreground)]'
            : 'border-transparent text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]'
    }`

const Navbar = () => {
    /*
     * resolvedTheme — provided by next-themes.
     * Returns 'light' | 'dark' | undefined.
     *
     * Why not `theme`?
     *   `theme` can be 'system', which requires reading navigator.userAgent or
     *   matchMedia to resolve.  `resolvedTheme` always returns the actual
     *   computed value ('light' or 'dark'), handling the system preference
     *   automatically.
     *
     * Why is it sometimes undefined?
     *   During SSR (server-side rendering) and the first client hydration pass,
     *   next-themes hasn't yet read localStorage or matchMedia.
     *
     *   Skipping the whole button while it is undefined used to be the fix, but
     *   it caused the very error it was meant to avoid: the server sent no
     *   <button>, the client rendered one, and React threw away the entire
     *   server render ("Expected server HTML to contain a matching <button>",
     *   minified error #418 in production).  The button is now always rendered
     *   — same element, same aria-label on both sides — and only the icon,
     *   which is the one theme-dependent bit, waits for `mounted`.
     *
     *   Trade-off: before mount the icon is the moon (the light-theme icon).
     *   A visitor whose resolved theme is dark sees it swap to the sun on the
     *   first client paint. That flash is one <svg> instead of the whole
     *   document, and the toggle no longer pops into existence after load.
     */
    const { resolvedTheme, setTheme } = useTheme()

    /* mounted — false during SSR and the first hydration pass, true afterwards.
     * Anything gated on it renders identically on server and client. */
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    /* navbar — true when the mobile menu is open */
    const [navbar, setNavbar] = useState(false)

    /* activeSection — the `page` string of whichever section is currently in view */
    const [activeSection, setActiveSection] = useState('home')

    /*
     * scrolled — false while the page is at the very top.
     *
     * The bar is transparent over the hero and only takes a background once
     * the page moves, so the first viewport is nothing but the heading. A
     * scroll listener rather than another IntersectionObserver: there is no
     * element to observe at the top of the document, and a sentinel div added
     * purely to be watched is more markup than this.
     */
    const [scrolled, setScrolled] = useState(false)

    /*
     * IntersectionObserver — active section detection
     * ─────────────────────────────────────────────────
     * One observer per section element.  When a section's top edge crosses
     * 30% from the top of the viewport (rootMargin: '-20% 0px -70% 0px'),
     * that section becomes "active" and its nav pill is highlighted.
     *
     * Why this rootMargin?
     *   -20% from top  → don't activate until the section is well into view
     *   -70% from bottom → stop observing before the next section takes over
     *   Together they create a ~10% window in the middle of the viewport
     *   where only one section can be active at a time.
     *
     * Cleanup: all observers are disconnected when the component unmounts,
     * preventing memory leaks.
     */
    useEffect(() => {
        const sectionIds = NavItems.map((item) => item.page)
        const observers: IntersectionObserver[] = []

        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id)
                },
                { rootMargin: '-20% 0px -70% 0px' }
            )
            observer.observe(el)
            observers.push(observer)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [])

    useEffect(() => {
        /* passive: this listener never calls preventDefault, so the browser
         * does not have to wait for it before scrolling. */
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    /*
     * Navigation uses plain <a href="#section"> anchors.
     *
     * The smooth animation comes from `html { scroll-behavior: smooth }` and
     * the fixed navbar is cleared by `scroll-margin-top` on each section —
     * both in globals.css.  That replaces the previous hand-rolled
     * window.scrollTo with its hard-coded 80px offset.
     *
     * The only thing still needed in JS is closing the mobile menu after a
     * link is followed.
     */
    const closeMenu = useCallback(() => setNavbar(false), [])

    /* Toggles between light and dark, inverting whatever is currently resolved */
    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    return (
        /*
         * fixed top-0 z-nav — sits above all page content.
         * px-4 / sm:px-6 / lg:px-8 — horizontal padding scales with viewport.
         * pt-4 — small gap between the browser top edge and the navbar pill.
         */
        <header className="fixed top-0 z-nav w-full px-4 pt-4 sm:px-6 lg:px-8">
            {/*
             * Pill container — rounded-full gives the navbar its "floating pill" shape.
             * backdrop-blur-xl blurs the page content visible behind the semi-transparent
             * surface, creating a frosted-glass effect.
             */}
            {/*
             * No shadow: the approved direction separates the pill from the
             * page with surface colour alone — and at the top of the page it
             * does not separate at all.
             */}
            {/*
             * The open mobile menu forces the background on and drops the pill
             * shape. At the top of the page `scrolled` is false, so the bar is
             * transparent — fine for a single row of links, but the expanded
             * menu then floated over the hero text with nothing behind it, and
             * rounded-full turned the tall panel into a circle that cut the
             * first and last rows off at the corners.
             */}
            <div
                className={`mx-auto max-w-7xl px-5 transition-colors duration-300 ${
                    navbar ? 'rounded-3xl' : 'rounded-full'
                } ${scrolled || navbar ? 'bg-[var(--surface)] backdrop-blur-xl' : 'bg-transparent'}`}
            >
                <div className="flex items-center justify-between py-2 md:py-4">

                    {/*
                     * Logo — links to #home; hover lifts slightly like the nav pills.
                     *
                     * Full name rather than "Clement": recruiters cross-check the
                     * site against a CV, LinkedIn and GitHub that all carry the
                     * full name, and a lone first name makes them infer the link.
                     *
                     * The script face that used to sit here was one of the three
                     * tells the style gate rejected. It is now the display sans.
                     */}
                    <a href="#home">
                        <h2 className="font-display text-title font-semibold tracking-[-0.025em] text-[var(--foreground)] transition-transform hover:-translate-y-1">
                            Clement Ng
                        </h2>
                    </a>

                    {/* Desktop navigation — hidden on mobile (md:flex) */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {NavItems.map((item, index) => (
                            <a
                                key={index}
                                href={`#${item.page}`}
                                /*
                                 * navBtnClass compares activeSection to item.page.
                                 * When they match, the pill gets the filled/active style.
                                 */
                                className={navBtnClass(activeSection === item.page)}
                            >
                                {item.label}
                            </a>
                        ))}

                        {/*
                         * Theme toggle — the button itself is always rendered so the
                         * server and client agree on the markup; only the icon waits
                         * for `mounted`, when resolvedTheme is finally known.
                         */}
                        <button
                            onClick={toggleTheme}
                            className="ml-2 cursor-pointer rounded-full border border-[var(--card-border)] p-2 transition-transform hover:-translate-y-1"
                            aria-label="Toggle theme"
                        >
                            {/* Show sun icon in dark mode (click → go light); moon otherwise,
                              * which is also what renders before mount. */}
                            {mounted && resolvedTheme === "dark" ? (
                                <RiSunLine size={22} className="text-[var(--foreground)]" />
                            ) : (
                                <RiMoonFill size={22} className="text-[var(--foreground)]" />
                            )}
                        </button>
                    </nav>

                    {/* Mobile hamburger — visible only below md breakpoint */}
                    <button
                        className="rounded-full border border-[var(--card-border)] p-2 text-[var(--foreground)] md:hidden"
                        onClick={() => setNavbar(!navbar)}
                    >
                        {/* Toggle between hamburger and × icon based on menu state */}
                        {navbar ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
                    </button>
                </div>

                {/*
                 * Mobile dropdown menu — rendered inside the navbar pill (not in a
                 * separate overlay) so it inherits the pill's rounded shape and
                 * backdrop-blur without extra styling.
                 * Only visible when navbar === true.
                 */}
                {navbar && (
                    <div className="pb-4 md:hidden">
                        <div className="flex flex-col gap-2">
                            {NavItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.page}`}
                                    onClick={closeMenu}
                                    /* text-left aligns the label in the full-width button */
                                    className={navBtnClass(activeSection === item.page, 'text-left')}
                                >
                                    {item.label}
                                </a>
                            ))}

                            {/* Mobile theme toggle — text label instead of icon-only.
                              * Same rule as the desktop one: the button is unconditional,
                              * the theme-dependent icon and label wait for `mounted`.
                              * navBtnClass rather than its own padding and casing: it was
                              * the one row in the menu whose text started 4px to the left
                              * of the links and in sentence case. */}
                            <button
                                onClick={toggleTheme}
                                className={navBtnClass(false, 'flex items-center gap-2 text-left')}
                            >
                                {mounted && resolvedTheme === "dark" ? <RiSunLine size={18} /> : <RiMoonFill size={18} />}
                                {mounted && resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar
