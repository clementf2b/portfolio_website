import React from "react"
import Image from "next/image"
import Link from "next/link"
import SlideUp from "./SlideUp"
import { BsGithub } from "react-icons/bs"
import { Button, Card, Collapse } from "reactstrap";

const projects = [
  {
    listIcon: "/projects/hkust_fyp.png",
    name: "FaceT",
    image: "/projects/FaceTImg.png",
    link: "https://github.com/clementf2b/FaceT",
    subtitle: "HKUST Final Year Project (2017)",
    description: "An aesthetic and easy-to- use mobile app platform for enhancing women’s experience in shopping for cosmetic products",
    detail: "Objective: \n\n  1. To ease users in finding out the cosmetic products which suit them best.\n  2. To help users understand the effects of the makeup products. \n  3. To allow users’ contribution by letting them add new cosmetic products to the database. \n  4. To locate retail stores selling concerned cosmetic products. \n  5. To provide a platform for users to share their views on different cosmetic products.\n  6. To minimize user’s actions for performing tasks",
    expanded: false,
    extraImageList: [{
      image: "MainPage",
      title: "Figure 1. Main Page - Select different functions"
    }, {
      image: "PredictColor",
      title: "Figure 2. predict for user's skin color tone"
    }, {
      image: "Recommedation",
      title: "Figure 3. recommend the suitable product for user"
    }, {
      image: "ApplyResult",
      title: "Figure 4. see the effect for the cosmetic products"
    }, {
      image: "CompareResult",
      title: "Figure 5. compare the result after the cosmetic products"
    }, {
      image: "LoginPage",
      title: "Figure 6. Login Page - can use google or fb login"
    }, {
      image: "ProductDetail1",
      title: "Figure 7. see the cosmetic products detail"
    }, {
      image: "ProductDetail2",
      title: "Figure 8. rate and comment the cosmetic products"
    }],
  },
  {
    listIcon: "/projects/ecare.png",
    name: "E-Care",
    image: "/projects/ECareImg.png",
    link: "https://github.com/ysoseerius/e_care_new",
    subtitle: "HKUST Mobile Application Design Contest (2016)",
    description: "A platform for simplifying the process of medicine acquisition or appointment",
    detail: "Features: \n\n1. QR code login and account registration \n- There are different type of accounts such as the patients and health care group. \n- Member of health care group will help users to create an account then give QR code for them to scan and login in their own. \n\n2. Appointment management Patients have a booking with health care group before they come to the connected clinic/hospital \n- For the patient without appointment, this application will provide a SMS reminder for them if he is the next one. \n\n3. Data encryption and storing Health care group inputs the records for the patients and stores the encrypted data in the database \n\n4. Courtesy reminder of taking relevant medication \n- The application would provide an alarm for them when time is reached to take the relevant medicine. There would provide a button for the patient to report to the doctor that they have or have not taken that medicine \n\n5. Report system for side effect \nThe patients have the option to report any side effects encountered while taking the medication and rate it as urgent, major or minor discomfort. \n- The health care group gives immediate responses to the patient and give advices to tackle the situation",
    expanded: false,
    extraImageList: [{
      image: "Ecare1",
      title: "Figure 1. import the medication report to the doctor"
    }, {
      image: "Ecare2",
      title: "Figure 2. clock alarm for take pills"
    }, {
      image: "Ecare3",
      title: "Figure 3. report for the allergy sufferer or urgent problem"
    }],
  },
  {
    listIcon: "/projects/cccu_fyp.png",
    name: "耆樂寶",
    image: "/projects/CCCUfypImg.png",
    link: "",
    subtitle: "CCCU Final Year Project(2015)",
    description: "A system for handling the photo, video and entertainment",
    detail: "The functions included in the application have four main parts:\n  1. Social networking function focusing on sharing of events photo\n  2. Chat function that may contains in text, image, video and sound recording for script and record.\n  3. Gaming function which train users’ concentration, reaction and mobility\n  4. Video browsing function for user to watch TV episodes and films\n\nElders living in nursing home needs a lot of attentions, since their ability is degenerating by age grew. However, even nursing home have limited human resources, the elders’ family members may not have spare time to visit them face to face. Therefore the project is going provide an interface between elders, wardens and the family of them.\n\nFor elderly side:\n  1. Provide a convenient way to communicate with their family members\n  2. Entertain thought in-built functions like game and video\n  3. Pay attentions on events of the nursing home\n  4. Share photo with other members and comment other photo\n\nFor family side:\n  1. Provide a platform to care about the situation of the elders\n  2. Share daily life with the elders\n\nFor wardens side:\n  1. Train elders easier through the application\n  2. Observe elders ability by the rating of the games\n  3. Reduce workloads and maintain the nursing quality",
    expanded: false,
    extraImageList: [{
      image: "Photo3",
      title: "Figure.1 build this app for HKSKH "
    }, {
      image: "Photo1",
      title: "Figure.2 Account information"
    }, {
      image: "Photo5",
      title: "Figure.3 login page"
    }, {
      image: "Photo2",
      title: "Figure.4 Scan QRCode login"
    }, {
      image: "Photo4",
      title: "Figure.5 upload photo to database"
    }],
  },
]

const ProjectsSection = () => {
  return (
    <section id="projects">
      <h1 className="text-center font-bold text-4xl pb-12">
        Projects
        <hr className="w-16 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
      </h1>

      <div className="flex flex-col space-y-20 pb-20">

        {projects.map((project, idx) => {
          return (
            <div key={idx}>
              <SlideUp offset="-300px 0px -300px 0px">
                <div className="flex flex-col p-2 animate-slideUpCubiBezier animation-delay-2 md:flex-row md:space-x-12">
                  <div className=" md:w-1/2">
                    <Link href={project.link}>
                      <Image
                        src={project.image}
                        alt=""
                        width={1000}
                        height={1000}
                        className="rounded-xl shadow-xl hover:opacity-70"
                      />
                    </Link>
                  </div>
                  <div className="mt-8 md:w-1/2">
                    <h1 className="text-4xl font-bold mb-6">{project.name}</h1>
                    <p className="text-xl leading-7 mb-4 text-neutral-600 dark:text-neutral-400">
                      {project.description}
                    </p>
                    <div className="flex flex-row align-bottom space-x-4">
                      <Link href={project.link} target="_blank">
                        <BsGithub
                          size={30}
                          className="hover:-translate-y-1 transition-transform cursor-grab"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </SlideUp>
            </div>
          )
        })}

      </div>
    </section>
  )
}

export default ProjectsSection