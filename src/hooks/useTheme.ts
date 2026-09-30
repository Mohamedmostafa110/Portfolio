import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

function initialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Theme is pre-decided by the inline script in index.html (no flash).
 * This hook only mirrors and persists the choice.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode — theme just won't persist */
    }
    const timer = window.setTimeout(() => root.classList.remove("theme-anim"), 350);
    return () => window.clearTimeout(timer);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle };
}
