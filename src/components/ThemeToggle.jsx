"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="fixed top-2 right-2 px-4 py-2 border rounded-lg bg-[#0F1A45]/70 dark:bg-white"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}