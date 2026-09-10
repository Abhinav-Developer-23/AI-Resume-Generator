# 🚀 AI Resume Generator (macOS Studio Edition)

An ultra-modern, high-performance web application to generate ATS-friendly, beautiful developer resumes in seconds. Powered by **Next.js 15 (App Router)**, **Node.js 24 LTS**, **Tailwind CSS**, and **Groq Cloud AI (LLaMA 3.3 70B)**.

Designed with a sleek **macOS glassmorphic aesthetic**, live side-by-side preview, 5 switchable resume templates, and vector A4 PDF export.

---

## ✨ Features

- 🍎 **macOS Ultra UI:** Frosted glass title bar, macOS traffic light buttons (close, minimize, maximize), smooth segmented tab controls, and refined typography.
- ⚡ **Groq Cloud AI Integration:**
  - **STAR-Method Bullet Polisher:** Upgrades raw draft notes into impactful *Action Verb + Tool/Metric + Quantified Result* statements.
  - **Technical Keyword Highlighting:** Emphasizes languages, frameworks, architecture, and metrics without inventing fake facts.
  - **Executive Summary Generator:** Produces high-impact 2-3 sentence technical bios tailored to your college and projects.
- 📄 **5 Switchable Resume Templates:**
  1. **Cupertino Modern:** Apple-inspired clean typography, subtle hairline dividers, and modern tech hierarchy.
  2. **Minimalist ATS:** 100% monochrome, single-column top-to-bottom layout, guaranteed algorithmic ATS parseability.
  3. **Tech Innovator:** Developer 2-column format with dark sidebar, skill pill tags, and repo links.
  4. **Executive Serif:** Distinguished editorial serif typography for senior and formal engineering roles.
  5. **Creative Dev:** Contemporary timeline accents and tag badges.
- 🎯 **Field Contract (Validated):**
  - **Compulsory:** Full Name, Designation/Role, Email, Phone, LinkedIn, College/University, CGPA/GPA, and Personal Projects (1+).
  - **Optional:** Work Experience (freshers/students can skip!), GitHub, Portfolio, Location, and Bio.
- 🖨️ **Programmatic PDF & Vector Print:**
  - One-click **Download PDF** button powered by programmatic A4 canvas rendering.
  - Native **Vector Print** support (`window.print()` with `@media print`) for 100% crisp vector text and clickable hyperlinks.
- 💾 **Local Autosave & Demo Mode:**
  - Changes persist automatically to `localStorage`.
  - "Load Demo" button to instantly test templates with realistic software engineer data.

---

## 🛠️ Tech Stack & Prerequisites

- **Runtime:** Node.js 24 LTS (`v24.21.0`+)
- **Framework:** Next.js 15.1.7 (React 19, TypeScript 5)
- **Styling:** Tailwind CSS with custom macOS color palette
- **Icons:** Lucide React
- **AI SDK:** Groq SDK (`groq-sdk`)
- **Recommended Free Model:** `llama-3.3-70b-versatile` (128K context, ~300 tok/sec, generous free tier on Groq)

---

## 🔑 Groq API Key Setup

### 1. Obtain Your Free API Key
1. Go to [Groq Console](https://console.groq.com/keys).
2. Sign up or log in (free account).
3. Click **Create API Key**, copy the key (starts with `gsk_...`).

### 2. Local Environment (`.env.local`)
Create a file named `.env.local` in the root of the project:

```env
GROQ_API_KEY=gsk_your_actual_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

> **Note:** If no key is set yet, the application gracefully falls back to mock polished examples with a helpful UI notice so you can still test everything locally.

### 3. Vercel Deployment (Production)
When deploying to Vercel:
1. Push this repository to your GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Go to **Project Settings** → **Environment Variables**.
4. Add:
   - **Key:** `GROQ_API_KEY`
   - **Value:** `gsk_...` (your Groq API key)
5. Hit **Deploy**.

---

## 💻 Development Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build check (TypeScript + ESLint + Next bundle)
npm run build

# Start production server
npm run start
```

---

## 📂 Project Architecture

```
├── GEMINI.md                    # Antigravity project rules & guidelines (CLAUDE.md equivalent)
├── AGENTS.md                    # Agent workflow entry point
├── package.json                 # Next.js 15, React 19, Groq SDK dependencies
├── tailwind.config.ts           # macOS theme colors and typography
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── enhance/
│   │   │       └── route.ts     # Groq AI enhancement API route
│   │   ├── globals.css          # Print media rules & macOS dark theme
│   │   ├── layout.tsx           # Root metadata & HTML layout
│   │   └── page.tsx             # Interactive split-screen macOS app
│   ├── components/
│   │   ├── MacWindow.tsx        # macOS frosted window frame & controls
│   │   ├── Navbar.tsx           # Top navigation bar & setup modal
│   │   ├── ResumeForm.tsx       # Dynamic form with compulsory validation & AI triggers
│   │   ├── ResumePreview.tsx    # Live preview container with zoom & template switcher
│   │   └── templates/
│   │       ├── ModernTemplate.tsx    # Cupertino Modern (macOS style)
│   │       ├── MinimalTemplate.tsx   # Minimalist ATS (100% monochrome)
│   │       ├── TechTemplate.tsx      # Tech Innovator (2-column sidebar)
│   │       ├── ExecutiveTemplate.tsx # Executive Serif (editorial)
│   │       └── CreativeTemplate.tsx  # Creative Dev (accent pills)
│   ├── lib/
│   │   ├── initialData.ts       # Sample student & developer resume profiles
│   │   └── pdf.ts               # Programmatic jsPDF & vector print utilities
│   └── types/
│       └── resume.ts            # TypeScript interfaces for data contract
```
