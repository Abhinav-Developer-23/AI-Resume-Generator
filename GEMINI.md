# AI Resume Generator - Antigravity Agent Guidelines

> Analogous to `CLAUDE.md`, this file defines the architectural patterns, environment configuration, commands, and rules for the **AI Resume Generator** project.

---

## 1. Project Overview & Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Runtime:** Node.js 24 LTS (`v24.21.0`+)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS with macOS-inspired glassmorphism, SF-style typography, subtle borders, and smooth transitions
- **Icons:** `lucide-react`
- **AI Inference:** Groq Cloud SDK (`groq-sdk`)
  - **Recommended Free Model:** `llama-3.3-70b-versatile` (128K context, high-throughput ~300 tok/sec)
  - **Fallback Model:** `llama-3.1-8b-instant`
- **PDF Generation:** Programmatic vector & high-resolution A4 export with 5 distinct switchable templates
- **Deployment Target:** Vercel (Edge/Serverless functions)

---

## 2. Environment Variables & Groq Setup
- **Local File:** `.env.local` (git-ignored)
  ```env
  GROQ_API_KEY=gsk_your_groq_api_key_here
  ```
- **Vercel Setup:**
  - Project Settings -> **Environment Variables** -> Key: `GROQ_API_KEY`
- **Groq AI Role:**
  - Enhance and polish English grammar, professional tone, and phrasing.
  - Implement STAR method (Situation, Task, Action, Result) for bullet points.
  - Highlight technical frameworks, languages, tools, and quantified metrics.
  - **Strict Rule:** Never hallucinate fake degrees, fake companies, or fictitious metrics. Polish *user-provided* facts only.

---

## 3. Resume Data Contract
### Compulsory Fields
- **Full Name**
- **Current Designation / Target Role** (if experienced / student)
- **Phone Number**
- **Email Address**
- **LinkedIn Profile URL**
- **College / University Name**
- **CGPA / GPA**
- **Personal Projects** (at least 1 compulsory; supports multiple projects with tech stacks and bullet points)

### Optional Fields
- **Work Experience** (Company name, role, duration, achievements) - *Optional for freshers/students*
- **GitHub Profile URL**
- **Portfolio / Website URL**
- **Certifications & Extra Skills**

---

## 4. 5 Resume Templates
1. **Cupertino Modern:** Apple/macOS sleek aesthetic, subtle borders, clean sans typography.
2. **Minimalist ATS:** Strict monochrome, single-column top-down format, 100% ATS parser compliant.
3. **Tech Innovator:** Modern two-column developer layout with sidebar for skills, contact, and education.
4. **Executive Serif:** Classic editorial typography for formal, senior, and corporate roles.
5. **Creative Dev:** Accent colors, tag badges, timeline-styled section dividers.

---

## 5. Development & Build Commands
```bash
npm run dev        # Starts Next.js dev server on http://localhost:3000
npm run build      # Production build check (TypeScript + ESLint + Next bundle)
npm run start      # Runs production server
npm run lint       # Runs ESLint checks
```

---

## 6. Code Style & Conventions
- Use React Server Components for pages where possible; use `'use client'` on interactive forms and preview panes.
- Keep components modular: form sections, template layouts, AI enhancement hooks, and PDF export utils.
- Provide graceful degradation if `GROQ_API_KEY` is not provided (clear user-friendly banner and mock enhancement fallback).
- Maintain responsive split-screen preview with macOS window aesthetic.
