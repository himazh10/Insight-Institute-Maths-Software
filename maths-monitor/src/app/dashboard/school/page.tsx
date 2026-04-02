"use client";

import { motion } from "framer-motion";
import { Plus, Table, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState<"submit" | "view">("submit");

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 glass-card border-y-0 border-l-0 m-4 rounded-3xl p-6 flex flex-col space-y-8">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">I</div>
          <span className="font-bold text-lg tracking-tight">Insight Math</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab("submit")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "submit" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            <Plus size={18} />
            <span className="text-sm font-medium">New Entry</span>
          </button>
          <button 
            onClick={() => setActiveTab("view")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "view" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            <Table size={18} />
            <span className="text-sm font-medium">View Spreadsheet</span>
          </button>
        </nav>

        <button className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
          <LogOut size={18} />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">St. Mary's Academy</h1>
            <p className="text-gray-400">School Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="glass-card px-4 py-2 rounded-2xl flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-gray-300">System Online</span>
            </div>
          </div>
        </header>

        {activeTab === "submit" ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-semibold mb-6">Class Progress Update</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Date</label>
                  <input type="date" className="glass-input w-full p-4 rounded-2xl text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Attendance</label>
                  <input type="number" placeholder="0" className="glass-input w-full p-4 rounded-2xl text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Workbook Chapter</label>
                  <input type="text" placeholder="e.g. Chapter 4" className="glass-input w-full p-4 rounded-2xl text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Pages Covered</label>
                  <input type="text" placeholder="e.g. 45-52" className="glass-input w-full p-4 rounded-2xl text-sm" />
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-2xl mt-4 transition-colors"
              >
                Submit Update
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-3xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Attendance</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Chapter</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase">Pages</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 text-sm">Oct {10 + i}, 2023</td>
                      <td className="px-6 py-4 text-sm">24</td>
                      <td className="px-6 py-4 text-sm">Chapter 5</td>
                      <td className="px-6 py-4 text-sm">112-120</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
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
