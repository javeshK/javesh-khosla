import { profile } from "../data/site";

export function About() {
  return (
    <section id="about" className="section about">
      <div className="section-body about-layout">
        <div>
          <h2>About</h2>
          <div className="about-copy">
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <figure className="about-figure">
          <img
            src={`${import.meta.env.BASE_URL}theme/alphonse.jpg`}
            alt=""
            width={640}
            height={800}
          />
        </figure>
      </div>
    </section>
  );
}
