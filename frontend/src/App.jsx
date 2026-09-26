import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute } from './routes/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Pages
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import ResumeAnalyzer from './pages/ResumeAnalyzer/ResumeAnalyzer';
import CareerRoadmap from './pages/CareerRoadmap/CareerRoadmap';
import PortfolioGenerator from './pages/PortfolioGenerator/PortfolioGenerator';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Resources from './pages/Resources/Resources';
import InterviewRoom from './components/InterviewRoom';
import { ConversationProvider } from '@elevenlabs/react';

// Wrapper for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes for Users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/resume" element={<ResumeAnalyzer />} />
          <Route path="/roadmap" element={<CareerRoadmap />} />
          <Route path="/portfolio" element={<PortfolioGenerator />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/interview" element={
            <ConversationProvider>
              <InterviewRoom />
            </ConversationProvider>
          } />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
          {/* Animated Background Gradients */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

          <ToastContainer theme="dark" position="bottom-right" />
          <Navbar />
          <ScrollToTop />
          
          <main className="flex-grow flex flex-col z-10 pb-10">
            <AnimatedRoutes />
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
