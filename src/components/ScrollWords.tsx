"use client";

import { useEffect, useRef, useState } from "react";

// Paragraph whose words fill in from faint to solid as it scrolls through the viewport.
export default function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(1);
  const words = text.split(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top enters at 85% of the viewport, 1 when the bottom reaches 45%
      const start = vh * 0.85;
      const end = vh * 0.45;
      const total = start - end + rect.height;
      const p = (start - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const lit = progress * words.length;

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="transition-opacity duration-200" style={{ opacity: i < lit ? 1 : 0.15 }}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
