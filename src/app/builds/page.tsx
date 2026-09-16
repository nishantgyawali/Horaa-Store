"use client";
import FeaturedBuild from "@/components/FeaturedBuild";
import Footer from "@/components/Footer";
import { Sparkles, MessageSquare } from "lucide-react";

interface PrebuiltRig {
  id: string;
  name: string;
  badge: string;
  price: number;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  cooling: string;
  psu: string;
  case: string;
  image: string;
}

const PREBUILT_RIGS: PrebuiltRig[] = [
  {
    id: "rig-1",
    name: "NEXT-GEN AI & EXTREME GAMING BUILD",
    badge: "Deal of the Month (Flagship)",
    price: 225000,
    cpu: "Intel Core Ultra 7 265K",
    gpu: "NVIDIA GeForce RTX 5060 8GB OC",
    ram: "16GB DDR5 6000MHz RGB",
    storage: "512GB Gen4 NVMe M.2 SSD",
    cooling: "Darkflash Dual AIO Liquid Cooler",
    psu: "Darkflash EMT 850W",
    case: "Ant Esports Gaming Chassis (White)",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "rig-2",
    name: "ESPORTS APEX PREDATOR RIG",
    badge: "Pure Competitive FPS",
    price: 285000,
    cpu: "AMD Ryzen 7 7800X3D (3D V-Cache)",
    gpu: "NVIDIA GeForce RTX 4070 Super 12GB",
    ram: "32GB (2x16GB) DDR5 6000MHz CL30",
    storage: "1TB Samsung 990 PRO Gen4",
    cooling: "DeepCool LT720 360mm ARGB AIO",
    psu: "Darkflash 850W 80+ Gold",
    case: "Lian Li O11 Dynamic EVO (Black)",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "rig-3",
    name: "TITAN 4K WORKSTATION & CREATOR",
    badge: "Heavy Workloads & Ultra 4K",
    price: 435000,
    cpu: "Intel Core i9 14900K (6.0 GHz)",
    gpu: "NVIDIA GeForce RTX 5080 16GB GDDR7",
    ram: "64GB DDR5 6400MHz Dominator",
    storage: "2TB Crucial Gen5 NVMe (12,400MB/s)",
    cooling: "NZXT Kraken Elite 360 RGB LCD",
    psu: "1000W 80+ Platinum ATX 3.0",
    case: "Fractal Design North Walnut Charcoal",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=700&auto=format&fit=crop&q=80",
  },
  {
    id: "rig-4",
    name: "AM5 ESPORTS STARTER RIG",
    badge: "Best Value 1080p/1440p",
    price: 135000,
    cpu: "AMD Ryzen 5 7600X",
    gpu: "NVIDIA GeForce RTX 4060 8GB OC",
    ram: "16GB DDR5 5600MHz",
    storage: "512GB Gen4 NVMe M.2",
    cooling: "Darkflash 240mm Liquid Cooler",
    psu: "650W 80+ Bronze Certified",
    case: "Ant Esports Tempered Glass RGB",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=700&auto=format&fit=crop&q=80",
  },
];

export default function BuildsPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#0A0A0C]">
      {/* ─── HEADER ─── */}
     

      {/* ─── PREBUILT RIGS CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Featured Hero Build */}
        <FeaturedBuild />

        {/* Additional Rig Varieties Grid */}
        <div className="mt-14">
          <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-6">
            More Custom Rig Tier Varieties
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PREBUILT_RIGS.slice(1).map((rig) => {
              const whatsappMsg = encodeURIComponent(
                `Hi Horaa Store, I want to order the ${rig.name} (NPR ${rig.price.toLocaleString()}/-)!`
              );

              return (
                <div
                  key={rig.id}
                  className="showcase-box p-5 flex flex-col justify-between rounded-2xl"
                >
                  <div>
                    {/* Rig Thumbnail */}
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black/60 border border-white/10">
                      <img
                        src={rig.image}
                        alt={rig.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-[var(--accent)] text-black text-[10px] font-mono font-bold uppercase">
                        {rig.badge}
                      </div>
                    </div>

                    <h4 className="text-lg font-black text-white mb-2 line-clamp-2">
                      {rig.name}
                    </h4>

                    <div className="space-y-1.5 text-xs text-gray-300 font-mono mb-6 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-gray-500">CPU:</span> {rig.cpu}
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-gray-500">GPU:</span> {rig.gpu}
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-gray-500">RAM:</span> {rig.ram}
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-gray-500">Cooler:</span> {rig.cooling}
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-gray-500">Storage:</span> {rig.storage}
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-gray-500">Case:</span> {rig.case}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <div className="text-xs text-gray-400 font-mono mb-1">Starting Price</div>
                    <div className="text-2xl font-black text-[var(--accent)] mb-4">
                      NPR {rig.price.toLocaleString()}/-
                    </div>

                    <a
                      href={`https://wa.me/9779851406895?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-cyan-300 text-black font-bold py-3 rounded-xl uppercase tracking-wider text-xs transition-all shadow-[0_0_15px_var(--accent-glow)]"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" /> Order via WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── SHARED FOOTER ─── */}
      <Footer />
    </div>
  );
}