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
  <div className="fixed top-0 z-30 py-2 bg_globalColor " style={{ width: 'inherit', maxWidth: 'inherit' }}>
    <div className="flex justify-end ">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mx-6  text-3xl  "
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div> </div>
    
  );
}