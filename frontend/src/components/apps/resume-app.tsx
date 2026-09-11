"use client";

import { FileText } from "lucide-react";
import { DocumentViewer } from "@/components/documents/document-viewer";
import { settings } from "@/data/settings";

export function ResumeApp() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0a0f1d]">
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-4 py-2.5">
        <FileText size={15} className="text-cyan-300" />
        <div>
          <p className="text-[13px] font-semibold text-slate-100">Resume</p>
          <p className="text-[10px] tracking-wide text-slate-500 uppercase">resume.pdf · 1 page</p>
        </div>
      </div>
      <div className="min-h-0 flex-1">
        <DocumentViewer url={settings.documents.resumeUrl} filename="Kishore-Ranjan-Panda-Resume.pdf" />
      </div>
    </div>
  );
}
