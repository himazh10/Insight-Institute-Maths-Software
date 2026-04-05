"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Lock, Mail, ArrowRight, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loginUser } from "@/actions/login";

export default function AdminLoginPage() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const action = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await loginUser(formData);
    } catch (err: any) {
      if (err.message === "NEXT_REDIRECT") throw err;
      setError(err.message || "Authorization failed");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
      <Link href="/" className="fixed top-6 md:top-10 left-6 md:left-10 flex items-center space-x-2 md:space-x-3 text-gray-500 hover:text-white transition-all group z-50">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
          <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </div>
        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">Exit Command</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl relative"
      >
        <div className="glass-effect rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 space-y-8 md:space-y-12 border-blue-500/20 shadow-[0_0_100px_rgba(59,130,246,0.1)]">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-blue-500/10 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center text-blue-500 mb-2 border border-blue-500/20 shadow-inner">
              <ShieldAlert className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <div className="space-y-2 md:space-y-3">
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none md:leading-none">Command <br /><span className="text-blue-500">Center.</span></h1>
              <p className="text-gray-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">Administrative Access Only</p>
            </div>
          </div>

          <form action={action} className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 ml-6">Admin Identifier</label>
                <div className="relative group">
                  <Mail className="absolute left-6 md:left-7 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors w-4.5 h-4.5 md:w-5 md:h-5" size={18} />
                  <input 
                    name="email"
                    type="email" 
                    placeholder="headadmin@insight.edu"
                    className="premium-input w-full pl-14 md:pl-16 pr-8 py-5 md:py-6 rounded-[1.5rem] md:rounded-3xl text-sm placeholder:text-gray-800 font-bold tracking-tight"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500 ml-6">Security Credential</label>
                <div className="relative group">
                  <Lock className="absolute left-6 md:left-7 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors w-4.5 h-4.5 md:w-5 md:h-5" size={18} />
                  <input 
                    name="password"
                    type="password" 
                    placeholder="••••••••••••"
                    className="premium-input w-full pl-14 md:pl-16 pr-8 py-5 md:py-6 rounded-[1.5rem] md:rounded-3xl text-sm placeholder:text-gray-800 font-bold tracking-tight"
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-black py-5 md:py-7 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center space-x-3 md:space-x-4 transition-all shadow-2xl shadow-blue-500/30 disabled:opacity-50"
              type="submit"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-4.5 h-4.5 md:w-5.5 md:h-5.5" />
                  <span className="text-sm md:text-base uppercase tracking-widest">Authorizing...</span>
                </>
              ) : (
                <>
                  <span className="text-sm md:text-base uppercase tracking-widest">Authorize Access</span>
                  <ArrowRight className="w-4.5 h-4.5 md:w-5.5 md:h-5.5" />
                </>
              )}
            </motion.button>
          </form>

          <div className="pt-8 md:pt-10 border-t border-white/5 text-center">
            <p className="text-[8px] md:text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] md:tracking-[0.3em] leading-relaxed max-w-xs mx-auto">
              System monitoring active. unauthorized login attempts are flagged.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
