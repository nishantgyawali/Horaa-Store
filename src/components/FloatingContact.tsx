"use client";
import { useState } from "react";
import { MessageCircle, Phone, Facebook, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-4"
          >
            <a href="https://wa.me/9779851406895" target="_blank" rel="noreferrer" className="flex items-center justify-end gap-3 group">
              <span className="glassmorphism px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">WhatsApp Us</span>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
            </a>
            
            <a href="tel:+9779851406895" className="flex items-center justify-end gap-3 group">
              <span className="glassmorphism px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Call Now</span>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
            </a>

            <a href="https://m.me/61578433256161" target="_blank" rel="noreferrer" className="flex items-center justify-end gap-3 group">
              <span className="glassmorphism px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Messenger</span>
              <div className="w-12 h-12 bg-[#0084FF] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                <Facebook className="w-6 h-6" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-black transition-all duration-300 ${isOpen ? 'bg-red-500 rotate-90 text-white' : 'bg-[var(--accent)] hover:scale-110 shadow-lg'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
