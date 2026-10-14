// All site content lives here. Edit this file to update the portfolio.

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  timeline: string;
  year: string;
  team: string;
  stack: string[];
  highlights: string[];
  metric?: { value: string; label: string };
  flow?: string[];
  links?: { github?: string; live?: string };
  image?: string;
  // Full-page screenshot height in px at 1440px wide
  imageHeight?: number;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  stack: string[];
  highlights: string[];
};

export const profile = {
  name: "Aman Srivastav",
  firstName: "Aman",
  lastName: "Srivastav",
  title: "Backend & AI Developer",
  tagline: "APIs, AI systems & the code in between.",
  taglineEmphasis: "I take production seriously.",
  // Cycled in the hero after "I design & build"
  roles: ["AI services.", "RAG pipelines.", "backend APIs.", "full-stack products.", "client websites."],
  services: ["Backend APIs", "AI / LLM", "RAG Pipelines", "Full-Stack Web", "Freelance"],
  intro:
    "Hi, I'm Aman, a backend-focused developer building AI services in Python and FastAPI. I ship RAG pipelines, LLM integrations and the APIs they run on, with JWT access control, Redis caching and tests that keep them honest. Shipping a live e-commerce platform taught me to care about validation, security and production debugging.",
  location: "India · Remote",
  availability: "Open to full-time roles & freelance projects",
  email: "amansrivastav606@gmail.com",
  cv: "/Aman_Srivastav_CV.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Aman-srivastav24" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aman-srivastavv/" },
  ],
};

export const toolbelt = [
  "Python",
  "FastAPI",
  "PostgreSQL",
  "pgvector",
  "LangGraph",
  "Redis",
  "Docker",
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Firebase",
  "Prisma",
  "pytest",
];

export const projects: Project[] = [
  {
    slug: "ai-support-triage",
    title: "AI Support Triage",
    category: "AI · Backend · RAG",
    summary:
      "A FastAPI backend that triages support tickets: it classifies each request, retrieves the relevant documentation through pgvector similarity search, and drafts cited replies for human review.",
    role: "Solo Build · Backend & AI",
    timeline: "Personal Project",
    year: "2026",
    team: "Solo",
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Redis", "LangGraph", "Docker", "pytest"],
    flow: ["Classify", "Retrieve", "Draft", "Score", "Escalate"],
    metric: { value: "2.0s → 0.06s", label: "Repeated-ticket latency with Redis caching" },
    highlights: [
      "Orchestrated the pipeline with LangGraph, using Pydantic structured outputs and streaming per-step progress to clients over SSE.",
      "Diagnosed a hallucinated support process and fixed it with grounded prompting plus rule-based escalation, after measuring that similarity scores alone couldn't separate answerable from unanswerable questions.",
      "Secured the API with JWT and three-role access control; 28 pytest tests using injected fake LLM and embedding providers.",
    ],
    links: {
      github: "https://github.com/Aman-srivastav24/ai-support-triage",
      live: "https://ai-support-triage-4qzy.onrender.com/",
    },
  },
  {
    slug: "qr-restaurant-ordering",
    title: "QR Restaurant Ordering",
    category: "Full-Stack · Product",
    summary:
      "A QR-based ordering flow that lets diners browse the menu and place table orders straight from their phone, without installing an app.",
    role: "Solo Build · Full-Stack",
    timeline: "Personal Project",
    year: "2025",
    team: "Solo",
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Docker"],
    flow: ["Scan QR", "Browse Menu", "Order", "Kitchen"],
    metric: { value: "0 apps", label: "Diners order from the browser after one scan" },
    highlights: [
      "Built the diner-facing ordering experience in React.js, tied to each table's QR code.",
      "Developed the backend with Node.js, Express.js and PostgreSQL via Prisma ORM, with JWT auth and separate admin/customer roles.",
      "Containerised the whole application with Docker.",
    ],
    links: {
      github: "https://github.com/Aman-srivastav24/QR_Restaurant_Ordering_System",
    },
  },
];

