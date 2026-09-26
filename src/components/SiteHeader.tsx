import { useEffect, useState } from "react";
import { links, nav, profile } from "../data/site";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const HEADER_FADE_DISTANCE = 320;

export function SiteHeader() {
  const [active, setActive] = useState("#intro");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const ids = ["intro", "about", "work", "journey", "contact"];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
    const close = () => setMenuOpen(false);
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollOpacity(Math.max(0, 1 - window.scrollY / HEADER_FADE_DISTANCE));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  const headerOpacity = menuOpen || isHovered ? 1 : scrollOpacity;

  return (
    <header
      className="site-header"
      style={{ opacity: headerOpacity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsHovered(false);
        }
      }}
    >
      <div className="nav-steel" aria-hidden="true" />
      <a className="wordmark" href="#intro" onClick={closeMenu}>
        <img className="wordmark-mark" src={`${import.meta.env.BASE_URL}theme/ouroboros.jpg`} alt="" width={22} height={22} />
        <span className="wordmark-text">{profile.name}</span>
      </a>

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
        <span className="nav-toggle-bar" aria-hidden="true" />
      </button>

      <div className={`nav-backdrop${menuOpen ? " is-open" : ""}`} onClick={closeMenu} aria-hidden="true" />

      <nav id="site-nav" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={active === item.href ? "is-active" : ""}
            onClick={closeMenu}
          >
            <span>{item.label}</span>
          </a>
        ))}
        <div className="header-social header-social--menu">
          <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
      </nav>

      <div className="header-social header-social--desktop">
        <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
      </div>
    </header>
  );
}
