import React from 'react';
import Navbar from './Navbar';
import ContactForm from './ContactForm';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import { useContact } from '../context/ContactContext';
import { useTheme } from '../context/ThemeContext';
import FloatingLanguageToggle from './FloatingLanguageToggle';
import LightFollower from './LightFollower';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
    hideLanguageToggle?: boolean;
    className?: string; // Added optional className
}

const Layout: React.FC<LayoutProps> = ({ children, hideLanguageToggle = false, className = '' }) => {
    const { isOpen, closeContact } = useContact();
    const { theme } = useTheme();

    return (
        <div className={`layout-wrapper theme-${theme} ${className}`}>
            <LightFollower />
            <CustomCursor />
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
            <ContactForm isOpen={isOpen} onClose={closeContact} theme={theme} />
            {!hideLanguageToggle && <FloatingLanguageToggle />}
        </div>
    );
};

export default Layout;
