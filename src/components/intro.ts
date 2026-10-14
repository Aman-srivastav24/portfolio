// <html data-loading> is set while the intro loader covers the page; it fires this event when done.
export const INTRO_DONE = "intro-done";

// Run `cb` once the intro loader has finished (immediately if it already has). Returns a cleanup.
export function whenIntroDone(cb: () => void): () => void {
  if (!document.documentElement.hasAttribute("data-loading")) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_DONE, cb, { once: true });
  return () => window.removeEventListener(INTRO_DONE, cb);
}
