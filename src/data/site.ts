/**
 * SITE CONTENT — edit this file to update the website.
 *
 * Projects: see `featuredProjects` and `otherProjects` below.
 * To add a project, copy an existing object, fill in the fields, and save.
 * Then restart is not required in `npm run dev` — Vite hot-reloads this file.
 *
 * Field reference for a project:
 *   id            unique slug (used as React key)
 *   name          display title
 *   category      short label, e.g. "AI × Cybersecurity"
 *   description   one sentence shown on the card
 *   technologies  short list of tech names
 *   github        GitHub URL, or null if the repo is not public yet
 *   live          optional live demo URL
 *   flagship      true = larger featured treatment on the homepage
 */

export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  github: string | null;
  live?: string | null;
  flagship?: boolean;
};

export type JourneyItem = {
  kind: "education" | "training" | "program";
  title: string;
  org: string;
  detail: string;
  dates: string;
  note: string;
};

export const profile = {
  name: "Javesh Khosla",
  title: "Javesh Khosla — AI, Cybersecurity & Software",
  description:
    "Personal website of Javesh Khosla, a Computer Science Engineering student exploring artificial intelligence, cybersecurity and software development.",
  role: "Computer Science Engineering Student",
  focus: "AI, cybersecurity and software development.",
  tags: ["AI", "Cybersecurity", "Software Development"],
  intro:
    "I build practical software systems at the intersection of artificial intelligence, security and the web.",
  about: [
    "I'm a Computer Science Engineering student at Guru Nanak Dev University, exploring the intersection of artificial intelligence, cybersecurity and software development.",
    "I enjoy turning ideas into working systems — from AI-powered security tools and GIS decision-support prototypes to computer-vision experiments and small web applications.",
    "My current interests are moving deeper into AI for cybersecurity, intelligent applications and the engineering behind reliable software.",
  ],
  exploringIntro:
    "I'm still a student, and these are the areas I'm actively studying and building in — not claims of expertise.",
  contactIntro:
    "I'm always interested in learning, building and discussing ideas around AI, cybersecurity and software.",
};

export const links = {
  github: "https://github.com/javeshK",
  linkedin: "https://www.linkedin.com/in/javeshkhosla/",
  /**
   * Recipient for the Contact form. Set this to Javesh’s real address.
   * Leave as "" until then — the form still reads `links.email` and will not invent an inbox.
   * Delivery uses FormSubmit (https://formsubmit.co/{email}); that inbox must confirm once.
   */
  email: "656aa3b472a04038f50533d80bc2b482" as string,
};

export const nav: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const featuredProjects: Project[] = [
  {
    id: "rakshakai",
    name: "RakshakAI",
    category: "AI × Cybersecurity",
    description:
      "An AI-powered cyber threat intelligence platform for detecting and analyzing digital fraud and related threats.",
    technologies: ["Python", "Flask", "Scikit-learn", "OpenCV", "Tailwind CSS"],
    github: "https://github.com/Rakshak-Labs/RakshakAI",
    flagship: true,
  },
  {
    id: "redzone-dss",
    name: "RedZone DSS",
    category: "GIS × Decision Support",
    description:
      "An explainable GIS decision-support prototype for Rudraprayag that takes an officer from a hazard map to a vulnerable habitation, a safer site, and a first-order screening of carrying capacity.",
    technologies: ["Python", "FastAPI", "React", "Leaflet", "GIS"],
    github: "https://github.com/javeshK/redzone-dss",
  },
  {
    id: "watermark-2",
    name: "Watermark 2.0",
    category: "Computer Vision × Security",
    description:
      "A DWT + DCT hybrid image watermarking pipeline with CNN-based detection, explored under compression, noise, blur and geometric transforms.",
    technologies: ["Python", "PyTorch", "OpenCV", "DWT", "DCT"],
    github: "https://github.com/javeshK/Watermark_2.0",
  },
  {
    id: "weather-is-a-joke",
    name: "Weather is a Joke",
    category: "Creative AI / Web Experiment",
    description:
      "A playful weather experience that turns atmospheric data into narrative vibe checks, visual themes and an interactive interface.",
    technologies: ["React", "Vite", "Tailwind CSS", "Motion"],
    github: "https://github.com/javeshK/weather-is-a-joke",
    live: "https://javeshk.github.io/weather-is-a-joke/",
  },
];

