import { useState } from "react";
import { interests, profile } from "../data/site";

export function Exploring() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  function toggleInterest(title: string) {
    setOpenTitle((current) => (current === title ? null : title));
  }

  return (
    <section id="exploring" className="section exploring">
      <div className="section-body">
        <h2>Areas of interest</h2>
        <p className="section-lead">{profile.exploringIntro}</p>
        <ul className="interest-list">
          {interests.map((item) => {
            const isOpen = openTitle === item.title;
            return (
              <li
                key={item.title}
                className={isOpen ? "is-open" : ""}
                tabIndex={0}
                onClick={() => toggleInterest(item.title)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleInterest(item.title);
                  }
                }}
              >
                <span className="interest-title">{item.title}</span>
                <div className="interest-synopsis">
                  <p>{item.synopsis}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
