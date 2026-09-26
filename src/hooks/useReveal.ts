import { useEffect } from "react";

export function useReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const nodes = Array.from(document.querySelectorAll(".reveal, .section, .project-card, .interest-list li, .journey-list li"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [enabled]);
}
