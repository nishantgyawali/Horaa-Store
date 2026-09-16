"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/builds", label: "Custom Builds" },
    { href: "/components", label: "Components" },
    { href: "/peripherals", label: "Peripherals" },
    { href: "/#contact", label: "Contact Us" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glassmorphism border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 relative rounded overflow-hidden border border-white/20 group-hover:border-[var(--accent)] transition-colors">
                <img src="/assets/logo.jpg" alt="Horaa Store Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/0a0a0c/ffffff?text=HS' }} />
              </div>
              <span className="font-bold text-xl tracking-wider uppercase text-white group-hover:text-[var(--accent)] transition-colors">
                Horaa Store
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`text-sm font-medium transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-gray-300 hover:text-[var(--accent)]'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-300 hover:text-[var(--accent)] transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-[var(--accent)] text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
            <button className="md:hidden p-2 text-gray-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glassmorphism border-t border-white/10 p-4 flex flex-col gap-4 overflow-hidden"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-gray-300 hover:text-[var(--accent)]'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}