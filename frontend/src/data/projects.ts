import type { Project } from "./types";

/* ============================================================
   PROJECTS — the two live projects supplied.
   Descriptions reflect the actual live sites. No invented repos.
   ============================================================ */

export const projects: Project[] = [
  {
    id: "plant-store",
    title: "Plant Store",
    subtitle: "BOTANICA — Bring Nature Inside Your Home",
    category: "Web · E-Commerce",
    description:
      "An online plant store where visitors can browse hand-picked houseplants, filter by care level, take a plant-matching quiz, and learn about light requirements — all with a warm, botanical feel.",
    purpose: "A friendly storefront experience for discovering and shopping houseplants.",
    features: [
      "Shop with care levels: Beginner, Intermediate & Expert",
      "Plant personality quiz",
      "Featured plants with ratings & pricing",
      "Light-requirement guide",
      "Eco-friendly / free-shipping messaging",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://plant-store-mocha.vercel.app",
    // Repo not published — leave empty to hide the button.
    gradient: ["#22c55e", "#0e7490"],
    accent: "#4ade80",
  },
  {
    id: "song-vibe",
    title: "Song Vibe",
    subtitle: "The B-Side Archive — Songs that remember you",
    category: "Web · Creative Experience",
    description:
      "A retro listening-room experience for Hindi cinema classics from the 1950s–70s: four mood-based stations, a hand-picked 'keeper's shelf' of ten records, and a written archive journal.",
    purpose: "A nostalgic, atmosphere-first music listening experience.",
    features: [
      "Four mood stations (Morning Vinyl, Monsoon Melodies, Twilight Classics, Kishore After Dark)",
      "Hand-picked 'Keeper's Shelf' of 10 records",
      "Archive journal entries",
      "Official playback sources",
      "A listening list",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://song-vibe.vercel.app",
    gradient: ["#eab308", "#7c2d12"],
    accent: "#fbbf24",
  },
];
