import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex-grow flex flex-col p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400">Ready for your next interview practice session?</p>
        </div>
        <Link 
          to="/interview" 
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-medium transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 hover:scale-105"
        >
          <Play size={18} fill="currentColor" />
          Start New Interview
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
            <Clock size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">12</h3>
          <p className="text-slate-400 text-sm font-medium">Total Interviews</p>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
            <BarChart3 size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">85%</h3>
          <p className="text-slate-400 text-sm font-medium">Average Score</p>
        </div>
        <div className="glass rounded-2xl p-6 border border-white/5 flex flex-col justify-center items-center text-center border-dashed border-slate-700 hover:border-slate-500 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-4 group-hover:text-white group-hover:bg-slate-700 transition-all">
            <span className="text-2xl">+</span>
          </div>
          <h3 className="text-lg font-medium text-white">Create Custom Scenario</h3>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mb-6">Recent Sessions</h3>
      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-300">Role</th>
              <th className="px-6 py-4 font-medium text-slate-300">Date</th>
              <th className="px-6 py-4 font-medium text-slate-300">Duration</th>
              <th className="px-6 py-4 font-medium text-slate-300">Score</th>
              <th className="px-6 py-4 font-medium text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-400">
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-medium text-white">Frontend Developer</td>
              <td className="px-6 py-4">Today, 2:30 PM</td>
              <td className="px-6 py-4">24 mins</td>
              <td className="px-6 py-4">
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">92%</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">View Feedback</button>
              </td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 font-medium text-white">Full Stack Engineer</td>
              <td className="px-6 py-4">Yesterday</td>
              <td className="px-6 py-4">45 mins</td>
              <td className="px-6 py-4">
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">78%</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">View Feedback</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
