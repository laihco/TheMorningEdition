import type { Project } from "../../data/projects";

type FrontArticleProps = {
  project: Project;
  onOpen: (slug: string) => void;
};

const classByPriority = {
  lead: "front-card--lead",
  feature: "front-card--feature",
  column: "front-card--column",
  classified: "front-card--classified",
};

export function FrontArticle({ project, onOpen }: FrontArticleProps) {
  return (
    <article className={`front-card ${classByPriority[project.priority]}`}>
      <div className="article-meta">
        <span>{project.category}</span>
        <span className="dot-rule" />
        <span>{project.year}</span>
      </div>
      <button
        className="headline-button"
        type="button"
        onClick={() => onOpen(project.slug)}
      >
        <h2 className="front-card__title">{project.title}</h2>
      </button>
      <p className="front-card__deck">{project.deck}</p>
      {project.image ? (
        <figure className="front-card__image" aria-label={project.imageAlt}>
          <img src={project.image} alt="" />
        </figure>
      ) : null}
    </article>
  );
}
