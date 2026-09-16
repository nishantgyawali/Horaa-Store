"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, MessageSquare, Check, Sparkles, Filter } from "lucide-react";
import Footer from "@/components/Footer";

interface Peripheral {
  id: number;
  name: string;
  category: "Keyboards" | "Mice" | "Monitors" | "Audio & Headsets" | "Accessories";
  price: number;
  inStock: boolean;
  specs: string;
  image: string;
}

const CATEGORIES = ["All", "Keyboards", "Mice", "Monitors", "Audio & Headsets", "Accessories"];

const PERIPHERALS: Peripheral[] = [
  {
    id: 1,
    name: "Keychron K8 Pro QMK/VIA Wireless Mechanical",
    category: "Keyboards",
    price: 16500,
    inStock: true,
    specs: "Hot-swappable Gateron G Pro Switches, Sound Dampening, Mac & Windows",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Razer BlackWidow V4 Pro Mechanical Gaming Keyboard",
    category: "Keyboards",
    price: 29500,
    inStock: true,
    specs: "Green Clicky / Yellow Linear, Command Dial, 8,000Hz HyperPolling, Wrist Rest",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Razer DeathAdder V3 Pro Wireless 30K Optical",
    category: "Mice",
    price: 19500,
    inStock: true,
    specs: "63g Ultra-Lightweight, Focus Pro 30,000 DPI Sensor, 90-hr Battery Life",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Logitech G PRO X Superlight 2 Wireless Lightspeed",
    category: "Mice",
    price: 23500,
    inStock: true,
    specs: "60g Pure Esports Mouse, HERO 2 Sensor 32,000 DPI, Lightforce Optical Switches",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Samsung Odyssey G7 27\" 240Hz 1ms Curved Gaming Display",
    category: "Monitors",
    price: 85000,
    inStock: true,
    specs: "1000R Curve, WQHD 2560x1440, QLED, HDR600, G-Sync & FreeSync Premium Pro",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "ASUS ROG Swift PG279QM 27\" 240Hz QHD Fast-IPS",
    category: "Monitors",
    price: 98000,
    inStock: false,
    specs: "1ms GTG, NVIDIA Reflex Latency Analyzer, G-Sync Processor, DCI-P3 97%",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "HyperX Cloud III Wireless Gaming Headset",
    category: "Audio & Headsets",
    price: 18500,
    inStock: true,
    specs: "Up to 120-hr Battery, 53mm Angled Drivers, DTS Headphone:X Spatial Audio",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "SteelSeries Arctis Nova Pro Wireless Multi-System",
    category: "Audio & Headsets",
    price: 48000,
    inStock: true,
    specs: "Active Noise Cancellation (ANC), Dual Battery Infinity Swap, GameDAC Gen 2",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    name: "Xbox Elite Wireless Controller Series 2 Core",
    category: "Accessories",
    price: 21500,
    inStock: true,
    specs: "Adjustable-Tension Thumbsticks, Wrap-Around Rubberized Grip, Hair Trigger Locks",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    name: "Cyberpunk Stealth RGB XXL Precision Deskmat (900x400mm)",
    category: "Accessories",
    price: 3500,
    inStock: true,
    specs: "Water-Resistant Micro-woven Cloth, 14 RGB Light Modes, Non-Slip Rubber Base",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
  },
];

export default function PeripheralsPage() {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? PERIPHERALS : PERIPHERALS.filter((p) => p.category === activeCat);

  return (
    <div className="pt-24 min-h-screen bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono uppercase tracking-widest bg-[var(--accent)]/5">
            <Gamepad2 className="w-3.5 h-3.5" /> Esports Gear & Battlestation Setup
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
            Gaming <span className="text-[var(--accent)]">Peripherals</span>
          </h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Complete your setup with ultra-high refresh gaming displays, tournament-grade wireless mice, custom mechanical keyboards, and spatial sound headsets.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCat === cat
                  ? "bg-[var(--accent)] text-black font-bold shadow-[0_0_15px_var(--accent)]"
                  : "glassmorphism text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Peripherals Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          <AnimatePresence>
            {filtered.map((item) => {
              const whatsappLink = `https://wa.me/9779851406895?text=${encodeURIComponent(
                `Hi Horaa Store! I want to order the ${item.name} (NPR ${item.price.toLocaleString()}/-). Is it in stock?`
              )}`;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="showcase-box p-4 rounded-2xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-square mb-4 bg-black/60 rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        {item.inStock ? (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-md">
                            In Stock
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-md">
                            Pre-Order
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider mb-1">
                      {item.category}
                    </div>

                    <h3 className="font-bold text-white text-base mb-1.5 line-clamp-2 leading-snug">
                      {item.name}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                      {item.specs}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-white/10 mt-auto flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-gray-500 font-mono">Price (NPR)</div>
                      <div className="text-lg font-black text-white">
                        Rs. {item.price.toLocaleString()}/-
                      </div>
                    </div>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--accent)] hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_12px_var(--accent-glow)] shrink-0"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Order</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
