import { useState } from "react";

import { profile } from "../../data/projects";

type PosterTab = {
  id: string;
  label: string;
  href: string;
};

const tabs: PosterTab[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: profile.links.linkedin,
  },
  {
    id: "email",
    label: "Email",
    href: profile.links.email,
  },
  {
    id: "resume",
    label: "Resume",
    href: profile.links.resume,
  },
  {
    id: "phone",
    label: "Phone",
    href: profile.links.phone,
  },
];

export function RippablePoster() {
  const [tornTabs, setTornTabs] = useState<string[]>([]);

  const ripTab = (id: string) => {
    setTornTabs((current) => (current.includes(id) ? current : [...current, id]));
  };

  return (
    <section className="poster" aria-label="Take One">
      <h2 className="poster__headline">
        Take One
      </h2>
      <p className="poster__copy">Working on games, AR, UI, and useful weird ideas.</p>
      <div className="poster__tabs">
        {tabs.map((tab) => {
          const isTorn = tornTabs.includes(tab.id);
          const isExternal = tab.href.startsWith("http");

          return (
            <a
              className={`poster-tab ${isTorn ? "poster-tab--torn" : ""}`}
              href={tab.href}
              key={tab.id}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              onClick={() => ripTab(tab.id)}
            >
              <span>{tab.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
