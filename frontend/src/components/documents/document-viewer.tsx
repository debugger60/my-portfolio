"use client";

import { useEffect, useRef, useState } from "react";
import { Download, ExternalLink, Maximize, Minimize, Minus, Plus, Printer } from "lucide-react";

/* ============================================================
   DocumentViewer — professional PDF viewer with zoom, download,
   print, open-in-new-tab and fullscreen. Used by Resume & CV.
   ============================================================ */

const ZOOM_STEPS = [0.6, 0.75, 0.9, 1, 1.15, 1.35, 1.6];

export function DocumentViewer({ url, filename }: { url: string; filename: string }) {
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    function onFsChange() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  function zoomBy(dir: 1 | -1) {
    const i = ZOOM_STEPS.indexOf(zoom);
    const next = i === -1 ? 1 : ZOOM_STEPS[Math.min(ZOOM_STEPS.length - 1, Math.max(0, i + dir))];
    setZoom(next);
  }

  async function toggleFullscreen() {
    try {
      if (!fullscreen) {
        await containerRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {
      /* ignore */
    }
  }

  function print() {
    try {
      iframeRef.current?.contentWindow?.print();
    } catch {
      window.open(url, "_blank");
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-col bg-[#0a0f1d]"
    >
      {/* toolbar */}
      <div className="flex items-center gap-1 border-b border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5">
        <button
          onClick={() => zoomBy(-1)}
          className="btn-ghost grid h-7 w-7 place-items-center rounded-md"
          aria-label="Zoom out"
        >
          <Minus size={14} />
        </button>
        <span className="w-12 text-center font-mono text-[11px] text-slate-300">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => zoomBy(1)}
          className="btn-ghost grid h-7 w-7 place-items-center rounded-md"
          aria-label="Zoom in"
        >
          <Plus size={14} />
        </button>

        <div className="mx-1 h-4 w-px bg-white/10" />
        <span className="px-1 font-mono text-[11px] text-slate-500">1 / 1</span>

        <div className="flex-1" />

        <button
          onClick={print}
          className="btn-ghost hidden h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] sm:flex"
        >
          <Printer size={13} /> Print
        </button>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost hidden h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] sm:flex"
        >
          <ExternalLink size={13} /> Open
        </a>
        <button
          onClick={toggleFullscreen}
          className="btn-ghost hidden h-7 items-center gap-1.5 rounded-md px-2.5 text-[11px] sm:flex"
          aria-label="Toggle fullscreen"
        >
          {fullscreen ? <Minimize size={13} /> : <Maximize size={13} />}
        </button>
        <a
          href={url}
          download={filename}
          className="btn-accent flex h-7 items-center gap-1.5 rounded-md px-3 text-[11px] font-semibold"
        >
          <Download size={13} /> Download
        </a>
      </div>

      {/* viewer */}
      <div className="scroll-thin min-h-0 flex-1 overflow-auto">
        <div
          className="relative mx-auto"
          style={{
            width: `${zoom * 100}%`,
            height: `${zoom * 100}%`,
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <iframe
            ref={iframeRef}
            src={url}
            title={`Document: ${filename}`}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
