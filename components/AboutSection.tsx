"use client" // this is a client component
import React from "react"
import Image from "next/image"
import { useTheme } from 'next-themes'

const skills = [
    { skill: "C++", level: "bg-gradient-to-r from-teal-600 from-80% to-gray-200 to-80%" },
    { skill: "Java", level: "bg-gradient-to-r from-teal-600 from-65% to-gray-200 to-65%" },
    { skill: "Objective-C", level: "bg-gradient-to-r from-teal-600 from-60% to-gray-200 to-60%" },
    { skill: "Swift", level: "bg-gradient-to-r from-teal-600 from-50% to-gray-200 to-50%" },
    { skill: "Go", level: "bg-gradient-to-r from-teal-600 from-45% to-gray-200 to-45%" },
    { skill: "React", level: "bg-gradient-to-r from-teal-600 from-40% to-gray-200 to-40%" },
    { skill: "Next.js", level: "bg-gradient-to-r from-teal-600 from-35% to-gray-200 to-35%" },
    { skill: "Tailwind CSS", level: "bg-gradient-to-r from-teal-600 from-40% to-gray-200 to-40%" },
    { skill: "Git", level: "bg-gradient-to-r from-teal-600 from-75% to-gray-200 to-75%" },
    { skill: "Docker", level: "bg-gradient-to-r from-teal-600 from-45% to-gray-200 to-45%" },
]

const AboutSection = () => {
    const { systemTheme, theme, setTheme } = useTheme()
    const currentTheme = theme === "system" ? systemTheme : theme

    return (
        <section id="about">
            <div className="my-12 pb-12 md:pt-16 md:pb-16">
                <h1 className="text-center font-bold text-4xl pb-8">
                    About Me
                    <hr className="w-16 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
                </h1>

                {/* education road map */}
                {currentTheme === "dark" ? (
                    <Image
                        src="/edu-dm.png"
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }} // optional
                        className="hidden h-auto max-w-full md:block md:relative md:left-4 md:z-0"
                    />
                ) : (
                    <Image
                        src="/edu.png"
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }} // optional
                        className="hidden h-auto max-w-full md:block md:relative md:left-4 md:z-0"
                    />
                )}
                <br />
                <div className="flex flex-col space-y-10 items-stretch justify-center align-top md:space-x-10 md:space-y-0 md:p-4 md:flex-row md:text-left">
                    <div className="md:w-1/2 ">
                        <h1 className="text-center text-2xl font-bold mb-6 md:text-left">
                            Get to know me!
                        </h1>
                        <p>
                            Hi, my name is
                            <span className="font-bold text-xl">{" Ng Kai Hong, Clement "}</span>
                            and I am a{" "}
                            <span className="font-bold">{"highly ambitious"}</span>,
                            <span className="font-bold">{" self-motivated"}</span>, and
                            <span className="font-bold">{" driven"}</span> software engineer
                            based in Hong Kong.
                        </p>
                        <br />
                        <p>
                            I have more than <span className="text-xl font-bold">{"6 years experiences"}</span> as a senior software developer in <span className="font-bold">{"Premiumsoft Cybertech ltd."}</span>
                            I mainly help to build the main product, <span className="font-bold">{"Navicat"}</span> which is a database development tool for different databases.
                            I need to use <span className="font-bold">{"C++"}</span> to build in <span className="font-bold">{"QT"}</span> for the <span className="font-bold">{"Linux"}</span> platform and <span className="font-bold">{"Objective-C & Swift"}</span> in <span className="font-bold">{"Xcode"}</span> for <span className="font-bold">{"Mac"}</span>.
                        </p>
                        <br />
                        <p>
                            I have the ability to work in a large, collaborative teams to achieve organizational goals, and passionate about building an innovative culture.
                            I handle for many different functions in Navicat like Data Generator for generating the sample real data for use, Data Modeler which let users to create data structure and sql script by using a few clicks. Also, building the Charts makes user&#39;s data visualization to show the trends.
                        </p>
                        <br />
                        <p>
                            I believe that you should{" "}
                            <span className="font-bold text-teal-600">
                                never stop growing
                            </span>{" "}
                            and that&#39;s what I strive to do, I have a passion for
                            technology and a desire to always push the limits of what is
                            possible. I am excited to see where my career takes me and am
                            always open to new opportunities. 🙂
                        </p>
                    </div>
                    <div className="text-center md:w-1/2 md:text-left">
                        <h1 className="text-2xl font-bold mb-2">My Skills</h1>
                        <div className="flex flex-wrap flex-col justify-center z-10 md:justify-start">
                            {skills.map((item, idx) => {
                                return (
                                    <div key={idx} className="mt-3">
                                        <h3>{item.skill}</h3>
                                        <p
                                            className={`bg-gray-200 px-4 py-3 mr-2 mt-1 rounded ${item.level}`}
                                        >
                                        </p>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection