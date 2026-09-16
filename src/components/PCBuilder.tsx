"use client";

import { 
  Zap, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  Flame 
} from "lucide-react";

interface ReadyRig {
  id: string;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    cooler: string;
  };
  peripheralsFree: string;
}

const READY_RIGS: ReadyRig[] = [
  {
    id: "vanguard-ai",
    name: "Vanguard AI Starter Rig",
    tagline: "Next-Gen AI Workloads & High-FPS 1440p Gaming",
    price: 202500,
    badge: "Most Popular",
    specs: {
      cpu: "Intel Core Ultra 7 265K (20 Cores, AI NPU Engine)",
      gpu: "NVIDIA GeForce RTX 5060 8GB OC GDDR7",
      ram: "16GB (2x8GB) DDR5 6000MHz RGB",
      storage: "512GB PCIe Gen4 NVMe M.2 SSD",
      cooler: "Darkflash Dual 360mm ARGB AIO Liquid Cooler"
    },
    peripheralsFree: "Mechanical RGB Keyboard + Ergonomic Gaming Mouse"
  },
  {
    id: "apex-ultra",
    name: "Apex Ultra Gaming Rig",
    tagline: "Extreme 4K Gaming & Smooth Live Streaming",
    price: 285000,
    badge: "Extreme Performance",
    specs: {
      cpu: "AMD Ryzen 7 9800X3D (3D V-Cache Technology)",
      gpu: "NVIDIA GeForce RTX 5070 12GB GDDR7",
      ram: "32GB (2x16GB) DDR5 6000MHz RGB",
      storage: "1TB PCIe Gen4 NVMe M.2 SSD",
      cooler: "360mm ARGB Performance Liquid Cooler"
    },
    peripheralsFree: "7.1 Surround Gaming Headset + XL RGB Desk Mat"
  },
  {
    id: "titan-workstation",
    name: "Titan AI & Workstation Rig",
    tagline: "Heavy LLM Training, 3D Rendering & Uncompromised Gaming",
    price: 395000,
    badge: "Flagship Tier",
    specs: {
      cpu: "Intel Core Ultra 9 285K (24 Cores, Up to 5.7GHz)",
      gpu: "NVIDIA GeForce RTX 5080 16GB GDDR7",
      ram: "64GB (2x32GB) DDR5 6000MHz RGB",
      storage: "2TB PCIe Gen4 NVMe M.2 SSD",
      cooler: "Premium Dual 360mm ARGB AIO Liquid Cooler"
    },
    peripheralsFree: "Pro Wireless Mechanical Keyboard + Wireless Precision Mouse + 7.1 Headset"
  }
];

