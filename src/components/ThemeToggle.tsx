"use client";

import { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  { name: "Neon Cyan", color: "#00f0ff" },
  { name: "Cyber Purple", color: "#b026ff" },
  { name: "Electric Gold", color: "#ffb700" },
  { name: "Stealth Gray", color: "#64748b" },
];

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(themes[0].color);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", activeTheme);
  }, [activeTheme]);

  return (
    <div className="relative inline-block">
      <button 
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center focus:outline-none"
        aria-label="Toggle theme palette"
      >
        <Palette className="w-5 h-5 transition-colors" style={{ color: activeTheme }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2.5 p-2 bg-black/80 backdrop-blur-md rounded-2xl flex items-center gap-2 border border-white/10 shadow-xl z-50"
          >
            {themes.map((theme) => {
              const isActive = activeTheme === theme.color;

              return (
                <button
                  key={theme.name}
                  type="button"
                  onClick={() => {
                    setActiveTheme(theme.color);
                    setIsOpen(false);
                  }}
                  className={`relative w-7 h-7 rounded-full transition-transform flex items-center justify-center hover:scale-110 focus:outline-none ${
                    isActive ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-105" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: theme.color }}
                  title={theme.name}
                >
                  {isActive && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}