"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 2200;

// Cycles through words, each sliding up out of view as the next slides in.
export default function RotatingWords({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [words.length]);

  const prev = (index - 1 + words.length) % words.length;

  return (
    <span className={`relative inline-grid overflow-hidden pb-[0.1em] align-bottom ${className ?? ""}`}>
      <span className="sr-only">{words.join(", ")}</span>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          className="col-start-1 row-start-1 whitespace-nowrap transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{
            transform: i === index ? "translateY(0)" : i === prev ? "translateY(-110%)" : "translateY(110%)",
            opacity: i === index ? 1 : 0,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
