import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, CheckCircle2, Circle } from 'lucide-react';

const CareerRoadmap = () => {
  const [expanded, setExpanded] = useState(null);
  const [progress, setProgress] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const roadmaps = [
    { id: 1, title: 'Frontend Developer', desc: 'Master UI/UX, React, and modern web frameworks.', icon: '🌐', color: 'from-blue-500 to-cyan-400',
      skills: ['Internet Fundamentals', 'HTML5 & Semantic UI', 'CSS3, Flexbox & Grid', 'JavaScript (ES6+)', 'React.js & Hooks', 'State Management (Redux/Zustand)', 'Tailwind CSS & Styling', 'Next.js & SSR', 'TypeScript Basics', 'Version Control (Git/GitHub)', 'Web Accessibility (a11y)', 'Testing (Jest/Cypress)'] },
    { id: 2, title: 'Backend Developer', desc: 'Build scalable APIs with Node.js, Python, or Go.', icon: '⚙️', color: 'from-green-500 to-emerald-400',
      skills: ['Internet & OS Basics', 'Node.js & Express', 'RESTful API Design', 'Relational Databases (PostgreSQL)', 'NoSQL Databases (MongoDB)', 'Authentication (JWT/OAuth)', 'Caching (Redis)', 'Message Brokers (RabbitMQ/Kafka)', 'WebSockets & Real-time Comm', 'Docker & Containerization', 'CI/CD Pipelines', 'System Design Basics'] },
    { id: 3, title: 'Full Stack Developer', desc: 'Bridge the gap between frontend and backend systems.', icon: '⚡', color: 'from-pink-500 to-rose-400',
      skills: ['HTML/CSS/JS Mastery', 'React & Next.js', 'Node.js Backend', 'Database Management', 'API Integration', 'Authentication Flows', 'DevOps Basics', 'Cloud Deployment (AWS/Vercel)', 'Agile Methodologies', 'Performance Optimization'] },
    { id: 4, title: 'AI Engineer', desc: 'Dive into Machine Learning, LLMs, and Python.', icon: '🤖', color: 'from-violet-500 to-fuchsia-500',
      skills: ['Python Programming', 'Linear Algebra & Calculus', 'Data Processing (Pandas)', 'Machine Learning Basics', 'Deep Learning (PyTorch/TensorFlow)', 'Neural Networks & CNNs', 'NLP Fundamentals', 'Transformer Models', 'LLMs & Prompt Engineering', 'LangChain & Vector DBs', 'Model Deployment (FastAPI)'] },
    { id: 5, title: 'Data Scientist', desc: 'Analyze complex data and build predictive models.', icon: '📊', color: 'from-orange-500 to-amber-400',
      skills: ['Statistics & Math', 'Python Programming', 'Data Manipulation (Pandas)', 'Data Visualization (Matplotlib/Seaborn)', 'Exploratory Data Analysis', 'Predictive Modeling', 'SQL & Data Warehousing', 'A/B Testing', 'Big Data (Spark/Hadoop)', 'Storytelling with Data'] },
    { id: 6, title: 'DevOps Engineer', desc: 'Streamline development and automate deployments.', icon: '☁️', color: 'from-indigo-500 to-blue-600',
      skills: ['Linux & Bash Scripting', 'Networking Protocols', 'Git & GitHub Actions', 'Containerization (Docker)', 'Orchestration (Kubernetes)', 'CI/CD (Jenkins/GitLab)', 'Infrastructure as Code (Terraform)', 'Cloud Platforms (AWS/GCP/Azure)', 'Monitoring (Prometheus/Grafana)', 'Security & Compliance'] },
  ];

  const toggleSkill = (roadmapId, skillIdx) => {
    const key = `${roadmapId}-${skillIdx}`;
    setProgress(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getProgressPercent = (roadmap) => {
    const total = roadmap.skills.length;
    const completed = roadmap.skills.filter((_, idx) => progress[`${roadmap.id}-${idx}`]).length;
    return Math.round((completed / total) * 100);
  };

  const filteredRoadmaps = roadmaps.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-grow p-8 max-w-7xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">Career <span className="text-gradient">Roadmaps</span></h2>
          <p className="text-slate-400">Step-by-step guides to mastering your dream tech career.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search careers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredRoadmaps.map((r, i) => (
            <motion.div 
              key={r.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className={`glass rounded-2xl overflow-hidden transition-all cursor-pointer border border-white/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 group ${expanded === r.id ? 'lg:col-span-2' : ''}`}
              onClick={() => setExpanded(expanded === r.id ? null : r.id)}
            >
              <div className={`h-2 bg-gradient-to-r ${r.color}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{r.icon}</div>
                  <div className="text-xs font-bold text-slate-400 bg-white/5 px-2 py-1 rounded">{getProgressPercent(r)}% Done</div>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{r.title}</h3>
                <p className="text-sm text-slate-400 mb-6">{r.desc}</p>
                
                <AnimatePresence>
                  {expanded === r.id ? (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-sm">Skills to Master:</h4>
                        <div className="w-1/2 bg-white/10 rounded-full h-2">
                          <div className={`bg-gradient-to-r ${r.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${getProgressPercent(r)}%` }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {r.skills.map((skill, idx) => {
                          const isDone = progress[`${r.id}-${idx}`];
                          return (
                            <div 
                              key={idx} 
                              onClick={(e) => { e.stopPropagation(); toggleSkill(r.id, idx); }}
                              className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors border border-transparent ${isDone ? 'opacity-50' : 'hover:border-white/10'}`}
                            >
                              {isDone ? <CheckCircle2 className="text-green-400 shrink-0" size={18} /> : <Circle className="text-slate-500 shrink-0" size={18} />}
                              <span className={`text-sm font-medium ${isDone ? 'line-through text-slate-500' : 'text-slate-300'}`}>{skill}</span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center text-sm font-medium text-blue-400">
                      View Roadmap <ChevronDown className="ml-1" size={16} />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
          {filteredRoadmaps.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-500">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">No roadmaps found</h3>
              <p className="text-slate-400">Try searching for another role.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CareerRoadmap;
