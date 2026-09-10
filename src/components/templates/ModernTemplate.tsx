"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { Mail, Phone, Linkedin, Github, Globe, MapPin, GraduationCap, Briefcase, FolderGit2, Sparkles } from "lucide-react";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-slate-900 font-sans p-8 md:p-10 shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto text-[13px] leading-relaxed select-text"
      style={{ boxSizing: "border-box" }}
    >
      {/* Header */}
      <header className="border-b border-slate-200 pb-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              {data.name || "Your Full Name"}
            </h1>
            <p className="text-sm font-semibold text-blue-600 mt-0.5">
              {data.title || "Software Engineer"}
            </p>
          </div>
          {data.location && (
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>{data.location}</span>
            </div>
          )}
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-3 text-xs text-slate-600">
          {data.email && (
            <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{data.email}</span>
            </a>
          )}
          {data.phone && (
            <a href={`tel:${data.phone}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{data.phone}</span>
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              <span>{data.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "linkedin.com/in/")}</span>
            </a>
          )}
          {data.github && (
            <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>{data.github.replace(/^https?:\/\/(www\.)?github\.com\//, "github.com/")}</span>
            </a>
          )}
          {data.website && (
            <a href={data.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{data.website.replace(/^https?:\/\//, "")}</span>
            </a>
          )}
        </div>

        {/* Summary */}
        {data.summary && (
          <p className="mt-3.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
            {data.summary}
          </p>
        )}
      </header>

      {/* Education (Compulsory College & CGPA) */}
      {data.education && data.education.length > 0 && (
        <section className="mb-5 resume-section">
          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-200 mb-2.5">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Education</h2>
          </div>
          <div className="space-y-2.5">
            {data.education.map((edu) => (
              <div key={edu.id} className="resume-item flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                <div>
                  <h3 className="font-bold text-slate-900 text-[13px]">{edu.college}</h3>
                  <div className="text-slate-700 font-medium">{edu.degree}</div>
                </div>
                <div className="sm:text-right text-slate-500 text-xs flex sm:flex-col justify-between items-center sm:items-end">
                  <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    CGPA: {edu.cgpa}
                  </span>
                  <span>{edu.gradYear}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience (Optional) */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-5 resume-section">
          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-200 mb-2.5">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Experience</h2>
          </div>
          <div className="space-y-3.5">
            {data.experience.map((exp) => (
              <div key={exp.id} className="resume-item">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div>
                    <h3 className="font-bold text-slate-900 text-[13px]">{exp.company}</h3>
                    <p className="text-xs font-semibold text-slate-700">{exp.role}</p>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {exp.duration} {exp.location ? `• ${exp.location}` : ""}
                  </div>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700">
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Personal Projects (Compulsory) */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-5 resume-section">
          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-200 mb-2.5">
            <FolderGit2 className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Projects</h2>
          </div>
          <div className="space-y-3.5">
            {data.projects.map((proj) => (
              <div key={proj.id} className="resume-item">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-[13px]">{proj.title}</h3>
                    {proj.techStack && (
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {proj.techStack}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-blue-600">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
                        GitHub
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-700">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="leading-snug">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-200 mb-2.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">Technical Skills</h2>
          </div>
          <div className="space-y-1.5 text-xs">
            {data.skills.map((s, idx) => (
              <div key={idx} className="flex items-baseline gap-2">
                <span className="font-semibold text-slate-800 min-w-[130px]">{s.category}:</span>
                <span className="text-slate-600">{s.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
