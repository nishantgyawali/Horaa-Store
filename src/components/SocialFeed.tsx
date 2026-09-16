"use client";
import { motion } from "framer-motion";
import { Facebook, ExternalLink } from "lucide-react";

const posts = [
  {
    id: 1,
    image: "/assets/promo.jpg",
    content: "Just dropped: The NEXT-GEN AI EXTREME GAMING BUILD! Core Ultra 7 265K + RTX 5060. Grab it now with a FREE keyboard and mouse!",
    date: "2 hours ago",
    link: "https://www.facebook.com/profile.php?id=61578433256161"
  },
  {
    id: 2,
    image: "/assets/cover.jpg",
    content: "Premium Computer Accessories now in stock. Performance. Quality. Best Prices. DM us to order!",
    date: "1 day ago",
    link: "https://www.facebook.com/profile.php?id=61578433256161"
  }
];

export default function SocialFeed() {
  return (
    <section className="py-20 relative" id="social">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight mb-2 flex items-center gap-3">
              <Facebook className="text-[#1877F2] w-8 h-8" />
              Latest Updates
            </h2>
            <p className="text-gray-400">Follow us on Facebook for drops and deals.</p>
          </div>
          <a href="https://www.facebook.com/profile.php?id=61578433256161" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-[var(--accent)] hover:underline font-medium">
            View Page <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.a 
              href={post.link}
              target="_blank"
              rel="noreferrer"
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glassmorphism neon-border rounded-2xl overflow-hidden group block"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={post.image} alt="Social Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/1a1a1a/333?text=Social+Update' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <div className="text-xs text-[var(--accent)] font-medium mb-2">{post.date}</div>
                <p className="text-gray-200 line-clamp-3">{post.content}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
