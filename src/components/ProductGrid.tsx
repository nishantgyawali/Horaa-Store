"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, MessageSquare, Check, Sparkles } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: "GPU" | "CPU" | "Motherboards" | "Cooling" | "Memory & Storage" | "Cases & PSU" | "Monitors";
  price: number;
  inStock: boolean;
  specs: string;
  image: string;
}

const CATEGORIES = ["All", "GPU", "CPU", "Motherboards", "Cooling", "Memory & Storage", "Cases & PSU", "Monitors"];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "NVIDIA GeForce RTX 4090 24GB OC Edition",
    category: "GPU",
    price: 325000,
    inStock: true,
    specs: "24GB GDDR6X, Ada Lovelace, DLSS 3.5, Quad-slot heatsink",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "NVIDIA GeForce RTX 5060 8GB OC Edition",
    category: "GPU",
    price: 68000,
    inStock: true,
    specs: "8GB GDDR7, Dual Torx Fans, Next-Gen Ray Tracing & DLSS 4",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Intel Core Ultra 7 265K Desktop Processor",
    category: "CPU",
    price: 58000,
    inStock: true,
    specs: "20 Cores (8P + 12E), 5.5 GHz Turbo, Dedicated AI Engine NPU",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "AMD Ryzen 7 7800X3D Gaming Processor",
    category: "CPU",
    price: 64000,
    inStock: true,
    specs: "8 Cores / 16 Threads, 96MB 3D V-Cache, Best Gaming FPS",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Maxsun B860M I-CAFE 5G Gaming Motherboard",
    category: "Motherboards",
    price: 22000,
    inStock: true,
    specs: "LGA1851 Socket, PCIe 5.0 x16, Dual Gen4 M.2, 2.5G LAN + WiFi",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Darkflash Dual 360mm AIO ARGB Liquid Cooler",
    category: "Cooling",
    price: 16500,
    inStock: true,
    specs: "ARGB Infinity Mirror Pump, Triple 120mm Fans, 300W TDP",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "NZXT Kraken Elite 360 RGB LCD Display White",
    category: "Cooling",
    price: 38000,
    inStock: false,
    specs: "2.36\" Wide-Angle 60Hz LCD, Custom GIFs, Fluid Temp Monitor",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Kingston Fury Beast 32GB (2x16GB) DDR5 6000MHz",
    category: "Memory & Storage",
    price: 19500,
    inStock: true,
    specs: "CL30 Low Latency, Intel XMP 3.0 & AMD EXPO Certified, RGB",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    name: "Samsung 990 PRO 2TB PCIe Gen4 NVMe M.2 SSD",
    category: "Memory & Storage",
    price: 29500,
    inStock: true,
    specs: "7,450 MB/s Read, 6,900 MB/s Write, Thermal Heat Spreader",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    name: "Ant Esports Gaming Chassis White (Featured)",
    category: "Cases & PSU",
    price: 9500,
    inStock: true,
    specs: "Tempered Glass Side, High-Flow Geometric Mesh, 3x ARGB Fans",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    name: "Darkflash EMT 850W 80+ Gold Fully Modular PSU",
    category: "Cases & PSU",
    price: 14500,
    inStock: true,
    specs: "ATX 3.0 & PCIe 5.0 12VHPWR Ready, 100% Japanese Capacitors",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    name: "Samsung Odyssey G7 27\" 240Hz 1ms Gaming Display",
    category: "Monitors",
    price: 85000,
    inStock: true,
    specs: "1000R Curvature, QLED 1440p, G-Sync & FreeSync Premium Pro",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
  },
];

export default function ProductGrid() {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCat);

  return (
    <div className="w-full">
      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
              activeCat === cat
                ? "bg-[var(--accent)] text-black font-bold"
                : "glassmorphism text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Hardware Product Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filtered.map((product) => {
            const whatsappLink = `https://wa.me/9779851406895?text=${encodeURIComponent(
              `Hi Horaa Store! I want to order the ${product.name} (NPR ${product.price.toLocaleString()}/-). Is it available in stock?`
            )}`;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="flex flex-col group cursor-pointer border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-colors"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-white/[0.02]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    {/* Stock Status Badge */}
                    <div className="absolute top-3 left-3">
                      {product.inStock ? (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-black/60 text-white backdrop-blur-md">
                          In Stock
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-black/60 text-gray-400 backdrop-blur-md">
                          Pre-Order
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] font-medium text-gray-500 mb-1">
                    {product.category}
                  </div>

                  <h3 className="font-semibold text-white text-base mb-4 leading-snug group-hover:text-gray-300 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                {/* Pricing and Action Buttons */}
                <div className="mt-auto flex items-center justify-between gap-3">
                  <div className="text-lg font-bold text-white">
                    Rs. {product.price.toLocaleString()}
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-gray-200 text-black font-semibold text-xs transition-colors shrink-0"
                  >
                    <span>Order</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
