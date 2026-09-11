import type { SkillDomain } from "./types";

/* ============================================================
   TECHNICAL SKILLS — exactly: Python · SQL · AI/ML · GenAI.
   No fake percentages. Levels are qualitative and editable.
   Every fact below is supported by the uploaded resume/CV.
   ============================================================ */

export const skillLevels = [
  "Learning",
  "Working Knowledge",
  "Developing",
  "Core Interest",
  "Comfortable",
  "Building",
] as const;

export const skills: SkillDomain[] = [
  {
    id: "python",
    name: "Python",
    level: "Working Knowledge",
    levelNote: "Primary language — used to build real projects",
    summary:
      "My main programming language. I write object-oriented Python and have built complete applications with it.",
    facts: [
      "Primary programming language on resume & CV",
      "Object-Oriented Programming (OOP) in Python — relevant coursework",
      "Built the Jarvix voice assistant (speech recognition, OS automation, REST APIs) in Python",
      "Built a personal expense tracker (CRUD, validation, reporting) in Python",
    ],
    color: "#38bdf8",
  },
  {
    id: "sql",
    name: "SQL",
    level: "Working Knowledge",
    levelNote: "Database design, queries & CRUD",
    summary:
      "I design and query relational databases — from schemas and CRUD to category-wise analytics.",
    facts: [
      "SQL & MySQL listed under Database & Storage",
      "DBMS & SQL — relevant coursework",
      "Wrote optimized SQL queries and transactional logic for the expense tracker",
      "Data analytics: category-wise totals and clean data reporting",
    ],
    color: "#34d399",
  },
  {
    id: "aiml",
    name: "AI / ML",
    level: "Developing",
    levelNote: "Fundamentals + applied analytics",
    summary:
      "Grounded in machine-learning fundamentals and data analytics, actively applying them in projects and coursework.",
    facts: [
      "Machine Learning Fundamentals — technical skill on resume/CV",
      "NumPy & Pandas for data analytics",
      "Machine Learning & Artificial Intelligence — relevant coursework",
      "CV direction: seeking to grow as an AI & Data Engineer",
    ],
    color: "#a78bfa",
  },
  {
    id: "genai",
    name: "GenAI",
    level: "Core Interest",
    levelNote: "A primary learning focus",
    summary:
      "Generative AI is the frontier I'm most excited about — my core interest and a central direction of my learning.",
    facts: [
      "Generative AI is a stated professional direction",
      "Interested in AI technology research (resume)",
      "Actively building toward GenAI as a core focus area",
    ],
    color: "#f472b6",
  },
];
