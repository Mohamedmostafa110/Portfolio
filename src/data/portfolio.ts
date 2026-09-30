/**
 * ---------------------------------------------------------------------------
 *  PORTFOLIO DATA — single source of truth.
 *
 *  Add / edit / reorder everything here. The UI consumes this file
 *  dynamically; you should rarely need to touch components.
 *
 *  - Add a project     -> push one object into `projects`
 *  - Add a certificate -> push one object into `certificates`
 *  - Add journey entry -> push one object into `journey`
 *  - Add a skill       -> add a string into the right group in `skills`
 *
 *  Fields marked "TODO/placeholder" are intentionally left for real data —
 *  the UI renders them honestly instead of inventing details.
 * ---------------------------------------------------------------------------
 */

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

/* --------------------------------- Services ------------------------------- */

export interface Service {
  icon: "interface" | "experience" | "website" | "integration" | "fullstack";
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: "interface",
    title: "Responsive & Modern Interfaces",
    description:
      "Clean, fast interfaces that work beautifully on every screen and stay maintainable as the product grows.",
  },
  {
    icon: "experience",
    title: "Interactive User Experiences",
    description:
      "Thoughtful motion and micro-interactions that guide users instead of decorating the page.",
  },
  {
    icon: "website",
    title: "Custom Website Solutions",
    description: "Tailored websites built around real business needs — not themes, not templates.",
  },
  {
    icon: "integration",
    title: "API & System Integration",
    description:
      "Connecting frontends to backends, third-party services, and databases with clean, documented contracts.",
  },
  {
    icon: "fullstack",
    title: "Full-Stack Application Development",
    description:
      "End-to-end product development: interface, business logic, database, APIs, and deployment.",
  },
];

/* --------------------------------- Projects ------------------------------- */

export interface CaseStudy {
  problem: string;
  role: string;
  thinking?: string; // optional — fill in when you have real details
  architecture: string[];
  decisions: string[];
  challenges?: string;
  outcome?: string;
  lessons?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  year: number;
  category: "Web App" | "Platform" | "Desktop" | "Embedded";
  description: string;
  /** Screenshot path under /public, e.g. "/images/projects/fitpro-1.png".
      If the file is missing, a branded placeholder is rendered instead. */
  image?: string;
  technologies: string[];
  liveDemo?: string;
  github?: string;
  featured?: boolean;
  /** A clearly-labeled related build that is NOT part of this project. */
  relatedNote?: string;
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    id: "fitpro",
    title: "FitPro",
    tagline: "Train. Track. Transform.",
    year: 2026,
    category: "Web App",
    featured: true,
    description:
      "A React-based fitness platform for planning training, tracking progress, and staying consistent — built as my ITI React graduation project.",
    image: "/images/projects/project-1.png",
    technologies: ["React", "JavaScript", "CSS", "Vite"],
    // TODO: add real links
    liveDemo: "https://fitfro-itiproject.vercel.app/",
    github: "https://github.com/Mohamedmostafa110/fitpro-iti-graduation-project",
    caseStudy: {
      problem:
        "People starting a fitness routine struggle to stay consistent because progress is scattered and hard to see. FitPro centralizes training and tracking in one focused product.",
      role: "Sole frontend engineer — designed the component architecture, state management, and user flows.",
      thinking:
        "Placeholder — describe the product decisions (routing, state shape, data flow) when finalizing the case study.",
      architecture: [
        "Component-based React UI",
        "Client-side routing between training views",
        "Centralized application state",
        "Reusable UI primitives (cards, stats, forms)",
      ],
      decisions: [
        "React + Vite for a fast, modern development and production build",
        "Component composition over deep prop drilling to keep views predictable",
        "UI organized around user goals (train / track / transform) rather than pages",
      ],
      challenges: "Placeholder — add the hardest technical problem you solved on this project.",
      outcome: "Delivered as the graduation project of the ITI React program.",
      lessons:
        "Placeholder — what would you do differently at scale (backend persistence, auth, offline)?",
    },
  },
  {
    id: "zad-almarefa",
    title: "Zad Almarefa",
    tagline: "زاد المعرفة — Islamic education platform",
    year: 2026,
    category: "Platform",
    description:
      "A Progressive Web App for Islamic education: Azhar content, Quran, library, exams, events, and certificates — all in one accessible platform.",
    image: "/images/projects/project-2.png",
    technologies: ["HTML", "CSS", "JavaScript", "PWA"],
    liveDemo: "https://mohamedmostafa110.github.io/zad-almaarefa/",
    github: "https://github.com/Mohamedmostafa110/zad-almaarefa.git",
    caseStudy: {
      problem:
        "Islamic educational content — Quran, Azhar curricula, libraries, exams — is spread across disconnected sources. The platform unifies learning, assessment, and events in one place.",
      role: "Frontend developer — built the interface, content structure, and PWA behavior.",
      architecture: [
        "Multi-view PWA shell with offline-friendly assets",
        "Structured content sections: Quran, Azhar, library, exams, events, certificates",
        "Vanilla JavaScript interaction layer on semantic HTML/CSS",
      ],
      decisions: [
        "PWA approach so students can open it like a native app and rely less on connectivity",
        "Semantic, accessible markup as the foundation for a content-heavy platform",
        "Zero heavy frameworks — performance and load time prioritized",
      ],
      challenges: "Placeholder — e.g. offline caching strategy, content volume, exam flow UX.",
      lessons: "Placeholder — what the PWA model taught you about perceived performance.",
    },
  },

  {
    id: "esp32-robot",
    title: "ESP32 Robot Car",
    tagline: "Team-built embedded control system",
    year: 2026,
    category: "Embedded",
    description:
      "A team project: an ESP32-driven robot car — a hands-on exploration of hardware, control, and system integration. A companion build from the same project-building phase as Zad Almarefa, not part of the platform itself.",
    image: "/images/projects/project-3.png",
    technologies: ["ESP32", "C/C++", "Embedded Systems"],
    relatedNote:
      "Context: built during the same project phase as Zad Almarefa — a hardware counterpart to the platform work, not a feature of it.",
    github:
      "https://drive.google.com/drive/folders/1_993vbZW5nC_CJLG-S2immMqkF7aqfVC?usp=drive_link",
    caseStudy: {
      problem:
        "Design and control a small robotic vehicle as a practical embedded-systems exercise in a team setting.",
      role: "Team member — shared responsibility for control logic and integration.",
      architecture: [
        "ESP32 as the on-board controller",
        "Motor control driven by microcontroller signals",
        "Team-based build and integration workflow",
      ],
      decisions: [
        "ESP32 chosen for its connectivity options and approachable toolchain",
        "Small, verifiable milestones agreed as a team",
      ],
      challenges: "Placeholder — e.g. power, wiring stability, control latency.",
      lessons:
        "Placeholder — what building a physical system changed in how you think about software reliability.",
    },
  },
  {
    id: "task-manager",
    title: "Task Manager System",
    tagline: "Desktop task management, done properly",
    year: 2025,
    category: "Desktop",
    description:
      "A C# WinForms application for managing work: CRUD, completion states, priorities, filtering, search, and file save/load — a deep dive into desktop logic and data handling.",
    image: "/images/projects/project-4.jpeg",
    technologies: ["C#", ".NET", "WinForms"],
    github:
      "https://drive.google.com/drive/folders/1a2AFSGiCV5ZQDVukRVwtASRCU_uxDehy?usp=drive_link",
    caseStudy: {
      problem:
        "Keep tasks organized with priorities, completion states, and persistence — without a database server, using local file save/load.",
      role: "Sole developer — UI, business logic, and file persistence.",
      architecture: [
        "WinForms UI layer over a separated task/domain model",
        "CRUD operations with in-memory state",
        "File-based save/load for persistence",
        "Filtering + search over task state",
      ],
      decisions: [
        "Clear separation between UI events and task logic",
        "Priority + completion state modeled explicitly instead of loose strings",
        "Simple, inspectable file format for save/load",
      ],
      challenges: "Placeholder — e.g. keeping UI state consistent with data state after filtering.",
      lessons: "Placeholder — how this shaped your approach to state management in later projects.",
    },
  },
];

