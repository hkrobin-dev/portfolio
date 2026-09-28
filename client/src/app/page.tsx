import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Educaiton";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import ScrollCue from "@/components/ScrollCue";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Blog />
      <Testimonials />
      <ScrollCue />
      <Contact />
      <Footer />
    </main>
  );
}
