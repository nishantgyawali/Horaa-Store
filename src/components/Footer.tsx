"use client";
import Link from "next/link";
import { ExternalLink, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-14 relative z-10 bg-[#060608]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-400">
        {/* Brand Col */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/20">
              <img
                src="/assets/logo.jpg"
                alt="Horaa Store"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=100&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <h3 className="text-white font-black text-xl uppercase tracking-wider">Horaa Store</h3>
          </div>
          <p className="leading-relaxed max-w-md text-gray-400 text-sm">
            Nepal's premier custom PC and hardware store. We specialize in extreme liquid-cooled gaming rigs, workstation architectures, authentic components, and esports peripherals.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-[var(--accent)] font-mono">
            <span>@horaa_storeofficial</span>
            <span>•</span>
            <span>Kathmandu, Nepal</span>
          </div>
        </div>

        {/* Contact Col */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contact & Order</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <a href="tel:+9779851406895" className="hover:text-white transition-colors">
                +977 985-1406895
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <a href="mailto:officialhoraastore@gmail.com" className="hover:text-white transition-colors truncate">
                officialhoraastore@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <span>Kathmandu, Nepal</span>
            </li>
            <li className="text-xs text-green-400 font-mono mt-1">
              ● WhatsApp Available 24/7
            </li>
          </ul>
        </div>

        {/* Links Col */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Navigation</h3>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/builds" className="hover:text-[var(--accent)] transition-colors">
                Custom Builds & Part Picker
              </Link>
            </li>
            <li>
              <Link href="/components" className="hover:text-[var(--accent)] transition-colors">
                PC Components
              </Link>
            </li>
            <li>
              <Link href="/peripherals" className="hover:text-[var(--accent)] transition-colors">
                Gaming Peripherals
              </Link>
            </li>
            <li>
              <span className="text-gray-400">Contact & Support</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ─── CREATOR ATTRIBUTION: MADE BY KEA TECHNOLOGY ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()} Horaa Store. All rights reserved. Built for champions.
        </div>

        {/* Made by KEA Technology Badge */}
        <a
          href="https://kea-tech.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full glassmorphism border border-white/10 hover:border-yellow-500/50 hover:bg-white/[0.04] transition-all"
        >
          <div className="w-6 h-6 rounded-full overflow-hidden bg-black flex items-center justify-center shrink-0 border border-yellow-500/30 group-hover:border-yellow-400 transition-colors">
            <img
              src="/api/kea-logo"
              alt="KEA Technology Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/assets/kea-logo.jpg";
              }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-300 group-hover:text-white transition-colors">
            <span>Made by</span>
            <span className="font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
              KEA Technology
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-yellow-400/70 group-hover:text-yellow-300 transition-transform group-hover:translate-x-0.5" />
          </div>
        </a>
      </div>
    </footer>
  );
}
