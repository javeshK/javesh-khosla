import { useEffect, useState } from "react";
import { TransmutationCircle } from "./TransmutationCircle";

export function PageLoader({ reducedMotion }: { reducedMotion: boolean }) {
  const [phase, setPhase] = useState<"in" | "out" | "gone">(reducedMotion ? "gone" : "in");

  useEffect(() => {
    if (reducedMotion) return;
    const hide = window.setTimeout(() => setPhase("out"), 1100);
    const gone = window.setTimeout(() => setPhase("gone"), 1600);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(gone);
    };
  }, [reducedMotion]);

  if (phase === "gone") return null;

  return (
    <div className={`page-loader ${phase === "out" ? "is-out" : ""}`} aria-hidden="true">
      <TransmutationCircle className="loader-circle" size={92} />
      <p>Loading</p>
    </div>
  );
}
