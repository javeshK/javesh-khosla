import { featuredProjects, links, otherProjects, type Project } from "../data/site";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.github ? (
        <a href={project.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      ) : (
        <span className="muted">GitHub coming soon</span>
      )}
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer">
          Live demo
        </a>
      ) : null}
    </div>
  );
}

function TechList({ items }: { items: string[] }) {
  return (
    <ul className="tech-list">
      {items.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  );
}

export function Work() {
  const flagship = featuredProjects.find((p) => p.flagship);
  const rest = featuredProjects.filter((p) => !p.flagship);

  return (
    <section id="work" className="section work">
      <p className="section-index">03</p>
      <div className="section-body">
        <div className="section-head">
        <h2>Selected work</h2>
          <p>A short list of systems I have built. Not a complete catalogue.</p>
        </div>

        <div className="exchange-set">
        {flagship ? (
          <article className="project-card flagship exchange-card">
            <div className="project-meta">
              <p className="category">{flagship.category}</p>
              <p className="explore">Explore →</p>
            </div>
            <h3>{flagship.name}</h3>
            <p className="project-desc">{flagship.description}</p>
            <TechList items={flagship.technologies} />
            <div className="project-cta">
              {flagship.github ? (
                <a className="btn btn-primary" href={flagship.github} target="_blank" rel="noreferrer">
                  View project
                </a>
              ) : null}
              <ProjectLinks project={flagship} />
            </div>
          </article>
        ) : null}

        <div className="project-grid">
          {rest.map((project) => (
            <article key={project.id} className="project-card exchange-card">
              <div className="project-meta">
                <p className="category">{project.category}</p>
                <p className="explore">Explore →</p>
              </div>
              <h3>{project.name}</h3>
              <p className="project-desc">{project.description}</p>
              <TechList items={project.technologies} />
              <div className="project-cta">
                {project.github ? (
                  <a className="text-link" href={project.github} target="_blank" rel="noreferrer">
                    View project
                  </a>
                ) : null}
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
        </div>

        <div className="other-work">
          <h3>Other experiments</h3>
          <ul>
            {otherProjects.map((project) => (
              <li key={project.id}>
                <div>
                  <p className="other-name">{project.name}</p>
                  <p className="other-desc">{project.description}</p>
                </div>
                <div className="other-links">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  ) : null}
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
          <a className="text-link github-all" href={links.github} target="_blank" rel="noreferrer">
            View all projects on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
