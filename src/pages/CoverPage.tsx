import { ArrowRightCircle } from "lucide-react";
import { motion } from "framer-motion";

import { profile } from "../data/projects";

const coverBioIntro =
  "Hello! I’m Ananya, a Computer Science: Game Design student who loves exploring how people play and connect through technology.";
const coverBioAfterTechnology =
  "I spend most of my time designing and building games, AR installations, and other interactive experiments. When I’m not working on screen, I enjoy tinkering with retro tech and restoring old gadgets (like a vintage Western Electric wall phone I brought back to life this summer).";

export function CoverPage() {
  return (
    <motion.div
      className="cover-page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      <header className="cover-header" aria-label="Newspaper masthead">
        <div className="cover-header__ornament">
          <span />
          <strong>The Morning Edition</strong>
          <span />
        </div>
        <div className="cover-header__meta">
          <span>VOL. 2026</span>
          <span>SANTA CRUZ</span>
          <span>VOL. 2026</span>
        </div>
        <div className="cover-header__rule" />
        <h1 className="cover-title">Ananya Setty</h1>
        <div className="cover-header__rule cover-header__rule--thin" />
      </header>

      <section className="cover-body" aria-label="Ananya biography">
        <figure className="cover-photo">
          <img src={profile.image} alt="Ananya Setty holding a wall phone." />
        </figure>
        <div className="cover-copy">
          <p>
            <br />
            {coverBioIntro}
            <br />
            <br />
            {coverBioAfterTechnology}
          </p>
          <div className="cover-cta">
            <span>Flip through my newspaper to see my work!</span>
            <ArrowRightCircle size={38} strokeWidth={2.3} aria-hidden="true" />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
