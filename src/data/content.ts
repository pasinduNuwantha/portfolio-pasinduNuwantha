/**
 * ALL personal content for the portfolio lives in this file.
 * Edit it to update the whole site — components never hard-code personal text.
 *
 * Anything marked `// TODO` is placeholder content waiting for real details.
 */

import type { BrandIconSlug } from "@/lib/brandIcons";

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
  /** One line about what you're looking for (shown at the end of the timeline) */
  availability: string;
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
  icon: BrandIconSlug;
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
  type: "education" | "experience" | "internship" | "project" | "activity";
  title: string;
  org: string;
  period: string;
  detail?: string;
  badge?: string;
};

export type Achievements = {
  stats: {
    /** Where the number comes from, e.g. "GitHub" or "Portfolio" */
    platform: string;
    /** Brand logo (Simple Icons slug). Leave out to show `symbol` as an element tile instead. */
    icon?: BrandIconSlug;
    /** Two-letter tile shown when there's no brand logo, e.g. "Pr" */
    symbol?: string;
    value: number;
    suffix: string;
    label: string;
    description: string;
  }[];
  /**
   * Big-number ranking cards ("No. 1", "Top 100") or word highlights ("Diploma").
   * `prefix` is optional — leave it out for word highlights.
   */
  rankings: {
    rank: string;
    prefix?: "No." | "Top";
    event: string;
    year?: string;
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
    name: "Pasindu Nuwantha",
    firstName: "Pasindu",
    title: ["Full Stack", "Developer."],
    subtitle:
      "Third-year Software Engineering undergraduate at SLIIT, building mobile and full-stack apps.",
    location: "Gampaha, Sri Lanka",
    email: "pasindunuwantha19@gmail.com",
    resumeUrl: "/resume.pdf",
    availability: "I'm looking for a software engineering internship.",
    url: "https://portfolio-pasindu-nuwantha.vercel.app", // TODO: update after first Vercel deploy
    description:
      "Pasindu Nuwantha — Software Engineering undergraduate at SLIIT building mobile and full-stack applications with React Native, the MERN stack, Docker and Kubernetes.",
    socials: {
      github: "https://github.com/pasinduNuwantha",
      linkedin: "https://www.linkedin.com/in/pasindu-nuwantha-111267283",
      // x: "https://x.com/your-handle", // optional
      // instagram: "https://instagram.com/your-handle", // optional
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
    bio: [
      "I'm a third-year Software Engineering undergraduate at SLIIT who loves building things people actually use — cross-platform mobile apps with React Native and Firebase, web apps on the MERN stack, and microservices running in Docker and Kubernetes.",
      "I work best in small Scrum teams: two-week sprints, honest retrospectives and a review on every pull request. I like starting from real user research and turning it into features. Right now I'm looking for a software engineering internship.",
    ],
    whatIAm: [
      { label: "Full-stack developer", sub: "MERN · REST APIs" },
      { label: "Mobile developer", sub: "React Native · Expo · Kotlin" },
      { label: "Microservices builder", sub: "Docker · Kubernetes" },
      { label: "Scrum team player", sub: "Sprints · Jira · code reviews" },
      { label: "User-research driven", sub: "Interviews · personas · flows" },
    ],
    facts: [
      { label: "Based in", value: "Gampaha, Sri Lanka" },
      { label: "Studying", value: "BSc (Hons) SE · SLIIT" },
      { label: "Currently", value: "Third year" },
      { label: "Open to", value: "SE internships" },
      { label: "Off-screen", value: "Karate · Leo Club · travel" },
    ],
    quote: "Talk to real users first — then let the code prove it.", // TODO: replace with your own quote
  },

  // Numbers are just display order. Notes show in the Skills detail panel.
  skills: [
    // Languages
    { number: 1, symbol: "Js", name: "JavaScript", family: "languages", icon: "javascript", note: "My everyday language — React, React Native and Node.js." },
    { number: 2, symbol: "Ja", name: "Java", family: "languages", icon: "openjdk", note: "Object-oriented programming and university coursework." },
    { number: 3, symbol: "Py", name: "Python", family: "languages", icon: "python", note: "Scripting, algorithms and data work." },
    { number: 4, symbol: "Kt", name: "Kotlin", family: "languages", icon: "kotlin", note: "Native Android apps in Android Studio." },
    { number: 5, symbol: "C", name: "C", family: "languages", icon: "c", note: "Programming fundamentals and memory basics." },
    { number: 6, symbol: "Cp", name: "C++", family: "languages", icon: "cplusplus", note: "Data structures and object-oriented design." },
    { number: 7, symbol: "Ph", name: "PHP", family: "languages", icon: "php", note: "Server-side web development." },
    // Frontend & mobile
    { number: 8, symbol: "Re", name: "React", family: "frontend", icon: "react", note: "Web front ends, including Calm Space's mood tracker." },
    { number: 9, symbol: "Rn", name: "React Native", family: "frontend", icon: "react", note: "Cross-platform mobile — the CleanLoop app." },
    { number: 10, symbol: "Ex", name: "Expo", family: "frontend", icon: "expo", note: "React Native tooling and React Navigation." },
    { number: 11, symbol: "Ht", name: "HTML", family: "frontend", icon: "html5", note: "Semantic, accessible markup." },
    { number: 12, symbol: "Cs", name: "CSS", family: "frontend", icon: "css", note: "Responsive layouts and styling." },
    // Backend
    { number: 13, symbol: "No", name: "Node.js", family: "backend", icon: "nodedotjs", note: "APIs and the healthcare notification microservice." },
    { number: 14, symbol: "Es", name: "Express", family: "backend", icon: "express", note: "REST APIs on the MERN stack." },
    { number: 15, symbol: "Fb", name: "Firebase", family: "backend", icon: "firebase", note: "Auth, Cloud Firestore and Storage with security rules." },
    // Databases
    { number: 16, symbol: "Mg", name: "MongoDB", family: "databases", icon: "mongodb", note: "Document data for MERN apps." },
    { number: 17, symbol: "My", name: "MySQL", family: "databases", icon: "mysql", note: "Relational modelling and SQL queries." },
    { number: 18, symbol: "Fs", name: "Cloud Firestore", family: "databases", icon: "firebase", note: "Real-time listeners and role-based rules." },
    // Tools
    { number: 19, symbol: "Gt", name: "Git", family: "tools", icon: "git", note: "GitFlow, feature branches and pull-request reviews." },
    { number: 20, symbol: "Dk", name: "Docker", family: "tools", icon: "docker", note: "Containerising microservices." },
    { number: 21, symbol: "K8", name: "Kubernetes", family: "tools", icon: "kubernetes", note: "Orchestrating the healthcare services." },
    { number: 22, symbol: "Jt", name: "Jest", family: "tools", icon: "jest", note: "Unit testing." },
    { number: 23, symbol: "Pm", name: "Postman", family: "tools", icon: "postman", note: "API testing." },
    { number: 24, symbol: "As", name: "Android Studio", family: "tools", icon: "androidstudio", note: "Native Android development with Kotlin." },
    // Other
    { number: 25, symbol: "Fg", name: "Figma", family: "other", icon: "figma", note: "Wireframes and prototypes." },
    { number: 26, symbol: "Ji", name: "Jira", family: "other", icon: "jira", note: "Two-week Scrum sprints and backlogs." },
    { number: 27, symbol: "R", name: "R", family: "other", icon: "r", note: "Data analysis." },
  ],

  projects: [
    {
      title: "Healthcare System",
      subtitle: "reminders that always arrive",
      role: "Notification microservice",
      year: "2026",
      category: "Microservices",
      description:
        "A healthcare management system split into microservices. I built the notification service that automatically reminds patients about appointments by SMS, email and in-app messages, kept separate from the core appointment logic.",
      features: [
        "Multi-channel alerts with Twilio SMS and Nodemailer",
        "Retry logic and delivery status tracking",
        "Containerised with Docker, orchestrated on Kubernetes",
        "GitFlow with 3 developers and code reviews",
      ],
      tech: ["Node.js", "Docker", "Kubernetes", "Twilio", "Nodemailer"],
      // github: "", // add the repo link here if it becomes public
    },
    {
      title: "CleanLoop App",
      subtitle: "cleaner streets, one RSVP at a time",
      role: "Community Volunteer module",
      year: "2026",
      category: "Mobile app",
      description:
        "A smart waste management app. I built the Community Volunteer module, where organisers create and manage clean-up campaigns and volunteers browse events and RSVP — grounded in interviews with the Minuwangoda Municipal Council chairman and local volunteers.",
      features: [
        "Campaigns and RSVPs synced live with Cloud Firestore",
        "Firebase Auth and rules for 5 user roles",
        "Tech stack chosen with weighted decision matrices",
        "Personas and user flows from real user research",
      ],
      tech: ["React Native", "Expo", "Firebase", "Cloud Firestore"],
      github: "https://github.com/SunthushGMS/CleanLoop",
    },
    {
      title: "Disaster Early Warning",
      subtitle: "the right warning, to the right district",
      role: "Hazard reporting & verification",
      year: "2026",
      category: "Web system",
      description:
        "An early-warning and emergency coordination system designed for Sri Lanka's Disaster Management Centre. I built the ground hazard report flow: citizens and volunteers report hazards with a photo and GPS location, even offline, and duty officers verify, reject or mark them as duplicates.",
      features: [
        "Hazard reports with photo and GPS location",
        "Offline-first queue with retry and back-off",
        "Officer review: verify, reject or mark duplicate",
        "Vitest suite with 80% coverage thresholds",
      ],
      tech: ["Next.js", "TypeScript", "Prisma", "Zod", "Vitest"],
      github: "https://github.com/SunthushGMS/smart-disaster-early-warning-system",
    },
    {
      title: "Calm Space",
      subtitle: "your mood, mapped in five seconds",
      role: "Mood tracking module",
      year: "2026",
      category: "Full-stack app",
      description:
        "A mental-wellbeing app. I built the mood tracker on the Circumplex Model of Affect, so moods are logged as a point on a valence–arousal map instead of a fixed list, then turned into insights with an AI layer.",
      features: [
        "Sub-5-second mood logging flow",
        "Valence–arousal input instead of static choices",
        "CSV and PDF export of your own data",
        "Mood AI insights with the Google Gemini API",
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
      github: "https://github.com/SunthushGMS/Calm-Space",
    },
    {
      title: "CleanLoop Web",
      subtitle: "shipped in two-week sprints",
      role: "Volunteer module · team of 4",
      year: "2026",
      category: "Web platform",
      description:
        "The web side of CleanLoop, built by a Scrum team of four on Jira. I delivered the Volunteer module, including event RSVP, as a working end-to-end slice in the very first sprint.",
      features: [
        "Sprint planning, stand-ups, reviews and retros",
        "Volunteer module with event RSVP",
        "Introduced peer review on every pull request",
        "Worked alongside Resident, Admin and Crew slices",
      ],
      tech: ["Scrum", "Jira"],
      github: "https://github.com/SunthushGMS/cleanloop-web",
    },
  ],

  certifications: [
    { name: "Indexing Design Fundamentals", issuer: "MongoDB", year: "2026" },
  ],

  timeline: [
    {
      year: "2019",
      type: "education",
      title: "GCE Ordinary Level",
      org: "Thakshila College, Gampaha",
      period: "2019",
    },
    {
      year: "2022",
      type: "education",
      title: "GCE Advanced Level — Science Stream",
      org: "Bandaranayake College, Gampaha",
      period: "2022",
    },
    {
      year: "2023",
      type: "education",
      title: "BSc (Hons) in Software Engineering",
      org: "Sri Lanka Institute of Information Technology (SLIIT)",
      period: "2023 — Present",
      detail: "Third year. Mobile, full-stack and microservices projects in Scrum teams.",
      badge: "Expected 2027",
    },
    {
      year: "2023", // TODO: the year you joined Leo Club
      type: "activity",
      title: "Leo Club member",
      org: "Leo Club of SLIIT",
      period: "Active member",
      detail: "Community service projects and leadership activities.",
    },
    {
      year: "2026",
      type: "project",
      title: "Notification microservice",
      org: "Healthcare System · team of 4",
      period: "2026",
      detail: "Built the multi-channel reminder service, containerised on Docker and Kubernetes, with GitFlow and code reviews.",
    },
    {
      year: "2026",
      type: "project",
      title: "Scrum developer",
      org: "CleanLoop · team of 4",
      period: "2026",
      detail: "Two-week sprints on Jira. Shipped the Volunteer module end-to-end in sprint one and introduced peer review on every PR.",
      badge: "Sprint 1 delivery",
    },
  ],

  achievements: {
    // GitHub numbers from github.com/pasinduNuwantha — update them now and then.
    stats: [
      { platform: "GitHub", icon: "github", value: 159, suffix: "", label: "Contributions", description: "Commits, pull requests and reviews in the last year." },
      { platform: "GitHub", icon: "github", value: 24, suffix: "", label: "Pull requests", description: "Opened across team projects, with peer review." },
      { platform: "Portfolio", symbol: "Pr", value: 5, suffix: "", label: "Projects built", description: "Mobile, web and microservices, all in real teams." },
      { platform: "Portfolio", symbol: "Tc", value: 27, suffix: "", label: "Technologies", description: "From React Native to Kubernetes — see the table above." },
    ],
    // No competitions yet, so these are word highlights (no prefix). Add rankings like
    // { prefix: "No.", rank: "1", event: "Hackathon", year: "2027", description: "…" } later.
    rankings: [
      { rank: "Diploma", event: "Karate", description: "Diploma holder — the sport that taught me discipline, focus and perseverance." },
      { rank: "Member", event: "Leo Club, SLIIT", description: "Community service and leadership alongside my degree." },
      { rank: "Certified", event: "MongoDB · Indexing Design", year: "2026", description: "Proof of completion for Indexing Design Fundamentals, issued by MongoDB." },
    ],
  },
};
