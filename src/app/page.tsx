"use client";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2, Cpu, Zap, Monitor, Gamepad2, Rotate3d, Sparkles, CheckCircle2, Eye, Mail, Phone, MapPin, Facebook } from "lucide-react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

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
      <section className="hero-facebook-cover relative pt-24 pb-16 lg:pt-28 lg:pb-20 min-h-[92vh] flex items-center overflow-hidden bg-cover bg-center">
        {/* Ambient background glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-80 h-80 bg-[var(--accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.02)_0%,rgba(10,10,12,1)_80%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* ◀ LEFT COLUMN: COMPACT, CONTROLLABLE 3D PC SHOWCASE BOX */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-6 w-full relative order-1"
            >
              {/* Outer Ambient Glow Aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)]/20 via-purple-500/10 to-[var(--accent)]/20 rounded-3xl blur-xl opacity-40 pointer-events-none" />

              {/* ─── COMPACT SHOWCASE BOX ─── */}
              <div className="showcase-box cyber-grid w-full h-[400px] sm:h-[460px] lg:h-[510px] flex flex-col justify-between p-4 sm:p-5">
                
                {/* Tech Corner Markers */}
                <span className="absolute top-3 left-3 text-white/30 text-xs font-mono select-none pointer-events-none">+</span>
                <span className="absolute top-3 right-3 text-white/30 text-xs font-mono select-none pointer-events-none">+</span>
                <span className="absolute bottom-3 left-3 text-white/30 text-xs font-mono select-none pointer-events-none">+</span>
                <span className="absolute bottom-3 right-3 text-white/30 text-xs font-mono select-none pointer-events-none">+</span>

                {/* Top HUD: Title + Interactive View Mode Controllers */}
                <div className="relative z-20 flex items-center justify-between gap-2 w-full">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                    <span className="text-[11px] font-mono tracking-wider text-gray-300 font-semibold uppercase">
                      3D Showcase
                    </span>
                  </div>

                  {/* 🎮 CONTROLS: COMPONENTS / 3/4 VIEW / INTAKE FANS / AUTO-ROTATE */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => setViewMode("front")}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                        viewMode === "front"
                          ? "bg-[var(--accent)] text-black font-bold shadow-[0_0_10px_var(--accent)]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      Components
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("angle")}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                        viewMode === "angle"
                          ? "bg-[var(--accent)] text-black font-bold shadow-[0_0_10px_var(--accent)]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      3/4 View
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("side")}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-lg transition-all ${
                        viewMode === "side"
                          ? "bg-[var(--accent)] text-black font-bold shadow-[0_0_10px_var(--accent)]"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      Intake Fans
                    </button>
                    <button
                      type="button"
                      onClick={() => setAutoRotate(!autoRotate)}
                      title={autoRotate ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
                      className={`p-1.5 rounded-lg transition-all text-[11px] flex items-center justify-center ${
                        autoRotate
                          ? "text-[var(--accent)] bg-[var(--accent)]/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Rotate3d className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* 3D Canvas Viewport (100% visible, centered, never cut off) */}
                <div className="absolute inset-0 z-10 w-full h-full">
                  <Suspense fallback={<PCModelLoader />}>
                    <PCModel 
                      accentColor={accentColor} 
                      viewMode={viewMode}
                      autoRotate={autoRotate}
                    />
                  </Suspense>
                </div>

                {/* Bottom HUD: Rig Tag + Control Hint */}
                <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-none w-full">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="text-xs font-semibold text-white tracking-wide">
                      Ant Esports White Rig · RTX 5060
                    </span>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-white/5 backdrop-blur-md text-[11px] font-mono tracking-wider text-gray-400 self-end sm:self-auto">
                    CLICK & DRAG TO SPIN · SCROLL TO ZOOM
                  </div>
                </div>

              </div>
            </motion.div>

            {/* ▶ RIGHT COLUMN: CONTENT & CTA */}
            <div className="lg:col-span-6 flex flex-col justify-center order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col"
              >
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-5 rounded-full border border-[var(--accent)]/40 text-[var(--accent)] text-xs font-bold uppercase tracking-widest bg-[var(--accent)]/5 shadow-[0_0_15px_rgba(0,240,255,0.15)] self-start">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                  Nepal's Premier Custom PC Builder
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 leading-[0.95]">
                  Built For<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-white to-gray-400">
                    Extreme Gaming & AI
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-300 text-base sm:text-lg mb-7 leading-relaxed max-w-xl">
                  Precision-crafted custom rigs, high-grade silicon, and authentic computer accessories in Nepal. Hand-assembled, stress-tested, and delivered with unconditional confidence.
                </p>

                {/* Perks Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 text-sm text-gray-300 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>5 Years Official Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>Free Gaming Keyboard + Mouse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>Direct WhatsApp Consult & Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>Cash on Delivery & Nepal Shipping</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3.5 mb-8">
                  <Link
                    href="/builds"
                    className="group flex items-center gap-2.5 bg-[var(--accent)] text-black font-bold px-7 py-3.5 rounded-xl hover:shadow-[0_0_30px_var(--accent)] hover:scale-[1.03] transition-all uppercase tracking-wider text-sm sm:text-base"
                  >
                    View Featured Builds
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                  <Link
                    href="/components"
                    className="flex items-center gap-2 glassmorphism border border-white/10 hover:border-[var(--accent)]/40 text-white font-bold px-7 py-3.5 rounded-xl transition-all uppercase tracking-wider text-sm sm:text-base hover:bg-white/[0.05]"
                  >
                    Browse Parts
                  </Link>
                </div>

                {/* Live Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatBadge icon={<Cpu className="w-4 h-4" />} label="Builds Done" value="150+" />
                  <StatBadge icon={<Zap className="w-4 h-4" />} label="In Stock" value="500+" />
                  <StatBadge icon={<Monitor className="w-4 h-4" />} label="Displays" value="30+" />
                  <StatBadge icon={<Gamepad2 className="w-4 h-4" />} label="Accessories" value="120+" />
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
              Explore Our <span className="text-[var(--accent)]">Inventory</span>
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
          CONTACT SECTION (inlined from former /contact page)
          ══════════════════════════════════════════════ */}
      <section id="contact" className="pt-20 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Get In <span className="text-[var(--accent)]">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg">We are here to help you build your dream setup.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="glassmorphism p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="How can we help?"></textarea>
                </div>
                <button type="button" className="bg-[var(--accent)] text-black font-bold py-3 rounded-lg mt-4 hover:shadow-[0_0_20px_var(--accent)] transition-shadow uppercase tracking-wider">
                  Send Message
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-8">
              <div className="glassmorphism p-6 rounded-xl flex items-start gap-4">
                <div className="bg-[var(--accent)]/10 text-[var(--accent)] p-3 rounded-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Phone / WhatsApp</h3>
                  <p className="text-gray-400">+977 985-1406895</p>
                  <a href="https://wa.me/9779851406895" className="text-[var(--accent)] text-sm mt-2 inline-block hover:underline">Chat on WhatsApp</a>
                </div>
              </div>

              <div className="glassmorphism p-6 rounded-xl flex items-start gap-4">
                <div className="bg-[var(--accent)]/10 text-[var(--accent)] p-3 rounded-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Email</h3>
                  <p className="text-gray-400">officialhoraastore@gmail.com</p>
                  <a href="mailto:officialhoraastore@gmail.com" className="text-[var(--accent)] text-sm mt-2 inline-block hover:underline">Drop us an email</a>
                </div>
              </div>

              <div className="glassmorphism p-6 rounded-xl flex items-start gap-4">
                <div className="bg-[#1877F2]/10 text-[#1877F2] p-3 rounded-lg">
                  <Facebook className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Facebook</h3>
                  <p className="text-gray-400">@horaa_storeofficial</p>
                  <a href="https://www.facebook.com/profile.php?id=61578433256161" target="_blank" rel="noreferrer" className="text-[#1877F2] text-sm mt-2 inline-block hover:underline">Follow our page</a>
                </div>
              </div>

              <div className="glassmorphism p-6 rounded-xl flex items-start gap-4">
                <div className="bg-[var(--accent)]/10 text-[var(--accent)] p-3 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Location</h3>
                  <p className="text-gray-400">Nepal</p>
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
    <Link href={link} className="showcase-box p-7 group block hover:border-[var(--accent)]/40 transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)] px-2.5 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
          {badge}
        </span>
        <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[var(--accent)] transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>
      <div className="text-[var(--accent)] font-bold uppercase tracking-wider text-xs flex items-center gap-2">
        Explore Collection →
      </div>
    </Link>
  );
}
