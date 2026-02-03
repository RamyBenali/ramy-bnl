import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X, Command, Palette, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useContact } from '../context/ContactContext';
import './Navbar.css';

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();
    const { openContact } = useContact();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isDev = location.pathname === '/dev';
    const isCreative = location.pathname === '/creative';
    const isAbout = location.pathname === '/about';

    const getNavLinks = () => {
        if (isDev) {
            return [
                { name: t('header.projects'), id: 'projects' },
                { name: t('header.skills'), id: 'skills' },
                { name: t('header.about'), path: '/about' },
            ];
        }
        if (isCreative) {
            return [
                { name: t('header.creative_showcase'), id: 'projects' }, // Gallery ID is 'projects'
                { name: t('header.creative_toolbox'), id: 'tools' },     // Toolkit ID is 'tools'
                { name: t('header.about'), path: '/about' },
            ];
        }
        if (isAbout) {
            return [
                { name: t('header.about_infos'), id: 'infos' },
                { name: t('header.about_journey'), id: 'journey' },
                { name: t('header.about_skills'), id: 'skills' },
            ];
        }
        return [];
    };

    const navLinks = getNavLinks();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate(`/${theme}#${id}`);
        }
    };

    const handleThemeSwitch = (newTheme: 'dev' | 'creative') => {
        setTheme(newTheme);
        navigate(`/${newTheme}`);
    };

    const isLanding = location.pathname === '/';
    if (isLanding) return null;

    return (
        <header className={`dynamic-island-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <motion.nav
                className={`dynamic-island ${theme}`}
                layout
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
                <div className="island-main">
                    <button className="island-back" onClick={() => navigate('/')}>
                        <ArrowLeft size={20} />
                    </button>

                    <div className="island-divider" />

                    <div className="island-links">
                        {navLinks.map((link) => (
                            link.path ? (
                                <Link key={link.path} to={link.path} className="island-link">
                                    {link.name}
                                </Link>
                            ) : (
                                <button key={link.id} onClick={() => scrollToSection(link.id!)} className="island-link">
                                    {link.name}
                                </button>
                            )
                        ))}
                    </div>

                    <div className="island-divider" />

                    <div className="island-actions">
                        <div className="island-theme-toggle">
                            <button
                                className={`theme-btn ${theme === 'dev' ? 'active' : ''}`}
                                onClick={() => handleThemeSwitch('dev')}
                            >
                                <Command size={16} />
                            </button>
                            <button
                                className={`theme-btn ${theme === 'creative' ? 'active' : ''}`}
                                onClick={() => handleThemeSwitch('creative')}
                            >
                                <Palette size={16} />
                            </button>
                        </div>

                        <button className="island-contact" onClick={openContact}>
                            <Globe size={18} />
                        </button>
                    </div>

                    <button className="island-mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="island-mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                        >
                            {navLinks.map((link, idx) => (
                                link.path ? (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className="mobile-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <button
                                        key={link.id || idx}
                                        className="mobile-link"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            scrollToSection(link.id!);
                                        }}
                                    >
                                        {link.name}
                                    </button>
                                )
                            ))}
                            <button className="mobile-link" onClick={() => { setIsMenuOpen(false); openContact(); }}>
                                {t('header.contact')}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    );
};

export default Navbar;
