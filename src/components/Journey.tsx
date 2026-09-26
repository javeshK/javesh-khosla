import { journey, links } from "../data/site";

const kindLabel: Record<string, string> = {
  education: "Education",
  training: "Summer training",
  program: "Internship / programme",
};

export function Journey() {
  return (
    <section id="journey" className="section journey">
      <div className="section-body">
        <div className="section-head">
          <h2>Experience</h2>
          <p>Education and structured learning programmes.</p>
        </div>
        <ol className="journey-list">
          {journey.map((item) => (
            <li key={`${item.org}-${item.dates}`}>
              <p className="kind">{kindLabel[item.kind]}</p>
              <h3>{item.org}</h3>
              <p className="detail">{item.title}</p>
              <p className="dates">{item.dates}</p>
              <p className="note">{item.note}</p>
            </li>
          ))}
        </ol>
        <a className="text-link" href={links.linkedin} target="_blank" rel="noreferrer">
          View credentials on LinkedIn →
        </a>
      </div>
    </section>
  );
}
