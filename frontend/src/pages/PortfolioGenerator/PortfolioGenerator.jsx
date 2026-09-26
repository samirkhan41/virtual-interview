import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, Copy, Plus, Trash2, Code, Monitor, Globe, Link as LinkIcon, Mail, Briefcase, GraduationCap, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-toastify';

const themes = {
  blue: { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-400', shadow: 'shadow-blue-500/20' },
  emerald: { bg: 'from-emerald-500 to-teal-500', text: 'text-emerald-400', shadow: 'shadow-emerald-500/20' },
  violet: { bg: 'from-violet-500 to-fuchsia-500', text: 'text-violet-400', shadow: 'shadow-violet-500/20' },
  rose: { bg: 'from-rose-500 to-orange-500', text: 'text-rose-400', shadow: 'shadow-rose-500/20' },
};

const PortfolioGenerator = () => {
  const [formData, setFormData] = useState({
    name: 'Ronit Sinha',
    role: 'Full Stack Developer',
    email: 'ronit@example.com',
    github: 'https://github.com/ronitsinha',
    linkedin: 'https://linkedin.com/in/ronitsinha',
    avatar: '',
    theme: 'blue',
    bio: 'Passionate about building scalable web applications and AI tools.',
    skills: 'React, Node.js, MongoDB, Next.js, TailwindCSS',
    experience: [
      { company: 'TechNova Inc.', role: 'Senior Developer', duration: '2021 - Present', desc: 'Led the frontend team in building a high-performance analytics dashboard.' }
    ],
    education: [
      { school: 'State University', degree: 'B.S. Computer Science', year: '2020' }
    ],
    projects: [
      { name: 'ai-coach Platform', description: 'A futuristic AI-powered platform for developers.' }
    ]
  });

  const [viewMode, setViewMode] = useState('preview');

  const addField = (field, defaultObj) => {
    setFormData({ ...formData, [field]: [...formData[field], defaultObj] });
  };

  const removeField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const updateField = (field, index, key, value) => {
    const newArray = [...formData[field]];
    newArray[index][key] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const t = themes[formData.theme];

  const generateHTML = () => {
    const skillsArray = formData.skills.split(',').filter(s => s.trim());
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.name} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-slate-900 text-white min-h-screen flex flex-col items-center py-20 px-4 font-sans">
  ${formData.avatar ? `<img src="${formData.avatar}" alt="${formData.name}" class="w-32 h-32 rounded-full object-cover mb-6 border-4 border-white/10 shadow-xl ${t.shadow}" />` : `<div class="w-32 h-32 rounded-full bg-gradient-to-br ${t.bg} flex items-center justify-center text-5xl font-bold mb-6 shadow-xl ${t.shadow}">${formData.name.charAt(0)}</div>`}
  <h1 class="text-5xl font-bold mb-2 text-center">${formData.name}</h1>
  <h2 class="text-2xl ${t.text} mb-6 text-center">${formData.role}</h2>
  <p class="text-slate-400 max-w-lg text-center mb-8 leading-relaxed">${formData.bio}</p>
  
  <div class="flex gap-4 mb-10">
    ${formData.github ? `<a href="${formData.github}" target="_blank" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><i class="fa-brands fa-github text-xl"></i></a>` : ''}
    ${formData.linkedin ? `<a href="${formData.linkedin}" target="_blank" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><i class="fa-brands fa-linkedin text-xl"></i></a>` : ''}
    ${formData.email ? `<a href="mailto:${formData.email}" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><i class="fa-solid fa-envelope text-xl"></i></a>` : ''}
  </div>

  <div class="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl">
    ${skillsArray.map(s => `<span class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:border-white/20 transition-colors">${s.trim()}</span>`).join('\n    ')}
  </div>

  <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    ${formData.experience.length > 0 ? `
    <div>
      <h3 class="text-2xl font-bold mb-6 border-b border-white/10 pb-3"><i class="fa-solid fa-briefcase ${t.text} mr-2"></i> Experience</h3>
      <div class="space-y-6">
        ${formData.experience.filter(e => e.company).map(e => `
        <div class="relative pl-6 border-l-2 border-white/10">
          <div class="absolute w-3 h-3 bg-slate-900 border-2 border-white/20 rounded-full -left-[7px] top-1.5"></div>
          <h4 class="font-bold text-lg">${e.role}</h4>
          <div class="text-sm ${t.text} mb-2">${e.company} <span class="text-slate-500 ml-2">${e.duration}</span></div>
          <p class="text-slate-400 text-sm leading-relaxed">${e.desc}</p>
        </div>`).join('')}
      </div>
    </div>` : ''}

    ${formData.education.length > 0 ? `
    <div>
      <h3 class="text-2xl font-bold mb-6 border-b border-white/10 pb-3"><i class="fa-solid fa-graduation-cap ${t.text} mr-2"></i> Education</h3>
      <div class="space-y-6">
        ${formData.education.filter(e => e.school).map(e => `
        <div class="relative pl-6 border-l-2 border-white/10">
          <div class="absolute w-3 h-3 bg-slate-900 border-2 border-white/20 rounded-full -left-[7px] top-1.5"></div>
          <h4 class="font-bold text-lg">${e.degree}</h4>
          <div class="text-sm ${t.text} mb-2">${e.school}</div>
          <p class="text-slate-500 text-sm">${e.year}</p>
        </div>`).join('')}
      </div>
    </div>` : ''}
  </div>

  ${formData.projects.length > 0 ? `
  <div class="w-full max-w-3xl">
    <h3 class="text-2xl font-bold mb-6 border-b border-white/10 pb-3 text-center">Featured Projects</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${formData.projects.filter(p => p.name || p.description).map(p => `
      <div class="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
        <h4 class="font-bold text-xl mb-2">${p.name}</h4>
        <p class="text-slate-400 text-sm leading-relaxed">${p.description}</p>
      </div>`).join('')}
    </div>
  </div>` : ''}
</body>
</html>`;
  };

  const generateReact = () => {
    const skillsArray = formData.skills.split(',').filter(s => s.trim());
    return `import React from 'react';
import { Globe, Link as LinkIcon, Mail, Briefcase, GraduationCap } from 'lucide-react';

const Portfolio = () => {
  const data = ${JSON.stringify({ ...formData, skills: skillsArray }, null, 2)};

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center py-20 px-4 font-sans">
      {data.avatar ? (
        <img src={data.avatar} alt={data.name} className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-white/10 shadow-xl ${t.shadow}" />
      ) : (
        <div className="w-32 h-32 rounded-full bg-gradient-to-br ${t.bg} flex items-center justify-center text-5xl font-bold mb-6 shadow-xl ${t.shadow}">
          {data.name.charAt(0)}
        </div>
      )}
      <h1 className="text-5xl font-bold mb-2 text-center">{data.name}</h1>
      <h2 className="text-2xl ${t.text} mb-6 text-center">{data.role}</h2>
      <p className="text-slate-400 max-w-lg text-center mb-8 leading-relaxed">{data.bio}</p>
      
      <div className="flex gap-4 mb-10">
        {data.github && <a href={data.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Globe size={20} /></a>}
        {data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><LinkIcon size={20} /></a>}
        {data.email && <a href={\`mailto:\${data.email}\`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Mail size={20} /></a>}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl">
        {data.skills.map((skill, i) => (
          <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:border-white/20 transition-colors">{skill}</span>
        ))}
      </div>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {data.experience.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-3 flex items-center gap-2"><Briefcase className="${t.text}"/> Experience</h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute w-3 h-3 bg-slate-900 border-2 border-white/20 rounded-full -left-[7px] top-1.5"></div>
                  <h4 className="font-bold text-lg">{exp.role}</h4>
                  <div className="text-sm ${t.text} mb-2">{exp.company} <span className="text-slate-500 ml-2">{exp.duration}</span></div>
                  <p className="text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-3 flex items-center gap-2"><GraduationCap className="${t.text}"/> Education</h3>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-white/10">
                  <div className="absolute w-3 h-3 bg-slate-900 border-2 border-white/20 rounded-full -left-[7px] top-1.5"></div>
                  <h4 className="font-bold text-lg">{edu.degree}</h4>
                  <div className="text-sm ${t.text} mb-2">{edu.school}</div>
                  <p className="text-slate-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {data.projects.length > 0 && (
        <div className="w-full max-w-3xl">
          <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-3 text-center">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.projects.map((proj, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                <h4 className="font-bold text-xl mb-2">{proj.name}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;`;
  };

  const copyCode = (codeType) => {
    const code = codeType === 'html' ? generateHTML() : generateReact();
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="flex-grow p-8 max-w-[1500px] mx-auto w-full grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Editor */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass p-8 rounded-3xl overflow-y-auto max-h-[85vh] custom-scrollbar">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <LayoutTemplate className="text-blue-400" /> Portfolio Builder
        </h2>
        
        <div className="space-y-8">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"/>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Role / Headline</label>
                <input type="text" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"/>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1"><ImageIcon size={14}/> Avatar Image URL</label>
                <input type="url" placeholder="https://..." value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"/>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Theme Color</label>
                <div className="flex gap-3 mt-1">
                  {Object.keys(themes).map(themeKey => (
                    <button
                      key={themeKey}
                      onClick={() => setFormData({...formData, theme: themeKey})}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${themes[themeKey].bg} ${formData.theme === themeKey ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110' : 'opacity-50 hover:opacity-100'} transition-all`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1"><Mail size={14}/> Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"/>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1"><Globe size={14}/> GitHub URL</label>
                <input type="url" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"/>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1 flex items-center gap-1"><LinkIcon size={14}/> LinkedIn URL</label>
                <input type="url" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"/>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-1">Top Skills (comma separated)</label>
              <input type="text" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"/>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Short Bio</label>
              <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none h-24 transition-all"></textarea>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2 flex justify-between items-center">
              Experience
              <button onClick={() => addField('experience', { company: '', role: '', duration: '', desc: '' })} className="text-sm px-3 py-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg flex items-center gap-1 transition-all"><Plus size={14}/> Add</button>
            </h3>
            <div className="space-y-4">
              {formData.experience.map((exp, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl relative group border border-white/5 hover:border-white/10 transition-colors">
                  <button onClick={() => removeField('experience', idx)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateField('experience', idx, 'company', e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 outline-none font-bold"/>
                    <input type="text" placeholder="Role" value={exp.role} onChange={(e) => updateField('experience', idx, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 outline-none"/>
                  </div>
                  <input type="text" placeholder="Duration (e.g. 2021 - Present)" value={exp.duration} onChange={(e) => updateField('experience', idx, 'duration', e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 mb-3 outline-none text-sm"/>
                  <textarea placeholder="Description" value={exp.desc} onChange={(e) => updateField('experience', idx, 'desc', e.target.value)} className="w-full bg-transparent outline-none h-12 text-sm text-slate-400"></textarea>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2 flex justify-between items-center">
              Education
              <button onClick={() => addField('education', { school: '', degree: '', year: '' })} className="text-sm px-3 py-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg flex items-center gap-1 transition-all"><Plus size={14}/> Add</button>
            </h3>
            <div className="space-y-4">
              {formData.education.map((edu, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl relative group border border-white/5 hover:border-white/10 transition-colors">
                  <button onClick={() => removeField('education', idx)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <input type="text" placeholder="Institution" value={edu.school} onChange={(e) => updateField('education', idx, 'school', e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 outline-none font-bold"/>
                    <input type="text" placeholder="Degree/Certificate" value={edu.degree} onChange={(e) => updateField('education', idx, 'degree', e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 outline-none"/>
                  </div>
                  <input type="text" placeholder="Year" value={edu.year} onChange={(e) => updateField('education', idx, 'year', e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 outline-none text-sm"/>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2 flex justify-between items-center">
              Projects
              <button onClick={() => addField('projects', { name: '', description: '' })} className="text-sm px-3 py-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg flex items-center gap-1 transition-all"><Plus size={14}/> Add</button>
            </h3>
            <div className="space-y-4">
              {formData.projects.map((proj, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl relative group border border-white/5 hover:border-white/10 transition-colors">
                  <button onClick={() => removeField('projects', idx)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                  <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => updateField('projects', idx, 'name', e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-1 mb-3 outline-none font-bold text-lg"/>
                  <textarea placeholder="Short Description" value={proj.description} onChange={(e) => updateField('projects', idx, 'description', e.target.value)} className="w-full bg-transparent outline-none h-16 text-sm text-slate-400"></textarea>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Output Panel */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass p-2 rounded-3xl flex flex-col h-[85vh]">
        <div className="flex p-2 gap-2">
          <button onClick={() => setViewMode('preview')} className={`flex-1 py-3 rounded-2xl text-sm font-bold flex justify-center items-center gap-2 transition-all ${viewMode === 'preview' ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <Monitor size={18} /> Live Preview
          </button>
          <button onClick={() => setViewMode('html')} className={`flex-1 py-3 rounded-2xl text-sm font-bold flex justify-center items-center gap-2 transition-all ${viewMode === 'html' ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <Code size={18} /> HTML / Tailwind
          </button>
          <button onClick={() => setViewMode('react')} className={`flex-1 py-3 rounded-2xl text-sm font-bold flex justify-center items-center gap-2 transition-all ${viewMode === 'react' ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
            <LayoutTemplate size={18} /> React Component
          </button>
        </div>

        <div className="bg-slate-950 rounded-2xl flex-grow overflow-hidden relative m-2 border border-white/5">
          <AnimatePresence mode="wait">
            {viewMode === 'preview' && (
              <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 p-8 overflow-y-auto custom-scrollbar flex flex-col items-center">
                
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Avatar" className={`w-32 h-32 rounded-full object-cover mb-6 border-4 border-white/10 shadow-xl ${t.shadow} transition-all duration-500`} />
                ) : (
                  <div className={`w-32 h-32 shrink-0 rounded-full bg-gradient-to-br ${t.bg} mb-6 flex items-center justify-center text-5xl font-bold shadow-xl ${t.shadow} transition-all duration-500`}>
                    {formData.name.charAt(0) || 'U'}
                  </div>
                )}
                
                <h1 className="text-5xl font-bold mb-2 text-center">{formData.name}</h1>
                <h2 className={`text-2xl ${t.text} mb-6 text-center transition-colors duration-500`}>{formData.role}</h2>
                <p className="text-slate-400 max-w-lg mb-8 text-center leading-relaxed">{formData.bio}</p>
                
                <div className="flex gap-4 mb-10">
                  {formData.github && <a href={formData.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Globe size={20} /></a>}
                  {formData.linkedin && <a href={formData.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><LinkIcon size={20} /></a>}
                  {formData.email && <a href={`mailto:${formData.email}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Mail size={20} /></a>}
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl">
                  {formData.skills.split(',').filter(s => s.trim()).map((s, i) => (
                    <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 hover:border-white/20 transition-colors rounded-full text-sm font-medium">{s.trim()}</span>
                  ))}
                </div>

                <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {formData.experience.filter(e => e.company).length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-3 flex items-center gap-2"><Briefcase className={t.text}/> Experience</h3>
                      <div className="space-y-6">
                        {formData.experience.filter(e => e.company).map((exp, idx) => (
                          <div key={idx} className="relative pl-6 border-l-2 border-white/10">
                            <div className="absolute w-3 h-3 bg-slate-900 border-2 border-white/20 rounded-full -left-[7px] top-1.5"></div>
                            <h4 className="font-bold text-lg">{exp.role}</h4>
                            <div className={`text-sm ${t.text} mb-2`}>{exp.company} <span className="text-slate-500 ml-2">{exp.duration}</span></div>
                            <p className="text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.education.filter(e => e.school).length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-3 flex items-center gap-2"><GraduationCap className={t.text}/> Education</h3>
                      <div className="space-y-6">
                        {formData.education.filter(e => e.school).map((edu, idx) => (
                          <div key={idx} className="relative pl-6 border-l-2 border-white/10">
                            <div className="absolute w-3 h-3 bg-slate-900 border-2 border-white/20 rounded-full -left-[7px] top-1.5"></div>
                            <h4 className="font-bold text-lg">{edu.degree}</h4>
                            <div className={`text-sm ${t.text} mb-2`}>{edu.school}</div>
                            <p className="text-slate-500 text-sm">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {formData.projects.filter(p => p.name).length > 0 && (
                  <div className="w-full max-w-3xl">
                    <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-3 text-center">Featured Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.projects.filter(p => p.name).map((proj, idx) => (
                        <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-colors">
                          <h4 className="font-bold text-xl mb-2">{proj.name}</h4>
                          <p className="text-slate-400 leading-relaxed text-sm">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {viewMode === 'html' && (
              <motion.div key="html" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col">
                <div className="flex justify-between items-center px-4 py-3 bg-slate-900 border-b border-white/10">
                  <span className="text-sm font-mono text-slate-400">index.html</span>
                  <button onClick={() => copyCode('html')} className="text-xs font-bold flex items-center gap-1 text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/30 transition-colors px-3 py-1.5 rounded-lg"><Copy size={14}/> Copy HTML</button>
                </div>
                <pre className="p-4 overflow-y-auto text-sm text-green-400 font-mono flex-grow custom-scrollbar">
                  <code>{generateHTML()}</code>
                </pre>
              </motion.div>
            )}

            {viewMode === 'react' && (
              <motion.div key="react" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col">
                <div className="flex justify-between items-center px-4 py-3 bg-slate-900 border-b border-white/10">
                  <span className="text-sm font-mono text-slate-400">Portfolio.jsx</span>
                  <button onClick={() => copyCode('react')} className="text-xs font-bold flex items-center gap-1 text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/30 transition-colors px-3 py-1.5 rounded-lg"><Copy size={14}/> Copy Component</button>
                </div>
                <pre className="p-4 overflow-y-auto text-sm text-cyan-400 font-mono flex-grow custom-scrollbar">
                  <code>{generateReact()}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioGenerator;
