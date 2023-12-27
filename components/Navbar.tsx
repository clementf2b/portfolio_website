"use client" // this is a client component
import '../styles/globals.css'
import React from "react"
import { useState } from 'react'
import { Link } from 'react-scroll/modules'
import { useTheme } from 'next-themes'
import { usePathname } from "next/navigation"
import { RiMoonFill, RiSunLine } from 'react-icons/ri'
import { IoMdMenu, IoMdClose } from 'react-icons/io'

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
    const pathname = usePathname()

    return (
        <header className="w-full mx-auto px-5 sm:px-20 fixed top-0 z-50 bg-white text-stone-900 dark:bg-stone-900 dark:text-stone-600">
            <div className="justify-between md:items-center md:flex">
                <div>
                    <div className="flex items-center justify-between py-2 md:py-4 md:block">
                        <Link to="home">
                            <div className="container flex items-center space-x-2">
                                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50 hover:-translate-y-1 transition-transform cursor-pointer">Clement</h2>
                            </div>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border cursor-pointer"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                    }`}>
                    <div className='items-center justify-center space-y-6 md:items-center md:flex md:space-x-3 md:space-y-0'>
                        {NavItems.map((item, index) => {
                            return (
                                <div key={index} className={
                                    "hover:bg-teal-500 hover:rounded-md hover:text-neutral-100 dark:text-neutral-100 hover:-translate-y-1 transition-transform cursor-pointer"
                                }>
                                    <Link
                                        to={item.page}
                                        className={
                                            "px-3 py-1 block lg:inline-block text-neutral-900 hover:text-neutral-100 dark:text-neutral-100 cursor-pointer"
                                        }
                                        activeClass="active"
                                        spy={true}
                                        smooth={true}
                                        offset={-100}
                                        duration={500}
                                        onClick={() => setNavbar(!navbar)}
                                    >
                                        {item.label}
                                    </Link>
                                </div>

                            )
                        })}

                        {/* theme icon */}
                        {currentTheme === "dark" ? (
                            <button
                                onClick={() => setTheme("light")}
                                className="bg-slate-100 p-2 rounded-xl hover:-translate-y-1 transition-transform cursor-pointer"
                            >
                                <RiSunLine size={25} color="black" />
                            </button>
                        ) : (
                            <button
                                onClick={() => setTheme("dark")}
                                className="bg-slate-100 p-2 rounded-xl hover:-translate-y-1 transition-transform cursor-pointer"
                            >
                                <RiMoonFill size={25} />
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Navbar
