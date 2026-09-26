import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Users, FileText, Database, Trash2, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [file, setFile] = useState(null);
  const [resourceForm, setResourceForm] = useState({ title: '', category: '', type: 'pdf' });
  const [resources, setResources] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchResources();
    if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchResources = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/resources');
      setResources(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      const { data } = await axios.get('http://localhost:5001/api/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResourceUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', resourceForm.title);
    formData.append('category', resourceForm.category);
    formData.append('type', resourceForm.type);
    if (file) formData.append('resource', file);

    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      await axios.post('http://localhost:5001/api/resources', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Resource uploaded');
      fetchResources();
      setResourceForm({ title: '', category: '', type: 'pdf' });
      setFile(null);
    } catch (error) {
      toast.error('Failed to upload');
    }
  };

  const deleteResource = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      await axios.delete(`http://localhost:5001/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Resource deleted');
      fetchResources();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const deleteMessage = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
      await axios.delete(`http://localhost:5001/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Message deleted');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <div className="flex-grow flex p-4 gap-6 max-w-7xl mx-auto w-full">
      {/* Sidebar */}
      <div className="w-64 glass rounded-2xl p-6 flex flex-col gap-2 h-fit sticky top-24">
        <h2 className="text-xl font-bold mb-6 text-gradient">Admin Panel</h2>
        <button onClick={() => setActiveTab('overview')} className={`text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${activeTab === 'overview' ? 'bg-blue-500/20 text-blue-400 font-medium' : 'hover:bg-white/5 text-slate-400'}`}>
          <Database size={18} /> Overview
        </button>
        <button onClick={() => setActiveTab('resources')} className={`text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${activeTab === 'resources' ? 'bg-blue-500/20 text-blue-400 font-medium' : 'hover:bg-white/5 text-slate-400'}`}>
          <UploadCloud size={18} /> Resources
        </button>
        <button onClick={() => setActiveTab('messages')} className={`text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${activeTab === 'messages' ? 'bg-blue-500/20 text-blue-400 font-medium' : 'hover:bg-white/5 text-slate-400'}`}>
          <MessageSquare size={18} /> Messages
        </button>
      </div>

      {/* Content */}
      <div className="flex-grow">
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center"><Users /></div>
              <div>
                <p className="text-slate-400 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold">1,245</h3>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center"><FileText /></div>
              <div>
                <p className="text-slate-400 text-sm">Resumes Analyzed</p>
                <h3 className="text-2xl font-bold">8,432</h3>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><Database /></div>
              <div>
                <p className="text-slate-400 text-sm">Resources</p>
                <h3 className="text-2xl font-bold">{resources.length}</h3>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'resources' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Upload New Resource</h3>
              <form onSubmit={handleResourceUpload} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="text" placeholder="Title" value={resourceForm.title} onChange={e => setResourceForm({...resourceForm, title: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
                <input required type="text" placeholder="Category" value={resourceForm.category} onChange={e => setResourceForm({...resourceForm, category: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white" />
                <select value={resourceForm.type} onChange={e => setResourceForm({...resourceForm, type: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg p-3 text-white [&>option]:bg-slate-900">
                  <option value="pdf">PDF</option>
                  <option value="image">Image</option>
                  <option value="link">Link</option>
                </select>
                <input type="file" onChange={e => setFile(e.target.files[0])} className="bg-white/5 border border-white/10 rounded-lg p-2 text-white" />
                <button type="submit" className="md:col-span-2 py-3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg font-medium">Upload Resource</button>
              </form>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Manage Resources</h3>
              <div className="space-y-3">
                {resources.map((res) => (
                  <div key={res._id} className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                    <div>
                      <p className="font-medium">{res.title}</p>
                      <p className="text-xs text-slate-400">{res.category} • {res.type.toUpperCase()}</p>
                    </div>
                    <button onClick={() => deleteResource(res._id)} className="text-red-400 hover:bg-red-400/20 p-2 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><MessageSquare /> Contact Messages</h3>
              <div className="space-y-4">
                {messages.length === 0 ? <p className="text-slate-400">No messages yet.</p> : messages.map((msg) => (
                  <div key={msg._id} className="bg-white/5 p-6 rounded-xl relative">
                    <button onClick={() => deleteMessage(msg._id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <div className="flex gap-4 items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                        {msg.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{msg.subject}</h4>
                        <p className="text-sm text-slate-400">From: {msg.name} ({msg.email})</p>
                        <p className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 bg-black/20 p-4 rounded-lg">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
