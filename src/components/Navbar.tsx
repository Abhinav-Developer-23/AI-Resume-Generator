"use client";

import React from "react";
import { Sparkles, FileText, CheckCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              AI Resume Studio
            </span>
          </div>
        </div>

        {/* Right side professional badges */}
        <div className="flex items-center gap-2.5 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 font-medium text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Polish Active</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium text-[11px]">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>ATS-Friendly & Multipage</span>
          </div>
        </div>
      </div>
    </header>
  );
}
