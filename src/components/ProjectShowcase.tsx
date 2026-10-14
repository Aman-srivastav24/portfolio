"use client";

import { useState } from "react";
import type { Project } from "@/data/portfolio";
import MobileDetails from "@/components/MobileDetails";

function Meta({ project }: { project: Project }) {
  const rows = [
    ["Role", project.role],
    ["Timeline", project.timeline],
    ["Year", project.year],
    ["Team", project.team],
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-ink/15 py-5">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="text-label text-muted">{label}</dt>
          <dd className="mt-1 text-sm font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:bg-accent hover:text-canvas"
    >
      {children}
      <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
    </a>
  );
}

// Detail blocks for a project, shared by the desktop panel and the mobile layered reveal.
function detailSections(project: Project, { withMetric = true } = {}) {
  return [
    project.flow && (
      <div key="flow" className="flex flex-wrap items-center gap-2">
        {project.flow.map((step, i) => (
          <span key={step} className="flex items-center gap-2">
            <span className="rounded-full bg-ink px-3 py-1 font-display text-xs font-medium text-canvas">{step}</span>
            {i < project.flow!.length - 1 && <span className="text-accent">→</span>}
          </span>
        ))}
      </div>
    ),
    withMetric && project.metric && <Metric key="metric" project={project} />,
    <p key="summary" className="text-lg leading-relaxed">
      {project.summary}
    </p>,
    <Meta key="meta" project={project} />,
    <ul key="highlights" className="space-y-3">
      {project.highlights.map((h) => (
        <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/80">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {h}
        </li>
      ))}
    </ul>,
    <div key="stack" className="flex flex-wrap gap-2">
      {project.stack.map((s) => (
        <span key={s} className="rounded-full border border-ink/25 px-3 py-1 text-xs">
          {s}
        </span>
      ))}
    </div>,
    (project.links?.github || project.links?.live) && (
      <div key="links" className="flex flex-wrap gap-3">
        {project.links.live && <ArrowLink href={project.links.live}>Live Demo</ArrowLink>}
        {project.links.github && <ArrowLink href={project.links.github}>View Code</ArrowLink>}
      </div>
    ),
  ].filter(Boolean);
}

function Metric({ project }: { project: Project }) {
  if (!project.metric) return null;
  return (
    <div>
      <p className="font-display text-4xl font-medium tracking-tight text-accent sm:text-5xl">{project.metric.value}</p>
      <p className="mt-1 text-sm text-muted">{project.metric.label}</p>
    </div>
  );
}

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <>
      {/* Desktop: hover list + sticky detail panel */}
      <div className="hidden gap-16 lg:grid lg:grid-cols-[1fr_minmax(0,560px)]">
        <ol className="space-y-2">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex w-full items-baseline gap-6 border-b border-ink/10 py-6 text-left"
              >
                <span className="font-display text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span
                    className={`block font-display text-project font-medium transition-all duration-300 ${
                      i === active ? "translate-x-2 text-accent" : "text-ink opacity-45 group-hover:opacity-80"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span className="mt-2 block text-label text-muted">{p.category}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="sticky top-24 self-start">
          <div key={current.slug} className="animate-[fadeIn_.4s_ease]">
            <div className="space-y-6">{detailSections(current)}</div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: title and key metric, details revealed on tap */}
      <div className="space-y-12 lg:hidden">
        {projects.map((p, i) => (
          <article key={p.slug} className="border-t border-ink/15 pt-6">
            <p className="font-display text-sm text-muted">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 font-display text-project font-medium">{p.title}</h3>
            <p className="mt-2 text-label text-muted">{p.category}</p>
            <div className="mt-5">
              <Metric project={p} />
            </div>
            <MobileDetails className="mt-5">{detailSections(p, { withMetric: false })}</MobileDetails>
          </article>
        ))}
      </div>
    </>
  );
}
