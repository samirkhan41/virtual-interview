import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users, Target, Shield, Zap, Heart, Globe, Link, MessageSquare } from 'lucide-react';

const About = () => {
  const values = [
    { icon: <Target size={32} />, title: 'Mission Driven', desc: 'We are on a mission to democratize technical interview preparation.' },
    { icon: <Zap size={32} />, title: 'AI-Powered', desc: 'Leveraging cutting-edge language models to provide real-time, actionable feedback.' },
    { icon: <Users size={32} />, title: 'Community First', desc: 'Built by developers, for developers. We listen to our users.' },
    { icon: <Shield size={32} />, title: 'Data Privacy', desc: 'Your resumes and interview data are completely secure and private.' }
  ];

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 max-w-6xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 max-w-3xl">
        <h1 className="text-5xl font-bold mb-6">About <span className="text-gradient">ai-coach</span></h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          ai-coach was born out of a simple hackathon idea: What if we could use AI to completely eliminate the anxiety of technical interviews and resume screening?
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 w-full">
        {values.map((val, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform border border-white/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-lg">
              {val.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{val.title}</h3>
            <p className="text-slate-400 leading-relaxed">{val.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="w-full">
        <h2 className="text-4xl font-bold mb-10 text-center">Meet the <span className="text-gradient">Creator</span></h2>
        
        <div className="glass p-10 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto hover:border-violet-500/30 transition-colors">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 p-1 shadow-2xl shadow-violet-500/20 shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-6xl font-bold overflow-hidden relative group">
              RS
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold mb-2">Ronit Sinha</h3>
            <h4 className="text-blue-400 font-medium mb-4 text-lg">Full Stack & AI Developer</h4>
            <p className="text-slate-400 mb-6 leading-relaxed">
              I built ai-coach to bridge the gap between talented developers and their dream jobs. The tools available were either too expensive or too basic. I wanted to build something that feels premium, works flawlessly, and is accessible to everyone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all text-slate-400"><Globe /></a>
              <a href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all text-slate-400"><Link /></a>
              <a href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all text-slate-400"><MessageSquare /></a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
