"use client";

import React from "react";
import { ResumeData } from "@/types/resume";

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-stone-900 font-serif p-8 md:p-10 shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto text-[13px] leading-relaxed select-text"
      style={{ boxSizing: "border-box" }}
    >
      {/* Formal Header */}
      <header className="border-b-2 border-stone-800 pb-4 mb-5 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 font-serif">
          {data.name || "Your Name"}
        </h1>
        <p className="text-sm font-medium italic text-stone-700 mt-0.5">
          {data.title || "Senior Software Engineer"}
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-2 text-xs font-sans text-stone-600">
          {data.location && <span>{data.location}</span>}
          {data.location && data.phone && <span>|</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.email && <span>|</span>}
          {data.email && (
            <a href={`mailto:${data.email}`} className="hover:underline">
              {data.email}
            </a>
          )}
          {data.linkedin && (
            <>
              <span>|</span>
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </>
          )}
          {data.github && (
            <>
              <span>|</span>
              <a href={data.github} target="_blank" rel="noreferrer" className="hover:underline">
                GitHub
              </a>
            </>
          )}
        </div>

        {data.summary && (
          <p className="mt-3 text-xs text-stone-700 leading-relaxed max-w-2xl mx-auto italic font-serif">
            "{data.summary}"
          </p>
        )}
      </header>

      {/* Education (Compulsory) */}
      {data.education && data.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-2 font-sans">
            Academic Background
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-stone-900">{edu.college}</span>
                  <div className="italic text-stone-800">{edu.degree}</div>
                </div>
                <div className="text-right font-sans text-stone-700">
                  <span className="font-semibold text-stone-900">CGPA: {edu.cgpa}</span>
                  <span className="ml-2 text-stone-500">({edu.gradYear})</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience (Optional) */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-3 font-sans">
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline text-xs mb-1">
                  <div>
                    <span className="font-bold text-stone-900 text-[13.5px]">{exp.company}</span>
                    <span className="italic text-stone-700 ml-1.5">— {exp.role}</span>
                  </div>
                  <span className="font-sans text-stone-600 text-xs">{exp.duration}</span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-stone-800">
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
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-3 font-sans">
            Key Initiatives & Projects
          </h2>
          <div className="space-y-3.5">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline text-xs mb-1">
                  <div>
                    <span className="font-bold text-stone-900 text-[13.5px]">{proj.title}</span>
                    {proj.techStack && (
                      <span className="font-sans text-[11px] text-stone-600 ml-2 italic">
                        [{proj.techStack}]
                      </span>
                    )}
                  </div>
                  <div className="font-sans text-[11px] space-x-2 text-stone-700">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="underline">
                        Repository
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="underline">
                        Live System
                      </a>
                    )}
                  </div>
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-stone-800">
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
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-2 font-sans">
            Core Competencies & Stack
          </h2>
          <div className="space-y-1 text-xs font-sans">
            {data.skills.map((s, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="font-semibold text-stone-900 min-w-[140px]">{s.category}:</span>
                <span className="text-stone-700">{s.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
