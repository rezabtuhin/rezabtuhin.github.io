export const themeStorageKey = "grid-portfolio-theme";
export const themeModes = ["device", "light", "dark"] as const;
export type ThemeMode = (typeof themeModes)[number];
export const themeNames = { device: "Device", light: "Light", dark: "Dark" };

// Runs in the head before the first paint. Device mode remains CSS-driven, so
// device changes and JavaScript-disabled visits use the same original palette.
export const themeInitializationScript = `try{var t=localStorage.getItem(${JSON.stringify(themeStorageKey)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch{}`;
