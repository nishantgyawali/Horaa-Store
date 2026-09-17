"use client";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2, Cpu, Zap, Monitor, Gamepad2, Rotate3d, Sparkles, CheckCircle2, Eye, Mail, Phone, MapPin, Facebook, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";

const PCModel = dynamic(() => import("@/components/3d/PCModel"), { ssr: false });

function PCModelLoader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="relative w-48 h-56 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 bg-white/[0.02] backdrop-blur-md">
        <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
        <div className="text-center">
          <span className="text-xs tracking-[0.2em] uppercase text-white font-semibold block mb-1">
            Centering Rig
          </span>
          <span className="text-[11px] text-gray-500 font-mono">
            Adjusting Camera & Lighting...
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [accentColor, setAccentColor] = useState("#00f0ff");
  const [viewMode, setViewMode] = useState<"front" | "angle" | "side">("front");
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    const updateAccent = () => {
      const color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      if (color) setAccentColor(color);
    };
    updateAccent();
    const observer = new MutationObserver(updateAccent);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ══════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 min-h-[92vh] flex items-center bg-[#060608]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* ◀ LEFT COLUMN: COMPACT, CONTROLLABLE 3D PC SHOWCASE BOX */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-6 w-full relative order-1"
            >
              <div className="w-full h-[400px] sm:h-[460px] lg:h-[510px] relative rounded-3xl overflow-hidden border border-white/5 bg-black/20 backdrop-blur-3xl">
                
                {/* 3D Canvas Viewport */}
                <div className="absolute inset-0 z-10 w-full h-full">
                  <Suspense fallback={<PCModelLoader />}>
                    <PCModel 
                      accentColor={accentColor} 
                      viewMode={viewMode}
                      autoRotate={true}
                    />
                  </Suspense>
                </div>
              </div>
            </motion.div>

            {/* ▶ RIGHT COLUMN: CONTENT & CTA */}
            <div className="lg:col-span-6 flex flex-col justify-center order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col"
              >
                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight mb-6 leading-[1.05] text-white">
                  Built for<br />
                  <span className="text-gray-400">Performance.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-400 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl font-light">
                  Precision-crafted custom rigs, high-grade silicon, and authentic computer accessories in Nepal. Hand-assembled, stress-tested, and delivered with unconditional confidence.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/builds"
                    className="flex items-center justify-center bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-gray-200 transition-colors text-sm"
                  >
                    View Featured Builds
                  </Link>
                  <Link
                    href="/components"
                    className="flex items-center justify-center border border-white/20 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/5 transition-colors text-sm"
                  >
                    Browse Parts
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CATEGORY QUICK TILES
          ══════════════════════════════════════════════ */}
      <section className="py-20 border-t border-white/10 relative z-10 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
              Explore Our Inventory
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              From plug-and-play desktop beasts to individual upgrade components and esports peripherals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Custom Builds"
              badge="Ready to Ship"
              desc="Pre-configured extreme rigs ready to dominate any game or AI workflow at maximum clock speeds."
              link="/builds"
            />
            <FeatureCard
              title="Components"
              badge="Original Silicon"
              desc="Top-tier CPUs, GPUs, Motherboards, Gen4 NVMe SSDs, and High-TDP Liquid Coolers."
              link="/components"
            />
            <FeatureCard
              title="Peripherals"
              badge="Esports Grade"
              desc="High refresh rate gaming monitors, mechanical keyboards with tactile switches, and ultralight mice."
              link="/peripherals"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PRODUCTS GRID
          ══════════════════════════════════════════════ */}
      <section className="py-20 border-t border-white/10 relative z-10 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
              Featured Hardware
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Browse some of our top-selling components.
            </p>
          </div>
          <ProductGrid />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ SECTION
          ══════════════════════════════════════════════ */}
      <section className="py-20 border-t border-white/10 relative z-10 bg-[#060608]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Got questions? We've got answers.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <FAQItem 
              question="Do you provide warranties on custom builds?" 
              answer="Yes, all our custom PC builds come with a comprehensive official brand warranty ranging from 1 to 5 years, depending on the specific component. We also provide a 1-year service warranty on the build itself."
            />
            <FAQItem 
              question="Do you ship outside of Kathmandu?" 
              answer="Absolutely! We offer secure, insured shipping across Nepal. Cash on Delivery is available for most major cities, ensuring your rig arrives safely at your doorstep."
            />
            <FAQItem 
              question="Can I customize a pre-built rig?" 
              answer="Yes, you can fully customize any of our featured builds. Reach out to us via WhatsApp with your requirements, and our experts will help you tailor the build to your exact needs and budget."
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT SECTION (inlined from former /contact page)
          ══════════════════════════════════════════════ */}
      <section id="contact" className="pt-20 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Get In Touch
            </h1>
            <p className="text-gray-400 text-lg">We are here to help you build your dream setup.</p>
          </div>

          <div className="glassmorphism rounded-3xl border border-white/10 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            
            {/* Left Side: Form */}
            <div className="p-8 md:p-12 md:w-1/2 border-b md:border-b-0 md:border-r border-white/10">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/50 transition-colors" placeholder="How can we help?"></textarea>
                </div>
                <button type="button" className="bg-white text-black font-bold py-3 rounded-lg mt-4 hover:bg-gray-200 transition-all tracking-wide">
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Side: Info */}
            <div className="p-8 md:p-12 md:w-1/2 bg-white/[0.02] flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-8 text-white">Contact Information</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 text-white p-3 rounded-lg"><Phone className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Phone / WhatsApp</h3>
                    <p className="text-white">+977 985-1406895</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 text-white p-3 rounded-lg"><Mail className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Email</h3>
                    <p className="text-white">officialhoraastore@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 text-white p-3 rounded-lg"><Facebook className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Facebook</h3>
                    <p className="text-white">@horaa_storeofficial</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 text-white p-3 rounded-lg"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Location</h3>
                    <p className="text-white">Nepal</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}

function StatBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glassmorphism p-3 rounded-xl text-center border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-center justify-center gap-1.5 text-[var(--accent)] mb-1">{icon}</div>
      <div className="text-white font-black text-lg">{value}</div>
      <div className="text-gray-400 text-[11px] uppercase tracking-wider font-mono">{label}</div>
    </div>
  );
}

function FeatureCard({ title, badge, desc, link }: { title: string; badge: string; desc: string; link: string }) {
  return (
    <Link href={link} className="showcase-box p-7 group block hover:border-white/40 transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono uppercase tracking-wider text-white px-2.5 py-1 rounded-full bg-white/10 border border-white/20">
          {badge}
        </span>
        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>
      <div className="text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2">
        Explore Collection →
      </div>
    </Link>
  );
}

import { AnimatePresence } from "framer-motion";

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-colors hover:bg-white/[0.04]">
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-6 flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-bold text-white">{question}</h3>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="p-6 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
