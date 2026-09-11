import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import {
  Activity,
  Brain,
  FileText,
  FlaskConical,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  ScrollText,
  TrendingUp,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type AppId =
  | "about"
  | "education"
  | "skills"
  | "tools"
  | "projects"
  | "resume"
  | "cv"
  | "linkedin"
  | "github"
  | "instagram"
  | "strengths"
  | "weaknesses"
  | "contact";

export type EnvKey =
  | "space"
  | "profile"
  | "academic"
  | "neural"
  | "workstation"
  | "lab"
  | "document"
  | "network"
  | "code"
  | "social"
  | "diagnostics"
  | "growth"
  | "contact";

export interface AppDef {
  id: AppId;
  title: string;
  icon: LucideIcon;
  env: EnvKey;
  w: number;
  h: number;
  dock: boolean;
  component: ComponentType;
}

function lazy(loader: () => Promise<Record<string, ComponentType>>, key: string) {
  return dynamic(() => loader().then((m) => m[key]), { ssr: false });
}

export const APPS: AppDef[] = [
  {
    id: "about",
    title: "About Me",
    icon: User,
    env: "profile",
    w: 720,
    h: 560,
    dock: true,
    component: lazy(() => import("@/components/apps/about-app"), "AboutApp"),
  },
  {
    id: "education",
    title: "Study / Education",
    icon: GraduationCap,
    env: "academic",
    w: 720,
    h: 560,
    dock: true,
    component: lazy(() => import("@/components/apps/education-app"), "EducationApp"),
  },
  {
    id: "skills",
    title: "Technical Skills",
    icon: Brain,
    env: "neural",
    w: 760,
    h: 580,
    dock: true,
    component: lazy(() => import("@/components/apps/skills-app"), "SkillsApp"),
  },
  {
    id: "tools",
    title: "Tools I Know",
    icon: Wrench,
    env: "workstation",
    w: 760,
    h: 580,
    dock: true,
    component: lazy(() => import("@/components/apps/tools-app"), "ToolsApp"),
  },
  {
    id: "projects",
    title: "Project Lab",
    icon: FlaskConical,
    env: "lab",
    w: 820,
    h: 620,
    dock: true,
    component: lazy(() => import("@/components/apps/projects-app"), "ProjectsApp"),
  },
  {
    id: "resume",
    title: "Resume",
    icon: FileText,
    env: "document",
    w: 820,
    h: 640,
    dock: true,
    component: lazy(() => import("@/components/apps/resume-app"), "ResumeApp"),
  },
  {
    id: "cv",
    title: "CV",
    icon: ScrollText,
    env: "document",
    w: 820,
    h: 640,
    dock: true,
    component: lazy(() => import("@/components/apps/cv-app"), "CvApp"),
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    icon: Linkedin,
    env: "network",
    w: 560,
    h: 460,
    dock: true,
    component: lazy(() => import("@/components/apps/linkedin-app"), "LinkedInApp"),
  },
  {
    id: "github",
    title: "GitHub",
    icon: Github,
    env: "code",
    w: 640,
    h: 520,
    dock: true,
    component: lazy(() => import("@/components/apps/github-app"), "GithubApp"),
  },
  {
    id: "instagram",
    title: "Instagram",
    icon: Instagram,
    env: "social",
    w: 560,
    h: 520,
    dock: true,
    component: lazy(() => import("@/components/apps/instagram-app"), "InstagramApp"),
  },
  {
    id: "strengths",
    title: "Strengths",
    icon: Activity,
    env: "diagnostics",
    w: 700,
    h: 540,
    dock: true,
    component: lazy(() => import("@/components/apps/strengths-app"), "StrengthsApp"),
  },
  {
    id: "weaknesses",
    title: "Development Areas",
    icon: TrendingUp,
    env: "growth",
    w: 640,
    h: 480,
    dock: true,
    component: lazy(() => import("@/components/apps/weaknesses-app"), "WeaknessesApp"),
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    env: "contact",
    w: 640,
    h: 580,
    dock: true,
    component: lazy(() => import("@/components/apps/contact-app"), "ContactApp"),
  },
];

export function getApp(id: AppId): AppDef {
  return APPS.find((a) => a.id === id) as AppDef;
}
