import './_group.css';
import './RetroPixelRefresh.css';
import Footer from './current-source/components/layout/footer';
import Navbar from './current-source/components/layout/navbar';
import About from './current-source/components/sections/about';
import Contact from './current-source/components/sections/contact';
import Education from './current-source/components/sections/education';
import Experience from './current-source/components/sections/experience';
import Hero from './current-source/components/sections/hero';
import Projects from './current-source/components/sections/projects';
import Skills from './current-source/components/sections/skills';
import { PortfolioSettingsProvider } from './current-source/i18n';

export function RetroPixelRefresh() {
  return (
    <PortfolioSettingsProvider>
      <div className="portfolio-retro min-h-[100dvh]">
        <a className="retro-skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        <main id="main-content" className="retro-main" tabIndex={-1}>
          <Hero />
          <div className="retro-sections">
            <section id="about" className="retro-section"><About /></section>
            <section id="projects" className="retro-section"><Projects /></section>
            <section id="skills" className="retro-section"><Skills /></section>
            <section id="experience" className="retro-section"><Experience /></section>
            <section id="education" className="retro-section"><Education /></section>
            <section id="contact" className="retro-section"><Contact /></section>
          </div>
        </main>
        <Footer />
      </div>
    </PortfolioSettingsProvider>
  );
}

export default RetroPixelRefresh;
