/**
 * ALL personal content for the portfolio lives in this file.
 * Edit it to update the whole site — components never hard-code personal text.
 *
 * Anything marked `// TODO` is placeholder content waiting for real details.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SectionId =
  | "hero"
  | "about"
  | "skills"
  | "work"
  | "certifications"
  | "experience"
  | "achievements"
  | "contact";

export type NavItem = { id: SectionId; label: string };

export type Socials = {
  github: string;
  linkedin: string;
  x?: string;
  instagram?: string;
};

export type Site = {
  name: string;
  firstName: string;
  /** Two lines in the hero, e.g. ["Full Stack", "Developer"] */
  title: [string, string];
  subtitle: string;
  location: string;
  email: string;
  resumeUrl: string;
  /** Used for metadata, sitemap and Open Graph */
  url: string;
  description: string;
  socials: Socials;
};

export type Hero = {
  videoWebm: string;
  videoMp4: string;
  poster: string;
};

export type About = {
  bio: string[];
  whatIAm: { label: string; sub: string }[];
  facts: { label: string; value: string }[];
  quote: string;
};

export type SkillFamily =
  | "languages"
  | "frontend"
  | "backend"
  | "databases"
  | "tools"
  | "other";

export type Skill = {
  /** Two-letter element symbol, e.g. "Py" */
  symbol: string;
  name: string;
  family: SkillFamily;
  /** "Atomic number" shown in the tile corner */
  number: number;
  /** One line shown in the detail panel */
  note: string;
  /** Simple Icons slug, e.g. "python", "nextdotjs" (mapped to a logo in the Skills section) */
  icon: string;
};

export type Project = {
  title: string;
  subtitle: string;
  role: string;
  year: string;
  category: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  live?: string;
  /** Path under /public, e.g. "/projects/cleanloop.webp" */
  image?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year?: string;
  url?: string;
};

export type TimelineEntry = {
  year: string;
  type: "education" | "experience" | "internship";
  title: string;
  org: string;
  period: string;
  detail?: string;
  badge?: string;
};

export type Achievements = {
  stats: {
    platform: string;
    /** Simple Icons slug, e.g. "leetcode" */
    icon: string;
    value: number;
    suffix: string;
    label: string;
    description: string;
  }[];
  rankings: {
    rank: string;
    prefix: "No." | "Top";
    event: string;
    year: string;
    description: string;
  }[];
};

