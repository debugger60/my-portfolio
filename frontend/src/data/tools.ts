import type { Tool } from "./types";

/* ============================================================
   TOOLS I KNOW — exactly the eight tools supplied.
   Honest one-liners; no exaggerated expertise.
   ============================================================ */

export const tools: Tool[] = [
  {
    id: "git-bash",
    name: "Git Bash",
    category: "Version Control",
    icon: "terminal",
    blurb: "Command-line environment I use to run Git and terminal workflows.",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Version Control",
    icon: "github",
    blurb: "Where I host and share my code repositories (github.com/debugger60).",
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "Code Editor",
    icon: "code",
    blurb: "My everyday code editor for writing and debugging Python.",
  },
  {
    id: "anaconda-nav",
    name: "Anaconda Navigator",
    category: "Data Science Platform",
    icon: "layers",
    blurb: "Desktop launcher I use to manage environments and open data tools.",
  },
  {
    id: "anaconda-prompt",
    name: "Anaconda Prompt",
    category: "Data Science Platform",
    icon: "prompt",
    blurb: "Conda-powered terminal for managing Python environments and packages.",
  },
  {
    id: "miniconda",
    name: "Miniconda",
    category: "Data Science Platform",
    icon: "package",
    blurb: "Lightweight Conda installer for Python environments.",
  },
  {
    id: "jupyter-notebook",
    name: "Jupyter Notebook",
    category: "Notebook",
    icon: "notebook",
    blurb: "Interactive notebooks I use for data analysis and exploration.",
  },
  {
    id: "jupyterlab",
    name: "JupyterLab",
    category: "Notebook",
    icon: "flask",
    blurb: "Modern notebook workspace for data science and ML experiments.",
  },
];
