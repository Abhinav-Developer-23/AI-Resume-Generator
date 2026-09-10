"use client";

import React from "react";
import { ResumeData } from "@/types/resume";

export default function BoldTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-black font-sans p-8 md:p-10 shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto select-text"
    >
      {/* Header */}
      <div className="mb-8 border-b-4 border-black pb-4">
        <h1 className="text-5xl font-black uppercase tracking-tight mb-2">{data.name}</h1>
        <p className="text-2xl font-bold text-gray-700 mb-3">{data.title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.location && <span>{data.location}</span>}
          {data.linkedin && <span>{data.linkedin}</span>}
          {data.github && <span>{data.github}</span>}
          {data.website && <span>{data.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-black uppercase tracking-widest border-b-2 border-black pb-1 mb-3">Profile</h2>
          <p className="text-base font-medium leading-snug">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-black uppercase tracking-widest border-b-2 border-black pb-1 mb-4">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold">{exp.role}</h3>
                  <span className="text-sm font-bold bg-black text-white px-2 py-0.5">{exp.duration}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-base font-bold text-gray-600 uppercase tracking-wide">{exp.company}</p>
                  {exp.location && <span className="text-sm font-semibold text-gray-500">{exp.location}</span>}
                </div>
                <ul className="list-disc list-inside text-sm font-medium space-y-1 pl-1">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-snug">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-black uppercase tracking-widest border-b-2 border-black pb-1 mb-4">Projects</h2>
          <div className="space-y-5">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-bold">{proj.title}</h3>
                  </div>
                  <div className="flex gap-2 text-xs font-bold underline">
                    {proj.liveUrl && <span>{proj.liveUrl}</span>}
                    {proj.githubUrl && <span>{proj.githubUrl}</span>}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-xs font-bold bg-gray-200 px-2 py-0.5 text-black">{proj.techStack}</span>
                </div>
                <ul className="list-disc list-inside text-sm font-medium space-y-1 pl-1">
                  {proj.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-snug">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-black uppercase tracking-widest border-b-2 border-black pb-1 mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold">{edu.degree}</h3>
                  <span className="text-sm font-bold">{edu.gradYear}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold text-gray-600">{edu.college}</p>
                  <div className="text-sm font-semibold">
                    {edu.location && <span>{edu.location} • </span>}
                    <span>CGPA: {edu.cgpa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest border-b-2 border-black pb-1 mb-3">Skills</h2>
          <div className="space-y-3">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="font-bold text-sm w-32 shrink-0">{skillGroup.category}</span>
                <div className="flex flex-wrap gap-1">
                  {skillGroup.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-xs font-bold border border-black px-2 py-0.5">
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
  );
}
