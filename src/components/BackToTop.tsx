import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#intro" className={`ouroboros-top ${show ? "is-on" : ""}`} aria-label="Back to top">
      <img src="/theme/ouroboros.jpg" alt="" width={36} height={36} />
    </a>
  );
}
