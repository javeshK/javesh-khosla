import { useEffect, useState } from "react";
import { About } from "../components/About";
import { BackToTop } from "../components/BackToTop";
import { Contact } from "../components/Contact";
import { Exploring } from "../components/Exploring";
import { Hero } from "../components/Hero";
import { Journey } from "../components/Journey";
import { PageLoader } from "../components/PageLoader";
import { SiteHeader } from "../components/SiteHeader";
import { TransmutationCircle } from "../components/TransmutationCircle";
import { Work } from "../components/Work";
import { useReveal } from "../hooks/useReveal";

export function HomePage() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [showFieldSeal, setShowFieldSeal] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useReveal(!reducedMotion);

  useEffect(() => {
    const onScroll = () => setShowFieldSeal(window.scrollY > 160);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const root = document.documentElement;
    const onMove = (event: PointerEvent) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  return (
    <>
      <PageLoader reducedMotion={reducedMotion} />
      <div className="atmosphere" aria-hidden="true">
        <div className="steel-grid" />
        <TransmutationCircle className={`field-seal${showFieldSeal ? " is-visible" : ""}`} size={420} />
        <div className="grain" />
        <div className="cursor-glow" />
      </div>
      <SiteHeader />
      <main className="all-is-one">
        <Hero />
        <About />
        <Work />
        <Exploring />
        <Journey />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>Javesh Khosla</p>
        <p className="exchange-line">It's a cruel and random world, but the chaos is all so beautiful.</p>
        <p>Computer Science Engineering · GNDU</p>
      </footer>
      <BackToTop />
    </>
  );
}