export const experience: Experience[] = [
  {
    role: "Web Developer Intern",
    company: "Sergul IT Services",
    period: "Jun 2026 – Sep 2026",
    location: "Remote",
    summary:
      "Built and maintained a live customised-gifting e-commerce platform covering catalogue, customisation, cart, checkout, orders and admin operations.",
    stack: ["Next.js 15", "TypeScript", "Firebase Auth", "Firestore", "Razorpay", "Shiprocket", "Vercel"],
    highlights: [
      "Integrated Razorpay and Shiprocket behind server-only provider layers: live courier rates, AWB generation, pickup requests and an idempotent tracking webhook with manual sync fallback.",
      "Implemented server-side price and tax computation with GST-compliant invoicing: CGST/SGST vs IGST, HSN codes, race-safe invoice numbers and immutable invoice snapshots.",
      "Hardened fulfilment APIs with admin-token verification and payment-amount validation; closed a Firestore rule that allowed client-created orders.",
      "Resolved an ESM/CommonJS issue blocking Vercel deployment of the Firebase Admin SDK.",
    ],
  },
];

export const freelance: Project[] = [
  {
    slug: "up-in-the-sky",
    image: "/work/up-in-the-sky-full.jpg",
    imageHeight: 4200,
    title: "UpInTheSky",
    category: "Client Work · Travel Platform",
    summary:
      "A travel community platform for Himachal and Ladakh trips, where users book curated tour packages, find volunteer-travel opportunities and share their own travel stories.",
    role: "Freelance Web Developer",
    timeline: "Freelance",
    year: "2024 – 2026",
    team: "Independent",
    stack: ["React", "Vite", "React Router", "Firebase"],
    highlights: [
      "Login / signup with user travel profiles and social features.",
      "Trip package listings with pricing and booking calls-to-action, plus a volunteer-travel section.",
      "Travel stories blog where users write and read each other's experiences.",
    ],
    links: { live: "https://www.upinthesky.in/" },
  },
  {
    slug: "clean-cruisers",
    image: "/work/clean-cruisers-full.jpg",
    imageHeight: 4200,
    title: "CleanCruisers",
    category: "Client Work · Booking Website",
    summary:
      "The website for a doorstep car-detailing service across Delhi NCR, built around a simple online booking flow and SEO-friendly location pages.",
    role: "Freelance Web Developer",
    timeline: "Freelance",
    year: "2024 – 2026",
    team: "Independent",
    stack: ["React", "Vite", "Supabase"],
    highlights: [
      "Four-step online booking: choose service, car & location, date & time, confirm.",
      "Service packages with pricing, FAQs, reviews and a blog, plus call and WhatsApp booking.",
      "Dedicated service-area pages for 15+ Delhi NCR locations.",
    ],
    links: { live: "https://cleancruisers.in/" },
  },
  {
    slug: "esteemwire",
    image: "/work/esteemwire-full.jpg",
    imageHeight: 900,
    title: "Esteemwire",
    category: "Client Work · Studio Website",
    summary:
      "The website for an independent design and engineering studio that builds sites for brands, showcasing its portfolio of client work with a bold, editorial feel.",
    role: "Freelance Web Developer",
    timeline: "Freelance",
    year: "2024 – 2026",
    team: "Independent",
    stack: ["Next.js", "React"],
    highlights: [
      "Portfolio showcase of client projects with featured and all-work views.",
      "Editorial, typography-led design with animated backgrounds.",
      "About and contact pages for incoming project enquiries.",
    ],
    links: { live: "https://esteemwire.com/" },
  },
  {
    slug: "smart-climate",
    image: "/work/smart-climate-full.jpg",
    imageHeight: 4200,
    title: "Smart Climate",
    category: "Client Work · Business Website",
    summary:
      "A multi-page website for an AC & home-appliance repair business, built to turn visitors into bookings, with service listings, customer reviews and a booking flow that hands off straight to WhatsApp.",
    role: "Freelance Web Developer",
    timeline: "Freelance",
    year: "2024 – 2026",
    team: "Independent",
    stack: ["React", "Vite", "Tailwind CSS", "React Router"],
    highlights: [
      "Booking form that composes the request and redirects to WhatsApp, plus a floating WhatsApp call-to-action on every page.",
      "Six routed pages (Home, About with a company timeline, tabbed Services, Booking, Contact, 404) with page transitions.",
      "Data-driven services, testimonials and brands from a single data file, rendered through reusable components and a responsive sticky navbar.",
    ],
    links: { live: "https://www.smartclimate.in/" },
  },
  {
    slug: "student-management-system",
    image: "/work/student-management-system-full.jpg",
    imageHeight: 4200,
    title: "Student Management System",
    category: "Client Work · Web App",
    summary:
      "A live student management system with authentication, validated CRUD operations and a responsive admin dashboard.",
    role: "Freelance Web Developer",
    timeline: "Freelance",
    year: "2024 – 2026",
    team: "Independent",
    stack: ["React.js", "Firebase", "Firebase Auth"],
    highlights: [
      "Authentication and role-protected admin dashboard.",
      "Validated create / read / update / delete flows for student records.",
      "Responsive layout for daily use on desktop and mobile.",
    ],
    links: { live: "https://www.sergulcomputerinstitute.com/" },
  },
  {
    slug: "it-training-website",
    image: "/work/it-training-website-full.jpg",
    imageHeight: 4200,
    title: "IT Training & Services Website",
    category: "Client Work · Website",
    summary:
      "A live marketing website for an IT training and services business, built from reusable components with client-side routing.",
    role: "Freelance Web Developer",
    timeline: "Freelance",
    year: "2024 – 2026",
    team: "Independent",
    stack: ["React.js", "React Router", "Tailwind CSS"],
    highlights: [
      "Reusable component system for course and service pages.",
      "Client-side routing with React Router for fast page transitions.",
      "Fully responsive styling with Tailwind CSS.",
    ],
    links: { live: "https://cloversal.com/" },
  },
];

