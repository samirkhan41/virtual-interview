import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, FileText, Map, Briefcase, ChevronRight } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Landing = () => {
  const { user } = useContext(AuthContext);

  const features = [
    { icon: <FileText size={24} />, title: 'Resume Analyzer', desc: 'Get instant ATS scoring and AI-driven feedback.', link: '/resume' },
    { icon: <Briefcase size={24} />, title: 'Portfolio Generator', desc: 'Generate professional portfolios in seconds.', link: '/portfolio' },
    { icon: <Map size={24} />, title: 'Career Roadmap', desc: 'Step-by-step guides for tech careers.', link: '/roadmap' },
    { icon: <Bot size={24} />, title: 'AI Interview', desc: 'Practice with a real-time conversational AI.', link: '/interview' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } }
  };

  return (
    <motion.div 
      className="flex-grow flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-20 text-center relative">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
            Supercharge Your <br/>
            <span className="text-gradient">Career with AI</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The all-in-one futuristic platform for tech professionals. Analyze resumes, generate portfolios, map your career, and practice interviews with AI.
          </motion.p>
          <motion.div variants={itemVariants} className="flex gap-4 justify-center">
            {user ? (
              <Link to="/interview" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-full font-medium text-lg hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center gap-2">
                Practice Interview <ChevronRight size={20} />
              </Link>
            ) : (
              <>
                <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-full font-medium text-lg hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center gap-2">
                  Get Started <ChevronRight size={20} />
                </Link>
                <Link to="/login" className="px-8 py-4 glass text-white rounded-full font-medium text-lg hover:bg-white/10 hover:-translate-y-1 transition-all">
                  Log In
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl mx-auto px-4 py-20 border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <motion.div key={idx} variants={itemVariants} whileHover={{ y: -5 }}>
              <Link to={feat.link} className="block h-full glass p-8 rounded-3xl hover:bg-white/10 border border-white/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-inner shadow-blue-500/20">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Landing;
