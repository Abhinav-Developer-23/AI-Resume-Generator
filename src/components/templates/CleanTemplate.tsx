"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { Mail, Phone, Linkedin, Github, Globe, MapPin } from "lucide-react";

export default function CleanTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-document"
      className="bg-white text-gray-800 font-sans p-8 md:p-12 shadow-sm w-full max-w-[794px] min-h-[1123px] mx-auto select-text"
    >
      {/* HEADER */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-light text-gray-800 mb-2 tracking-wide">
          {data.name}
        </h1>
        {data.title && (
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-6">
            {data.title}
          </p>
        )}
        
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
          {data.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{data.location}</span>
            </div>
          )}
          {data.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              <span>{data.linkedin}</span>
            </div>
          )}
          {data.github && (
            <div className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>{data.github}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>{data.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {data.summary && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">
            Summary
          </h2>
          <p className="text-sm font-light leading-relaxed text-gray-600">
            {data.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{exp.role}</h3>
                    <div className="text-sm text-gray-500 mt-0.5">
                      <span className="font-medium">{exp.company}</span>
                      {exp.location && <span> • {exp.location}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 sm:mt-0 tracking-wide">
                    {exp.duration}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-2 text-sm text-gray-600 font-light space-y-1.5">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">{bullet}</li>
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
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      {proj.title}
                    </h3>
                    {proj.techStack && (
                      <div className="text-xs text-gray-500 mt-1 tracking-wide">
                        {proj.techStack}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 sm:mt-0 space-x-3">
                    {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-gray-800 transition-colors">Live Link</a>}
                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-gray-800 transition-colors">Source</a>}
                  </div>
                </div>
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 mt-2 text-sm text-gray-600 font-light space-y-1.5">
                    {proj.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">{bullet}</li>
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
        <section className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{edu.degree}</h3>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {edu.college}
                      {edu.location && <span> • {edu.location}</span>}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 sm:mt-0 text-right">
                    <div>{edu.gradYear}</div>
                    {edu.cgpa && <div className="mt-0.5">CGPA: {edu.cgpa}</div>}
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
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-2">
            Skills
          </h2>
          <div className="space-y-3">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="text-sm font-light leading-relaxed">
                <span className="font-medium text-gray-700 mr-2">{skillGroup.category}:</span>
                <span className="text-gray-600">
                  {skillGroup.skills.map((s, i) => (
                    <React.Fragment key={i}>
                      {s}
                      {i < skillGroup.skills.length - 1 && <span className="text-gray-300 mx-1.5">|</span>}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