export type Content = {
  site: Site;
  nav: NavItem[];
  hero: Hero;
  about: About;
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  timeline: TimelineEntry[];
  achievements: Achievements;
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export const content: Content = {
  site: {
    name: "Pasindu Nuwantha", // TODO: confirm full name as you want it displayed
    firstName: "Pasindu",
    title: ["Full Stack", "Developer."], // TODO: confirm title
    subtitle: "I design and build calm, fast, thoughtful products for the web.", // TODO
    location: "Your City, Country", // TODO
    email: "hello@example.com", // TODO
    resumeUrl: "/resume.pdf", // TODO: add public/resume.pdf
    url: "https://portfolio-pasindu-nuwantha.vercel.app", // TODO: update after first Vercel deploy
    description:
      "Portfolio of Pasindu Nuwantha — full stack developer building thoughtful web products.", // TODO
    socials: {
      github: "https://github.com/pasinduNuwantha",
      linkedin: "https://www.linkedin.com/in/your-handle", // TODO
      // x: "https://x.com/your-handle", // TODO (optional)
      // instagram: "https://instagram.com/your-handle", // TODO (optional)
    },
  },

  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ],

  hero: {
    videoWebm: "/hero/hero.webm", // TODO: add file
    videoMp4: "/hero/hero.mp4", // TODO: add file
    poster: "/hero/hero-poster.jpg", // TODO: add file
  },

  about: {
    // TODO: replace with your real bio
    bio: [
      "I'm a developer who enjoys the whole journey of a product — from a rough idea on paper to a fast, polished experience in the browser.",
      "Lately I've been focused on modern React, type-safe backends and the small details that make an interface feel calm and considered.",
    ],
    // TODO: your five "What I am" items
    whatIAm: [
      { label: "Full stack developer", sub: "React · Node · SQL" },
      { label: "Problem solver", sub: "Algorithms & clean design" },
      { label: "Fast learner", sub: "Always picking up something new" },
      { label: "Team player", sub: "Clear communication, honest feedback" },
      { label: "Detail-oriented", sub: "Pixels, performance, accessibility" },
    ],
    // TODO
    facts: [
      { label: "Based in", value: "Your City" },
      { label: "Focus", value: "Full stack web" },
      { label: "Currently", value: "Studying / building" },
      { label: "Open to", value: "Internships & freelance" },
    ],
    quote: "Make it work, make it right, make it calm.", // TODO
  },

  // TODO: replace with your real stack (numbers are just display order)
  skills: [
    { number: 1, symbol: "Js", name: "JavaScript", family: "languages", icon: "javascript", note: "TODO: what you use it for" },
    { number: 2, symbol: "Ts", name: "TypeScript", family: "languages", icon: "typescript", note: "TODO" },
    { number: 3, symbol: "Py", name: "Python", family: "languages", icon: "python", note: "TODO" },
    { number: 4, symbol: "Re", name: "React", family: "frontend", icon: "react", note: "TODO" },
    { number: 5, symbol: "Nx", name: "Next.js", family: "frontend", icon: "nextdotjs", note: "TODO" },
    { number: 6, symbol: "Tw", name: "Tailwind CSS", family: "frontend", icon: "tailwindcss", note: "TODO" },
    { number: 7, symbol: "No", name: "Node.js", family: "backend", icon: "nodedotjs", note: "TODO" },
    { number: 8, symbol: "Ex", name: "Express", family: "backend", icon: "express", note: "TODO" },
    { number: 9, symbol: "Pg", name: "PostgreSQL", family: "databases", icon: "postgresql", note: "TODO" },
    { number: 10, symbol: "Mo", name: "MongoDB", family: "databases", icon: "mongodb", note: "TODO" },
    { number: 11, symbol: "Gt", name: "Git", family: "tools", icon: "git", note: "TODO" },
    { number: 12, symbol: "Dk", name: "Docker", family: "tools", icon: "docker", note: "TODO" },
    { number: 13, symbol: "Fg", name: "Figma", family: "other", icon: "figma", note: "TODO" },
  ],

  // TODO: replace with your real projects
  projects: [
    {
      title: "Project One",
      subtitle: "a short poetic tagline",
      role: "Full stack",
      year: "2025",
      category: "Web app",
      description:
        "Two or three sentences about what this project is, who it's for and what problem it solves. Mention the most interesting technical decision.",
      features: ["Key feature one", "Key feature two", "Key feature three", "Key feature four"],
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
      github: "https://github.com/pasinduNuwantha",
    },
    {
      title: "Project Two",
      subtitle: "another short tagline",
      role: "Frontend",
      year: "2025",
      category: "Mobile-first site",
      description: "Placeholder description for your second project.",
      features: ["Feature one", "Feature two", "Feature three"],
      tech: ["React", "Tailwind CSS"],
    },
    {
      title: "Project Three",
      subtitle: "a third tagline",
      role: "Backend",
      year: "2024",
      category: "API",
      description: "Placeholder description for your third project.",
      features: ["Feature one", "Feature two"],
      tech: ["Node.js", "Express", "MongoDB"],
    },
  ],

  // TODO: replace with your real certifications
  certifications: [
    { name: "Certification name", issuer: "Issuer", year: "2025" },
    { name: "Another certification", issuer: "Issuer", year: "2024" },
    { name: "Third certification", issuer: "Issuer", year: "2024" },
  ],

  // TODO: replace with your real education & experience
  timeline: [
    {
      year: "2021",
      type: "education",
      title: "Your degree",
      org: "Your university",
      period: "2021 — Present",
      detail: "Short description or score.",
      badge: "Expected 2027",
    },
    {
      year: "2024",
      type: "internship",
      title: "Software Engineering Intern",
      org: "Company name",
      period: "Jun 2024 — Dec 2024",
      detail: "What you worked on and what you learned.",
    },
  ],

  // TODO: replace with your real numbers
  achievements: {
    stats: [
      { platform: "LeetCode", icon: "leetcode", value: 100, suffix: "+", label: "Problems solved", description: "TODO: one line" },
      { platform: "GitHub", icon: "github", value: 20, suffix: "+", label: "Repositories", description: "TODO: one line" },
    ],
    rankings: [
      { rank: "1", prefix: "No.", event: "Hackathon name", year: "2025", description: "TODO: short description" },
      { rank: "100", prefix: "Top", event: "Competition name", year: "2024", description: "TODO: short description" },
    ],
  },
};
