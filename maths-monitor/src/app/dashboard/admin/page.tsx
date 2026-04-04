"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, BookOpen, BarChart3, Search, Filter, Download, 
  ArrowUpRight, FileText, Database, Loader2, CheckCircle2, 
  ExternalLink, LogOut, Trash2, Mail, Calendar, Settings, 
  ChevronRight, LayoutDashboard, Globe, Shield, X, FileEdit,
  FileSpreadsheet, FileDown, Activity
} from "lucide-react";
import { useState, useEffect } from "react";
import { getAdminDashboardData, deleteSchool } from "@/actions/submit";
import { logout } from "@/actions/login";

export default function HeadAdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "schools" | "reports">("overview");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  
  // Filtering States
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getAdminDashboardData();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you absolutely sure? This will permanently erase all data for this institution.")) return;
    setIsDeleting(id);
    try {
      await deleteSchool(id);
      await fetchData();
    } catch (err) {
      alert("Critical error: System could not process deletion.");
    } finally {
      setIsDeleting(null);
    }
  };

  const downloadFile = async (type: "word" | "excel" | "pdf", schoolId: string = "global-admin") => {
    setDownloading(`${type}-${schoolId}`);
    try {
      // Force download using anchor tag to avoid CORS/buffer issues in some environments
      const link = document.createElement('a');
      link.href = `/api/export/${type}?schoolId=${schoolId}`;
      link.download = `Report_${schoolId}.${type === 'excel' ? 'xlsx' : type === 'word' ? 'docx' : 'pdf'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert(`Failed to initiate ${type} download.`);
    } finally {
      setTimeout(() => setDownloading(null), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        <div className="flex flex-col items-center space-y-4 relative z-10">
          <Loader2 className="animate-spin text-blue-500" size={64} strokeWidth={1} />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500/50">Initializing Intelligence Hub</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
        <div className="glass-effect p-12 rounded-[3rem] text-center space-y-6 border border-white/5">
          <Shield className="mx-auto text-red-500" size={48} />
          <h1 className="text-3xl font-black uppercase tracking-tighter">Security Breach</h1>
          <p className="text-gray-500 text-sm max-w-md">Institutional credentials not recognized. Access to the Global Command Center is restricted.</p>
          <button onClick={() => logout()} className="premium-btn px-12 py-5 rounded-2xl">Re-authenticate</button>
        </div>
      </div>
    );
  }

  const filteredSchools = data.schools.filter((s: any) => 
    s.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReports = data.schools.map((school: any) => ({
    ...school,
    attendanceEntries: school.attendanceEntries.filter((entry: any) => {
      const entryDate = new Date(entry.date).getTime();
      const start = startDate ? new Date(startDate).getTime() : 0;
      const end = endDate ? new Date(endDate).getTime() : Infinity;
      return entryDate >= start && entryDate <= end;
    })
  })).filter((school: any) => 
    school.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Dynamic Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
        <nav className="glass-nav px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-[2.5rem] border border-white/5 shadow-2xl flex items-center justify-between md:justify-start md:space-x-12 backdrop-blur-3xl overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-3 pr-4 md:pr-8 border-r border-white/10 shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded-lg md:rounded-xl flex items-center justify-center font-black text-xs md:text-sm">I</div>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">Command Center</span>
          </div>

          <div className="flex items-center space-x-1 md:space-x-1 shrink-0 px-2">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
              { id: 'schools', icon: Globe, label: 'Institutions' },
              { id: 'reports', icon: Database, label: 'Master Grid' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 md:space-x-3 px-3 md:px-6 py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white/5 text-blue-400' : 'text-gray-500 hover:text-white'}`}
              >
                <tab.icon size={12} className="md:w-3.5 md:h-3.5" />
                <span className={activeTab === tab.id ? "block" : "hidden sm:block"}>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 md:space-x-6 pl-4 md:pl-8 border-l border-white/10 shrink-0">
            <button onClick={() => logout()} className="text-gray-500 hover:text-red-400 transition-colors">
              <LogOut className="w-4 h-4 md:w-[18px] md:h-[18px]" />
            </button>
          </div>
        </nav>
      </div>

      <div className="pt-24 md:pt-32 px-6 md:px-12 pb-24 max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 md:space-y-12"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                  { label: "Active Institutions", value: data.stats.totalSchools, icon: Globe, color: "blue", trend: "+12%" },
                  { label: "Aggregate Coverage", value: data.stats.totalChapters, icon: BookOpen, color: "purple", trend: "Stable" },
                  { label: "System Throughput", value: data.stats.totalAttendance, icon: BarChart3, color: "emerald", trend: "+8.4k" },
                  { label: "Institutional KPI", value: data.stats.avgProgress, icon: ArrowUpRight, color: "orange", trend: "High" },
                ].map((stat, i) => (
                  <div key={i} className="glass-effect p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/5 relative group hover:border-blue-500/20 transition-all">
                    <div className="absolute top-6 md:top-8 right-6 md:right-8 text-[8px] md:text-[9px] font-black text-blue-500 uppercase tracking-widest">{stat.trend}</div>
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6 md:mb-8`}>
                      <stat.icon size={20} className={stat.color === 'blue' ? 'text-blue-400' : stat.color === 'purple' ? 'text-purple-400' : stat.color === 'emerald' ? 'text-emerald-400' : 'text-orange-400'} />
                    </div>
                    <p className="text-gray-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2">{stat.label}</p>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter">{stat.value}</h3>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                <div className="lg:col-span-8 glass-effect rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 border border-white/5 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 hidden sm:block">
                      <FileDown className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]" strokeWidth={0.5} />
                   </div>
                   <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8">Intelligence <br /><span className="text-blue-500">Exporter.</span></h2>
                   <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={() => downloadFile("pdf", "global-admin")}
                        disabled={!!downloading}
                        className="premium-btn w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl flex items-center justify-center space-x-3 md:space-x-4 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                      >
                        {downloading === "pdf-global-admin" ? <Loader2 size={16} className="animate-spin" /> : <FileDown size={16} />}
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">PDF Intelligence</span>
                      </button>
                      <button 
                        onClick={() => downloadFile("word", "global-admin")}
                        disabled={!!downloading}
                        className="glass-effect w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl border border-white/5 flex items-center justify-center space-x-3 md:space-x-4 hover:bg-white/5 transition-all"
                      >
                        {downloading === "word-global-admin" ? <Loader2 size={16} className="animate-spin" /> : <FileEdit size={16} />}
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">Word Report</span>
                      </button>
                      <button 
                        onClick={() => downloadFile("excel", "global-admin")}
                        disabled={!!downloading}
                        className="glass-effect w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl border border-white/5 flex items-center justify-center space-x-3 md:space-x-4 hover:bg-white/5 transition-all text-emerald-400"
                      >
                        {downloading === "excel-global-admin" ? <Loader2 size={16} className="animate-spin" /> : <FileSpreadsheet size={16} />}
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">Excel Data</span>
                      </button>
                   </div>
                </div>

                <div className="lg:col-span-4 glass-effect rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 border border-white/5">
                   <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8 flex items-center space-x-2">
                     <Shield size={12} className="text-blue-500" />
                     <span>Local Node Status</span>
                   </h3>
                   <div className="space-y-4 md:space-y-6">
                      <div className="flex justify-between items-center p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-[9px] md:text-[10px] font-black uppercase text-gray-400">Database Engine</span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase text-emerald-500">Optimal</span>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-[9px] md:text-[10px] font-black uppercase text-gray-400">Generator Engine</span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase text-blue-500">Active</span>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-[9px] md:text-[10px] font-black uppercase text-gray-400">Auth Control</span>
                        <span className="text-[9px] md:text-[10px] font-black uppercase text-purple-500">Secure</span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'schools' && (
            <motion.div
              key="schools"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 md:gap-0">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Institutional <br /><span className="text-blue-500 md:hidden block mt-1">Directory.</span><span className="text-blue-500 hidden md:inline">Directory.</span></h1>
                  <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.4em] ml-1">Manage network entities</p>
                </div>
                <div className="relative group w-full md:w-auto">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors w-4.5 h-4.5 md:w-5 md:h-5" />
                <input 
                  type="text" 
                  placeholder="Search entities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="premium-input w-full md:w-96 pl-14 md:pl-16 pr-8 py-4 md:py-5 rounded-xl md:rounded-[2rem] text-[10px] md:text-xs font-black uppercase tracking-widest placeholder:text-gray-800"
                />
                </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredSchools.map((school: any) => (
                <div key={school.id} className="glass-effect rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 border border-white/5 hover:border-blue-500/20 transition-all relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-blue-500/5 blur-3xl rounded-full" />

                  <div className="flex items-start justify-between mb-6 md:mb-8">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-blue-600/10 transition-colors">
                      <Globe className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleDelete(school.id)}
                        disabled={isDeleting === school.id}
                        className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 text-gray-600 hover:text-red-500 hover:bg-red-500/10 border border-white/5 transition-all"
                      >
                        {isDeleting === school.id ? <Loader2 className="animate-spin w-3.5 h-3.5 md:w-4 md:h-4" /> : <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter truncate">{school.schoolName}</h3>
                      <div className="flex items-center space-x-2 mt-2 text-gray-500">
                        <Mail className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase truncate">{school.email}</span>
                      </div>
                    </div>

                    <div className="pt-4 md:pt-6 border-t border-white/5">
                      <div className="space-y-1">
                        <p className="text-[7px] md:text-[8px] font-black text-gray-600 uppercase tracking-widest">Aggregate Records</p>
                        <p className="text-xs md:text-sm font-black text-blue-400">{school.attendanceEntries?.length || 0}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      <button 
                        onClick={() => downloadFile("pdf", school.id)}
                        className="py-3 md:py-4 rounded-xl md:rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[7px] md:text-[8px] font-black uppercase tracking-widest text-blue-400 hover:bg-blue-600 hover:text-white transition-all flex flex-col items-center space-y-1 md:space-y-2"
                      >
                        <FileDown className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span>PDF</span>
                      </button>
                      <button 
                        onClick={() => downloadFile("word", school.id)}
                        className="py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-[7px] md:text-[8px] font-black uppercase tracking-widest text-gray-400 hover:bg-white/10 hover:text-white transition-all flex flex-col items-center space-y-1 md:space-y-2"
                      >
                        <FileEdit className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span>WORD</span>
                      </button>
                      <button 
                        onClick={() => downloadFile("excel", school.id)}
                        className="py-3 md:py-4 rounded-xl md:rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-[7px] md:text-[8px] font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-500/10 transition-all flex flex-col items-center space-y-1 md:space-y-2"
                      >
                        <FileSpreadsheet className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span>EXCEL</span>
                      </button>
                    </div>
                  </div>
                </div>
                ))}
                </div>
                </motion.div>
                )}

                {activeTab === 'reports' && (
                <motion.div
                key="reports"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
                >
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 md:mb-12 gap-6 xl:gap-0">
                <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Master <span className="text-blue-500">Grid.</span></h1>
                <p className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.4em] ml-1">Universal synchronization matrix</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
                <div className="relative group w-full sm:w-64">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors w-3.5 h-3.5 md:w-4 md:h-4" />
                  <input 
                    type="text" 
                    placeholder="Search school..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="premium-input w-full pl-12 md:pl-14 pr-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest placeholder:text-gray-800"
                  />
                </div>

                <div className="glass-effect px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/5 flex items-center justify-between sm:justify-start space-x-4 md:space-x-6 overflow-x-auto">
                  <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
                    <Calendar className="text-blue-500 w-3 h-3 md:w-3.5 md:h-3.5" />
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-transparent text-[8px] md:text-[10px] font-black uppercase outline-none text-gray-400 w-20 md:w-24"
                    />
                  </div>
                  <ChevronRight className="text-gray-700 shrink-0 w-2.5 h-2.5 md:w-3 md:h-3" />
                  <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-transparent text-[8px] md:text-[10px] font-black uppercase outline-none text-gray-400 w-20 md:w-24"
                    />
                  </div>
                  {(startDate || endDate) && (
                    <button 
                      onClick={() => { setStartDate(""); setEndDate(""); }}
                      className="p-1 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 shrink-0"
                    >
                      <X className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </button>
                  )}
                </div>
                </div>
                </div>

                <div className="glass-effect rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl">
                <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[900px]">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5">
                      <th className="px-8 md:px-12 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Institution</th>
                      <th className="px-8 md:px-12 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Update</th>
                      <th className="px-8 md:px-12 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Units</th>
                      <th className="px-8 md:px-12 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Chapter</th>
                      <th className="px-8 md:px-12 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">Integrity</th>
                      <th className="px-8 md:px-12 py-6 md:py-8 text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03]">
                    {filteredReports.map((school: any) => {
                      const lastEntry = school.attendanceEntries[0];
                      return (
                        <tr key={school.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 md:px-12 py-6 md:py-10">
                            <span className="text-xs md:text-sm font-black uppercase tracking-tighter">{school.schoolName}</span>
                          </td>
                          <td className="px-8 md:px-12 py-6 md:py-10 text-[9px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                            {lastEntry ? new Date(lastEntry.date).toLocaleDateString() : "NO DATA"}
                          </td>
                          <td className="px-8 md:px-12 py-6 md:py-10">
                            <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-blue-500/5 text-blue-400 border border-blue-500/10 text-[8px] md:text-[9px] font-black uppercase">
                              {lastEntry ? `${lastEntry.attendanceCount} U` : "0"}
                            </span>
                          </td>
                          <td className="px-8 md:px-12 py-6 md:py-10">
                             <div className="flex flex-col">
                                <span className="text-[10px] md:text-xs font-black uppercase">{lastEntry?.workbookChapter || "N/A"}</span>
                                <span className="text-[8px] md:text-[9px] text-gray-600 font-bold uppercase mt-1">PG: {lastEntry?.workbookPages || "0"}</span>
                             </div>
                          </td>
                          <td className="px-8 md:px-12 py-6 md:py-10">
                             <div className="flex items-center space-x-2">
                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase tracking-widest">Verified</span>
                             </div>
                          </td>
                          <td className="px-8 md:px-12 py-6 md:py-10 text-right">
                             <div className="flex items-center justify-end space-x-1 md:space-x-2">
                               <button 
                                onClick={() => downloadFile("pdf", school.id)}
                                className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-white/5 text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                                  <FileDown className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                </button>
                               <button 
                                onClick={() => downloadFile("word", school.id)}
                                className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-white/5 text-gray-500 hover:text-white transition-all">
                                  <FileText className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                </button>
                                <button 
                                onClick={() => downloadFile("excel", school.id)}
                                className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-white/5 text-gray-500 hover:text-emerald-500 transition-all">
                                  <FileSpreadsheet className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                </button>
                             </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                </div>
                </div>
                </motion.div>
                )}        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </div>
  );
}
