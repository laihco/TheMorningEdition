import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import { ProjectLinks } from "../components/projects/ProjectLinks";
import { VideoEmbed } from "../components/projects/VideoEmbed";
import type { Project } from "../data/projects";

type ProjectPageProps = {
  project: Project;
  onReturnHome: () => void;
};

export function ProjectPage({ project, onReturnHome }: ProjectPageProps) {
  return (
    <motion.article
      className="project-page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
    >
      <header className="project-header">
        <button className="return-button" type="button" onClick={onReturnHome}>
          <ArrowLeft size={13} strokeWidth={1.8} aria-hidden="true" />
          Front Page
        </button>
        <div className="project-meta">
          <span>{project.category}</span>
          <span className="dot-rule" />
          <span>{project.year}</span>
        </div>
        <h2 className="project-title">{project.title}</h2>
        <p className="project-deck">{project.deck}</p>
      </header>

      <div className="project-layout">
        <div className="project-main">
          <div className="project-body">
            {project.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {project.pullQuote ? (
            <blockquote className="pull-quote">{project.pullQuote}</blockquote>
          ) : null}
          <ProjectLinks links={project.links} />
        </div>

        <aside className="project-aside" aria-label={`${project.title} media and tools`}>
          {project.videoId ? (
            <VideoEmbed videoId={project.videoId} title={`${project.title} video`} />
          ) : project.image ? (
            <figure className="project-hero__image">
              <img src={project.image} alt={project.imageAlt ?? project.title} />
            </figure>
          ) : (
            <div className="project-hero__image" aria-hidden="true" />
          )}
          {project.videoId && project.image ? (
            <figure className="project-hero__image">
              <img src={project.image} alt={project.imageAlt ?? project.title} />
            </figure>
          ) : null}
          <ul className="tools-list" aria-label="Tools used">
            {project.tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </aside>
      </div>
    </motion.article>
  );
}
