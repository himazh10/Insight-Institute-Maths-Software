"use client";

import { motion } from "framer-motion";
import { School, Shield, BarChart3, Zap, ChevronRight, Lock, Globe, FileText, Database } from "lucide-react";
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
      {/* FLOATING NAVIGATION - JAW DROPPING GLASS */}
      <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-5xl z-[999]">
        <nav className="glass-nav h-14 md:h-16 flex items-center px-4 md:px-8 justify-between">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group cursor-pointer">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-lg flex items-center justify-center font-black text-black group-hover:rotate-12 transition-transform duration-500 text-xs md:text-sm">I</div>
            <div className="flex flex-col">
              <span className="text-[10px] md:text-sm font-black tracking-tighter uppercase leading-none">Insight</span>
              <span className="text-[6px] md:text-[7px] font-bold uppercase tracking-[0.4em] text-blue-400 leading-none mt-1">Maths</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-10">
            {["System", "Network", "Security"].map((item) => (
              <span key={item} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-white cursor-pointer transition-all relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 transition-all group-hover:w-full" />
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/login" className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all">
              Sign In
            </Link>
            <Link href="/register">
              <button className="bg-white text-black text-[8px] md:text-[9px] font-black uppercase tracking-widest px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                Register
              </button>
            </Link>
            <Link href="/login/admin" className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/50 transition-all group">
              <Lock size={12} className="text-blue-500 group-hover:scale-110 transition-transform md:hidden" />
              <Lock size={14} className="text-blue-500 group-hover:scale-110 transition-transform hidden md:block" />
            </Link>
          </div>
        </nav>
      </div>

      {/* HERO SECTION - REBRANDED */}
      <main className="pt-32 md:pt-48 pb-20 md:pb-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 md:mb-8 glass-effect px-4 md:px-6 py-2 rounded-full flex items-center space-x-2 md:space-x-3 border border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.1)]"
          >
            <Zap size={10} className="text-blue-500 fill-blue-500 animate-pulse md:hidden" />
            <Zap size={12} className="text-blue-500 fill-blue-500 animate-pulse hidden md:block" />
            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-blue-400 text-center">Institutional Performance Ecosystem</span>
          </motion.div>

          <div className="relative text-center w-full max-w-5xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-600/10 blur-[80px] md:blur-[120px] pointer-events-none -z-10" />
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 branding-glow"
            >
              INSIGHT MATHS<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 uppercase tracking-tighter">MONITORING.</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-400 text-base md:text-2xl max-w-3xl text-center font-medium leading-relaxed tracking-tight px-4"
          >
            A high-performance monitoring architecture tailored for the <br className="hidden md:block" /> 
            <span className="text-white border-b-2 border-blue-500/50 pb-1">Insight Institute of Management and Technology.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 mt-12 md:mt-16 w-full sm:w-auto px-6 sm:px-0"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <button className="premium-btn w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-3xl text-xs md:text-sm uppercase flex items-center justify-center space-x-4">
                <span>Deploy System</span>
                <ChevronRight size={18} className="md:w-5 md:h-5" />
              </button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <button className="glass-effect w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-3xl text-xs md:text-sm font-black uppercase border border-white/10 hover:bg-white/5 transition-all">
                School Portal
              </button>
            </Link>
          </motion.div>

          {/* INTEGRATION FEATURES */}
          <div className="mt-24 md:mt-48 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4 sm:px-0">
            <motion.div 
              whileHover={{ y: -8 }}
              className="sm:col-span-2 glass-effect p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] space-y-6 md:space-y-8 border-blue-500/10"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400">
                <Globe size={24} className="md:w-8 md:h-8" />
              </div>
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none">Global <br />Connectivity.</h3>
                <p className="text-gray-500 text-base md:text-lg font-medium tracking-tight">Sync attendance and progress data across every school in the network instantly.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="glass-effect p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-between border-purple-500/10"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400">
                <FileText size={22} className="md:w-7 md:h-7" />
              </div>
              <div className="mt-6 md:mt-8">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter">Google Docs <br />Export.</h3>
                <p className="text-gray-500 text-[10px] md:text-xs mt-2 font-medium">Generate formatted reports directly into Google Docs.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="glass-effect p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-between border-emerald-500/10"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                <Database size={22} className="md:w-7 md:h-7" />
              </div>
              <div className="mt-6 md:mt-8">
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter">Google Sheets <br />Sync.</h3>
                <p className="text-gray-500 text-[10px] md:text-xs mt-2 font-medium">Live data synchronization with Google Spreadsheets.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-16 md:py-24 mt-20 md:mt-32 relative z-10 glass-effect rounded-t-[3rem] md:rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-lg flex items-center justify-center font-bold text-black text-xs md:text-sm">I</div>
              <span className="font-black tracking-tighter uppercase text-xs md:text-sm">Insight Maths</span>
            </div>
            <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-600 max-w-sm leading-relaxed">
              Proprietary performance architecture. <br />Insight Institute of Management and Technology.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-16 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-gray-500">
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Infrastructure</span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Google Integration</span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Security Protocol</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
