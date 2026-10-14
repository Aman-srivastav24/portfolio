"use client";

import { Children, useId, useState, type ReactNode } from "react";

// Collapsed-by-default details for small screens. Opening reveals each child as a layer that
// rises from a different depth at a different speed, giving a parallax feel.
export default function MobileDetails({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const layers = Children.toArray(children);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          tone === "dark" ? "bg-canvas text-ink" : "bg-ink text-canvas"
        }`}
      >
        {open ? "Hide details" : "View details"}
        <span aria-hidden="true" className={`text-accent transition-transform duration-500 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>

      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="space-y-6 pt-6">
            {layers.map((layer, i) => (
              <div
                key={i}
                className="motion-reduce:!transform-none motion-reduce:!transition-none"
                style={{
                  transform: open ? "translateY(0)" : `translateY(${(i + 1) * 40}px)`,
                  opacity: open ? 1 : 0,
                  transition: `transform ${650 + i * 160}ms cubic-bezier(0.2, 0.8, 0.2, 1) ${open ? i * 90 : 0}ms, opacity ${
                    open ? 500 : 200
                  }ms ease ${open ? i * 90 : 0}ms`,
                }}
              >
                {layer}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
