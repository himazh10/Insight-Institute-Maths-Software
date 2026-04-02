"use client";

import { motion } from "framer-motion";
import { School, Mail, Lock, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { registerSchool } from "@/actions/register";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const action = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await registerSchool(formData);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 overflow-hidden relative flex items-center justify-center p-6">
      <div className="ui-mesh opacity-50" />
      <div className="ui-grid opacity-20" />

      <Link href="/" className="fixed top-8 left-8 z-50 flex items-center space-x-2 text-gray-500 hover:text-white transition-all group">
        <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back to Home</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl relative"
      >
        <div className="world-class-card rounded-[3rem] p-12 md:p-16 space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter uppercase">Register<br /><span className="text-blue-500">School.</span></h1>
            <p className="text-gray-500 text-lg font-light">Enter your institution details to begin.</p>
          </div>

          <form action={action} className="space-y-8">
            <div className="space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Institution Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <School className="h-5 w-5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    name="schoolName"
                    type="text"
                    placeholder="e.g. Insight Academy"
                    className="premium-input w-full pl-16 pr-8 py-6 rounded-3xl text-sm placeholder:text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Administrator Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="admin@school.edu"
                    className="premium-input w-full pl-16 pr-8 py-6 rounded-3xl text-sm placeholder:text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Security Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-600 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="premium-input w-full pl-16 pr-8 py-6 rounded-3xl text-sm placeholder:text-gray-700"
                    required
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-blue-600 text-white font-black py-6 rounded-3xl flex items-center justify-center space-x-3 hover:bg-blue-500 transition-all shadow-[0_20px_40px_rgba(59,130,246,0.2)] disabled:opacity-50"
              type="submit"
            >
              <span className="tracking-tighter text-lg uppercase">
                {loading ? "Registering..." : "Create Institution Account"}
              </span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500 font-medium">
              ALREADY REGISTERED?{" "}
              <Link href="/login" className="text-white hover:text-blue-400 transition-all font-black border-b border-white/20 hover:border-blue-500 pb-1 uppercase">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
