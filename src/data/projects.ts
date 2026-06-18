import profileImage from "../assets/images/ananya-profile.png";
import belkaImage from "../assets/images/belka.png";
import cinematicImage from "../assets/images/cinematic-walkthrough.png";
import designArtImage from "../assets/images/design-art.png";
import endlessRunnerImage from "../assets/images/endless-runner.png";
import golfQuestImage from "../assets/images/golf-quest-mini.png";
import seymourImage from "../assets/images/seymour-ar-game.png";
import slugfestImage from "../assets/images/slugfest.png";
import starcraftImage from "../assets/images/starcraft-2-mod.png";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "play" | "video" | "publication" | "case-study" | "archive";
};

export type Project = {
  slug: string;
  title: string;
  deck: string;
  category: string;
  year: string;
  image?: string;
  imageAlt?: string;
  videoId?: string;
  priority: "lead" | "feature" | "column" | "classified";
  tools: string[];
  links: ProjectLink[];
  summary: string;
  body: string[];
  pullQuote?: string;
};

export const profile = {
  name: "Ananya Setty",
  edition: "The Morning Edition",
  issue: "Vol. 2026",
  role: "Computer Science: Game Design student at UC Santa Cruz",
  intro:
    "I build games, AR installations, interfaces, and other interactive experiments that help people play, learn, and connect.",
  image: profileImage,
  links: {
    linkedin: "https://www.linkedin.com/in/ananya-setty/",
    email: "mailto:settyananya@gmail.com",
    phone: "tel:+14086489132",
    resume: "/ananya-setty-resume.pdf",
  },
};

