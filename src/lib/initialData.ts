import { ResumeData, TemplateOption } from "@/types/resume";

export const initialResumeData: ResumeData = {
  name: "Abhinav Anand",
  title: "Full Stack Software Engineer",
  email: "abhinav.anand@example.com",
  phone: "+91 98765 43210",
  linkedin: "https://linkedin.com/in/abhinavanand",
  github: "https://github.com/abhinavanand",
  website: "https://abhinavanand.dev",
  location: "Jamshedpur / Bengaluru, India",
  summary:
    "Proactive Full Stack Engineer from NIT Jamshedpur specializing in high-performance distributed systems, Next.js, and scalable cloud architectures. Passionate about building robust backend microservices, optimizing database throughput, and delivering responsive, accessible web applications.",
  education: [
    {
      id: "edu-1",
      college: "National Institute of Technology Jamshedpur (NIT Jamshedpur)",
      degree: "B.Tech in Computer Science and Engineering",
      cgpa: "8.2 / 10.0",
      gradYear: "2025",
      location: "Jamshedpur, Jharkhand",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Tech Mahindra / Scaler",
      role: "Software Engineering Intern",
      duration: "May 2024 – Jul 2024",
      location: "Bengaluru, India",
      bullets: [
        "Architected and deployed asynchronous payment webhook processing pipeline handling 2.5M daily events with 99.99% uptime SLA.",
        "Reduced p99 database query response latency by 32% by introducing Redis multi-tier caching and optimizing PostgreSQL composite indexes.",
        "Collaborated with core engineering team to implement JWT authentication and role-based access control across 12 microservices.",
      ],
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "AI Resume Generator Studio",
      techStack: "Next.js 15, TypeScript, Tailwind CSS, AI Inference, PDF Vector Engine",
      githubUrl: "https://github.com/abhinavanand/ai-resume-generator",
      liveUrl: "https://ai-resume-studio.vercel.app",
      bullets: [
        "Engineered an ultra-responsive, macOS-inspired AI resume platform supporting real-time split-screen preview and vector A4 PDF export.",
        "Integrated AI text refinement pipeline using low-latency LLM inference to rewrite raw notes into STAR-method bullet points with 0 hallucination.",
        "Architected 5 switchable ATS-friendly templates ensuring 100% compliance with corporate screening algorithms and zero layout shifts.",
      ],
    },
    {
      id: "proj-2",
      title: "HyperScale - Distributed Task Orchestrator",
      techStack: "Go, Redis, gRPC, Docker, Kubernetes, Prometheus",
      githubUrl: "https://github.com/abhinavanand/hyperscale",
      liveUrl: "https://hyperscale-demo.dev",
      bullets: [
        "Engineered fault-tolerant distributed job scheduling engine capable of executing 25,000+ concurrent worker tasks with sub-10ms jitter.",
        "Implemented Raft consensus algorithm in Go for automated leader election and split-brain recovery across heterogeneous node clusters.",
        "Benchmarked system throughput using k6 and Prometheus, demonstrating 3.5x throughput increase over traditional message queues.",
      ],
    },
  ],
  skills: [
    {
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "C++", "Python", "Go", "SQL", "Java"],
    },
    {
      category: "Frameworks & Libraries",
      skills: ["React 19", "Next.js 15", "Node.js", "Express", "Tailwind CSS", "FastAPI"],
    },
    {
      category: "Databases & Cloud",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Docker", "Git / GitHub", "Vercel", "AWS"],
    },
  ],
};

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: "cupertino-modern",
    name: "Cupertino Modern",
    description: "Sleek Apple-inspired design with refined typography, hairline dividers, and modern tech feel.",
    badge: "Recommended",
  },
  {
    id: "minimal-ats",
    name: "Minimalist ATS",
    description: "High-parsing-rate single-column monochrome format tailored for algorithmic ATS screening.",
    badge: "ATS 100%",
  },
  {
    id: "tech-innovator",
    name: "Tech Innovator",
    description: "Dynamic two-column layout with dedicated skill tags, github highlights, and project metrics.",
    badge: "Developer",
  },
  {
    id: "executive-serif",
    name: "Executive Serif",
    description: "Authoritative editorial style with distinguished serif headings suited for senior engineering.",
    badge: "Corporate",
  },
  {
    id: "creative-dev",
    name: "Creative Dev",
    description: "Modern accent borders, timeline markers, and tech pill badges for modern engineers.",
    badge: "Vibrant",
  },
];
