"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, BarChart3, Search, Filter, Download, ArrowUpRight, FileText, Database, Loader2, CheckCircle2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { exportToGoogleDocs, syncToGoogleSheets } from "@/actions/export";

export default function HeadAdminDashboard() {
  const [exporting, setExporting] = useState<string | null>(null);
  const [exportResult, setExportResult] = useState<{ url: string; type: string } | null>(null);

  const handleGlobalExport = async (type: "docs" | "sheets") => {
    setExporting(type);
    setExportResult(null);
    
    const result = type === "docs" 
      ? await exportToGoogleDocs("global-admin") 
      : await syncToGoogleSheets("global-admin");

    if (result.success) {
      setExportResult({ url: result.url as string, type });
    }
    setExporting(null);
  };

  return (
    <div className="min-h-screen p-8 relative">
      {/* Top Navigation - Refined Glass */}
      <nav className="glass-nav h-24 mb-12 flex items-center px-10 justify-between border-white/5">
        <div className="flex items-center space-x-5">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[1.2rem] flex items-center justify-center font-black text-2xl shadow-2xl shadow-blue-500/20">I</div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tighter uppercase leading-none">Insight Institute</h1>
            <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.4em] mt-1.5">Global Command Center</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search institutional network..." 
              className="premium-input pl-12 pr-6 py-3.5 rounded-2xl text-xs w-80 font-bold"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => handleGlobalExport("docs")}
              disabled={!!exporting}
              className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-50 relative group"
              title="Export Global Report to Google Docs"
            >
              {exporting === "docs" ? <Loader2 size={20} className="animate-spin" /> : <FileText size={20} />}
              {exportResult?.type === "docs" && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black" />}
            </button>
            <button 
              onClick={() => handleGlobalExport("sheets")}
              disabled={!!exporting}
              className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 transition-all disabled:opacity-50 relative group"
              title="Sync All Data to Google Sheets"
            >
              {exporting === "sheets" ? <Loader2 size={20} className="animate-spin" /> : <Database size={20} />}
              {exportResult?.type === "sheets" && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black" />}
            </button>
          </div>

          <div className="h-10 w-[1px] bg-white/10" />
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs font-black uppercase tracking-tighter">Head Admin</p>
              <p className="text-[8px] text-emerald-500 font-black uppercase tracking-widest mt-0.5">Session Active</p>
            </div>
            <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 shadow-inner" />
          </div>
        </div>
      </nav>

      {exportResult && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-8 glass-effect p-4 rounded-2xl flex items-center justify-between border-emerald-500/20 bg-emerald-500/5"
        >
          <div className="flex items-center space-x-4 px-4">
            <CheckCircle2 size={20} className="text-emerald-500" />
            <p className="text-sm font-bold text-gray-300">
              Global synchronization complete. {exportResult.type === "docs" ? "Progress Report" : "Institutional Spreadsheet"} is ready.
            </p>
          </div>
          <a 
            href={exportResult.url} 
            target="_blank" 
            className="premium-btn px-6 py-3 rounded-xl text-[10px] flex items-center space-x-2"
          >
            <span>ACCESS GOOGLE {exportResult.type === "docs" ? "DOCS" : "SHEETS"}</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 mb-12">
        {[
          { label: "Institutional Network", value: "24 Schools", icon: Users, color: "text-blue-400" },
          { label: "Curriculum Coverage", value: "142 Chapters", icon: BookOpen, color: "text-purple-400" },
          { label: "Aggregate Attendance", value: "12,402 Units", icon: BarChart3, color: "text-emerald-400" },
          { label: "Institutional KPI", value: "92.4%", icon: ArrowUpRight, color: "text-orange-400" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-effect p-8 rounded-[3rem] border-white/5 hover:border-white/10 transition-all group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-[1.5rem] bg-white/5 ${stat.color} border border-white/5`}>
                <stat.icon size={28} />
              </div>
              <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/10">+12%</span>
            </div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-3xl font-black mt-2 tracking-tighter uppercase">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Global Spreadsheet View */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-7xl mx-auto glass-effect rounded-[4rem] overflow-hidden border-white/5"
      >
        <div className="p-12 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tighter uppercase">Network Monitoring <span className="text-blue-500">Grid.</span></h2>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Real-time data synchronization across all nodes</p>
          </div>
          <button 
            onClick={() => handleGlobalExport("sheets")}
            className="premium-btn px-10 py-5 rounded-[2rem] text-[11px] flex items-center space-x-3"
          >
            <Download size={18} />
            <span>EXPORT AGGREGATE DATA</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-12 py-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">School Identifier</th>
                <th className="px-12 py-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Last Sync</th>
                <th className="px-12 py-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Attendance</th>
                <th className="px-12 py-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Curriculum</th>
                <th className="px-12 py-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Page Index</th>
                <th className="px-12 py-8 text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {[
                { school: "Greenwood Academy", date: "OCT 12, 2023", att: "45", ch: "CH 4", pg: "32-40", status: "Verified" },
                { school: "St. Mary's Elite", date: "OCT 12, 2023", att: "22", ch: "CH 5", pg: "112-120", status: "Verified" },
                { school: "Insight Tech Primary", date: "OCT 11, 2023", att: "89", ch: "CH 2", pg: "12-25", status: "Secured" },
                { school: "Global Leadership", date: "OCT 11, 2023", att: "34", ch: "CH 7", pg: "190-205", status: "Verified" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-12 py-10">
                    <span className="font-black text-sm uppercase tracking-tighter">{row.school}</span>
                  </td>
                  <td className="px-12 py-10 text-xs font-bold text-gray-500 tracking-widest">{row.date}</td>
                  <td className="px-12 py-10">
                    <span className="bg-blue-500/5 text-blue-400 border border-blue-500/10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase">
                      {row.att} Units
                    </span>
                  </td>
                  <td className="px-12 py-10 text-sm font-black uppercase tracking-tighter">{row.ch}</td>
                  <td className="px-12 py-10 text-xs font-mono text-gray-400 font-bold">{row.pg}</td>
                  <td className="px-12 py-10 text-right">
                    <span className={`text-[9px] font-black px-4 py-2 rounded-full border ${
                      row.status === 'Verified' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : 'border-blue-500/20 text-blue-500 bg-blue-500/5'
                    } uppercase tracking-widest`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