export const skillset = [
  {
    title: "Backend",
    description: "REST APIs with clear contracts, validation and access control.",
    items: ["FastAPI", "Pydantic", "REST APIs", "JWT", "Role-Based Access Control", "Node.js", "Express.js"],
  },
  {
    title: "AI / LLM",
    description: "Grounded, testable LLM systems that know when to escalate.",
    items: ["RAG", "LLM Integration", "Embeddings", "Vector Search", "LangGraph", "Structured Outputs", "Prompt Grounding"],
  },
  {
    title: "Databases",
    description: "Relational, vector and cache layers that hold up in production.",
    items: ["PostgreSQL", "pgvector", "Redis", "SQLAlchemy", "Alembic", "Firestore", "Prisma ORM"],
  },
  {
    title: "Languages",
    description: "Typed, readable code on both sides of the stack.",
    items: ["Python", "SQL", "TypeScript", "JavaScript"],
  },
  {
    title: "Tooling",
    description: "Reproducible environments and tests that run before deploys do.",
    items: ["Docker", "Docker Compose", "pytest", "Git", "GitHub", "Postman"],
  },
];

export const education = [
  {
    degree: "Master of Computer Applications",
    school: "KIPM College of Management, AKTU, Gorakhpur",
    period: "2024 – 2026",
    score: "71.7%",
  },
  {
    degree: "Bachelor of Computer Applications",
    school: "Vivekananda Institute of Professional Studies TC, Delhi",
    period: "2020 – 2023",
    score: "86%",
  },
];

// Early learning projects, shown as a compact list under Personal Projects.
export const archive = [
  {
    title: "Disney+ Clone",
    year: "2023",
    note: "Built to learn Tailwind CSS",
    stack: ["React", "Vite", "Tailwind CSS", "Axios"],
    github: "https://github.com/Aman-srivastav24/DisneyClone",
    live: "https://disney-clone-phi-eight.vercel.app",
  },
  {
    title: "Text Editor Web App",
    year: "2023",
    note: "Online text editor with text-to-speech",
    stack: ["React", "React Router", "Speech API"],
    github: "https://github.com/Aman-srivastav24/TextEditorWebApp",
    live: "https://aman-srivastav24.github.io/TextEditorWebApp/",
  },
  {
    title: "Amazon Clone",
    year: "2022",
    note: "Storefront with cart and Firebase auth",
    stack: ["React", "Firebase", "React Router", "Material UI"],
    github: "https://github.com/Aman-srivastav24/AmazonClone",
    live: "https://aman-srivastav24.github.io/AmazonClone",
  },
  {
    title: "Tesla Clone",
    year: "2022",
    note: "Landing page with state managed in Redux",
    stack: ["React", "Redux Toolkit", "Styled Components"],
    github: "https://github.com/Aman-srivastav24/tesla-react-app",
    live: "https://aman-srivastav24.github.io/tesla-react-app/",
  },
];
