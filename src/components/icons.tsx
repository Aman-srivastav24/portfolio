import type { ReactNode } from "react";

// Dev-themed sticker icons, shared by the cursor trail and the intro loader.
export const ICONS: ReactNode[] = [
  // </>
  <svg
    key="code"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="4.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 13 5 24l11 11M32 13l11 11-11 11M27 8l-6 32" />
  </svg>,
  // Database
  <svg key="db" viewBox="0 0 48 48" fill="currentColor">
    <ellipse cx="24" cy="10" rx="16" ry="6" />
    <path d="M8 14c0 3.3 7.2 6 16 6s16-2.7 16-6v8c0 3.3-7.2 6-16 6S8 25.3 8 22v-8Z" />
    <path d="M8 26c0 3.3 7.2 6 16 6s16-2.7 16-6v12c0 3.3-7.2 6-16 6S8 41.3 8 38V26Z" />
  </svg>,
  // AI sparkle
  <svg key="spark" viewBox="0 0 48 48" fill="currentColor">
    <path d="M22 4c1.6 9.4 6.6 14.4 16 16-9.4 1.6-14.4 6.6-16 16-1.6-9.4-6.6-14.4-16-16 9.4-1.6 14.4-6.6 16-16Z" />
    <path d="M38 30c.7 4 2.9 6.3 7 7-4.1.7-6.3 3-7 7-.7-4-2.9-6.3-7-7 4.1-.7 6.3-3 7-7Z" />
  </svg>,
  // Terminal >_
  <svg
    key="term"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="8" width="40" height="32" rx="5" fill="currentColor" stroke="none" />
    <path d="m13 19 6 5-6 5M24 30h10" stroke="#efeeeb" />
  </svg>,
  // Git branch
  <svg key="git" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
    <circle cx="13" cy="10" r="5" fill="currentColor" />
    <circle cx="13" cy="38" r="5" fill="currentColor" />
    <circle cx="35" cy="16" r="5" fill="currentColor" />
    <path d="M13 15v18M35 21c0 8-10 8-20 13" />
  </svg>,
  // Lightning (fast APIs)
  <svg key="bolt" viewBox="0 0 48 48" fill="currentColor">
    <path d="M27 3 8 28h14l-3 17 21-27H26l1-15Z" />
  </svg>,
  // { }
  <svg
    key="braces"
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="4.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 6c-5 0-6 2-6 6v6c0 3-2 6-6 6 4 0 6 3 6 6v6c0 4 1 6 6 6M31 6c5 0 6 2 6 6v6c0 3 2 6 6 6-4 0-6 3-6 6v6c0 4-1 6-6 6" />
  </svg>,
  // Chip
  <svg key="chip" viewBox="0 0 48 48" fill="currentColor">
    <rect x="12" y="12" width="24" height="24" rx="4" />
    <path
      d="M18 4v6M24 4v6M30 4v6M18 38v6M24 38v6M30 38v6M4 18h6M4 24h6M4 30h6M38 18h6M38 24h6M38 30h6"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <rect x="19" y="19" width="10" height="10" rx="2" fill="#efeeeb" />
  </svg>,
];
