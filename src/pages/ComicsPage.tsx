import { comicsPage } from "../data/projects";

export function ComicsPage() {
  return (
    <div className="comics-page">
      <header>
        <div className="contact-meta">
          <span>Last Page</span>
          <span className="dot-rule" />
          <span>Blank Edition</span>
        </div>
        <h2 className="comics-title">{comicsPage.title}</h2>
        <p className="comic-copy">{comicsPage.deck}</p>
      </header>
      <section className="comic-blank-grid" aria-label="Empty comics and games layout">
        <div className="comic-panel" />
        <div className="comic-panel" />
        <div className="comic-panel" />
        <div className="comic-panel" />
      </section>
    </div>
  );
}
