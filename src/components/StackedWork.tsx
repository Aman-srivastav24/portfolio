"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/portfolio";
import ProjectPanel from "@/components/ProjectPanel";

const SCALE_STEP = 0.04; // how much a card shrinks per card stacked on top of it
const MAX_SCROLL_SCREENS = 2.5; // cap on how far a site preview scrolls, in frame heights

const SHEET_PX = 900; // one "screen" of the 1440px-wide site screenshot
const MAX_SHEETS = 4;
const MIN_SHEETS = 3; // short sites repeat their screenshot so the tilted column still looks full

// The site screenshot cut into screen-sized sheets, laid out as a tilted column in 3D.
function TiltedSheets({
  image,
  height,
  title,
  sheetRef,
}: {
  image: string;
  height: number;
  title: string;
  sheetRef: (el: HTMLDivElement | null) => void;
}) {
  const unique = Math.max(1, Math.min(MAX_SHEETS, Math.floor(height / SHEET_PX)));
  const count = Math.max(MIN_SHEETS, unique);
  return (
    <div
      className="absolute left-1/2 top-[-4%] w-[86%] origin-top md:w-[58%]"
      style={{ transform: "translateX(-50%) perspective(2200px) rotateX(38deg) rotateZ(12deg)" }}
    >
      <div ref={sheetRef} className="will-change-transform">
        {Array.from({ length: count }, (_, k) => (
          <div
            key={k}
            className="relative mb-[7%] aspect-[1440/900] overflow-hidden rounded-md bg-white shadow-[0_30px_60px_-10px_rgba(10,10,10,0.25)] ring-1 ring-ink/5"
          >
            <Image
              src={image}
              alt={k === 0 ? `${title} website` : ""}
              fill
              sizes="(min-width: 1080px) 820px, 80vw"
              className="object-cover"
              style={{
                objectPosition: `0 ${height > SHEET_PX ? (((k % unique) * SHEET_PX) / (height - SHEET_PX)) * 100 : 0}%`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Freelance projects as sticky cards that stack on scroll. Each card's site screenshot scrolls
// inside its frame as the page scrolls; clicking a card opens the details panel.
export default function StackedWork({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sheetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const list = listRef.current;
      const wraps = wrapRefs.current;
      if (!list) return;
      const vh = window.innerHeight;
      const listTop = list.getBoundingClientRect().top + window.scrollY;

      // Natural (unstuck) document position and stick offset of each card
      let y = listTop;
      const layout = wraps.map((w) => {
        if (!w) return { top: 0, end: 0, stick: 0 };
        const cs = getComputedStyle(w);
        const top = y;
        y += w.offsetHeight + parseFloat(cs.marginBottom);
        return { top, end: y, stick: parseFloat(cs.top) || 0 };
      });

      wraps.forEach((w, i) => {
        const card = cardRefs.current[i];
        const box = frameRefs.current[i];
        const img = sheetRefs.current[i];
        if (!w || !card) return;

        // Shrink and dim as later cards stack over this one
        let depth = 0;
        for (let j = i + 1; j < wraps.length; j++) {
          const r = wraps[j]?.getBoundingClientRect();
          if (!r) continue;
          depth += Math.min(1, Math.max(0, 1 - (r.top - layout[j].stick) / r.height));
        }
        card.style.transform = depth ? `scale(${1 - depth * SCALE_STEP})` : "";
        card.style.filter = depth ? `brightness(${1 - Math.min(depth, 3) * 0.12})` : "";

        // Scroll the site screenshot inside its frame while the card is stuck
        if (box && img) {
          const max = Math.min(img.offsetHeight - box.clientHeight * 0.9, box.clientHeight * MAX_SCROLL_SCREENS);
          const start = layout[i].top - layout[i].stick;
          const end = layout[i].end - layout[i].stick - vh * 0.15;
          const p = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
          img.style.transform = max > 0 ? `translateY(${-p * max}px)` : "";
        }
      });
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

  // "Open" pill eases toward the cursor
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill || !window.matchMedia("(pointer: fine)").matches) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      pill.style.translate = `${pos.x}px ${pos.y}px`;
      frame = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX + 16;
      target.y = e.clientY + 16;
    };
    const onEnter = (e: PointerEvent) => {
      onMove(e);
      pos.x = target.x;
      pos.y = target.y;
    };
    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerenter", onEnter);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={listRef} className="relative">
        {projects.map((p, i) => (
          <div
            key={p.slug}
            ref={(el) => {
              wrapRefs.current[i] = el;
            }}
            className="sticky mb-[30vh] ml-[calc(50%-45vw)] last:mb-[8vh] md:mb-[45vh] md:last:mb-[15vh] w-[90vw] md:ml-[calc(50%-33.75vw)] md:w-[67.5vw] [--grow:0.675] [--min-h:210px] [--peek:1.5rem] [--top:4.75rem] md:[--grow:1.35] md:[--min-h:420px] md:[--peek:2.2rem] md:[--top:5.5rem]"
            style={
              {
                top: `calc(var(--top) + ${i} * var(--peek))`,
                // --grow: 35% taller than the space under the stacked titles on desktop, half that on phones; never taller than the screen
                height: `clamp(var(--min-h), min(calc((95svh - var(--top) - ${projects.length - 1} * var(--peek)) * var(--grow)), calc(98svh - var(--top))), 1215px)`,
              } as React.CSSProperties
            }
          >
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="h-full origin-top will-change-transform"
            >
              <article
                className="group relative flex h-full flex-col rounded-lg bg-[#e7e5e0] p-3 text-ink shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.6)] sm:p-4"
                onPointerEnter={() => setHovering(true)}
                onPointerLeave={() => setHovering(false)}
              >
                <header className="flex items-center justify-between gap-4 px-2 pb-3 pt-1 sm:px-3">
                  <h3 className="flex items-center font-display text-[clamp(1.25rem,2.2vw,2rem)] font-medium tracking-tight">
                    <span className="inline-block w-0 overflow-hidden text-accent opacity-0 transition-all duration-300 group-hover:w-[1.3em] group-hover:opacity-100">
                      →
                    </span>
                    {p.title}
                  </h3>
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-medium text-canvas sm:hidden">
                    Open ↗
                  </span>
                  <span className="hidden gap-4 text-sm text-ink/70 sm:flex">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </span>
                </header>

                {p.image && (
                  <div
                    ref={(el) => {
                      frameRefs.current[i] = el;
                    }}
                    className="relative flex-1 overflow-hidden rounded-md bg-[#efede9]"
                  >
                    <TiltedSheets
                      image={p.image}
                      height={p.imageHeight ?? 900}
                      title={p.title}
                      sheetRef={(el) => {
                        sheetRefs.current[i] = el;
                      }}
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="absolute inset-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span className="sr-only">Open {p.title} details</span>
                </button>
              </article>
            </div>
          </div>
        ))}
      </div>

      <div ref={pillRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block">
        <span
          className={`block rounded-full bg-canvas px-5 py-2.5 text-sm font-medium text-ink shadow-xl transition-[opacity,scale] duration-300 ${
            hovering && open === null ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          Open
        </span>
      </div>

      <ProjectPanel projects={projects} index={open} onChange={setOpen} />
    </>
  );
}
