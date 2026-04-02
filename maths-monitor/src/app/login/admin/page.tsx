"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Lock, Mail, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminLoginPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative">
      <Link href="/" className="fixed top-10 left-10 flex items-center space-x-3 text-gray-500 hover:text-white transition-all group z-50">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
          <ChevronLeft size={16} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Exit Command</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl relative"
      >
        <div className="glass-effect rounded-[4rem] p-16 md:p-20 space-y-12 border-blue-500/20 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-24 h-24 bg-blue-500/10 rounded-[2.5rem] flex items-center justify-center text-blue-500 mb-2 border border-blue-500/20 shadow-inner">
              <ShieldAlert size={48} />
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">Command <br /><span className="text-blue-500">Center.</span></h1>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">High-Priority Administrative Access</p>
            </div>
          </div>

          <form className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-6">Admin Identifier</label>
                <div className="relative group">
                  <Mail className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="email" 
                    placeholder="headadmin@insight.elite"
                    className="premium-input w-full pl-16 pr-8 py-6 rounded-3xl text-sm placeholder:text-gray-800 font-bold tracking-tight"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-6">Security Credential</label>
                <div className="relative group">
                  <Lock className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                  <input 
                    type="password" 
                    placeholder="••••••••••••"
                    className="premium-input w-full pl-16 pr-8 py-6 rounded-3xl text-sm placeholder:text-gray-800 font-bold tracking-tight"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white font-black py-7 rounded-[2.5rem] flex items-center justify-center space-x-4 transition-all shadow-2xl shadow-blue-500/30"
            >
              <span className="text-base uppercase tracking-widest">Authorize Access</span>
              <ArrowRight size={22} />
            </motion.button>
          </form>

          <div className="pt-10 border-t border-white/5 text-center">
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] leading-relaxed max-w-xs mx-auto">
              System monitoring active. unauthorized login attempts are flagged for immediate investigation.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
