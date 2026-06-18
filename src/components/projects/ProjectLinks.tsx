import { ExternalLink, FileText, Gamepad2, Play } from "lucide-react";

import type { ProjectLink } from "../../data/projects";

type ProjectLinksProps = {
  links: ProjectLink[];
};

const iconByKind = {
  play: Gamepad2,
  video: Play,
  publication: FileText,
  "case-study": FileText,
  archive: ExternalLink,
};

export function ProjectLinks({ links }: ProjectLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <ul className="project-links" aria-label="Project links">
      {links.map((link) => {
        const Icon = iconByKind[link.kind];

        return (
          <li key={link.href}>
            <a
              className="project-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
