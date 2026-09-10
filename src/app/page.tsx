"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MacWindow from "@/components/MacWindow";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData, TemplateId } from "@/types/resume";
import { initialResumeData } from "@/lib/initialData";
import { exportResumeToPdf, printResume } from "@/lib/pdf";

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>("cupertino-modern");
  const [activeView, setActiveView] = useState<"split" | "editor" | "preview">("split");
  const [zoom, setZoom] = useState<number>(0.85);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Restore from localStorage on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ai_resume_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name !== "Alex Rivera") {
          setResumeData(parsed);
        } else {
          setResumeData(initialResumeData);
        }
      } else {
        setResumeData(initialResumeData);
      }
      const savedTemplate = localStorage.getItem("ai_resume_template");
      if (savedTemplate) {
        setActiveTemplate(savedTemplate as TemplateId);
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("ai_resume_data", JSON.stringify(resumeData));
      localStorage.setItem("ai_resume_template", activeTemplate);
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [resumeData, activeTemplate, isLoaded]);

  // Adjust zoom for small screens automatically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setZoom(0.6);
        if (activeView === "split") {
          setActiveView("editor");
        }
      } else if (window.innerWidth < 1200) {
        setZoom(0.75);
      } else {
        setZoom(0.85);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownloadPdf = async () => {
    try {
      setIsDownloading(true);
      const safeName = (resumeData.name || "Resume").replace(/[^a-zA-Z0-9_-]/g, "_");
      await exportResumeToPdf("resume-document", `${safeName}_Resume.pdf`);
    } catch (err: any) {
      console.error(err);
      alert("Failed to export PDF: " + (err.message || "Unknown error"));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleResetDemo = () => {
    if (confirm("Reset current resume to the default demo data?")) {
      setResumeData(initialResumeData);
      setActiveTemplate("cupertino-modern");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-3 sm:px-6 pb-12 flex flex-col items-center">
        {/* Hero title banner */}
        <div className="text-center mt-6 mb-3 max-w-3xl px-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Build an Impressive, ATS-Friendly Resume with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              AI Power
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
            Easily polish and restructure your resume bullets using the STAR method. Correct grammar, highlight technical impact, and export professional, multi-page vector PDFs — choose from 10 professional templates.
          </p>
        </div>

        {/* macOS Desktop Window Container */}
        <MacWindow
          activeView={activeView}
          setActiveView={setActiveView}
          onDownloadPdf={handleDownloadPdf}
          onPrint={printResume}
          onResetDemo={handleResetDemo}
          isDownloading={isDownloading}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Editor Panel */}
            {(activeView === "split" || activeView === "editor") && (
              <div
                id="resume-editor-container"
                className={`${
                  activeView === "split" ? "lg:col-span-6 xl:col-span-5" : "lg:col-span-12 max-w-3xl mx-auto"
                } w-full`}
              >
                <ResumeForm
                  data={resumeData}
                  onChange={setResumeData}
                  onViewPreview={() => {
                    if (activeView === "editor" || window.innerWidth < 1024) {
                      setActiveView("preview");
                    }
                    setTimeout(() => {
                      const el = document.getElementById("resume-preview-container");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        el.classList.add("ring-2", "ring-indigo-500");
                        setTimeout(() => el.classList.remove("ring-2", "ring-indigo-500"), 1200);
                      }
                    }, 80);
                  }}
                />
              </div>
            )}

            {/* Right Live Preview Panel */}
            {(activeView === "split" || activeView === "preview") && (
              <div
                id="resume-preview-container"
                className={`${
                  activeView === "split" ? "lg:col-span-6 xl:col-span-7" : "lg:col-span-12"
                } w-full sticky top-20`}
              >
                <ResumePreview
                  data={resumeData}
                  activeTemplate={activeTemplate}
                  onSelectTemplate={setActiveTemplate}
                  zoom={zoom}
                  setZoom={setZoom}
                />
              </div>
            )}
          </div>
        </MacWindow>
      </main>
    </div>
  );
}
