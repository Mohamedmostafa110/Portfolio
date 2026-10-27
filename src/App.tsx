import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Journey } from "@/components/Journey";
import { Certificates } from "@/components/Certificates";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { CVPage } from "@/components/CVPage";
import { Navigate, Route, Routes } from "react-router-dom";

function useEasterEggs() {
  useEffect(() => {
    // Tasteful console message for curious developers
    console.log(
      "%cMohamed Mostafa — Full-Stack Engineer",
      "font-size:13px;font-weight:bold;color:#D6C6A8;",
    );
    console.log(
      "%cEverything on this page is data-driven from src/data/portfolio.ts. Press Ctrl/⌘ + K to navigate.",
      "font-size:11px;color:#8B96B8;",
    );

    // Subtle tab-title interaction
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? "Still exploring? — Mohamed Mostafa" : original;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
}

function HomePage() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Journey />
        <Certificates />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}

export default function App() {
  useEasterEggs();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cv" element={<CVPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
