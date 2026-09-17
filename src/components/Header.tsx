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
    <header className="fixed top-6 inset-x-0 w-full z-50 px-4 pointer-events-none">
      <div className="mx-auto w-full max-w-4xl bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 shadow-2xl pointer-events-auto">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 relative rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors">
                <img src="/assets/logo.jpg" alt="Horaa Store Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/0a0a0c/ffffff?text=HS' }} />
              </div>
              <span className="font-semibold text-lg tracking-wide text-white group-hover:text-gray-300 transition-colors">
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
                  className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
            <button className="md:hidden p-2 text-gray-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="md:hidden mx-auto w-full max-w-4xl bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-4 flex flex-col gap-4 overflow-hidden pointer-events-auto"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium p-2 rounded-xl transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
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