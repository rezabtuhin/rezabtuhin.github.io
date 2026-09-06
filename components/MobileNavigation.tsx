"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";

export default function MobileNavigation({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 961px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("menu-open");
    const background = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main, .site-footer, .brand, .theme-toggle, .skip-link",
      ),
    );
    const previous = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    nav.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        button.current?.focus();
      }
      if (event.key === "Tab") {
        const first = nav.current?.querySelector<HTMLAnchorElement>("a");
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          button.current?.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === button.current
        ) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      background.forEach((element, index) => {
        element.inert = previous[index];
      });
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <nav
        ref={nav}
        className="site-nav"
        id="site-nav"
        aria-label="Portfolio navigation"
        onClick={(event) => {
          const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
            "a",
          );
          if (!link || !open) return;
          setOpen(false);
          requestAnimationFrame(() => {
            const target = document.getElementById(link.hash.slice(1));
            if (target) {
              target.tabIndex = -1;
              target.focus({ preventScroll: true });
            }
          });
        }}
      >
        {children}
      </nav>
      <ThemeToggle />
      <button
        ref={button}
        className="menu-toggle"
        id="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </>
  );
}
