import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_SECTIONS = ["home", "about", "projects", "lab", "github", "contact"];

export function useActiveSection() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (!isMainPage) {
      setActiveSection("home");
      return;
    }

    const observers = SCROLL_SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -70% 0px" }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, [isMainPage]);

  return { activeSection, isMainPage };
}
