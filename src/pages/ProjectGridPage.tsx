import { motion } from "framer-motion";

import type { Project } from "../data/projects";
import { projects } from "../data/projects";

type ProjectGridPageProps = {
  side: "left" | "right";
  onOpenProject: (slug: string) => void;
};

const projectsBySide: Record<ProjectGridPageProps["side"], string[]> = {
  left: [
    "seymour-ar-game",
    "endless-runner",
    "belka",
    "cinematic-walkthrough",
  ],
  right: [
    "golf-quest-mini",
    "slugfest",
    "starcraft-2-mod",
    "gmtk-loops",
    "design-art",
  ],
};

const projectMap = new Map(projects.map((project) => [project.slug, project]));

function getProjectsForSide(side: ProjectGridPageProps["side"]) {
  return projectsBySide[side]
    .map((slug) => projectMap.get(slug))
    .filter((project): project is Project => Boolean(project));
}

export function ProjectGridPage({ side, onOpenProject }: ProjectGridPageProps) {
  const pageProjects = getProjectsForSide(side);

  return (
    <motion.section
      className={`project-grid-page project-grid-page--${side}`}
      aria-label={`${side === "left" ? "First" : "Second"} featured work page`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      <header className="spread-header">
        <div className="spread-header__rule" />
        <h2>Featured Work</h2>
        <div className="spread-header__rule" />
      </header>

      <div className="project-spread-grid">
        {pageProjects.map((project) => (
          <article
            className={`spread-card spread-card--${project.priority}`}
            key={project.slug}
          >
            <button
              className="spread-card__button"
              data-project-slug={project.slug}
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onOpenProject(project.slug);
              }}
              onMouseDown={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              <span className="spread-card__meta">
                {project.category} / {project.year}
              </span>
              <h3>{project.title}</h3>
              <p>{project.deck}</p>
              {project.image ? (
                <figure className="spread-card__image">
                  <img src={project.image} alt={project.imageAlt ?? project.title} />
                </figure>
              ) : (
                <div className="spread-card__placeholder" aria-hidden="true">
                  <span>Thumbnail</span>
                  <strong>Pending</strong>
                </div>
              )}
            </button>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
