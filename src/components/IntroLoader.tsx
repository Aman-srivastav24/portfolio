"use client";

import { useEffect, useState } from "react";
import { ICONS } from "@/components/icons";
import { INTRO_DONE } from "@/components/intro";
import { profile } from "@/data/portfolio";

const OPEN_MS = 450; // tile opens between the two words
const ICON_MS = 230; // time each icon is shown
const CYCLES = 9; // icons shown before the exit
const EXIT_MS = 700; // fade-out of the whole screen

type Phase = "enter" | "cycle" | "exit" | "done";

// Opening screen shown on every load: AMAN / [icon tile] / SRIVASTAV stacked, with the sticker icons cycling
// through the tile, then the screen fades away and the hero animations start.
export default function IntroLoader() {
  const [phase, setPhase] = useState<Phase>("enter");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const finish = () => {
      root.removeAttribute("data-loading");
      window.dispatchEvent(new Event(INTRO_DONE));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = requestAnimationFrame(() => {
        setPhase("done");
        finish();
      });
      return () => cancelAnimationFrame(skip);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    // Kick off on the next frame so the "enter" styles paint first
    const raf = requestAnimationFrame(() => setPhase("cycle"));
    for (let i = 1; i < CYCLES; i++) at(OPEN_MS + i * ICON_MS, () => setTick(i));
    const exitAt = OPEN_MS + CYCLES * ICON_MS;
    at(exitAt, () => {
      setPhase("exit");
      finish(); // hero animations start as the screen fades
    });
    at(exitAt + EXIT_MS, () => setPhase("done"));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (phase === "done") return null;

  const opened = phase !== "enter";
  const current = tick % ICONS.length;

  return (
    <div
      id="intro"
      aria-hidden="true"
      className={`fixed inset-0 z-[100] grid place-items-center bg-canvas transition-opacity ease-out ${
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
    >
      <div
        className={`flex flex-col items-center font-display text-[clamp(2.25rem,10vw,5rem)] font-medium uppercase leading-none tracking-tight transition-transform ease-out ${
          phase === "exit" ? "scale-[1.04]" : "scale-100"
        }`}
        style={{ transitionDuration: `${EXIT_MS}ms` }}
      >
        <span
          className={`transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            opened ? "translate-y-0 opacity-100" : "translate-y-[0.5em] opacity-0"
          }`}
        >
          {profile.firstName}
        </span>

        {/* Icon tile: grows open between the stacked words, then cycles the sticker icons */}
        <span
          className="relative block w-[1.6em] overflow-hidden rounded-[0.18em] bg-ink transition-[height,margin] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ height: opened ? "1.6em" : 0, marginBlock: opened ? "0.3em" : "0.05em" }}
        >
          {ICONS.map((icon, i) => {
            const offset = (i - current + ICONS.length) % ICONS.length;
            const state = offset === 0 ? "in" : offset === ICONS.length - 1 ? "out" : "wait";
            return (
              <span
                key={i}
                className="absolute inset-[0.3em] text-accent transition-[transform,opacity] duration-[220ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] [&>svg]:h-full [&>svg]:w-full"
                style={{
                  transform:
                    state === "in"
                      ? "translateY(0) scale(1) rotate(0deg)"
                      : state === "out"
                        ? "translateY(-70%) scale(0.6) rotate(-12deg)"
                        : "translateY(70%) scale(0.6) rotate(12deg)",
                  opacity: state === "in" && opened ? 1 : 0,
                }}
              >
                {icon}
              </span>
            );
          })}
        </span>

        <span
          className={`transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            opened ? "translate-y-0 opacity-100" : "-translate-y-[0.5em] opacity-0"
          }`}
        >
          {profile.lastName}
        </span>
      </div>
    </div>
  );
}
