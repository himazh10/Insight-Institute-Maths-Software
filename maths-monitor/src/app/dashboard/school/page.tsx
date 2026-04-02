"use client";

import { motion } from "framer-motion";
import { Plus, Table, LogOut, ChevronRight, FileText, Database, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { exportToGoogleDocs, syncToGoogleSheets } from "@/actions/export";
import { getSchoolData, submitAttendance } from "@/actions/submit";
import { logout } from "@/actions/login";

export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState<"submit" | "view">("submit");
  const [exporting, setExporting] = useState<string | null>(null);
  const [exportResult, setExportResult] = useState<{ url: string; type: string } | null>(null);
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getSchoolData();
    setSchool(data);
    setLoading(false);
  };

  const handleGoogleExport = async (type: "docs" | "sheets") => {
    if (!school) return;
    setExporting(type);
    setExportResult(null);
    
    const result = type === "docs" 
      ? await exportToGoogleDocs(school.id) 
      : await syncToGoogleSheets(school.id);

    if (result.success) {
      setExportResult({ url: result.url as string, type });
    }
    setExporting(null);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      await submitAttendance(formData);
      await fetchData(); // Refresh local data
      setActiveTab("view");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Session Expired</h1>
          <button onClick={() => logout()} className="premium-btn px-8 py-3 rounded-xl">Back to Login</button>
        </div>
      </div>
    );
  }

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

        <button 
          onClick={() => logout()}
          className="flex items-center space-x-4 px-6 py-4 text-red-500/60 hover:text-red-500 transition-all"
        >
          <LogOut size={20} />
          <span className="text-xs font-black uppercase tracking-widest">Authorize Exit</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto z-10 relative">
        <header className="flex justify-between items-end mb-16">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none truncate max-w-xl">
              {school.schoolName} <br /><span className="text-blue-500">Dashboard.</span>
            </h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em] ml-1">Institutional Portal</p>
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

              <form onSubmit={handleFormSubmit} className="space-y-10">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Entry Date</label>
                    <input name="date" type="date" required className="premium-input w-full p-6 rounded-[2rem] text-sm" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Total Attendance</label>
                    <input name="attendanceCount" type="number" required placeholder="0" className="premium-input w-full p-6 rounded-[2rem] text-sm" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Workbook Chapter</label>
                    <input name="workbookChapter" type="text" required placeholder="e.g. Chapter 4" className="premium-input w-full p-6 rounded-[2rem] text-sm font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Pages Covered</label>
                    <input name="workbookPages" type="text" required placeholder="e.g. 112 - 120" className="premium-input w-full p-6 rounded-[2rem] text-sm font-bold" />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitting}
                  type="submit"
                  className="premium-btn w-full py-7 rounded-[2.5rem] mt-6 uppercase text-base disabled:opacity-50"
                >
                  {submitting ? "Processing Entry..." : "Submit Performance Data"}
                </motion.button>
              </form>
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
                    <th className="px-10 py-8 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {school.attendanceEntries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-10 py-20 text-center text-gray-500 font-bold uppercase tracking-widest">
                        No performance records found for this institution.
                      </td>
                    </tr>
                  ) : (
                    school.attendanceEntries.map((entry: any) => (
                      <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-10 py-8 text-sm font-bold text-gray-300 tracking-tight uppercase">
                          {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="px-10 py-8">
                          <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
                            {entry.attendanceCount} Units
                          </span>
                        </td>
                        <td className="px-10 py-8 text-sm font-black text-white uppercase tracking-tighter">{entry.workbookChapter}</td>
                        <td className="px-10 py-8 text-sm font-mono text-gray-400">{entry.workbookPages}</td>
                        <td className="px-10 py-8 text-right">
                          <span className="text-[9px] font-black px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-500 bg-emerald-500/5 uppercase tracking-widest">Verified</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
