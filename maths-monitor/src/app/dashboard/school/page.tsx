"use client";

import { motion } from "framer-motion";
import { Plus, Table, LogOut, ChevronRight, FileText, Database, CheckCircle2, Loader2, ExternalLink, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { performGoogleSync } from "@/actions/export";
import { getSchoolData, submitAttendance } from "@/actions/submit";
import { logout } from "@/actions/login";

export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState<"submit" | "view">("submit");
  const [exporting, setExporting] = useState<boolean>(false);
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

  const handleManualSync = async () => {
    if (!school) return;
    setExporting(true);
    await performGoogleSync(school.id);
    setExporting(false);
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
    <div className="min-h-screen text-white flex flex-col md:flex-row relative overflow-hidden">
      
      {/* Sidebar - Extraordinary Glass (Desktop) / Bottom Nav (Mobile) */}
      <aside className="fixed bottom-0 left-0 w-full md:relative md:bottom-auto md:w-72 glass-effect m-0 md:m-6 rounded-t-[2.5rem] md:rounded-[3rem] p-4 md:p-8 flex flex-row md:flex-col items-center md:items-stretch justify-around md:justify-start space-y-0 md:space-y-10 z-50 border-t md:border border-white/5 shadow-2xl backdrop-blur-3xl md:backdrop-blur-none">
        <div className="hidden md:flex items-center space-x-4 px-2">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center font-black text-black text-xl shadow-lg">I</div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter uppercase leading-none">Insight</span>
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-blue-400 mt-1">Institutional</span>
          </div>
        </div>

        <nav className="flex flex-row md:flex-col flex-1 w-full md:w-auto md:space-y-3 justify-around md:justify-start">
          <button 
            onClick={() => { setActiveTab("submit"); }}
            className={`flex md:w-full items-center justify-center md:justify-start space-x-0 md:space-x-4 px-4 md:px-6 py-3 md:py-4 rounded-2xl transition-all duration-500 ${activeTab === "submit" ? "bg-white/10 text-white shadow-inner border border-white/5" : "text-gray-500 hover:text-gray-300"}`}
          >
            <Plus size={20} className={activeTab === "submit" ? "text-blue-400" : ""} />
            <span className="hidden md:block text-xs font-black uppercase tracking-widest">New Entry</span>
          </button>
          <button 
            onClick={() => { setActiveTab("view"); }}
            className={`flex md:w-full items-center justify-center md:justify-start space-x-0 md:space-x-4 px-4 md:px-6 py-3 md:py-4 rounded-2xl transition-all duration-500 ${activeTab === "view" ? "bg-white/10 text-white shadow-inner border border-white/5" : "text-gray-500 hover:text-gray-300"}`}
          >
            <Table size={20} className={activeTab === "view" ? "text-emerald-400" : ""} />
            <span className="hidden md:block text-xs font-black uppercase tracking-widest">Spreadsheet</span>
          </button>
          <button 
            onClick={handleManualSync}
            disabled={exporting}
            className="flex md:hidden items-center justify-center px-4 py-3 rounded-2xl text-gray-500"
          >
            {exporting ? <Loader2 size={20} className="animate-spin" /> : <Database size={20} />}
          </button>
          <button 
            onClick={() => logout()}
            className="flex md:hidden items-center justify-center px-4 py-3 rounded-2xl text-red-500/60"
          >
            <LogOut size={20} />
          </button>
        </nav>

        {/* Desktop Status & Logout */}
        <div className="hidden md:block pt-6 border-t border-white/5 space-y-4 px-6">
          <div className="flex items-center space-x-3 text-emerald-500 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10">
            <ShieldCheck size={18} />
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest">Auto-Sync Active</span>
              <span className="text-[7px] font-bold text-gray-500 uppercase mt-0.5">Google Cloud Enabled</span>
            </div>
          </div>
          
          <button 
            onClick={handleManualSync}
            disabled={exporting}
            className="w-full flex items-center justify-center space-x-3 py-3 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-all disabled:opacity-50"
          >
            {exporting ? <Loader2 size={12} className="animate-spin" /> : <Database size={12} />}
            <span>Force System Sync</span>
          </button>

          <button 
            onClick={() => logout()}
            className="w-full flex items-center space-x-4 px-6 py-4 text-red-500/60 hover:text-red-500 transition-all mt-4"
          >
            <LogOut size={20} />
            <span className="text-xs font-black uppercase tracking-widest">Authorize Exit</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto z-10 relative pb-28 md:pb-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 space-y-6 md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none truncate max-w-full md:max-w-xl">
              {school.schoolName} <br /><span className="text-blue-500">Dashboard.</span>
            </h1>
            <p className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] ml-1">Institutional Portal</p>
          </div>
          
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="glass-effect w-full md:w-auto px-6 py-4 rounded-2xl flex items-center justify-between md:justify-start md:space-x-4 border-white/5 bg-white/5 shadow-2xl">
              <div className="flex flex-col text-left md:text-right">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Database Status</span>
                <span className="text-xs font-bold text-white uppercase tracking-tighter">Live Connection</span>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>
          </div>
        </header>

        {activeTab === "submit" ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="glass-effect rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 space-y-8 md:space-y-10 border-white/5 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/10">
                    <Plus size={20} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Performance Entry</h2>
                </div>
                <div className="text-[7px] md:text-[9px] font-black text-gray-600 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  Live Cloud Sync
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Entry Date</label>
                    <input name="date" type="date" required className="premium-input w-full p-5 md:p-6 rounded-2xl md:rounded-[2rem] text-sm font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Attendance Units</label>
                    <input name="attendanceCount" type="number" required placeholder="0" className="premium-input w-full p-5 md:p-6 rounded-2xl md:rounded-[2rem] text-sm font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Curriculum Chapter</label>
                    <input name="workbookChapter" type="text" required placeholder="e.g. Chapter 4" className="premium-input w-full p-5 md:p-6 rounded-2xl md:rounded-[2rem] text-sm font-bold" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Page Progress</label>
                    <input name="workbookPages" type="text" required placeholder="e.g. 112 - 120" className="premium-input w-full p-5 md:p-6 rounded-2xl md:rounded-[2rem] text-sm font-bold" />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={submitting}
                  type="submit"
                  className="premium-btn w-full py-5 md:py-7 rounded-2xl md:rounded-[2.5rem] mt-4 uppercase text-sm md:text-base disabled:opacity-50 tracking-widest shadow-2xl"
                >
                  {submitting ? "Synchronizing..." : "Submit & Sync Data"}
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
            <div className="glass-effect rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border-white/5 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 md:px-10 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Entry Date</th>
                      <th className="px-6 md:px-10 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Attendance</th>
                      <th className="px-6 md:px-10 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Chapter</th>
                      <th className="px-6 md:px-10 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Sync</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03]">
                    {school.attendanceEntries.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-10 py-20 text-center text-gray-600 font-black uppercase tracking-[0.3em] text-xs">
                          No performance records detected.
                        </td>
                      </tr>
                    ) : (
                      school.attendanceEntries.map((entry: any) => (
                        <tr key={entry.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-6 md:px-10 py-6 md:py-8 text-[11px] md:text-sm font-black text-gray-300 tracking-tight uppercase">
                            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="px-6 md:px-10 py-6 md:py-8">
                            <span className="bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
                              {entry.attendanceCount} U
                            </span>
                          </td>
                          <td className="px-6 md:px-10 py-6 md:py-8">
                            <div className="flex flex-col">
                              <span className="text-[11px] md:text-sm font-black text-white uppercase tracking-tighter">{entry.workbookChapter}</span>
                              <span className="text-[8px] md:text-[10px] font-mono text-gray-500 font-bold uppercase">{entry.workbookPages}</span>
                            </div>
                          </td>
                          <td className="px-6 md:px-10 py-6 md:py-8 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <span className="hidden sm:inline-block text-[8px] font-black px-3 py-1.5 rounded-full border border-emerald-500/20 text-emerald-500 bg-emerald-500/5 uppercase tracking-widest">Verified</span>
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
