import { projects } from "./projects";

export type BookPage =
  | { kind: "cover"; id: "cover"; label: "Cover" }
  | {
      kind: "project-grid";
      id: "project-grid-left" | "project-grid-right";
      label: string;
      side: "left" | "right";
    }
  | { kind: "project"; id: string; label: string; projectSlug: string }
  | { kind: "contact"; id: "contact"; label: "Classifieds" }
  | { kind: "comics"; id: "comics-games"; label: "Comics & Games" };

export const bookPages: BookPage[] = [
  { kind: "cover", id: "cover", label: "Cover" },
  {
    kind: "project-grid",
    id: "project-grid-left",
    label: "Featured Work",
    side: "left",
  },
  {
    kind: "project-grid",
    id: "project-grid-right",
    label: "Featured Work",
    side: "right",
  },
  ...projects.map((project) => ({
    kind: "project" as const,
    id: `project-${project.slug}`,
    label: project.title,
    projectSlug: project.slug,
  })),
  { kind: "contact", id: "contact", label: "Classifieds" },
  { kind: "comics", id: "comics-games", label: "Comics & Games" },
];

export const projectPageIndex = new Map(
  bookPages.flatMap((page, index) =>
    page.kind === "project" ? [[page.projectSlug, index] as const] : []
  )
);
