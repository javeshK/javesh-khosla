import { useEffect, useState } from "react";
import { About } from "./components/About";
import { BackToTop } from "./components/BackToTop";
import { Contact } from "./components/Contact";
import { Exploring } from "./components/Exploring";
import { Hero } from "./components/Hero";
import { Journey } from "./components/Journey";
import { PageLoader } from "./components/PageLoader";
import { SiteHeader } from "./components/SiteHeader";
import { TransmutationCircle } from "./components/TransmutationCircle";
import { Work } from "./components/Work";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  const [mobilePreview, setMobilePreview] = useState(
    () => window.matchMedia("(hover: none), (pointer: coarse)").matches,
  );
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMobilePreview(coarse.matches);
      setReducedMotion(motion.matches);
    };
    sync();
    coarse.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    return () => {
      coarse.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  useReveal(!reducedMotion);

  useEffect(() => {
    if (mobilePreview || reducedMotion) return;
    const root = document.documentElement;
    const onMove = (event: PointerEvent) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mobilePreview, reducedMotion]);

  return (
    <>
      <PageLoader reducedMotion={reducedMotion} />
      <div className="atmosphere" aria-hidden="true">
        <div className="steel-grid" />
        <TransmutationCircle className="field-seal" size={420} />
        <div className="grain" />
        <div className="cursor-glow" />
      </div>
      <SiteHeader />
      <main className="all-is-one">
        <Hero mobilePreview={mobilePreview} reducedMotion={reducedMotion} />
        <About />
        <Work />
        <Exploring />
        <Journey />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>Javesh Khosla</p>
        <p className="exchange-line">To obtain, something of equal value must be lost.</p>
        <p>Computer Science Engineering · GNDU</p>
      </footer>
      <BackToTop />
    </>
  );
}
