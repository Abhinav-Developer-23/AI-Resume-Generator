"use client";

import React from "react";
import { ResumeData } from "@/types/resume";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-black font-sans p-8 md:p-10 shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto text-[12.5px] leading-normal select-text"
      style={{ boxSizing: "border-box" }}
    >
      {/* Centered Classic ATS Header */}
      <header className="text-center pb-4 mb-5 border-b border-black">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-black">
          {data.name || "Your Name"}
        </h1>
        {data.title && (
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-800 mt-1">
            {data.title}
          </p>
        )}

        {/* Contact links separated by bullet */}
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-2 text-xs text-neutral-800">
          {data.location && <span>{data.location}</span>}
          {data.location && (data.phone || data.email) && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.email && <span>•</span>}
          {data.email && <a href={`mailto:${data.email}`} className="underline">{data.email}</a>}
          {data.linkedin && (
            <>
              <span>•</span>
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="underline">
                LinkedIn
              </a>
            </>
          )}
          {data.github && (
            <>
              <span>•</span>
              <a href={data.github} target="_blank" rel="noreferrer" className="underline">
                GitHub
              </a>
            </>
          )}
          {data.website && (
            <>
              <span>•</span>
              <a href={data.website} target="_blank" rel="noreferrer" className="underline">
                Portfolio
              </a>
            </>
          )}
        </div>

        {data.summary && (
          <p className="mt-3 text-xs text-justify text-neutral-800 leading-relaxed max-w-3xl mx-auto">
            {data.summary}
          </p>
        )}
      </header>

      {/* Education (Compulsory) */}
      {data.education && data.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 text-black">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold">{edu.college}</span>
                  {edu.location && <span> — {edu.location}</span>}
                  <div>{edu.degree}</div>
                </div>
                <div className="text-right whitespace-nowrap">
                  <div className="font-semibold">CGPA: {edu.cgpa}</div>
                  <div className="text-neutral-600">{edu.gradYear}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience (Optional) */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 text-black">
            Work Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold">{exp.company}</span>
                    <span className="italic"> — {exp.role}</span>
                  </div>
                  <div className="text-neutral-700 whitespace-nowrap font-medium">
                    {exp.duration}
                  </div>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs text-neutral-800">
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
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 text-black">
            Technical Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold">{proj.title}</span>
                    {proj.techStack && (
                      <span className="text-neutral-700 italic"> | {proj.techStack}</span>
                    )}
                  </div>
                  <div className="text-neutral-700 text-[11px] whitespace-nowrap space-x-2">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="underline">
                        Code
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="underline">
                        Demo
                      </a>
                    )}
                  </div>
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-xs text-neutral-800">
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
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-black pb-0.5 mb-2 text-black">
            Technical Skills
          </h2>
          <div className="space-y-1 text-xs">
            {data.skills.map((s, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="font-bold min-w-[140px]">{s.category}:</span>
                <span className="text-neutral-800">{s.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
