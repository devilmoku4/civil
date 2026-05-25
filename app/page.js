import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import { siteData } from "@/data/siteData";

export default function HomePage() {
  return (
    <>
      <Navbar siteData={siteData} />
      <main className="relative overflow-hidden">
        <Hero hero={siteData.hero} contact={siteData.contact} />
        <About about={siteData.about} stats={siteData.stats} />
        <Skills skills={siteData.skills} />
        <Services services={siteData.services} />
        <Projects projects={siteData.projects} />
        <Gallery gallery={siteData.gallery} />
        <Experience experience={siteData.experience} />
        <Testimonials testimonials={siteData.testimonials} />
        <Contact contact={siteData.contact} socials={siteData.socials} />
      </main>
      <Footer siteData={siteData} />
    </>
  );
}