/* ---------------------------------- Journey ------------------------------- */

export interface JourneyEntry {
  period: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
}

export const journey: JourneyEntry[] = [
  {
    period: "2026",
    title: "React Graduation Project — FitPro",
    organization: "Information Technology Institute (ITI)",
    description:
      "Built FitPro, a fitness tracking platform, as the graduation project of the ITI React program — from component architecture to final delivery.",
    tags: ["React", "Product Development"],
  },
  {
    period: "2025 — 2026",
    title: "Building Full-Stack Foundations",
    organization: "Self-directed & program work",
    description:
      "Deep, deliberate practice across the stack: C# and .NET, SQL Server and database design, REST APIs — alongside shipped projects like Zad Almarefa and the Task Manager System.",
    tags: ["C#", ".NET", "SQL", "APIs"],
  },
  // TODO: uncomment and fill in as milestones happen — the timeline updates itself.
  // {
  //   period: "2026 — 2028",
  //   title: "Your next milestone",
  //   organization: "…",
  //   description: "…",
  //   tags: [],
  // },
];

/* ------------------------------ Certificates ------------------------------ */

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  image?: string; // /images/certificates/xxx.png — a branded placeholder renders if missing
  kind?: "Certification" | "Achievement" | "Milestone";
  description?: string;
  experience?: string;
  achievements?: string[];
  learnings?: string[];
  skills?: string[];
}

/**
 * No certificates have been added yet. Add real ones as simple objects:
 *
 * {
 *   title: "React Development",
 *   issuer: "ITI",
 *   year: "2026",
 *   image: "/images/certificates/react-iti.png",
 *   kind: "Certification",
 *   description: "What this certification or milestone was about.",
 *   experience: "What I worked on and how the experience went.",
 *   achievements: ["What I completed or achieved."],
 *   learnings: ["What I learned."],
 *   skills: ["React", "JavaScript"],
 * },
 */
export const certificates: Certificate[] = [];

/* ---------------------------------- Skills -------------------------------- */

export interface SkillGroup {
  label: string;
  note: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    note: "Interfaces",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "Backend",
    note: "Logic & APIs",
    skills: ["C#", ".NET", "ASP.NET Core", "Web APIs", "REST"],
  },
  {
    label: "Database",
    note: "Data & Design",
    skills: ["SQL", "SQL Server", "Database Design", "ERD"],
  },
  {
    label: "Tools",
    note: "Workflow",
    skills: ["Git", "GitHub", "Vite", "Docker"],
  },
  {
    label: "Exploring",
    note: "Next",
    skills: ["AI", "LLM Applications", "AI Automation"],
  },
  {
    label: "Practice",
    note: "METHODOLOGY",
    skills: ["Problem Solving", "Agile / Scrum", "Clean Code", "Code Review", "Communication"],
  },
];

/* ------------------------------- Social links ----------------------------- */

export interface SocialLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "mail";
}

export const socials: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/mohamed-mostafa", icon: "github" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/mohamed-mostafa", icon: "linkedin" },
  { label: "Email", url: "mailto:hello@mohamedmostafa.dev", icon: "mail" },
];
