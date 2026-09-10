"use client";

import React from "react";
import { ResumeData } from "@/types/resume";

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-gray-900 font-sans p-8 md:p-10 shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto select-text"
    >
      {/* HEADER */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-[#1e3a5f] mb-1 tracking-wide uppercase">
          {data.name}
        </h1>
        {data.title && (
          <p className="text-lg text-gray-700 font-medium mb-3">{data.title}</p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span className="text-gray-400">|</span>}
          {data.phone && <span>{data.phone}</span>}
          
          {(data.email || data.phone) && data.location && <span className="text-gray-400">|</span>}
          {data.location && <span>{data.location}</span>}

          {(data.email || data.phone || data.location) && data.linkedin && <span className="text-gray-400">|</span>}
          {data.linkedin && <span>{data.linkedin}</span>}

          {(data.email || data.phone || data.location || data.linkedin) && data.github && <span className="text-gray-400">|</span>}
          {data.github && <span>{data.github}</span>}

          {(data.email || data.phone || data.location || data.linkedin || data.github) && data.website && <span className="text-gray-400">|</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-[#1e3a5f] text-lg font-bold border-b-2 border-[#1e3a5f] pb-1 mb-3 uppercase tracking-wider">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed text-justify">
            {data.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[#1e3a5f] text-lg font-bold border-b-2 border-[#1e3a5f] pb-1 mb-3 uppercase tracking-wider">
            Professional Experience
          </h2>
          <div className="flex flex-col gap-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                    {exp.duration}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm font-semibold text-gray-700">{exp.company}</span>
                  {exp.location && (
                    <span className="text-sm text-gray-600 italic whitespace-nowrap ml-4">
                      {exp.location}
                    </span>
                  )}
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 text-sm text-gray-800 space-y-1">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[#1e3a5f] text-lg font-bold border-b-2 border-[#1e3a5f] pb-1 mb-3 uppercase tracking-wider">
            Key Projects
          </h2>
          <div className="flex flex-col gap-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-900">
                    {proj.title}
                    {proj.techStack && (
                      <span className="font-normal text-sm text-gray-600 ml-2">
                        | {proj.techStack}
                      </span>
                    )}
                  </h3>
                  <div className="text-sm text-[#1e3a5f] font-medium whitespace-nowrap ml-4 space-x-2">
                    {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:underline">Live</a>}
                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>}
                  </div>
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 text-sm text-gray-800 space-y-1 mt-2">
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[#1e3a5f] text-lg font-bold border-b-2 border-[#1e3a5f] pb-1 mb-3 uppercase tracking-wider">
            Education
          </h2>
          <div className="flex flex-col gap-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                    {edu.gradYear}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-700">{edu.college}</span>
                  <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {edu.cgpa && <span className="mr-3">CGPA: {edu.cgpa}</span>}
                    {edu.location && <span className="italic">{edu.location}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {data.skills && data.skills.length > 0 && (
        <section>
          <h2 className="text-[#1e3a5f] text-lg font-bold border-b-2 border-[#1e3a5f] pb-1 mb-3 uppercase tracking-wider">
            Technical Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="text-sm flex items-start">
                <span className="font-bold text-gray-900 w-32 shrink-0">{skillGroup.category}:</span>
                <span className="text-gray-800 leading-tight">
                  {skillGroup.skills.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
