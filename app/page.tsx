import IntroSection from '../components/IntroSection'
import AboutSection from '../components/AboutSection'
import ProjectsSection from '../components/ProjectsSection'
import ProcessSection from '../components/ProcessSection'

export default function Home() {
  return (
    <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <IntroSection />
      <AboutSection />
      <ProjectsSection />
      <ProcessSection />
    </main>
  )
}
