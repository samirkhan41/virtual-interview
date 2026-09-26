import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Heart, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/50 backdrop-blur-md pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              FA
            </div>
            <span className="text-xl font-bold tracking-tight text-white">ai-coach</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Empowering tech professionals with enterprise-grade AI tools to analyze resumes, build portfolios, and ace interviews.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
              <Globe size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/resume" className="hover:text-blue-400 transition-colors">Resume Analyzer</Link></li>
            <li><Link to="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio Generator</Link></li>
            <li><Link to="/roadmap" className="hover:text-blue-400 transition-colors">Career Roadmaps</Link></li>
            <li><Link to="/interview" className="hover:text-blue-400 transition-colors">AI Interview Room</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-400" />
              hello@ai-coach.com
            </li>
            <li className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              All systems operational
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} ai-coach. All rights reserved.
        </p>
        <p className="text-sm text-slate-500 flex items-center gap-1">
          Built with <Heart size={14} className="text-red-500" /> by Ronit Sinha
        </p>
      </div>
    </footer>
  );
};

export default Footer;
