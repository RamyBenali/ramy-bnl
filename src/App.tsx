import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ContactProvider } from './context/ContactContext';
import DevPage from './pages/DevPage';
import LandingPage from './pages/LandingPage';
import CreativePage from './pages/CreativePage';
import AboutPage from './pages/AboutPage';
import CustomCursor from './components/CustomCursor';
import './i18n';
import './index.css';

const AnimatedRoutes = () => {
  const location = useLocation();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    if (location.pathname === '/about') {
      setTheme('fusion');
    } else if (location.pathname === '/dev') {
      setTheme('dev');
    } else if (location.pathname === '/creative') {
      setTheme('creative');
    } else if (location.pathname === '/') {
      setTheme('dev');
    }
  }, [location.pathname, setTheme]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/creative" element={<CreativePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CustomCursor />
      <ContactProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </ContactProvider>
    </ThemeProvider>
  );
};

export default App;
