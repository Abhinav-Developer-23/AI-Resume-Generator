"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { Mail, Phone, Linkedin, Github, Globe, MapPin, ExternalLink } from "lucide-react";

export default function TechTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-slate-900 font-sans shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto text-[12.5px] leading-relaxed select-text flex flex-col md:flex-row"
      style={{ boxSizing: "border-box" }}
    >
      {/* Left Sidebar (Darker modern tech tone) */}
      <aside className="w-full md:w-[32%] bg-slate-900 text-slate-200 p-6 flex flex-col justify-between">
        <div>
          {/* Header in sidebar */}
          <div className="border-b border-slate-700 pb-5 mb-5">
            <h1 className="text-xl font-extrabold text-white tracking-tight leading-tight">
              {data.name || "Your Name"}
            </h1>
            <p className="text-xs font-semibold text-emerald-400 mt-1 uppercase tracking-wide">
              {data.title || "Software Engineer"}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs mb-6">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Contact
            </h2>
            {data.email && (
              <div className="flex items-center gap-2 text-slate-300 break-all">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href={`mailto:${data.email}`} className="hover:text-white">
                  {data.email}
                </a>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{data.phone}</span>
              </div>
            )}
            {data.linkedin && (
              <div className="flex items-center gap-2 text-slate-300 break-all">
                <Linkedin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href={data.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
                  LinkedIn
                </a>
              </div>
            )}
            {data.github && (
              <div className="flex items-center gap-2 text-slate-300 break-all">
                <Github className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href={data.github} target="_blank" rel="noreferrer" className="hover:text-white">
                  GitHub
                </a>
              </div>
            )}
            {data.website && (
              <div className="flex items-center gap-2 text-slate-300 break-all">
                <Globe className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href={data.website} target="_blank" rel="noreferrer" className="hover:text-white">
                  Portfolio
                </a>
              </div>
            )}
            {data.location && (
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{data.location}</span>
              </div>
            )}
          </div>

          {/* Education in sidebar */}
          {data.education && data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-700 pb-1">
                Education
              </h2>
              <div className="space-y-3 text-xs">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-white text-xs">{edu.college}</p>
                    <p className="text-slate-300 text-[11px]">{edu.degree}</p>
                    <div className="flex justify-between items-center text-[11px] mt-1 text-slate-400">
                      <span className="text-emerald-400 font-semibold">CGPA: {edu.cgpa}</span>
                      <span>{edu.gradYear}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills in sidebar */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-700 pb-1">
                Tech Stack
              </h2>
              <div className="space-y-3 text-xs">
                {data.skills.map((s, idx) => (
                  <div key={idx}>
                    <p className="text-emerald-400 font-semibold text-[11px] mb-1">{s.category}</p>
                    <div className="flex flex-wrap gap-1">
                      {s.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-slate-800 text-slate-200 text-[10px] px-2 py-0.5 rounded border border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-full md:w-[68%] p-6 md:p-8 flex flex-col justify-between">
        <div>
          {/* Bio / Summary */}
          {data.summary && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                Professional Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{data.summary}</p>
            </section>
          )}

          {/* Experience (Optional) */}
          {data.experience && data.experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline text-xs mb-1">
                      <div>
                        <span className="font-bold text-slate-900 text-[13px]">{exp.company}</span>
                        <span className="text-emerald-700 font-semibold ml-1.5">— {exp.role}</span>
                      </div>
                      <span className="text-slate-500 font-medium text-[11px]">{exp.duration}</span>
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

          {/* Projects (Compulsory) */}
          {data.projects && data.projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
                Key Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex justify-between items-baseline text-xs mb-1">
                      <div>
                        <span className="font-bold text-slate-900 text-[13px]">{proj.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-emerald-700">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:underline">
                            Repo <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 hover:underline">
                            Demo <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.techStack && (
                      <div className="text-[11px] font-mono text-slate-600 mb-1.5">
                        <span className="font-sans font-medium text-slate-500">Stack: </span>
                        {proj.techStack}
                      </div>
                    )}
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
        </div>
      </main>
    </div>
  );
}
