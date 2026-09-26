import { interests, profile } from "../data/site";

export function Exploring() {
  return (
    <section id="exploring" className="section exploring">
      <p className="section-index">04</p>
      <div className="section-body">
        <h2>Areas of interest</h2>
        <p className="section-lead">{profile.exploringIntro}</p>
        <ol className="interest-list">
          {interests.map((item, index) => (
            <li key={item}>
              <span className="n">{String(index + 1).padStart(2, "0")}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
