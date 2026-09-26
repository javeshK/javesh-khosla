import { CursorScrubVideo } from "./CursorScrubVideo";
import { GitHubIcon } from "./Icons";
import { links, profile } from "../data/site";

type HeroProps = {
  mobilePreview: boolean;
  reducedMotion: boolean;
};

export function Hero({ mobilePreview, reducedMotion }: HeroProps) {
  return (
    <section id="intro" className="hero">
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-video">
          <CursorScrubVideo
            videoFile="/hero.mp4"
            axis="horizontal"
            trackingArea="window"
            follow="look"
            lookOriginX={0.5}
            lookOriginY={0.46}
            smoothing={0.32}
            objectFit="cover"
            showPoster
            mobilePreview={mobilePreview}
            reducedMotion={reducedMotion}
          />
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
