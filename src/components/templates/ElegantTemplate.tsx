"use client";

import React from "react";
import { ResumeData } from "@/types/resume";

export default function ElegantTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-gray-800 font-sans p-8 md:p-10 shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto select-text"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-serif text-gray-900 mb-1">{data.name}</h1>
        <p className="text-xl font-serif italic text-amber-700 mb-3">{data.title}</p>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {data.email && <span>{data.email}</span>}
          {data.phone && <span>• {data.phone}</span>}
          {data.location && <span>• {data.location}</span>}
          {data.linkedin && <span>• {data.linkedin}</span>}
          {data.github && <span>• {data.github}</span>}
          {data.website && <span>• {data.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-5">
          <div className="border-b border-amber-500 mb-2">
            <h2 className="text-lg font-serif text-amber-800 uppercase tracking-wider pb-1">Professional Summary</h2>
          </div>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-5">
          <div className="border-b border-amber-500 mb-3">
            <h2 className="text-lg font-serif text-amber-800 uppercase tracking-wider pb-1">Experience</h2>
          </div>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-serif font-bold text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-sm italic text-gray-700">{exp.company}</p>
                  {exp.location && <span className="text-sm text-gray-600">{exp.location}</span>}
                </div>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 pl-2">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-5">
          <div className="border-b border-amber-500 mb-3">
            <h2 className="text-lg font-serif text-amber-800 uppercase tracking-wider pb-1">Projects</h2>
          </div>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-base font-serif font-bold text-gray-900">{proj.title}</h3>
                    <span className="text-xs text-gray-500">[{proj.techStack}]</span>
                  </div>
                  <div className="flex gap-2 text-xs text-amber-700">
                    {proj.liveUrl && <span>{proj.liveUrl}</span>}
                    {proj.githubUrl && <span>{proj.githubUrl}</span>}
                  </div>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700 pl-2">
                  {proj.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-5">
          <div className="border-b border-amber-500 mb-3">
            <h2 className="text-lg font-serif text-amber-800 uppercase tracking-wider pb-1">Education</h2>
          </div>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-serif font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">{edu.gradYear}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm italic text-gray-700">{edu.college}</p>
                  <div className="text-sm text-gray-600">
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
          <div className="border-b border-amber-500 mb-3">
            <h2 className="text-lg font-serif text-amber-800 uppercase tracking-wider pb-1">Skills</h2>
          </div>
          <div className="space-y-2">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="text-sm">
                <span className="font-serif font-bold text-gray-900 mr-2">{skillGroup.category}:</span>
                <span className="text-gray-700 leading-relaxed">{skillGroup.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
