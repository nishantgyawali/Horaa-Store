"use client";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { Cpu, Sparkles } from "lucide-react";

export default function ComponentsPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono uppercase tracking-widest bg-[var(--accent)]/5">
            <Cpu className="w-3.5 h-3.5" /> 100% Authentic Brand Silicon
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
            PC <span className="text-[var(--accent)]">Components</span> & Hardware
          </h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Upgrade or build your rig with genuine processors, extreme graphics cards, DDR5 memory, Gen5 NVMe storage, and cooling loops with official brand warranty in Nepal.
          </p>
        </div>

        <ProductGrid />
      </div>

      <Footer />
    </div>
  );
}