export const projects: Project[] = [
  {
    slug: "seymour-ar-game",
    title: "Seymour AR Game",
    deck: "Museum visitors place cards on an interactive tabletop to learn coastal resilience.",
    category: "AR Installation",
    year: "2024-2025",
    image: seymourImage,
    imageAlt: "A hand placing a printed action card into an AR museum tabletop installation.",
    videoId: "n5F0dA8DeDI",
    priority: "lead",
    tools: ["AR", "Figma", "Unity", "User Testing", "Museum UX"],
    links: [
      {
        label: "Publication",
        href: "https://dl.acm.org/doi/10.1145/3772318.3790433",
        kind: "publication",
      },
      {
        label: "Project Video",
        href: "https://www.youtube.com/watch?v=n5F0dA8DeDI",
        kind: "video",
      },
    ],
    summary:
      "A public-facing AR tabletop installation developed with Dr. Linda Hirsch and Dr. Katherine Isbister for the Seymour Marine Discovery Museum.",
    body: [
      "This installation raises awareness of local flood risks through a hands-on tabletop game. Visitors place action cards at different stages before, during, and after a flood to see how preparedness choices change the projected outcome for Santa Cruz.",
      "My responsibilities included designing full gameplay loops, building visual systems with educational content, leading benchmark testing, and iterating from visitor feedback. Those iterations improved engagement by 30%.",
      "The project became an official CHI 2026 publication, connecting museum learning, climate resilience, and public interaction design.",
    ],
    pullQuote:
      "Climate education becomes more memorable when people can test decisions with their own hands.",
  },
  {
    slug: "endless-runner",
    title: "Endless Runner",
    deck: "A horse-runner game about movement feel, animation timing, and high-score tension.",
    category: "Playable Game",
    year: "2024",
    image: endlessRunnerImage,
    imageAlt: "Pixel-art horse runner gameplay with trees, stones, and score UI.",
    priority: "feature",
    tools: ["Phaser 2D", "JavaScript", "Animation", "Game Feel"],
    links: [
      {
        label: "Play Game",
        href: "https://laihco.github.io/IntoTheDistance/",
        kind: "play",
      },
    ],
    summary:
      "Into The Distance is a compact endless runner where players ride a horse through a winding landscape while dodging trees and obstacles.",
    body: [
      "For a class project, I created a small endless runner focused on directional movement, speed control, and increasingly dense obstacle patterns.",
      "I built the game from scratch in Phaser 2D and drew the artwork by hand. The horse and jockey animation set was the heart of the project, with galloping and bucking cycles designed to give the runner a sense of life and weight.",
      "The project became a focused study in procedural pacing, readable motion, and how small animation decisions can make a simple loop feel complete.",
    ],
    pullQuote:
      "A minimal game loop can still feel rich when the movement has rhythm.",
  },
  {
    slug: "cinematic-walkthrough",
    title: "Cinematic Walkthrough",
    deck: "A real-time Unity scene built for atmosphere, pacing, and environmental storytelling.",
    category: "Unity Film Study",
    year: "2024",
    image: cinematicImage,
    imageAlt: "A moody nighttime Unity scene with a lit Christmas tree in fog.",
    videoId: "nxKMlx4wbTA",
    priority: "feature",
    tools: ["Unity", "Lighting", "Post-Processing", "Camera Direction"],
    links: [
      {
        label: "Watch Video",
        href: "https://www.youtube.com/watch?v=nxKMlx4wbTA",
        kind: "video",
      },
    ],
    summary:
      "A slow, composed walkthrough treating a game engine scene like a film set.",
    body: [
      "This real-time Unity walkthrough explores atmosphere, pacing, and environmental storytelling within a confined interior and open external space.",
      "The camera movement is deliberately slow and controlled, guiding the viewer through the environment while emphasizing composition, scale, and visual rhythm.",
      "Technically, the scene focused on clean organization, modular asset placement, Unity lighting, and post-processing to create a cohesive cinematic look.",
    ],
    pullQuote:
      "Interactive spaces can communicate tone before a single line of dialogue appears.",
  },
  {
    slug: "belka",
    title: "Belka in Space",
    deck: "A low-gravity platformer-exploration game about a dog searching for her lost ball.",
    category: "3D Exploration",
    year: "2024",
    image: belkaImage,
    imageAlt: "Belka gameplay still with a spacesuited dog near asteroids.",
    videoId: "vgbUdyLBqgA",
    priority: "feature",
    tools: ["Unity", "C#", "Coroutines", "Object Pooling", "Low-Poly Art"],
    links: [
      {
        label: "Watch Video",
        href: "https://www.youtube.com/watch?v=vgbUdyLBqgA",
        kind: "video",
      },
    ],
    summary:
      "Belka is a 3D platformer-exploration game set in space, built around low-gravity navigation and soft narrative motivation.",
    body: [
      "Belka follows a dog in a spacesuit as she drifts through fragmented space environments searching for her lost ball.",
      "Core systems include gravity manipulation, oxygen tracking, jetpack boosting, tethering to objects, and a sniffing mechanic that helps locate objectives.",
      "The project helped me explore how movement systems, state feedback, and aesthetic choices can support a simple narrative without relying on dialogue or cutscenes.",
    ],
    pullQuote:
      "Movement, atmosphere, and a small goal can carry a story surprisingly far.",
  },
  {
    slug: "golf-quest-mini",
    title: "Golf Quest Mini",
    deck: "A playable Phaser recreation of the fictional Steven Universe mini-game.",
    category: "Playable Game",
    year: "2024",
    image: golfQuestImage,
    imageAlt: "Golf Quest Mini overworld with characters, trees, flowers, and a mini-golf course.",
    priority: "column",
    tools: ["Phaser 2D", "JavaScript", "UI", "Hand-Drawn Art"],
    links: [
      {
        label: "Play Game",
        href: "https://laihco.github.io/GolfQuestMini/",
        kind: "play",
      },
    ],
    summary:
      "A fully playable demo imagining what Golf Quest Mini could look and feel like as a real browser game.",
    body: [
      "For an assignment about designing a fake game, I recreated and expanded Golf Quest Mini, a fictional game that briefly appears in Steven Universe.",
      "Players explore a colorful overworld and approach mini-golf courses, then face golf-themed enemies in fast-paced button-mashing battles.",
      "I handled concept, implementation, UI, animation, and artwork, aiming for a polished browser game inspired by early 2000s Flash-game energy.",
    ],
  },
  {
    slug: "slugfest",
    title: "SlugFest!",
    deck: "A pair of carnival mini-games designed with Three.js and Blender.",
    category: "3D Web Game",
    year: "2024",
    image: slugfestImage,
    imageAlt: "SlugFest character illustration with boxing gloves.",
    priority: "column",
    tools: ["Three.js", "Blender", "WebGL", "Mini-Games"],
    links: [],
    summary:
      "A playful 3D web game experiment built around short carnival-like interactions.",
    body: [
      "SlugFest was developed with Three.js and Blender as a pair of compact carnival mini-games for CMPM 121 at UCSC.",
      "The project focused on lightweight 3D presentation, playful timing, and building a recognizable visual identity around a small set of interactions.",
    ],
  },
  {
    slug: "starcraft-2-mod",
    title: "Starcraft 2 Mod",
    deck: "A custom arena-style Starcraft 2 map focused on readable combat flow.",
    category: "Game Mod",
    year: "2024",
    image: starcraftImage,
    imageAlt: "A Starcraft 2 custom map with a yin-yang arena design.",
    priority: "classified",
    tools: ["Starcraft 2 Editor", "Map Design", "Systems Tuning"],
    links: [],
    summary:
      "A new Starcraft 2 map based on arena-style gameplay and mechanics.",
    body: [
      "This mod explored map layout, encounter readability, and how arena shape changes player flow.",
      "The core design challenge was balancing clear movement paths with enough tension and variation to make repeat play interesting.",
    ],
  },
  {
    slug: "gmtk-loops",
    title: "GMTK Game Jam 2025: Loops",
    deck: "A Godot narrative puzzle about shopping lists, memory, and routine.",
    category: "Game Jam",
    year: "2025",
    priority: "classified",
    tools: ["Godot", "Narrative Design", "Rapid Prototyping"],
    links: [],
    summary:
      "A solo jam game built under a 96-hour deadline around evolving errands and repeated actions.",
    body: [
      "Shopping lists evolve with each trip, turning a simple errand into a meditation on memory, growth, and the rhythm of everyday moments.",
      "The project emphasized scope management, quick iteration, and building understandable UI flows within a strict jam deadline.",
    ],
  },
  {
    slug: "design-art",
    title: "Design and Art",
    deck: "Visual and product design experiments, posters, concept work, and charcoal studies.",
    category: "Visual Design",
    year: "Ongoing",
    image: designArtImage,
    imageAlt: "A tall design poster from Ananya's art and visual design work.",
    priority: "classified",
    tools: ["Figma", "Adobe", "Charcoal", "Poster Design"],
    links: [],
    summary:
      "A selection of visual experiments across posters, product design, concept design, and traditional drawing.",
    body: [
      "This collection includes visual and product design experiments, club posters, concept directions, and traditional work including charcoal on paper.",
      "The pieces show a parallel practice in composition, hierarchy, and texture that feeds back into my game and interface work.",
    ],
  },
];

export const comicsPage = {
  title: "Comics & Games",
  deck: "Reserved for small playable experiments, comic strips, and interactive newspaper oddities.",
};
