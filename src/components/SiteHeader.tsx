import { useEffect, useState } from "react";
import { links, nav, profile } from "../data/site";
import { GitHubIcon, LinkedInIcon } from "./Icons";

export function SiteHeader() {
  const [active, setActive] = useState("#intro");

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

  return (
    <header className="site-header">
      <div className="nav-steel" aria-hidden="true" />
      <a className="wordmark" href="#intro">
        <img className="wordmark-mark" src="/theme/ouroboros.jpg" alt="" width={22} height={22} />
        {profile.name}
      </a>
      <nav className="site-nav" aria-label="Primary">
        {nav.map((item) => (
          <a key={item.href} href={item.href} className={active === item.href ? "is-active" : ""}>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="header-social">
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
