"use client";

import React, { useState } from "react";
import { ResumeData, Project, WorkExperience, Education } from "@/types/resume";
import {
  Sparkles,
  Plus,
  Trash2,
  GraduationCap,
  Briefcase,
  FolderGit2,
  User,
  Wand2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
  Scissors,
  ArrowRight,
} from "lucide-react";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onViewPreview?: () => void;
}

export default function ResumeForm({ data, onChange, onViewPreview }: ResumeFormProps) {
  const [activeSection, setActiveSection] = useState<
    "personal" | "education" | "experience" | "projects" | "skills"
  >("personal");

  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  // Helper to update personal info
  const handlePersonalChange = (field: keyof ResumeData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  // Helper for Groq AI Enhancement
  const callAiEnhance = async (
    action: "enhance_bullet" | "shorten_bullet" | "generate_summary" | "polish_text",
    text: string,
    context: any,
    onSuccess: (result: string) => void,
    loadingKey: string
  ) => {
    setAiLoading(loadingKey);
    setAiNotice(null);
    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, text, context }),
      });
      const json = await res.json();
      if (res.ok && json.enhanced) {
        onSuccess(json.enhanced);
        if (json.notice) {
          setAiNotice(json.notice);
        }
      } else {
        alert(json.error || "Failed to enhance with AI");
      }
    } catch (err: any) {
      console.error(err);
      alert("Error connecting to AI service.");
    } finally {
      setAiLoading(null);
    }
  };

  // Education Handlers
  const handleAddEducation = () => {
    const newEdu: Education = {
      id: "edu-" + Date.now(),
      college: "",
      degree: "",
      cgpa: "",
      gradYear: new Date().getFullYear().toString(),
      location: "",
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e));
    onChange({ ...data, education: updated });
  };

  const handleRemoveEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((e) => e.id !== id) });
  };

  // Experience Handlers
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: "exp-" + Date.now(),
      company: "",
      role: "",
      duration: "Jan 2024 - Present",
      bullets: [""],
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const handleUpdateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    const updated = data.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e));
    onChange({ ...data, experience: updated });
  };

  const handleRemoveExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter((e) => e.id !== id) });
  };

  const handleUpdateExpBullet = (expId: string, bulletIdx: number, val: string) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    const bullets = [...exp.bullets];
    bullets[bulletIdx] = val;
    handleUpdateExperience(expId, "bullets", bullets);
  };

  const handleAddExpBullet = (expId: string) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    handleUpdateExperience(expId, "bullets", [...exp.bullets, ""]);
  };

  const handleRemoveExpBullet = (expId: string, bulletIdx: number) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    const bullets = exp.bullets.filter((_, i) => i !== bulletIdx);
    handleUpdateExperience(expId, "bullets", bullets.length ? bullets : [""]);
  };

  // Projects Handlers
  const handleAddProject = () => {
    const newProj: Project = {
      id: "proj-" + Date.now(),
      title: "",
      techStack: "",
      liveUrl: "",
      githubUrl: "",
      bullets: [""],
    };
    onChange({ ...data, projects: [...data.projects, newProj] });
  };

  const handleUpdateProject = (id: string, field: keyof Project, value: any) => {
    const updated = data.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p));
    onChange({ ...data, projects: updated });
  };

  const handleRemoveProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };

  const handleUpdateProjBullet = (projId: string, bulletIdx: number, val: string) => {
    const proj = data.projects.find((p) => p.id === projId);
    if (!proj) return;
    const bullets = [...proj.bullets];
    bullets[bulletIdx] = val;
    handleUpdateProject(projId, "bullets", bullets);
  };

  const handleAddProjBullet = (projId: string) => {
    const proj = data.projects.find((p) => p.id === projId);
    if (!proj) return;
    handleUpdateProject(projId, "bullets", [...proj.bullets, ""]);
  };

  const handleRemoveProjBullet = (projId: string, bulletIdx: number) => {
    const proj = data.projects.find((p) => p.id === projId);
    if (!proj) return;
    const bullets = proj.bullets.filter((_, i) => i !== bulletIdx);
    handleUpdateProject(projId, "bullets", bullets.length ? bullets : [""]);
  };

  // Skills Handlers
  const handleSkillStringChange = (categoryIdx: number, rawString: string) => {
    const skillsList = rawString.split(",").map((s) => s.trim()).filter(Boolean);
    const updated = [...data.skills];
    updated[categoryIdx] = { ...updated[categoryIdx], skills: skillsList };
    onChange({ ...data, skills: updated });
  };

  return (
    <div className="space-y-4">
      {/* Notice Banner (if any) */}
      {aiNotice && (
        <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
          <div className="flex-1">{aiNotice}</div>
          <button onClick={() => setAiNotice(null)} className="text-neutral-400 hover:text-white">
            ×
          </button>
        </div>
      )}

      {/* Internal Navigation Tabs for Form Sections */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-neutral-900/90 rounded-xl border border-white/10 text-xs">
        <button
          onClick={() => setActiveSection("personal")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeSection === "personal"
              ? "bg-blue-600 text-white font-semibold shadow"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Personal Info *</span>
        </button>

        <button
          onClick={() => setActiveSection("education")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeSection === "education"
              ? "bg-blue-600 text-white font-semibold shadow"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>College & CGPA *</span>
        </button>

        <button
          onClick={() => setActiveSection("projects")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeSection === "projects"
              ? "bg-blue-600 text-white font-semibold shadow"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Projects ({data.projects.length}) *</span>
        </button>

        <button
          onClick={() => setActiveSection("experience")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeSection === "experience"
              ? "bg-blue-600 text-white font-semibold shadow"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Experience (Optional)</span>
        </button>

        <button
          onClick={() => setActiveSection("skills")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
            activeSection === "skills"
              ? "bg-blue-600 text-white font-semibold shadow"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skills</span>
        </button>
      </div>

      {/* SECTION 1: Personal Details */}
      {activeSection === "personal" && (
        <div className="bg-neutral-900/60 border border-white/10 rounded-xl p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Personal Contact & Profile</h2>
              <p className="text-xs text-neutral-400">
                Fields marked with <span className="text-red-400 font-bold">*</span> are compulsory.
              </p>
            </div>
            <button
              onClick={() =>
                callAiEnhance(
                  "generate_summary",
                  "",
                  data,
                  (res) => handlePersonalChange("summary", res),
                  "summary-gen"
                )
              }
              disabled={aiLoading === "summary-gen"}
              className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-3.5 py-1.5 rounded-lg shadow-md shadow-indigo-500/25 ring-1 ring-indigo-400/40 transition disabled:opacity-50"
            >
              {aiLoading === "summary-gen" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              )}
              <span>✨ AI Auto-Summary</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handlePersonalChange("name", e.target.value)}
                placeholder="e.g. Abhinav Sharma"
                className="w-full bg-neutral-800/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Designation / Target Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => handlePersonalChange("title", e.target.value)}
                placeholder="e.g. Full Stack Software Engineer"
                className="w-full bg-neutral-800/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => handlePersonalChange("email", e.target.value)}
                placeholder="e.g. abhinav@example.com"
                className="w-full bg-neutral-800/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => handlePersonalChange("phone", e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-neutral-800/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                LinkedIn Profile URL <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                value={data.linkedin}
                onChange={(e) => handlePersonalChange("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-neutral-800/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                GitHub Profile URL <span className="text-neutral-500 text-[11px]">(Optional)</span>
              </label>
              <input
                type="url"
                value={data.github || ""}
                onChange={(e) => handlePersonalChange("github", e.target.value)}
                placeholder="https://github.com/username"
                className="w-full bg-neutral-800/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Portfolio / Website <span className="text-neutral-500 text-[11px]">(Optional)</span>
              </label>
              <input
                type="url"
                value={data.website || ""}
                onChange={(e) => handlePersonalChange("website", e.target.value)}
                placeholder="https://yourportfolio.dev"
                className="w-full bg-neutral-800/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Location <span className="text-neutral-500 text-[11px]">(Optional)</span>
              </label>
              <input
                type="text"
                value={data.location || ""}
                onChange={(e) => handlePersonalChange("location", e.target.value)}
                placeholder="e.g. San Francisco, CA / Bengaluru, India"
                className="w-full bg-neutral-800/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-neutral-300">
                Executive Professional Summary
              </label>
              <button
                type="button"
                onClick={() =>
                  callAiEnhance(
                    "polish_text",
                    data.summary || "",
                    {},
                    (res) => handlePersonalChange("summary", res),
                    "summary-polish"
                  )
                }
                disabled={!data.summary || aiLoading === "summary-polish"}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-[11px] shadow-sm shadow-indigo-500/25 ring-1 ring-indigo-400/40 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-40"
                title="Polish summary with professional English, executive tone, and concise phrasing"
              >
                {aiLoading === "summary-polish" ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                )}
                <span>✨ AI Polish (Professional Tone)</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={data.summary || ""}
              onChange={(e) => handlePersonalChange("summary", e.target.value)}
              placeholder="Brief 2-3 sentence overview highlighting your engineering experience..."
              className="w-full bg-neutral-800/90 border border-white/10 rounded-lg p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* SECTION 2: Education (Compulsory College & CGPA) */}
      {activeSection === "education" && (
        <div className="bg-neutral-900/60 border border-white/10 rounded-xl p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">College & Degree</h2>
              <p className="text-xs text-neutral-400">
                College name and CGPA are <span className="text-red-400 font-bold">compulsory</span>.
              </p>
            </div>
            <button
              onClick={handleAddEducation}
              className="flex items-center gap-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add College</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div
                key={edu.id}
                className="bg-neutral-800/50 border border-white/10 rounded-xl p-3.5 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-400">
                    College #{idx + 1}
                  </span>
                  {data.education.length > 1 && (
                    <button
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="text-red-400 hover:text-red-300 text-xs p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      College / University Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.college}
                      onChange={(e) => handleUpdateEducation(edu.id, "college", e.target.value)}
                      placeholder="e.g. Stanford University / IIT Delhi"
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Degree & Major <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleUpdateEducation(edu.id, "degree", e.target.value)}
                      placeholder="e.g. B.Tech in Computer Science"
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      CGPA / GPA in College <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.cgpa}
                      onChange={(e) => handleUpdateEducation(edu.id, "cgpa", e.target.value)}
                      placeholder="e.g. 8.85 / 10.0 or 3.8 / 4.0"
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Graduation Year <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.gradYear}
                      onChange={(e) => handleUpdateEducation(edu.id, "gradYear", e.target.value)}
                      placeholder="e.g. 2025"
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Location <span className="text-neutral-500 text-[11px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={edu.location || ""}
                      onChange={(e) => handleUpdateEducation(edu.id, "location", e.target.value)}
                      placeholder="e.g. Stanford, CA"
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Personal Projects (Compulsory) */}
      {activeSection === "projects" && (
        <div className="bg-neutral-900/60 border border-white/10 rounded-xl p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Personal Projects</h2>
              <p className="text-xs text-neutral-400">
                At least 1 project is <span className="text-red-400 font-bold">compulsory</span>. You
                can add multiple projects with AI-polished STAR bullets!
              </p>
            </div>
            <button
              onClick={handleAddProject}
              className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.projects.map((proj, pIdx) => (
              <div
                key={proj.id}
                className="bg-neutral-800/50 border border-white/10 rounded-xl p-3.5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-400">
                    Project #{pIdx + 1}: {proj.title || "Untitled Project"}
                  </span>
                  {data.projects.length > 1 && (
                    <button
                      onClick={() => handleRemoveProject(proj.id)}
                      className="text-red-400 hover:text-red-300 text-xs p-1"
                      title="Remove Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Project Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleUpdateProject(proj.id, "title", e.target.value)}
                      placeholder="e.g. Distributed Task Orchestrator"
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Tech Stack Used <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={proj.techStack}
                      onChange={(e) => handleUpdateProject(proj.id, "techStack", e.target.value)}
                      placeholder="e.g. Next.js, TypeScript, PostgreSQL, Docker"
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      GitHub Repo URL <span className="text-neutral-500 text-[11px]">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={proj.githubUrl || ""}
                      onChange={(e) => handleUpdateProject(proj.id, "githubUrl", e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Live Demo URL <span className="text-neutral-500 text-[11px]">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={proj.liveUrl || ""}
                      onChange={(e) => handleUpdateProject(proj.id, "liveUrl", e.target.value)}
                      placeholder="https://myproject.vercel.app"
                      className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Bullets with Individual AI Enhancement */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-neutral-300">
                      Project Details & Impact Bullets <span className="text-red-400">*</span>
                    </label>
                    <button
                      onClick={() => handleAddProjBullet(proj.id)}
                      className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Bullet
                    </button>
                  </div>

                  {proj.bullets.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="bg-neutral-900 border border-white/10 rounded-xl p-3 space-y-2.5 transition focus-within:border-blue-500/60"
                    >
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleUpdateProjBullet(proj.id, bIdx, e.target.value)}
                        placeholder="Describe what you built, technical challenges, and measurable results..."
                        className="w-full bg-transparent border-0 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-0 leading-relaxed resize-y"
                      />

                      {/* Highlighted AI Action Toolbar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            type="button"
                            onClick={() =>
                              callAiEnhance(
                                "enhance_bullet",
                                bullet,
                                { project: proj.title, tech: proj.techStack },
                                (res) => handleUpdateProjBullet(proj.id, bIdx, res),
                                `proj-${proj.id}-b-${bIdx}`
                              )
                            }
                            disabled={!bullet || aiLoading === `proj-${proj.id}-b-${bIdx}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-[11px] shadow-sm shadow-indigo-500/25 ring-1 ring-indigo-400/40 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-40"
                            title="Rewrite with STAR Method (Action + Tool + Impact)"
                          >
                            {aiLoading === `proj-${proj.id}-b-${bIdx}` ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Sparkles className="w-3 h-3 text-yellow-300" />
                            )}
                            <span>✨ AI Polish (Make Impressive)</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              callAiEnhance(
                                "shorten_bullet",
                                bullet,
                                { project: proj.title, tech: proj.techStack },
                                (res) => handleUpdateProjBullet(proj.id, bIdx, res),
                                `proj-shorten-${proj.id}-b-${bIdx}`
                              )
                            }
                            disabled={!bullet || aiLoading === `proj-shorten-${proj.id}-b-${bIdx}`}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 text-[11px] font-medium transition disabled:opacity-40"
                            title="Shorten and condense description"
                          >
                            {aiLoading === `proj-shorten-${proj.id}-b-${bIdx}` ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Scissors className="w-3 h-3 text-amber-400" />
                            )}
                            <span>✂️ Shorten</span>
                          </button>
                        </div>

                        {proj.bullets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveProjBullet(proj.id, bIdx)}
                            className="p-1 rounded-md text-neutral-400 hover:text-red-400 hover:bg-neutral-800 text-xs transition"
                            title="Remove Bullet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Work Experience (Optional) */}
      {activeSection === "experience" && (
        <div className="bg-neutral-900/60 border border-white/10 rounded-xl p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Previous Company Work Experience</h2>
              <p className="text-xs text-neutral-400">
                This section is <span className="text-emerald-400 font-bold">optional</span>. Freshers
                and students can skip this!
              </p>
            </div>
            <button
              onClick={handleAddExperience}
              className="flex items-center gap-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 px-3 py-1.5 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Company</span>
            </button>
          </div>

          {data.experience.length === 0 ? (
            <div className="text-center py-6 border border-dashed border-white/10 rounded-xl text-neutral-400 text-xs">
              <p>No work experience added. Perfect for students and fresh graduates!</p>
              <button
                onClick={handleAddExperience}
                className="mt-2 text-blue-400 hover:underline font-medium"
              >
                + Click here if you have prior internships or job experience
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {data.experience.map((exp, eIdx) => (
                <div
                  key={exp.id}
                  className="bg-neutral-800/50 border border-white/10 rounded-xl p-3.5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400">
                      Company #{eIdx + 1}: {exp.company || "New Company"}
                    </span>
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-red-400 hover:text-red-300 text-xs p-1"
                      title="Remove Company"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(exp.id, "company", e.target.value)}
                        placeholder="e.g. Google, Stripe, or Startup Inc."
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Role / Designation
                      </label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleUpdateExperience(exp.id, "role", e.target.value)}
                        placeholder="e.g. Frontend Developer Intern"
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => handleUpdateExperience(exp.id, "duration", e.target.value)}
                        placeholder="e.g. May 2023 - Aug 2023"
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Location <span className="text-neutral-500 text-[11px]">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={exp.location || ""}
                        onChange={(e) => handleUpdateExperience(exp.id, "location", e.target.value)}
                        placeholder="e.g. Bengaluru, India or Remote"
                        className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Bullet points with Groq AI Enhancement */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-neutral-300">
                        Points of what you did in the company
                      </label>
                      <button
                        onClick={() => handleAddExpBullet(exp.id)}
                        className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Point
                      </button>
                    </div>

                    {exp.bullets.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        className="space-y-1.5 p-2.5 rounded-lg bg-neutral-900/80 border border-white/5"
                      >
                        <textarea
                          rows={2}
                          value={bullet}
                          onChange={(e) => handleUpdateExpBullet(exp.id, bIdx, e.target.value)}
                          placeholder="Points of what you did in the company..."
                          className="w-full bg-neutral-950/80 border border-white/10 rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed font-sans"
                        />
                        <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() =>
                                callAiEnhance(
                                  "enhance_bullet",
                                  bullet,
                                  { company: exp.company, role: exp.role },
                                  (res) => handleUpdateExpBullet(exp.id, bIdx, res),
                                  `exp-${exp.id}-b-${bIdx}`
                                )
                              }
                              disabled={!bullet || aiLoading === `exp-${exp.id}-b-${bIdx}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-[11px] shadow-sm shadow-indigo-500/25 ring-1 ring-indigo-400/40 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-40"
                              title="Rewrite with STAR Method (Action + Tool + Impact)"
                            >
                              {aiLoading === `exp-${exp.id}-b-${bIdx}` ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Sparkles className="w-3 h-3 text-yellow-300" />
                              )}
                              <span>✨ AI Polish (Make Impressive)</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                callAiEnhance(
                                  "shorten_bullet",
                                  bullet,
                                  { company: exp.company, role: exp.role },
                                  (res) => handleUpdateExpBullet(exp.id, bIdx, res),
                                  `exp-shorten-${exp.id}-b-${bIdx}`
                                )
                              }
                              disabled={!bullet || aiLoading === `exp-shorten-${exp.id}-b-${bIdx}`}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-white/10 text-[11px] font-medium transition disabled:opacity-40"
                              title="Shorten and condense description"
                            >
                              {aiLoading === `exp-shorten-${exp.id}-b-${bIdx}` ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Scissors className="w-3 h-3 text-amber-400" />
                              )}
                              <span>✂️ Shorten</span>
                            </button>
                          </div>

                          {exp.bullets.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveExpBullet(exp.id, bIdx)}
                              className="p-1 rounded-md text-neutral-400 hover:text-red-400 hover:bg-neutral-800 text-xs transition"
                              title="Remove Bullet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 5: Skills */}
      {activeSection === "skills" && (
        <div className="bg-neutral-900/60 border border-white/10 rounded-xl p-4 md:p-5 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <h2 className="text-sm font-semibold text-white">Technical Skills & Categories</h2>
            <p className="text-xs text-neutral-400">
              Enter skills as comma-separated values (e.g. React, Next.js, Node.js).
            </p>
          </div>

          <div className="space-y-3.5">
            {data.skills.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-300">
                  {cat.category}
                </label>
                <input
                  type="text"
                  value={cat.skills.join(", ")}
                  onChange={(e) => handleSkillStringChange(idx, e.target.value)}
                  placeholder="e.g. Python, TypeScript, Docker..."
                  className="w-full bg-neutral-800/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
