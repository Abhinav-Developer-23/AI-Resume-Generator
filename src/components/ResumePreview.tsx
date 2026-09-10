"use client";

import React from "react";
import { ResumeData, TemplateId } from "@/types/resume";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import TechTemplate from "./templates/TechTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import CompactTemplate from "./templates/CompactTemplate";
import BoldTemplate from "./templates/BoldTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CleanTemplate from "./templates/CleanTemplate";
import { ZoomIn, ZoomOut, Check, Layers } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  activeTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

const TEMPLATES: { id: TemplateId; name: string }[] = [
  { id: "cupertino-modern", name: "Modern" },
  { id: "minimal-ats", name: "Minimal ATS" },
  { id: "tech-innovator", name: "Tech Dev" },
  { id: "executive-serif", name: "Executive" },
  { id: "creative-dev", name: "Creative" },
  { id: "elegant", name: "Elegant" },
  { id: "compact", name: "Compact" },
  { id: "bold", name: "Bold" },
  { id: "professional", name: "Professional" },
  { id: "clean", name: "Clean" },
];

export default function ResumePreview({
  data,
  activeTemplate,
  onSelectTemplate,
  zoom,
  setZoom,
}: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (activeTemplate) {
      case "cupertino-modern":
        return <ModernTemplate data={data} />;
      case "minimal-ats":
        return <MinimalTemplate data={data} />;
      case "tech-innovator":
        return <TechTemplate data={data} />;
      case "executive-serif":
        return <ExecutiveTemplate data={data} />;
      case "creative-dev":
        return <CreativeTemplate data={data} />;
      case "elegant":
        return <ElegantTemplate data={data} />;
      case "compact":
        return <CompactTemplate data={data} />;
      case "bold":
        return <BoldTemplate data={data} />;
      case "professional":
        return <ProfessionalTemplate data={data} />;
      case "clean":
        return <CleanTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Sleek Template Switcher & Zoom Bar (No horizontal scrollbar, clean pills) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-neutral-900/90 border border-white/10 px-3 py-2 rounded-xl">
        <div className="flex items-center gap-1 flex-wrap">
          <div className="flex items-center gap-1 mr-1 text-[11px] font-semibold text-neutral-400">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Template:</span>
          </div>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTemplate(t.id)}
              className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-all ${
                activeTemplate === t.id
                  ? "bg-blue-600 text-white font-semibold shadow-sm ring-1 ring-blue-400/50"
                  : "bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700"
              }`}
            >
              {activeTemplate === t.id && <Check className="w-3 h-3" />}
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-neutral-800 px-2 py-1 rounded-lg border border-white/5 text-xs text-neutral-300">
          <button
            onClick={() => setZoom((prev) => Math.max(0.6, prev - 0.1))}
            className="p-1 hover:text-white transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1 min-w-[36px] text-center text-neutral-200">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((prev) => Math.min(1.3, prev + 0.1))}
            className="p-1 hover:text-white transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Document Viewport - Multi-Page Flow */}
      <div className="flex-1 overflow-auto bg-neutral-950/60 rounded-xl p-4 md:p-6 flex justify-center items-start border border-white/5 min-h-[650px]">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
          }}
          className="shadow-2xl rounded-sm print:shadow-none print:transform-none w-full max-w-[794px]"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
