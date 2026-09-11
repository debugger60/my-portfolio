import type { ContactInfo } from "./types";

/* ============================================================
   PROFILE — the single source of truth for identity.
   Edit this file to update your name, role, bio, photo, etc.
   ============================================================ */

export const profile = {
  name: "Kishore Ranjan Panda",
  firstName: "Kishore",
  role: "Creative Developer",
  direction: "Data Science & AI",
  shortTitle: "Creative Developer · Data Science & AI",

  // Education identity
  degree: "B.Tech Student",
  institution: "Ajay Binay Institute of Technology",
  institutionShort: "ABIT",
  institutionLocation: "Cuttack, Odisha",
  batch: "2023 – 2027",

  // Profile photo (also used on the login screen)
  photo: "/images/profile.jpg",
  // Optional secondary photos — drop files into /public/images and add paths here.
  photoSecondary: [] as string[],

  // Hero / login taglines
  tagline: "Data Science, AI/ML & Generative AI — built with Python, SQL and creativity.",

  // Bio statements — all supported by the uploaded resume / CV.
  bio: [
    "B.Tech Computer Science & Engineering student (Batch 2027) at Ajay Binay Institute of Technology (ABIT), Cuttack.",
    "Building a strong foundation in Python, SQL, C/C++ and Artificial Intelligence / Machine Learning concepts.",
    "Passionate about software development, data management and intelligent applications.",
    "Driven to use data-driven insights and AI algorithms to solve real-world problems.",
  ],

  currentFocus: [
    "Data Science & Machine Learning",
    "Generative AI",
    "Python & SQL",
    "Creative development",
  ],

  interests: [
    { label: "Competitive Gaming", icon: "gamepad" },
    { label: "AI Technology Research", icon: "brain" },
    { label: "Building Practical Software", icon: "hammer" },
  ],

  languages: [
    { name: "English", level: "Professional" },
    { name: "Hindi", level: "Fluent" },
    { name: "Odia", level: "Native" },
  ],

  academicStanding: "SGPA 8.0 / 10.0",
};

export const contact: ContactInfo = {
  email: "pandakishoreranjan@gmail.com",
  phone: "+91 9090294759",
  location: "Cuttack, Odisha, India",
};
