"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { Mail, Phone, Linkedin, Github, Globe, MapPin, Sparkles } from "lucide-react";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-zinc-900 font-sans p-8 md:p-10 shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto text-[13px] leading-relaxed select-text border-t-8 border-violet-600"
      style={{ boxSizing: "border-box" }}
    >
      {/* Header with vibrant subtle badge styling */}
      <header className="pb-5 mb-6 border-b border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
              {data.name || "Your Name"}
            </h1>
            <p className="text-sm font-semibold text-violet-600 mt-0.5">
              {data.title || "Full Stack Developer"}
            </p>
          </div>
          {data.location && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full w-fit">
              <MapPin className="w-3 h-3 text-violet-500" />
              <span>{data.location}</span>
            </div>
          )}
        </div>

        {/* Contact links */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-zinc-600">
          {data.email && (
            <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-violet-600">
              <Mail className="w-3.5 h-3.5 text-violet-500" />
              <span>{data.email}</span>
            </a>
          )}
          {data.phone && (
            <a href={`tel:${data.phone}`} className="flex items-center gap-1 hover:text-violet-600">
              <Phone className="w-3.5 h-3.5 text-violet-500" />
              <span>{data.phone}</span>
            </a>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-violet-600">
              <Linkedin className="w-3.5 h-3.5 text-violet-500" />
              <span>LinkedIn</span>
            </a>
          )}
          {data.github && (
            <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-violet-600">
              <Github className="w-3.5 h-3.5 text-violet-500" />
              <span>GitHub</span>
            </a>
          )}
          {data.website && (
            <a href={data.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-violet-600">
              <Globe className="w-3.5 h-3.5 text-violet-500" />
              <span>Portfolio</span>
            </a>
          )}
        </div>

        {data.summary && (
          <p className="mt-3 text-xs text-zinc-600 bg-violet-50/50 p-3 rounded-lg border border-violet-100/80 leading-relaxed">
            {data.summary}
          </p>
        )}
      </header>

      {/* Education (Compulsory) */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-600 inline-block"></span>
            Education
          </h2>
          <div className="space-y-2.5">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                <div>
                  <h3 className="font-bold text-zinc-900 text-[13px]">{edu.college}</h3>
                  <div className="text-zinc-700">{edu.degree}</div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-violet-100 text-violet-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                    CGPA: {edu.cgpa}
                  </span>
                  <div className="text-zinc-500 text-[11px] mt-0.5">{edu.gradYear}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience (Optional) */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-600 inline-block"></span>
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-violet-200 pl-3.5 ml-1">
                <div className="flex justify-between items-baseline text-xs mb-1">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-[13px]">{exp.company}</h3>
                    <p className="text-xs font-semibold text-violet-700">{exp.role}</p>
                  </div>
                  <span className="text-zinc-500 font-medium text-[11px]">{exp.duration}</span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-3.5 space-y-1 text-xs text-zinc-700">
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-600 inline-block"></span>
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id} className="border-l-2 border-violet-200 pl-3.5 ml-1">
                <div className="flex justify-between items-baseline text-xs mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-zinc-900 text-[13px]">{proj.title}</h3>
                    {proj.techStack && (
                      <span className="text-[10.5px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded font-mono">
                        {proj.techStack}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-violet-600 font-medium">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
                        Code
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline">
                        Live
                      </a>
                    )}
                  </div>
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-3.5 space-y-1 text-xs text-zinc-700">
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-violet-700 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            Skills & Technologies
          </h2>
          <div className="space-y-2 text-xs">
            {data.skills.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-zinc-800 min-w-[130px]">{s.category}:</span>
                <div className="flex flex-wrap gap-1">
                  {s.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-zinc-100 text-zinc-700 text-[11px] px-2 py-0.5 rounded-full border border-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
