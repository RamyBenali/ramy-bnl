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
                { name: t('header.creative_showcase'), id: 'projects' },
                { name: t('header.creative_toolbox'), id: 'tools' },
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
                className={`dynamic-island ${theme} ${isMenuOpen ? 'mobile-open' : ''}`}
                layout
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
                <div className="island-main">
                    {!isMenuOpen && (
                        <button className="island-back" onClick={() => navigate('/')}>
                            <ArrowLeft size={20} />
                        </button>
                    )}

                    {!isMenuOpen && <div className="island-divider" />}

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

                    {!isMenuOpen && <div className="island-divider" />}

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
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="premium-mobile-content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mobile-menu-inner">
                                <div className="mobile-nav-links-grid">
                                    {navLinks.map((link, idx) => (
                                        <motion.div
                                            key={link.id || link.path || idx}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            {link.path ? (
                                                <Link to={link.path} className="mobile-premium-link" onClick={() => setIsMenuOpen(false)}>
                                                    <span className="link-num">0{idx + 1}</span>
                                                    <span className="link-text">{link.name}</span>
                                                </Link>
                                            ) : (
                                                <button className="mobile-premium-link" onClick={() => { setIsMenuOpen(false); scrollToSection(link.id!); }}>
                                                    <span className="link-num">0{idx + 1}</span>
                                                    <span className="link-text">{link.name}</span>
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: navLinks.length * 0.1 }}
                                    >
                                        <button className="mobile-premium-link contact-highlight" onClick={() => { setIsMenuOpen(false); openContact(); }}>
                                            <span className="link-num">0{navLinks.length + 1}</span>
                                            <span className="link-text">{t('header.contact')}</span>
                                        </button>
                                    </motion.div>
                                </div>

                                <div className="mobile-bottom-actions">
                                    <p className="mode-label">Switch Experience</p>
                                    <div className="mode-switcher-premium">
                                        <button
                                            className={`premium-mode-btn ${theme === 'dev' ? 'active' : ''}`}
                                            onClick={() => handleThemeSwitch('dev')}
                                        >
                                            Developer
                                        </button>
                                        <button
                                            className={`premium-mode-btn ${theme === 'creative' ? 'active' : ''}`}
                                            onClick={() => handleThemeSwitch('creative')}
                                        >
                                            Creative
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    );
};

export default Navbar;
