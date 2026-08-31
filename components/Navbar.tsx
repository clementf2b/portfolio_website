/*
 * Navbar.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed top navigation bar with:
 *   - Logo (script font, scrolls to #home on click)
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
import { Dancing_Script } from 'next/font/google'

/*
 * Dancing Script — loaded via next/font so it is self-hosted (no Google CDN
 * call at runtime) and automatically inserted as a CSS variable.
 */
const dancingScript = Dancing_Script({ subsets: ['latin'] })

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
]

/*
 * navBtnClass
 * ───────────
 * Returns a Tailwind class string for a nav pill button.
 * Defined at module level (outside the component) so it is never
 * re-created on each render — it's just a pure function.
 *
 * Active state  → filled surface + visible border
 * Inactive state → transparent border (reserves space so layout never shifts
 *                  when the border appears on hover)
 *
 * extraClass — optional classes added to the end, used by the mobile menu
 *              to add "text-left" so the text aligns to the left edge.
 */
const navBtnClass = (isActive: boolean, extraClass = '') =>
    `cursor-pointer rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.16em] outline-none transition hover:-translate-y-1 ${extraClass} ${
        isActive
            ? 'border-[var(--card-border)] bg-[var(--surface-strong)] text-[var(--foreground)]'
            : 'border-transparent text-[var(--muted)] hover:border-[var(--card-border)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]'
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
     *   next-themes hasn't yet read localStorage or matchMedia.  Checking
     *   `if (resolvedTheme)` before rendering the theme button prevents a
     *   mismatch between server HTML and client HTML (hydration error).
     */
    const { resolvedTheme, setTheme } = useTheme()

    /* navbar — true when the mobile menu is open */
    const [navbar, setNavbar] = useState(false)

    /* activeSection — the `page` string of whichever section is currently in view */
    const [activeSection, setActiveSection] = useState('home')

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
         * fixed top-0 z-50 — sits above all page content.
         * px-4 / sm:px-6 / lg:px-8 — horizontal padding scales with viewport.
         * pt-4 — small gap between the browser top edge and the navbar pill.
         */
        <header className="fixed top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
            {/*
             * Pill container — rounded-full gives the navbar its "floating pill" shape.
             * backdrop-blur-xl blurs the page content visible behind the semi-transparent
             * surface, creating a frosted-glass effect.
             */}
            <div className="mx-auto max-w-7xl rounded-full border border-[var(--card-border)] bg-[var(--surface)] px-5 shadow-lg backdrop-blur-xl">
                <div className="flex items-center justify-between py-2 md:py-4">

                    {/*
                     * Logo — links to #home; hover lifts slightly like the nav pills.
                     *
                     * Full name rather than "Clement": recruiters cross-check the
                     * site against a CV, LinkedIn and GitHub that all carry the
                     * full name, and a lone first name makes them infer the link.
                     *
                     * The typeface stays Dancing Script for now. Swapping it for
                     * the display sans agreed in the style gate belongs to the
                     * visual revamp Epic, not to this content card.
                     */}
                    <a href="#home">
                        <h2 className={`text-3xl font-bold text-[var(--foreground)] transition-transform hover:-translate-y-1 ${dancingScript.className}`}>
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
                         * Theme toggle — only rendered after hydration (resolvedTheme is
                         * defined).  This prevents a server/client mismatch that would
                         * cause React's hydration warning.
                         */}
                        {resolvedTheme && (
                            <button
                                onClick={toggleTheme}
                                className="ml-2 cursor-pointer rounded-full border border-[var(--card-border)] p-2 transition-transform hover:-translate-y-1"
                                aria-label="Toggle theme"
                            >
                                {/* Show sun icon in dark mode (click → go light); moon in light mode */}
                                {resolvedTheme === "dark" ? (
                                    <RiSunLine size={22} className="text-[var(--foreground)]" />
                                ) : (
                                    <RiMoonFill size={22} className="text-[var(--foreground)]" />
                                )}
                            </button>
                        )}
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

                            {/* Mobile theme toggle — text label instead of icon-only */}
                            {resolvedTheme && (
                                <button
                                    onClick={toggleTheme}
                                    className="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
                                >
                                    {resolvedTheme === "dark" ? <RiSunLine size={18} /> : <RiMoonFill size={18} />}
                                    {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar
