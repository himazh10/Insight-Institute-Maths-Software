"use client";

import { motion } from "framer-motion";
import { School, Shield, BarChart3, Zap, ChevronRight, Lock, Globe, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      {/* STATIC NAVIGATION - EXTRAORDINARY GLASS */}
      <nav className="fixed top-0 left-0 w-full z-[999] glass-nav h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center font-black text-black group-hover:rotate-12 transition-transform duration-500">I</div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase leading-none">Insight</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-blue-500 leading-none mt-1">Institute</span>
            </div>
          </Link>

          {/* Center Links - Premium Feel */}
          <div className="hidden lg:flex items-center space-x-12">
            {["Ecosystem", "Intelligence", "Protection"].map((item) => (
              <span key={item} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white cursor-pointer transition-all relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full" />
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <Link 
              href="/login" 
              className="hidden md:block text-[11px] font-black uppercase tracking-widest text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              School Sign In
            </Link>
            
            <Link href="/register">
              <button className="bg-white text-black text-[11px] font-black uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 hover:-rotate-2 active:scale-95 shadow-xl">
                Get Started
              </button>
            </Link>

            <Link href="/login/admin" className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/50 transition-all group">
              <Lock size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - JAW DROPPING */}
      <main className="pt-52 pb-32 px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 glass-effect px-6 py-2.5 rounded-full flex items-center space-x-3 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Next Gen Software Ecosystem</span>
          </motion.div>

          <div className="relative text-center">
            {/* Background Glow for Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 blur-[100px] pointer-events-none -z-10" />
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12 select-none"
            >
              WORLD <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">CLASS UI.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-400 text-xl md:text-3xl max-w-3xl text-center font-medium leading-relaxed tracking-tight"
          >
            Redefining mathematics monitoring for the <br /> 
            <span className="text-white italic underline decoration-blue-500 underline-offset-8">Insight Institute of Management and Technology.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 mt-20"
          >
            <Link href="/register">
              <button className="premium-btn px-16 py-7 rounded-[2.5rem] text-lg uppercase flex items-center space-x-4 shadow-[0_30px_60px_rgba(59,130,246,0.2)]">
                <span>Start Evolution</span>
                <ChevronRight size={24} />
              </button>
            </Link>
            <Link href="/login">
              <button className="glass-effect px-16 py-7 rounded-[2.5rem] text-lg font-black uppercase border border-white/5 hover:bg-white/5 transition-all">
                Portal Access
              </button>
            </Link>
          </motion.div>

          {/* MOUTH-WATERING BENTO PREVIEW */}
          <div className="mt-52 grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-2 glass-effect p-16 rounded-[4rem] space-y-10 border-blue-500/10"
            >
              <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-400">
                <Globe size={40} />
              </div>
              <div className="space-y-4">
                <h3 className="text-5xl font-black tracking-tighter uppercase">Intelligence <br /><span className="text-blue-500">At Scale.</span></h3>
                <p className="text-gray-500 text-xl font-medium tracking-tight">Monitor thousands of schools with zero latency and infinite precision.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-effect p-12 rounded-[4rem] flex flex-col justify-between border-purple-500/10"
            >
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mt-12">Military <br />Encryption.</h3>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-effect p-12 rounded-[4rem] flex flex-col justify-between border-emerald-500/10"
            >
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mt-12">Live <br />Spreadsheet.</h3>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Persistence and No Overlap Check */}
      <footer className="border-t border-white/5 py-32 mt-32 relative z-10 glass-effect rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-black text-xl">I</div>
              <span className="text-2xl font-black tracking-tighter uppercase">Insight Elite</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gray-500 max-w-md leading-relaxed">
              Global Management and Technology Division. Unauthorized access is detected and handled by system firewalls.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Infrastructure</span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Security Protocol</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
