import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass max-w-lg w-full p-12 rounded-3xl text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
        <div className="w-20 h-20 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} />
        </div>
        <h1 className="text-6xl font-bold mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8">
          The page you are looking for doesn't exist or has been moved to another dimension.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          <Home size={18} /> Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
