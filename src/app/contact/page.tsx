"use client";
import { Mail, Phone, MapPin, Facebook } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Get In <span className="text-[var(--accent)]">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg">We are here to help you build your dream setup.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
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
              <button type="button" className="bg-[var(--accent)] text-black font-bold py-3 rounded-lg mt-4 hover:bg-opacity-90 transition-all uppercase tracking-wider">
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center">
            <div className="glassmorphism p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold mb-8 text-white">Contact Information</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--accent)]/10 text-[var(--accent)] p-3 rounded-lg"><Phone className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Phone / WhatsApp</h3>
                    <p className="text-white">+977 985-1406895</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--accent)]/10 text-[var(--accent)] p-3 rounded-lg"><Mail className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Email</h3>
                    <p className="text-white">officialhoraastore@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#1877F2]/10 text-[#1877F2] p-3 rounded-lg"><Facebook className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Facebook</h3>
                    <p className="text-white">@horaa_storeofficial</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--accent)]/10 text-[var(--accent)] p-3 rounded-lg"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-400">Location</h3>
                    <p className="text-white">Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
