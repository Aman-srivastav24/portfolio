"use client";

import { useEffect, useRef, useState } from "react";
import { ICONS } from "@/components/icons";

const SPACING = 75; // px of cursor travel between stickers
const LIFETIME = 800; // ms, matches the trail-pop animation
const MAX = 14;

type Sticker = { id: number; x: number; y: number; icon: number; rot: number; size: number };

export default function CursorTrail({ color = "text-accent" }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    const layer = ref.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let last: { x: number; y: number } | null = null;
    let id = 0;
    let icon = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const drop = (clientX: number, clientY: number) => {
      const box = layer.getBoundingClientRect();
      const x = clientX - box.left;
      const y = clientY - box.top;
      if (last && Math.hypot(x - last.x, y - last.y) < SPACING) return;
      last = { x, y };
      const sticker: Sticker = {
        id: id++,
        x,
        y,
        icon: icon++ % ICONS.length,
        rot: Math.round(Math.random() * 40 - 20),
        size: 35 + Math.round(Math.random() * 16),
      };
      setStickers((s) => [...s.slice(-(MAX - 1)), sticker]);
      const t = setTimeout(() => {
        setStickers((s) => s.filter((st) => st.id !== sticker.id));
        timers.delete(t);
      }, LIFETIME);
      timers.add(t);
    };
    // Mouse and pen follow the pointer; touch follows the finger (touch events keep firing while scrolling)
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "touch") drop(e.clientX, e.clientY);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) drop(t.clientX, t.clientY);
    };
    const onLeave = () => {
      last = null;
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("touchstart", onTouch, { passive: true });
    host.addEventListener("touchmove", onTouch, { passive: true });
    host.addEventListener("touchend", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("touchstart", onTouch);
      host.removeEventListener("touchmove", onTouch);
      host.removeEventListener("touchend", onLeave);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {stickers.map((s) => (
        <span
          key={s.id}
          className={`trail-pop absolute ${color}`}
          style={
            {
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              "--rot": `${s.rot}deg`,
            } as React.CSSProperties
          }
        >
          {ICONS[s.icon]}
        </span>
      ))}
    </div>
  );
}
