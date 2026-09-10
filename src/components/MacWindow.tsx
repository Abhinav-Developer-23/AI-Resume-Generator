"use client";

import React, { useState } from "react";
import { Sparkles, FileText, Eye, Columns, Download, Printer, RefreshCw } from "lucide-react";

interface MacWindowProps {
  children: React.ReactNode;
  activeView: "split" | "editor" | "preview";
  setActiveView: (view: "split" | "editor" | "preview") => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onResetDemo: () => void;
  isDownloading?: boolean;
}

export default function MacWindow({
  children,
  activeView,
  setActiveView,
  onDownloadPdf,
  onPrint,
  onResetDemo,
  isDownloading = false,
}: MacWindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className={`transition-all duration-300 mx-auto ${
        isFullscreen
          ? "fixed inset-0 z-50 rounded-none bg-neutral-950 p-2 overflow-auto"
          : "max-w-7xl w-full my-6 rounded-2xl shadow-mac-window border border-white/15 bg-neutral-900/90 backdrop-blur-2xl"
      }`}
    >
      {/* macOS Window Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/95 border-b border-white/10 rounded-t-2xl select-none">
        {/* Left: macOS Traffic Light Window Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Resume Generator Session Active")}
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:opacity-80 transition-opacity flex items-center justify-center group"
            title="Close"
          >
            <span className="text-[8px] text-black font-bold opacity-0 group-hover:opacity-100">×</span>
          </button>
          <button
            onClick={() => setActiveView("preview")}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:opacity-80 transition-opacity flex items-center justify-center group"
            title="Minimize to Preview"
          >
            <span className="text-[8px] text-black font-bold opacity-0 group-hover:opacity-100">−</span>
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:opacity-80 transition-opacity flex items-center justify-center group"
            title="Toggle Fullscreen"
          >
            <span className="text-[8px] text-black font-bold opacity-0 group-hover:opacity-100">+</span>
          </button>

          <span className="ml-3 text-xs font-mono text-neutral-400 hidden sm:inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Resume Studio Workspace
          </span>
        </div>

        {/* Center: Segmented Controls (macOS Tab View Switcher) */}
        <div className="flex items-center bg-neutral-800/80 p-0.5 rounded-lg border border-white/10 text-xs">
          <button
            onClick={() => setActiveView("split")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              activeView === "split"
                ? "bg-neutral-700 text-white font-medium shadow-sm"
                : "text-neutral-400 hover:text-white"
            } hidden md:flex`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
          <button
            onClick={() => setActiveView("editor")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              activeView === "editor"
                ? "bg-neutral-700 text-white font-medium shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setActiveView("preview")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              activeView === "preview"
                ? "bg-neutral-700 text-white font-medium shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetDemo}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition border border-white/10"
            title="Reset with sample profile data"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="hidden sm:inline">Load Demo</span>
          </button>
          <button
            onClick={onPrint}
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition border border-white/10"
            title="Print / Save as Vector PDF"
          >
            <Printer className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Vector Print (Crisp)</span>
          </button>
          <button
            onClick={onDownloadPdf}
            disabled={isDownloading}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition shadow-md hover:shadow-blue-500/25 disabled:opacity-50"
            title="Download PDF"
          >
            <Download className="w-3 h-3" />
            <span>{isDownloading ? "Exporting..." : "Download PDF"}</span>
          </button>
        </div>
      </div>

      {/* Main Container Content */}
      <div className="p-4 md:p-6 overflow-hidden">{children}</div>
    </div>
  );
}
