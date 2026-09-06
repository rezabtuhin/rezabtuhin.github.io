"use client";

import { useEffect } from "react";

// One delegated listener keeps all experience/project content server-rendered.
export default function ProjectHighlight() {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let highlighted: HTMLElement | null = null;
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a.project-jump")
          : null;
      if (!link) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      clearTimeout(timer);
      highlighted?.classList.remove("is-highlighted");
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "center",
      });
      // Restart the original animation, including repeated clicks on one card.
      void target.offsetWidth;
      target.classList.add("is-highlighted");
      highlighted = target;
      history.replaceState(history.state, "", link.hash);
      timer = setTimeout(() => {
        target.classList.remove("is-highlighted");
        highlighted = null;
      }, 3000);
    }
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimeout(timer);
      highlighted?.classList.remove("is-highlighted");
    };
  }, []);
  return null;
}
