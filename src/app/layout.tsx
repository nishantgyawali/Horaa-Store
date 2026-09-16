import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import FloatingContact from "@/components/FloatingContact";


export const metadata: Metadata = {
  title: "Horaa Store | Premium Custom PCs & Gaming Gear",
  description: "High-end, aesthetic, modern E-Commerce Tech & Custom PC Store in Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col selection:bg-accent selection:text-black">
        
        <Header />
        <main className="flex-1">{children}</main>
        <FloatingContact />
      </body>
    </html>
  );
}
