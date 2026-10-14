"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/portfolio";

const CLOSE_MS = 280;

// Slide-up details panel for a freelance project, built on a modal <dialog> (Esc and focus handled natively).
export default function ProjectPanel({
  projects,
  index,
  onChange,
}: {
  projects: Project[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);
  const project = index === null ? null : projects[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    scrollRef.current?.scrollTo({ top: 0 });
  }, [index]);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      dialogRef.current?.close();
      document.documentElement.style.overflow = "";
      setClosing(false);
      onChange(null);
    }, CLOSE_MS);
  };

  const href = project?.links?.live;

  return (
    <dialog
      ref={dialogRef}
      aria-label={project ? `${project.title} details` : "Project details"}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div
          ref={scrollRef}
          className={`absolute inset-x-0 bottom-0 mx-auto max-h-[92vh] max-w-[1180px] overflow-y-auto overscroll-contain rounded-t-[28px] bg-canvas text-ink ${
            closing ? "panel-out" : "panel-in"
          }`}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-ink/10 bg-canvas/90 px-5 py-4 backdrop-blur sm:px-10">
            <span className="text-label text-muted">{project.category}</span>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 text-lg transition-colors hover:border-accent hover:bg-accent hover:text-canvas"
            >
              ✕
            </button>
          </div>

          <div className="px-5 pb-12 pt-8 sm:px-10 sm:pb-14 sm:pt-12">
            <h2 className="font-display text-section font-medium">{project.title}</h2>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-ink/15 py-6 md:grid-cols-4">
              {[
                ["Role", project.role],
                ["Year", project.year],
                ["Team", project.team],
                ["Stack", project.stack.join(" · ")],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-label text-muted">{label}</dt>
                  <dd className="mt-1 text-sm font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid gap-10 md:grid-cols-[1.1fr_1fr]">
              <p className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-medium leading-snug tracking-tight">
                {project.summary}
              </p>
              <ol className="divide-y divide-ink/10">
                {project.highlights.map((h, i) => (
                  <li key={h} className="flex gap-5 py-4 first:pt-0">
                    <span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="leading-relaxed">{h}</p>
                  </li>
                ))}
              </ol>
            </div>

            {href && (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-ink"
              >
                Visit live site <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
