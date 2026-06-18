import { ExternalLink, FileText, Mail } from "lucide-react";

import { RippablePoster } from "../components/contact/RippablePoster";
import { profile } from "../data/projects";

export function ContactPage() {
  return (
    <div className="contact-page">
      <header>
        <h2 className="classified-title">Contact Me</h2>
      </header>

      <section className="classified-grid" aria-label="Contact classifieds">
        <article className="classified-box">
          <h3>Available For</h3>
          <p className="classified-copy">
            Game design, interactive installations, UI systems, technical design,
            prototyping, and playful research tools.
          </p>
        </article>
        <article className="classified-box">
          <h3>Current Beat</h3>
          <p className="classified-copy">
            {profile.role}. Interested in digital communities, marketplace dynamics,
            and public-facing interactive systems.
          </p>
        </article>
        <article className="classified-box">
          <h3>Respond Via</h3>
          <a className="jump-chip" href={profile.links.email}>
            <Mail size={14} strokeWidth={1.8} aria-hidden="true" />
            Email
          </a>
          <a
            className="jump-chip"
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
            LinkedIn
          </a>
          <a className="jump-chip" href={profile.links.resume} target="_blank">
            <FileText size={14} strokeWidth={1.8} aria-hidden="true" />
            Resume
          </a>
        </article>
      </section>

      <RippablePoster />
    </div>
  );
}
