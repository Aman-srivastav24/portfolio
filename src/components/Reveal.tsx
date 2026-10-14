"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { whenIntroDone } from "@/components/intro";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
};

export default function Reveal({ as: Tag = "div", className, delay = 0, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelIntro = () => {};
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Content already on screen at load waits for the intro loader to clear
          cancelIntro = whenIntroDone(() => {
            el.dataset.reveal = "in";
          });
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelIntro();
    };
  }, []);

  return (
    <Tag ref={ref} data-reveal="" className={className} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
