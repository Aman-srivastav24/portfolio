"use client";

import { useEffect, useRef, useState } from "react";
import { whenIntroDone } from "@/components/intro";

export type Stat = {
  label: string;
  detail: string;
  value?: number;
  suffix?: string;
  unit?: string;
  text?: string;
};

const DURATION = 1600;

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(to);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, to]);

  return <>{n}</>;
}

// Stats beside the hero name: hidden until in view, then numbers count up and text rises in.
export default function HeroStats({ stats, className }: { stats: Stat[]; className?: string }) {
  const ref = useRef<HTMLDListElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelIntro = () => {};
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Wait for the intro loader, then let the name animation lead
        cancelIntro = whenIntroDone(() => {
          timer = setTimeout(() => setRun(true), 650);
        });
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelIntro();
      clearTimeout(timer);
    };
  }, []);

  return (
    <dl ref={ref} className={className}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          data-reveal={run ? "in" : ""}
          style={{ transitionDelay: `${i * 140}ms` }}
          className="border-t border-ink/15 pt-3 xl:pt-4"
        >
          <dt className="text-label text-muted">{s.label}</dt>
          <dd className="mt-1 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-none tracking-tight">
            {s.text ? (
              <span key={String(run)} className="inline-block overflow-hidden align-bottom">
                {s.text.split("").map((ch, j) => (
                  <span key={j} className="rise" style={{ "--i": i * 3 + j } as React.CSSProperties}>
                    {ch}
                  </span>
                ))}
              </span>
            ) : (
              <CountUp to={s.value ?? 0} run={run} />
            )}
            {s.suffix && <span className="text-accent">{s.suffix}</span>}
            {s.unit && <span className="ml-1 text-[0.4em] font-normal tracking-normal text-muted">{s.unit}</span>}
          </dd>
          <dd className="mt-2 text-xs leading-snug text-muted sm:text-sm">{s.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
