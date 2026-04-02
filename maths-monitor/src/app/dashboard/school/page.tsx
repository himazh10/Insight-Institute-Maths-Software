"use client";

import { motion } from "framer-motion";
import { Plus, Table, LogOut, ChevronRight, FileText, Database, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { exportToGoogleDocs, syncToGoogleSheets } from "@/actions/export";

export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState<"submit" | "view">("submit");
  const [exporting, setExporting] = useState<string | null>(null);
  const [exportResult, setExportResult] = useState<{ url: string; type: string } | null>(null);

  const handleGoogleExport = async (type: "docs" | "sheets") => {
    setExporting(type);
    setExportResult(null);
    
    // Using a placeholder school ID for the demo
    const result = type === "docs" 
      ? await exportToGoogleDocs("demo-id") 
      : await syncToGoogleSheets("demo-id");

    if (result.success) {
      setExportResult({ url: result.url as string, type });
    }
    setExporting(null);
  };

  return (
    <div className="min-h-screen text-white flex relative overflow-hidden">
      
      {/* Sidebar - Extraordinary Glass */}
      <aside className="w-72 glass-effect m-6 rounded-[3rem] p-8 flex flex-col space-y-10 z-20 border-white/5 shadow-2xl">
        <div className="flex items-center space-x-4 px-2">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center font-black text-black text-xl shadow-lg">I</div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter uppercase leading-none">Insight</span>
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-blue-400 mt-1">Institutional</span>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          <button 
            onClick={() => { setActiveTab("submit"); setExportResult(null); }}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-500 ${activeTab === "submit" ? "bg-white/10 text-white shadow-inner border border-white/5" : "text-gray-500 hover:text-gray-300"}`}
          >
            <Plus size={20} className={activeTab === "submit" ? "text-blue-400" : ""} />
            <span className="text-xs font-black uppercase tracking-widest">New Entry</span>
          </button>
          <button 
            onClick={() => { setActiveTab("view"); setExportResult(null); }}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-500 ${activeTab === "view" ? "bg-white/10 text-white shadow-inner border border-white/5" : "text-gray-500 hover:text-gray-300"}`}
          >
            <Table size={20} className={activeTab === "view" ? "text-emerald-400" : ""} />
            <span className="text-xs font-black uppercase tracking-widest">Spreadsheet</span>
          </button>
        </nav>

        {/* Google Export Actions */}
        <div className="pt-6 border-t border-white/5 space-y-4">
          <p className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">Export Engine</p>
          <button 
            onClick={() => handleGoogleExport("docs")}
            disabled={!!exporting}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-blue-400 hover:bg-blue-500/10 transition-all disabled:opacity-50"
          >
            <div className="flex items-center space-x-3">
              {exporting === "docs" ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
              <span className="text-[10px] font-bold uppercase tracking-widest">Google Docs</span>
            </div>
            {exportResult?.type === "docs" && <CheckCircle2 size={14} className="text-emerald-500" />}
          </button>
          <button 
            onClick={() => handleGoogleExport("sheets")}
            disabled={!!exporting}
            className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 transition-all disabled:opacity-50"
          >
            <div className="flex items-center space-x-3">
              {exporting === "sheets" ? <Loader2 size={18} className="animate-spin" /> : <Database size={18} />}
              <span className="text-[10px] font-bold uppercase tracking-widest">Google Sheets</span>
            </div>
            {exportResult?.type === "sheets" && <CheckCircle2 size={14} className="text-emerald-500" />}
          </button>
        </div>

        <button className="flex items-center space-x-4 px-6 py-4 text-red-500/60 hover:text-red-500 transition-all">
          <LogOut size={20} />
          <span className="text-xs font-black uppercase tracking-widest">Authorize Exit</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto z-10 relative">
        <header className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">Institutional <br /><span className="text-blue-500">Dashboard.</span></h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em] ml-1">St. Mary's Academy Portal</p>
          </div>
          
          {exportResult && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect px-6 py-4 rounded-2xl flex items-center space-x-4 border-emerald-500/20 bg-emerald-500/5 shadow-2xl"
            >
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                {exportResult.type === "docs" ? <FileText size={20} /> : <Database size={20} />}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Export Ready</span>
                <a 
                  href={exportResult.url} 
                  target="_blank" 
                  className="text-xs font-bold text-white hover:text-blue-400 flex items-center space-x-1"
                >
                  <span>Open Google {exportResult.type === "docs" ? "Docs" : "Sheets"}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          )}
        </header>

        {activeTab === "submit" ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="glass-effect rounded-[3.5rem] p-12 space-y-10 border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/10">
                  <Plus size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Class Performance Entry</h2>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Entry Date</label>
                  <input type="date" className="premium-input w-full p-6 rounded-[2rem] text-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Total Attendance</label>
                  <input type="number" placeholder="0" className="premium-input w-full p-6 rounded-[2rem] text-sm" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Workbook Chapter</label>
                  <input type="text" placeholder="e.g. Chapter 4" className="premium-input w-full p-6 rounded-[2rem] text-sm font-bold" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Pages Covered</label>
                  <input type="text" placeholder="e.g. 112 - 120" className="premium-input w-full p-6 rounded-[2rem] text-sm font-bold" />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="premium-btn w-full py-7 rounded-[2.5rem] mt-6 uppercase text-base"
              >
                Submit Performance Data
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-[3.5rem] overflow-hidden border-white/5">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-10 py-8 text-[10px] font-black text-gray-500 uppercase tracking-widest">Entry Date</th>
                    <th className="px-10 py-8 text-[10px] font-black text-gray-500 uppercase tracking-widest">Attendance</th>
                    <th className="px-10 py-8 text-[10px] font-black text-gray-500 uppercase tracking-widest">Chapter</th>
                    <th className="px-10 py-8 text-[10px] font-black text-gray-500 uppercase tracking-widest">Pages Covered</th>
                    <th className="px-10 py-8 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-10 py-8 text-sm font-bold text-gray-300 tracking-tight">OCT {10 + i}, 2023</td>
                      <td className="px-10 py-8">
                        <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
                          {20 + i * 2} Units
                        </span>
                      </td>
                      <td className="px-10 py-8 text-sm font-black text-white uppercase tracking-tighter">Chapter {i + 3}</td>
                      <td className="px-10 py-8 text-sm font-mono text-gray-400">{100 + i * 10} - {115 + i * 10}</td>
                      <td className="px-10 py-8 text-right">
                        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
