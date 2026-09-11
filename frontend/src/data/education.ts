import type { EducationEntry, CourseSubject } from "./types";

/* ============================================================
   EDUCATION — actual academic details from the uploaded resume/CV.
   ============================================================ */

export const education: EducationEntry[] = [
  {
    id: "btech",
    institution: "Ajay Binay Institute of Technology (ABIT)",
    location: "Cuttack, Odisha",
    degree: "B.Tech — Computer Science & Engineering (AI & ML)",
    period: "2023 – 2027",
    detail: "Current academic standing: SGPA 8.0 / 10.0",
    highlights: [
      "Focus areas: Artificial Intelligence & Machine Learning",
      "Coursework spanning DSA, DBMS & SQL, ML & AI, and OOP in Python",
    ],
  },
  {
    id: "hsc",
    institution: "Higher Secondary School",
    location: "",
    degree: "Class 12 (HSC)",
    period: "",
    detail: "Score: 70%",
    highlights: [],
  },
  {
    id: "ssc",
    institution: "Secondary School",
    location: "",
    degree: "Class 10 (SSC)",
    period: "",
    detail: "Score: 75%",
    highlights: [],
  },
];

export const coursework: CourseSubject[] = [
  { name: "Data Structures & Algorithms (DSA)", note: "Core CS" },
  { name: "Database Management Systems (DBMS) & SQL", note: "Data" },
  { name: "Machine Learning & Artificial Intelligence", note: "AI/ML" },
  { name: "Object-Oriented Programming (OOP) in Python", note: "Python" },
];

export const learningJourney = [
  "Foundations: Python, SQL, C/C++ and core computer science",
  "Data & ML: NumPy, Pandas, data analytics and ML fundamentals",
  "Direction: Data Science, AI/ML and Generative AI",
];
