import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Save, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { data } = await axios.put('http://localhost:5001/api/auth/profile', 
        { name, password: password || undefined }, 
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully!');
      setPassword('');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex-grow p-4 flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass w-full max-w-xl rounded-3xl overflow-hidden relative">
        <div className="h-32 bg-gradient-to-br from-blue-500/30 to-violet-500/30 relative">
           <div className="absolute -bottom-10 left-8 w-20 h-20 rounded-xl bg-slate-800 border-4 border-slate-950 flex items-center justify-center text-3xl font-bold text-blue-400">
             {user?.name?.charAt(0)?.toUpperCase()}
           </div>
        </div>
        
        <div className="p-8 pt-16">
          <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
          <p className="text-slate-400 text-sm mb-8">{user?.email} • {user?.role === 'admin' ? 'Administrator' : 'Standard User'}</p>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-2 flex items-center gap-2"><User size={16}/> Full Name</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2 flex items-center gap-2"><Lock size={16}/> New Password (Optional)</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Leave blank to keep current" />
            </div>
            
            <div className="flex gap-4 pt-4 border-t border-white/10">
              <button disabled={isUpdating} type="submit" className="flex-1 py-3 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition-colors flex justify-center items-center gap-2 disabled:opacity-50">
                <Save size={18} /> {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={handleLogout} className="px-6 py-3 bg-red-500/10 text-red-400 rounded-lg font-medium hover:bg-red-500/20 transition-colors flex justify-center items-center gap-2">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
