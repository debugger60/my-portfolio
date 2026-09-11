/* ============================================================
   Shared content types for the Portfolio OS data layer.
   ============================================================ */

export interface SkillDomain {
  id: string;
  name: string;
  level: string; // qualitative, e.g. "Working Knowledge"
  levelNote: string; // short honest descriptor
  summary: string;
  facts: string[]; // verifiable, source-supported points
  color: string; // accent hex
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  icon: string; // lucide icon key
  blurb: string; // honest one-liner
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  purpose: string;
  features: string[];
  tech: string[];
  liveUrl: string;
  repoUrl?: string;
  gradient: [string, string];
  accent: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  degree: string;
  period: string;
  detail: string;
  highlights: string[];
}

export interface CourseSubject {
  name: string;
  note: string;
}

export interface StrengthSignal {
  id: string;
  title: string;
  detail: string;
  source: string;
}

export interface GrowthArea {
  id: string;
  title: string;
  detail: string;
  editable: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
  icon: string;
  color: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}
