import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, User, LayoutDashboard, Briefcase, FileText, Cpu, Map, Shield, BookOpen, Home, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const NavLink = ({ to, icon: Icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="relative group text-sm font-medium transition-colors flex items-center gap-1">
      <span className={`flex items-center gap-1 transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
        {Icon && <Icon size={16} />} {children}
      </span>
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
  );
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="px-8 py-4 border-b border-white/10 glass flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all">
          AI
        </div>
        <h1 className="text-xl font-bold tracking-tight">ai-<span className="text-gradient">coach</span></h1>
      </Link>
      
      <nav className="hidden md:flex items-center gap-6">
        <NavLink to="/" icon={Home}>Home</NavLink>
        <NavLink to="/resume" icon={FileText}>Analyzer</NavLink>
        <NavLink to="/portfolio" icon={Briefcase}>Portfolio</NavLink>
        <NavLink to="/roadmap" icon={Map}>Roadmap</NavLink>
        <NavLink to="/resources" icon={BookOpen}>Resources</NavLink>
        <NavLink to="/interview" icon={Cpu}>Interview</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about" icon={Info}>About</NavLink>
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            {user.role === 'admin' && (
              <Link to="/admin" className="hidden md:flex items-center gap-2 text-sm font-medium bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-500/30 hover:scale-105 transition-all duration-300">
                <Shield size={14}/> Admin Panel
              </Link>
            )}
            <div className="flex items-center gap-3">
              <Link to="/profile" className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-110 transition-all duration-300 cursor-pointer">
                {user.name.charAt(0).toUpperCase()}
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1 group">
                 Logout <LogOut size={14} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="px-4 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
