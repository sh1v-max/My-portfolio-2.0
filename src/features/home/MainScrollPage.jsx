import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Home from "./Home";
import AboutTeaser from "./AboutTeaser";
import WorkTeaser from "./WorkTeaser";
import LabTeaser from "./LabTeaser";
import GithubTeaser from "./GithubTeaser";
import ContactTeaser from "./ContactTeaser";

export default function MainScrollPage() {
  const location = useLocation();

  // Scroll to section when navigating here with a hash (e.g. /#about)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const timer = setTimeout(
        () => el.scrollIntoView({ behavior: "smooth" }),
        120
      );
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Shiv | Portfolio</title>
      </Helmet>

      <section id="home">
        <Home asSection />
      </section>

      <section id="about">
        <AboutTeaser />
      </section>

      <section id="projects">
        <WorkTeaser />
      </section>

      <section id="lab">
        <LabTeaser />
      </section>

      <section id="github">
        <GithubTeaser />
      </section>

      <section id="contact">
        <ContactTeaser />
      </section>
    </HelmetProvider>
  );
}
