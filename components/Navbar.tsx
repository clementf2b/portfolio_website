"use client" // this is a client component
import '../styles/globals.css'
import React from "react"
import { useEffect, useState } from 'react'
import { Link } from 'react-scroll/modules'
import { useTheme } from 'next-themes'
import { RiMoonFill, RiSunLine } from 'react-icons/ri'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { Dancing_Script } from 'next/font/google'

const dancingScript = Dancing_Script({ subsets: ['latin'] })
interface NavItem {
    label: string;
    page: string;
}
const NavItems: Array<NavItem> = [
    {
        label: "Home",
        page: "home",
    },
    {
        label: "About",
        page: "about",
    },
    {
        label: "Projects",
        page: "projects",
    },
]

const Navbar = () => {
    const { systemTheme, theme, setTheme } = useTheme()
    const currentTheme = theme === "system" ? systemTheme : theme
    const [navbar, setNavbar] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header className="fixed top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-full border border-[var(--card-border)] bg-[var(--surface)] px-5 shadow-lg backdrop-blur-xl">
            <div className="justify-between md:items-center md:flex">
                <div>
                    <div className="flex items-center justify-between py-2 md:py-4 md:block">
                        <Link to="home">
                            <div className="container flex items-center space-x-2">
                                <h2 className={`text-4xl font-bold text-[var(--foreground)] hover:-translate-y-1 transition-transform cursor-pointer ${dancingScript.className}`}>Clement</h2>
                            </div>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="rounded-full border border-[var(--card-border)] p-2 text-[var(--foreground)] outline-none transition hover:bg-white/30 dark:hover:bg-white/5"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                    }`}>
                    <div className='items-center justify-center space-y-4 pb-2 md:items-center md:flex md:space-x-3 md:space-y-0 md:pb-0'>
                        {NavItems.map((item, index) => {
                            return (
                                <div key={index} className={
                                    "rounded-full transition-transform hover:-translate-y-1 cursor-pointer"
                                }>
                                    <Link
                                        to={item.page}
                                        className={
                                            "block rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--foreground)] transition hover:bg-[var(--accent)] hover:text-white lg:inline-block cursor-pointer"
                                        }
                                        activeClass="active"
                                        spy={true}
                                        smooth={true}
                                        offset={-100}
                                        duration={500}
                                        onClick={() => setNavbar(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </div>

                            )
                        })}

                        {/* theme icon */}
                        {mounted && currentTheme === "dark" ? (
                            <button
                                onClick={() => setTheme("light")}
                                className="rounded-full border border-black/10 bg-white/60 p-2 hover:-translate-y-1 transition-transform cursor-pointer dark:border-white/15 dark:bg-white/10"
                            >
                                <RiSunLine size={25} className="text-[var(--foreground)]" />
                            </button>
                        ) : (
                            <button
                                onClick={() => setTheme("dark")}
                                className="rounded-full border border-black/10 bg-white/60 p-2 hover:-translate-y-1 transition-transform cursor-pointer dark:border-white/15 dark:bg-white/10"
                            >
                                <RiMoonFill size={25} className="text-[var(--foreground)]" />
                            </button>
                        )}
                    </div>
                </div>

            </div>
            </div>
        </header>
    )
}

export default Navbar
