import { profile } from "../../data/projects";

type MastheadProps = {
  compact?: boolean;
};

export function Masthead({ compact = false }: MastheadProps) {
  return (
    <header className="masthead">
      <div className="masthead__topline">
        {profile.issue} / {profile.edition}
      </div>
      <div className="masthead__rule" />
      <h1 className="masthead__name">{compact ? "Ananya" : profile.name}</h1>
      <div className="masthead__rule" />
    </header>
  );
}
