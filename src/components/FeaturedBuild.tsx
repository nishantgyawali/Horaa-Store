"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Maximize, HardDrive, Zap, ShieldCheck, Gift } from "lucide-react";

const options = [
  { id: "base", label: "PC Only", price: 225000 },
  { id: "monitor-24", label: "With 24\" 1K Monitor", price: 240000 },
  { id: "monitor-27", label: "With 27\" 144Hz Monitor", price: 245000 },
];
//
export default function FeaturedBuild() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const whatsappText = encodeURIComponent(`Hi Horaa Store, I want to order the Core Ultra 7 Build - ${selectedOption.label}`);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" id="builds">
      {/* Background Cover */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img src="/assets/cover.jpg" alt="Background Cover" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0C]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 text-4xl md:text-6xl font-black uppercase tracking-tight mb-4"
          >
            Next-Gen AI & <span className="text-[var(--accent)]">Extreme Gaming</span>
          </motion.h2>
          <p className="text-gray-400 text-lg">Experience uncompromised performance with our Deal of the Month.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Image Simulator/Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group perspective"
          >
            <div className="glassmorphism neon-border rounded-2xl p-4 overflow-hidden relative aspect-square md:aspect-video lg:aspect-square flex items-center justify-center bg-black/60">
               {/* 3D effect layers simulated with framer motion on hover */}
               <motion.div
                  className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity duration-500"
               />
               <img src="/assets/promo.jpg" alt="Featured Build" className="w-full h-full object-contain relative z-20 hover:scale-105 transition-transform duration-700" onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x800/111/333?text=PC+Rig' }} />
               
               {/* Badges */}
               <div className="absolute top-6 left-6 z-30 flex flex-col gap-2">
                 <div className="flex items-center gap-2 bg-[var(--accent)] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                   <Gift className="w-4 h-4" /> Free Keyboard + Mouse
                 </div>
                 <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                   <ShieldCheck className="w-4 h-4" /> 5 Years Warranty
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Specs & Pricing */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <SpecCard icon={<Cpu />} label="Processor" value="Intel Core Ultra 7 265K" />
              <SpecCard icon={<Zap />} label="Graphics" value="RTX 5060 8GB OC" />
              <SpecCard icon={<Maximize />} label="RAM" value="16GB DDR5 6000MHz" />
              <SpecCard icon={<HardDrive />} label="Storage" value="512GB Gen4 NVMe SSD" />
            </div>

            <div className="glassmorphism p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold mb-4">Select Bundle</h3>
              <div className="flex flex-col gap-3">
                {options.map((opt) => (
                  <label key={opt.id} className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border transition-all ${selectedOption.id === opt.id ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-white/10 hover:border-white/30'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="bundle" 
                        checked={selectedOption.id === opt.id}
                        onChange={() => setSelectedOption(opt)}
                        className="accent-[var(--accent)] w-5 h-5"
                      />
                      <span className="font-medium">{opt.label}</span>
                    </div>
                    <span className="font-bold">NPR {opt.price.toLocaleString()}/-</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href={`https://wa.me/9779851406895?text=${whatsappText}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-[var(--accent)] text-black font-bold py-4 rounded-xl text-center hover:shadow-[0_0_20px_var(--accent)] transition-all uppercase tracking-wide"
              >
                Order via WhatsApp
              </a>
              <button className="flex-1 glassmorphism neon-border font-bold py-4 rounded-xl text-center uppercase tracking-wide text-white">
                Customize Rig
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SpecCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glassmorphism p-4 rounded-xl border border-white/5 flex gap-4 items-start hover:border-white/20 transition-colors">
      <div className="text-[var(--accent)] p-2 bg-white/5 rounded-lg">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
        <div className="font-semibold text-sm mt-1">{value}</div>
      </div>
    </div>
  );
}
