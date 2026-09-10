"use client";

import React from "react";
import { ResumeData } from "@/types/resume";

export default function CompactTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-gray-800 font-sans p-0 shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto select-text flex"
    >
      {/* Left Sidebar - 30% */}
      <div className="w-[30%] bg-gray-100 p-6 flex flex-col gap-4 border-r border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{data.name}</h1>
          <p className="text-sm text-gray-600 font-medium mb-3">{data.title}</p>
          
          <div className="flex flex-col gap-1 text-[11px] text-gray-700 break-words">
            {data.email && <div>{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
            {data.location && <div>{data.location}</div>}
            {data.linkedin && <div>{data.linkedin}</div>}
            {data.github && <div>{data.github}</div>}
            {data.website && <div>{data.website}</div>}
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div>
            <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Skills</h2>
            <div className="flex flex-col gap-2 text-[11px]">
              {data.skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <div className="font-semibold text-gray-800">{skillGroup.category}</div>
                  <div className="text-gray-600">{skillGroup.skills.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div>
            <h2 className="text-[12px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Education</h2>
            <div className="flex flex-col gap-3">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="text-[11px] font-bold text-gray-800 leading-tight">{edu.degree}</div>
                  <div className="text-[10px] text-gray-700 leading-tight mt-0.5">{edu.college}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    {edu.gradYear} {edu.location && `| ${edu.location}`}
                  </div>
                  <div className="text-[10px] text-gray-600">CGPA: {edu.cgpa}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content - 70% */}
      <div className="w-[70%] p-6 flex flex-col gap-4">
        {/* Summary */}
        {data.summary && (
          <div>
            <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2">Profile</h2>
            <p className="text-[11px] text-gray-700 leading-relaxed text-justify">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div>
            <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2">Experience</h2>
            <div className="flex flex-col gap-3">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[12px] font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-[10px] text-gray-500">{exp.duration}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="text-[11px] font-medium text-gray-700">{exp.company}</div>
                    {exp.location && <span className="text-[10px] text-gray-500">{exp.location}</span>}
                  </div>
                  <ul className="list-disc list-outside text-[10px] text-gray-700 ml-3 space-y-0.5">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-tight">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <h2 className="text-[13px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-2">Projects</h2>
            <div className="flex flex-col gap-3">
              {data.projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <div className="flex items-baseline gap-1.5">
                      <h3 className="text-[12px] font-bold text-gray-900">{proj.title}</h3>
                      <span className="text-[10px] text-gray-500 italic">{proj.techStack}</span>
                    </div>
                    <div className="flex gap-2 text-[9px] text-blue-600">
                      {proj.liveUrl && <span>{proj.liveUrl}</span>}
                      {proj.githubUrl && <span>{proj.githubUrl}</span>}
                    </div>
                  </div>
                  <ul className="list-disc list-outside text-[10px] text-gray-700 ml-3 space-y-0.5">
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-tight">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
