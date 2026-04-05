"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ChevronLeft, School } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loginUser } from "@/actions/login";

export default function LoginPage() {
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
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-[#030303]" />;

  return (
    <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="ambient-light" />
      <div className="static-grid" />

      <Link href="/" className="absolute top-6 md:top-10 left-6 md:left-10 flex items-center space-x-2 text-gray-500 hover:text-white transition-all group z-50">
        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform md:w-5 md:h-5" />
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Return to Home</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="glass-effect rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 space-y-8 md:space-y-12">
          <div className="space-y-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-6 border border-white/5">
              <School size={24} className="md:w-7 md:h-7" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">School <br /><span className="text-blue-500">Sign In.</span></h1>
            <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed">Secure Access Authorization</p>
          </div>

          <form action={action} className="space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-5">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-5">Institutional Email</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors md:w-[18px] md:h-[18px]" size={16} />
                  <input 
                    name="email"
                    type="email" 
                    placeholder="admin@school.edu"
                    className="premium-input w-full pl-14 md:pl-16 pr-8 py-4 md:py-5 rounded-2xl text-sm placeholder:text-gray-700 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-5">Security Key</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors md:w-[18px] md:h-[18px]" size={16} />
                  <input 
                    name="password"
                    type="password" 
                    placeholder="••••••••••••"
                    className="premium-input w-full pl-14 md:pl-16 pr-8 py-4 md:py-5 rounded-2xl text-sm placeholder:text-gray-700 font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={loading}
              className="w-full bg-white text-black font-black py-4 md:py-5 rounded-2xl flex items-center justify-center space-x-3 hover:bg-blue-600 hover:text-white transition-all shadow-2xl disabled:opacity-50"
              type="submit"
            >
              <span className="text-xs md:text-sm uppercase tracking-widest">{loading ? "Authorizing..." : "ACCESS PORTAL"}</span>
              <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
            </motion.button>
          </form>

          <div className="pt-6 border-t border-white/5 text-center space-y-4">
            <p className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Need to register?{" "}
              <Link href="/register" className="text-white hover:text-blue-500 transition-colors underline underline-offset-4 decoration-white/20">
                Enroll School
              </Link>
            </p>
            <div className="h-2 md:h-4" />
            <Link href="/login/admin" className="inline-block text-[9px] md:text-[10px] font-bold text-blue-500/50 hover:text-blue-500 uppercase tracking-widest transition-colors whitespace-nowrap">
              Administrative Personnel Only
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
