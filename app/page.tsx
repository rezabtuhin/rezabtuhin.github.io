import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Publications from "@/components/Publications";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Honors from "@/components/Honors";
import Certifications from "@/components/Certifications";
import Others from "@/components/Others";
import Footer from "@/components/Footer";
import ProjectHighlight from "@/components/ProjectHighlight";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Publications />
        <Experience />
        <Projects />
        <Honors />
        <Certifications />
        <Others />
      </main>
      <Footer />
      <ProjectHighlight />
    </>
  );
}
