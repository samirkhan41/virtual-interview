import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Star, Activity, BookOpen, RefreshCw, Briefcase } from 'lucide-react';
import axios from 'axios';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(null);

  const scanSteps = [
    "Extracting text from document...",
    "Analyzing keywords and syntax...",
    "Cross-referencing with Job Description...",
    "Evaluating ATS compatibility...",
    "Scoring impact and readability...",
    "Finalizing AI report..."
  ];

  useEffect(() => {
    let interval;
    if (isUploading) {
      interval = setInterval(() => {
        setScanStep((prev) => {
          if (prev < scanSteps.length - 1) return prev + 1;
          return prev;
        });
      }, 1000);
    } else {
      setScanStep(0);
    }
    return () => clearInterval(interval);
  }, [isUploading]);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('resume', file);
    if (jobDescription) {
      formData.append('jobDescription', jobDescription);
    }

    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      const { data } = await axios.post('http://localhost:5001/api/resumes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      // Simulate slight delay for the AI scanning effect to finish
      setTimeout(() => {
        setResult(data);
        setIsUploading(false);
      }, 6500);
    } catch (error) {
      console.error(error);
      alert('Upload failed');
      setIsUploading(false);
    }
  };

  const CircularProgress = ({ value, label, color }) => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 flex items-center justify-center mb-2">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="64" cy="64" r="56" className="stroke-slate-800" strokeWidth="12" fill="none" />
          <motion.circle 
            initial={{ strokeDasharray: "0 1000" }}
            animate={{ strokeDasharray: `${(value / 100) * 351.8} 1000` }}
            transition={{ duration: 2, ease: "easeOut" }}
            cx="64" cy="64" r="56" 
            className={`stroke-${color}-500`} 
            strokeWidth="12" fill="none" strokeLinecap="round" 
          />
        </svg>
        <div className="absolute text-3xl font-bold">{value}</div>
      </div>
      <span className="text-slate-400 font-medium text-sm">{label}</span>
    </div>
  );

  return (
    <div className="flex-grow flex flex-col items-center p-8 max-w-6xl mx-auto w-full">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Resume <span className="text-gradient">Analyzer</span></h2>
          <p className="text-slate-400">Upload your resume and optionally paste a Job Description to get an ultra-detailed ATS score and AI-driven feedback.</p>
        </div>

        <AnimatePresence mode="wait">
          {!isUploading && !result && (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className={`glass border-2 border-dashed ${file ? 'border-green-500/50 bg-green-500/5' : 'border-blue-500/30 hover:bg-white/5'} rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all h-[400px]`}
                onClick={() => document.getElementById('resume-upload').click()}
              >
                {file ? (
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center">
                    <CheckCircle size={64} className="text-green-400 mb-4" />
                    <p className="text-2xl font-bold mb-2 text-white">File Uploaded!</p>
                    <p className="text-slate-400 font-medium truncate max-w-xs">{file.name}</p>
                    <p className="text-slate-500 text-sm mt-2">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </motion.div>
                ) : (
                  <>
                    <UploadCloud size={64} className="text-blue-400 mb-6" />
                    <p className="text-2xl font-bold mb-2 text-center">Drag & Drop Resume</p>
                    <p className="text-slate-500 mb-8 text-center text-sm">Supports PDF, JPG, PNG (Max 10MB)</p>
                    <div className="px-6 py-2.5 bg-white/10 rounded-full font-bold text-white">Browse Files</div>
                  </>
                )}
                <input type="file" id="resume-upload" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files[0])} />
              </div>

              <div className="glass rounded-3xl p-8 flex flex-col h-[400px] border border-white/5">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Briefcase className="text-blue-400"/> Job Description Matcher</h3>
                <p className="text-sm text-slate-400 mb-4">Paste a target job description below to generate a highly specific compatibility score and keyword matching report. (Optional)</p>
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job responsibilities, requirements, and keywords here..."
                  className="w-full flex-grow bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none custom-scrollbar"
                ></textarea>
              </div>

              <div className="md:col-span-2 flex justify-center mt-4">
                <button 
                  onClick={handleUpload} 
                  disabled={!file}
                  className={`px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 ${file ? 'bg-gradient-to-r from-blue-500 to-violet-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 text-white cursor-pointer' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
                >
                  <Activity size={20} /> Analyze Now
                </button>
              </div>
            </motion.div>
          )}

          {isUploading && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="w-full max-w-xl mx-auto glass p-12 rounded-3xl flex flex-col items-center text-center"
            >
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-violet-500/20 border-b-violet-500 animate-spin-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center text-blue-400">
                  <Activity size={40} className="animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">AI Engine Scanning...</h3>
              <p className="text-blue-400 font-medium h-6">{scanSteps[scanStep]}</p>
              
              <div className="w-full h-2 bg-white/10 rounded-full mt-8 overflow-hidden">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                />
              </div>
            </motion.div>
          )}

          {result && !isUploading && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
              className="w-full space-y-6"
            >
              <div className="flex justify-between items-center bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <FileText className="text-blue-400" />
                  <span className="font-medium">{file?.name || result.originalName}</span>
                </div>
                <button onClick={() => { setResult(null); setFile(null); }} className="flex items-center gap-2 text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <RefreshCw size={16} /> Analyze Another
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-8 rounded-3xl flex items-center justify-center">
                  <CircularProgress value={result.atsScore || 0} label="ATS Match Score" color="blue" />
                </div>
                <div className="glass p-8 rounded-3xl flex items-center justify-center">
                  <CircularProgress value={result.readabilityScore || 0} label="Readability Score" color="emerald" />
                </div>
                <div className="glass p-8 rounded-3xl flex items-center justify-center">
                  <CircularProgress value={result.impactScore || 0} label="Impact & Metrics" color="violet" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><CheckCircle className="text-green-400"/> Strengths & Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {result.skills?.map((skill, i) => (
                      <span key={i} className="px-4 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-sm font-medium">{skill}</span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Star className="text-yellow-400"/> Key Suggestions</h3>
                  <ul className="space-y-3 text-slate-300">
                    {result.suggestions?.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                        <span className="text-sm">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass p-8 rounded-3xl border-l-4 border-l-orange-500">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><AlertTriangle className="text-orange-400"/> Missing Keywords</h3>
                  <p className="text-sm text-slate-400 mb-6">Based on standard industry requirements, your resume is missing these highly-searched skills:</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {result.missingSkills?.map((skill, i) => (
                      <span key={i} className="px-4 py-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-sm font-medium flex items-center gap-1">
                         {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-500/20 to-violet-500/20 p-6 rounded-2xl border border-blue-500/20 mt-auto">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><BookOpen className="text-blue-400" size={18} /> Next Steps</h4>
                    <p className="text-sm text-blue-200">Head over to the <strong>Career Roadmaps</strong> section to find learning paths specifically designed to help you acquire these missing skills!</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResumeAnalyzer;