export const otherProjects: Project[] = [
  {
    id: "river-alert",
    name: "River Alert System",
    category: "Software experiment",
    description: "An early experiment around river-related alerting.",
    technologies: ["GitHub"],
    github: "https://github.com/javeshK/river-alert-system",
  },
  {
    id: "space-shooter",
    name: "Space Shooter Game",
    category: "Game experiment",
    description: "A small space-shooter prototype.",
    technologies: ["GitHub"],
    github: "https://github.com/javeshK/space-shooter-game-beta-",
  },
  {
    id: "bollywood-blanks",
    name: "Bollywood Blanks",
    category: "Web experiment",
    description: "A short interactive experiment published on GitHub Pages.",
    technologies: ["TypeScript"],
    github: "https://github.com/javeshK/bollywood-blanks",
    live: "https://javeshk.github.io/bollywood-blanks/",
  },
  {
    id: "interviewgenai",
    name: "InterviewGenAI",
    category: "Generative AI experiment",
    description: "A Flask interview-question experiment using Google Gemini.",
    technologies: ["Python", "Flask"],
    github: "https://github.com/javeshK/InterviewGenAI",
  },
];

export type Interest = {
  title: string;
  synopsis: string;
};

export const interests: Interest[] = [
  {
    title: "Artificial Intelligence",
    synopsis:
      "Systems that learn from data, adapt to new inputs, and automate decisions — the foundation behind most of what I study and build.",
  },
  {
    title: "Generative AI",
    synopsis:
      "Models that create text, images, and code. I'm interested in how they work under the hood and how to build useful, reliable applications on top of them.",
  },
  {
    title: "AI for Cybersecurity",
    synopsis:
      "Applying machine learning to detect threats, spot anomalies, and strengthen defenses in ways that go beyond static rules and signatures.",
  },
  {
    title: "Cyber Threat Intelligence",
    synopsis:
      "Collecting and analysing signals about attackers, campaigns, and vulnerabilities to understand risk before it becomes an incident.",
  },
  {
    title: "Computer Vision",
    synopsis:
      "Teaching machines to interpret images and video — from classification and detection to end-to-end vision pipelines in real projects.",
  },
  {
    title: "Intelligent Applications",
    synopsis:
      "Software that embeds AI into everyday workflows thoughtfully, so the intelligence feels purposeful rather than bolted on.",
  },
  {
    title: "Security Automation",
    synopsis:
      "Orchestrating scanning, monitoring, and response tasks with scripts and tooling to cut manual overhead and move faster.",
  },
  {
    title: "Software Engineering",
    synopsis:
      "Designing and shipping dependable systems — clear architecture, solid testing, and code that stays maintainable as it grows.",
  },
];

export const journey: JourneyItem[] = [
  {
    kind: "education",
    title: "Computer Science Engineering",
    org: "Guru Nanak Dev University",
    detail: "Undergraduate programme",
    dates: "2024 — 2028",
    note: "Currently enrolled.",
  },
  {
    kind: "training",
    title: "AI for Cybersecurity",
    org: "Centre for Development of Advanced Computing (C-DAC), Mohali",
    detail: "AI for Future Workforce Program — summer training",
    dates: "June 1, 2026 — July 10, 2026",
    note: "Summer training focused on the intersection of artificial intelligence and cybersecurity.",
  },
  {
    kind: "program",
    title: "Generative AI & Cloud Computing",
    org: "IBM SkillsBuild × BharatCares × AICTE",
    detail: "Industry-oriented learning programme",
    dates: "June 22, 2026 — July 31, 2026",
    note: "A 6-week industry-oriented learning experience covering Generative AI and Cloud Computing.",
  },
];
