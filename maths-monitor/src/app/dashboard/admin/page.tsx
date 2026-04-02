"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, BarChart3, Search, Filter, Download, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function HeadAdminDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">I</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Insight Institute</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Global Administration</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search schools..." 
              className="glass-input pl-10 pr-4 py-2 rounded-xl text-sm w-64"
            />
          </div>
          <button className="glass-card p-2 rounded-xl text-gray-400 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-semibold">Head Admin</p>
              <p className="text-[10px] text-blue-400 font-bold uppercase">Superuser</p>
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-full border border-white/10" />
          </div>
        </div>
      </nav>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Schools", value: "24", icon: Users, color: "text-blue-400" },
          { label: "Active Chapters", value: "142", icon: BookOpen, color: "text-purple-400" },
          { label: "Total Attendance", value: "12,402", icon: BarChart3, color: "text-emerald-400" },
          { label: "Avg. Progress", value: "84%", icon: ArrowUpRight, color: "text-orange-400" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl group hover:border-white/20 transition-all cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Global Spreadsheet View */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-[32px] overflow-hidden"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div>
            <h2 className="text-xl font-bold">Global Progress Monitor</h2>
            <p className="text-sm text-gray-500">Real-time data from all registered schools</p>
          </div>
          <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-200 transition-colors">
            <Download size={18} />
            <span>Export Data</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] border-b border-white/5">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">School Name</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Attendance</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Chapter</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pages Covered</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {[
                { school: "Greenwood High", date: "Oct 12, 2023", att: "45", ch: "Ch 4", pg: "32-40", status: "Verified" },
                { school: "St. Mary's Academy", date: "Oct 12, 2023", att: "22", ch: "Ch 5", pg: "112-120", status: "Verified" },
                { school: "Elite International", date: "Oct 11, 2023", att: "89", ch: "Ch 2", pg: "12-25", status: "Pending" },
                { school: "City Public School", date: "Oct 11, 2023", att: "34", ch: "Ch 7", pg: "190-205", status: "Verified" },
                { school: "Lakeside Secondary", date: "Oct 10, 2023", att: "56", ch: "Ch 3", pg: "45-60", status: "Verified" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-semibold text-sm">{row.school}</span>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-400">{row.date}</td>
                  <td className="px-8 py-6 text-sm font-medium">{row.att}</td>
                  <td className="px-8 py-6 text-sm">{row.ch}</td>
                  <td className="px-8 py-6 text-sm font-mono text-blue-400">{row.pg}</td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                      row.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'
                    }`}>
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
