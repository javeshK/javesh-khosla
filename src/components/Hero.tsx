import { useEffect, useState } from "react";
import { GitHubIcon } from "./Icons";
import { links, profile } from "../data/site";

const FADE_DISTANCE = 900;
const IMAGE_OPACITY = 0.95;

export function Hero() {
  const [bgOpacity, setBgOpacity] = useState(IMAGE_OPACITY);

  useEffect(() => {
    const onScroll = () => {
      const scrollFade = Math.max(0, 1 - window.scrollY / FADE_DISTANCE);
      setBgOpacity(scrollFade * IMAGE_OPACITY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="intro" className="hero">
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-bg" style={{ opacity: bgOpacity }}>
          <img src={`${import.meta.env.BASE_URL}hero-bg.jpg`} alt="" />
        </div>
        <div className="hero-crown" />
        <div className="hero-veil" />
        <div className="hero-mist" />
      </div>

      <div className="hero-copy reveal">
        <p className="eyebrow">{profile.role}</p>
        <h1>{profile.name}</h1>
        <p className="lede">{profile.focus}</p>
        <p className="support">{profile.intro}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#work">
            View selected work
          </a>
          <a className="btn btn-ghost" href={links.github} target="_blank" rel="noreferrer">
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
