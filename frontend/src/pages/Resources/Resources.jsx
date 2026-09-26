import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Search, PlayCircle, BookOpen } from 'lucide-react';

const resourcesData = {
  'Web Dev': [
    { title: 'React JS Full Course 2023 | Build an App and Master React in 1 Hour', channel: 'JavaScript Mastery', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', duration: '1h 12m' },
    { title: 'Next.js 14 Full Course 2024 | Build and Deploy a Full Stack App', channel: 'JavaScript Mastery', url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk', duration: '5h 15m' },
    { title: 'Tailwind CSS Full Course for Beginners', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=ft30zcMlFao', duration: '3h 10m' },
    { title: 'MERN Stack Tutorial - Build a Complete Web App', channel: 'Net Ninja', url: 'https://www.youtube.com/watch?v=98BzS5Oz5E4', duration: '2h 45m' },
    { title: 'TypeScript Course for Beginners 2024', channel: 'Programming with Mosh', url: 'https://www.youtube.com/watch?v=d56mG7DezGs', duration: '1h 14m' },
    { title: 'HTML & CSS Full Course - Beginner to Pro', channel: 'SuperSimpleDev', url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc', duration: '6h 31m' },
  ],
  'DSA': [
    { title: 'Data Structures and Algorithms for Beginners', channel: 'Programming with Mosh', url: 'https://www.youtube.com/watch?v=BBpAmxU_NQo', duration: '1h 10m' },
    { title: 'Dynamic Programming - Learn to Solve Algorithmic Problems', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk', duration: '5h 10m' },
    { title: 'Graph Algorithms for Technical Interviews', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU', duration: '2h 00m' },
    { title: '100 Days of Code - DSA in Python', channel: 'NeetCode', url: 'https://www.youtube.com/c/NeetCode', duration: 'Playlist' },
    { title: 'Algorithms and Data Structures Tutorial - Full Course', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=8hly31xKli0', duration: '5h 22m' },
  ],
  'AI & ML': [
    { title: 'Neural Networks from Scratch - P.1 Intro and Neuron Code', channel: 'sentdex', url: 'https://www.youtube.com/watch?v=Wo5dCEP_gF8', duration: '15m' },
    { title: 'Let\'s build GPT: from scratch, in code, spelled out', channel: 'Andrej Karpathy', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', duration: '1h 56m' },
    { title: 'Machine Learning for Everybody - Full Course', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=i_LwzRmAizo', duration: '3h 53m' },
    { title: 'LangChain Crash Course: Build a ChatGPT Clone', channel: 'Patrick Loeber', url: 'https://www.youtube.com/watch?v=LbT1qJZsn3Q', duration: '45m' },
    { title: 'Hugging Face NLP Course', channel: 'Hugging Face', url: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4', duration: 'Playlist' },
  ],
  'Data Science': [
    { title: 'Python for Data Science - Course for Beginners', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI', duration: '12h 00m' },
    { title: 'Pandas Data Science Tutorial', channel: 'Keith Galli', url: 'https://www.youtube.com/watch?v=vmEHCJofslg', duration: '1h 20m' },
    { title: 'SQL Tutorial - Full Database Course for Beginners', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', duration: '4h 20m' },
    { title: 'Data Visualization with Matplotlib & Seaborn', channel: 'Corey Schafer', url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTvipOqomVEeZ1HRrcEvtZB_', duration: 'Playlist' },
  ],
  'DevOps': [
    { title: 'Docker Tutorial for Beginners', channel: 'Programming with Mosh', url: 'https://www.youtube.com/watch?v=pTFZFxd4hOI', duration: '1h 12m' },
    { title: 'Kubernetes Tutorial for Beginners', channel: 'TechWorld with Nana', url: 'https://www.youtube.com/watch?v=X48VuDVv0do', duration: '3h 38m' },
    { title: 'Jenkins Tutorial For Beginners', channel: 'Simplilearn', url: 'https://www.youtube.com/watch?v=LFDrDnKPOTg', duration: '1h 51m' },
    { title: 'Terraform Course - Automate your AWS cloud infrastructure', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=7xngnjfIlK4', duration: '2h 20m' },
  ],
  'Cybersecurity': [
    { title: 'Ethical Hacking in 12 Hours - Full Course', channel: 'The Cyber Mentor', url: 'https://www.youtube.com/watch?v=fNzpcB7ODxQ', duration: '11h 55m' },
    { title: 'Network Security Tutorial', channel: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=bPVaOlJ6ln0', duration: '4h 26m' },
    { title: 'CompTIA Security+ Full Course', channel: 'Professor Messer', url: 'https://www.youtube.com/playlist?list=PLG49S3nxzAnkL2ulFS3132mOVKuzzBxA8', duration: 'Playlist' },
  ]
};

const Resources = () => {
  const [activeTab, setActiveTab] = useState('Web Dev');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resourcesData[activeTab].filter(resource => 
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    resource.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="flex-grow p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">Learning <span className="text-gradient">Hub</span></h2>
          <p className="text-slate-400">Curated high-quality video tutorials and resources to level up your skills.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search resources..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
        {Object.keys(resourcesData).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearchTerm(''); }}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20 scale-105' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:scale-105'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((resource, i) => (
            <motion.a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-6 rounded-2xl flex flex-col group hover:-translate-y-1 transition-transform border border-white/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all shadow-lg">
                  <Play size={24} fill="currentColor" />
                </div>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-slate-300 flex items-center gap-1 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-colors">
                  <PlayCircle size={12} /> {resource.duration}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2 leading-tight group-hover:text-blue-400 transition-colors">
                {resource.title}
              </h3>
              <p className="text-slate-400 text-sm mt-auto flex justify-between items-center pt-4">
                {resource.channel}
                <ExternalLink size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
              </p>
            </motion.a>
          ))}
          {filteredResources.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-500">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">No resources found</h3>
              <p className="text-slate-400">Try adjusting your search terms.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Resources;
