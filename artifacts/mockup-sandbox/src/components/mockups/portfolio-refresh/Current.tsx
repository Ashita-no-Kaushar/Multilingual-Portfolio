import './_group.css';
import { motion } from 'framer-motion';
import Footer from './current-source/components/layout/footer';
import Navbar from './current-source/components/layout/navbar';
import About from './current-source/components/sections/about';
import Contact from './current-source/components/sections/contact';
import Education from './current-source/components/sections/education';
import Experience from './current-source/components/sections/experience';
import Hero from './current-source/components/sections/hero';
import Projects from './current-source/components/sections/projects';
import Skills from './current-source/components/sections/skills';
import { Separator } from './current-source/components/ui/separator';
import { PortfolioSettingsProvider } from './current-source/i18n';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function MotionSection({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      aria-label={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={sectionVariants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

export function Current() {
  return (
    <PortfolioSettingsProvider>
      <div className="portfolio-current flex min-h-screen flex-col">
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          <Hero />
          <div className="pt-16 md:pt-20">
            <Separator />
            <MotionSection id="about">
              <About />
            </MotionSection>
            <Separator />
            <MotionSection id="projects">
              <Projects />
            </MotionSection>
            <Separator />
            <MotionSection id="skills">
              <Skills />
            </MotionSection>
            <Separator />
            <MotionSection id="experience">
              <Experience />
            </MotionSection>
            <Separator />
            <MotionSection id="education">
              <Education />
            </MotionSection>
            <Separator />
            <MotionSection id="contact">
              <Contact />
            </MotionSection>
          </div>
        </main>
        <Footer />
      </div>
    </PortfolioSettingsProvider>
  );
}
