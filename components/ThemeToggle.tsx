"use client";

import { useSyncExternalStore } from "react";
import {
  themeModes,
  themeNames,
  themeStorageKey,
  type ThemeMode,
} from "@/lib/theme";

function getMode(): ThemeMode {
  const mode = document.documentElement.dataset.theme;
  return mode === "light" || mode === "dark" ? mode : "device";
}

function subscribe(onChange: () => void) {
  const preference = window.matchMedia("(prefers-color-scheme: dark)");
  const onDeviceChange = () => {
    if (getMode() === "device") onChange();
  };
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  preference.addEventListener("change", onDeviceChange);
  return () => {
    observer.disconnect();
    preference.removeEventListener("change", onDeviceChange);
  };
}

export default function ThemeToggle() {
  const mode = useSyncExternalStore(
    subscribe,
    getMode,
    () => "device" as const,
  );
  const nextMode =
    themeModes[(themeModes.indexOf(mode) + 1) % themeModes.length];
  function cycleTheme() {
    // Read the live DOM so rapid clicks always advance immediately.
    const next =
      themeModes[(themeModes.indexOf(getMode()) + 1) % themeModes.length];
    if (next === "device") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(themeStorageKey, next);
    } catch {
      /* Storage is optional. */
    }
  }
  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      type="button"
      onClick={cycleTheme}
      data-icon={mode === "dark" ? "moon" : mode === "light" ? "sun" : "device"}
      aria-label={`Theme: ${themeNames[mode]}. Switch to ${themeNames[nextMode]} theme`}
      title={`Theme: ${themeNames[mode]} — click for ${themeNames[nextMode]}`}
    >
      <span className="toggle-icon device-icon" aria-hidden="true" />
      <svg
        className="toggle-icon moon-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        aria-hidden="true"
      >
        <path d="M256,0C114.842,0,0,114.84,0,256s114.842,256,256,256s256-114.84,256-256S397.158,0,256,0z M322.225,451.558c-20.797,7.062-43.071,10.894-66.225,10.894C142.163,462.452,49.548,369.838,49.548,256S142.163,49.548,256,49.548c23.154,0,45.429,3.832,66.226,10.894C266.612,107.439,231.226,177.657,231.226,256S266.612,404.561,322.225,451.558z" />
      </svg>
      <span className="toggle-icon sun-icon" aria-hidden="true">
        ☀
      </span>
    </button>
  );
}
