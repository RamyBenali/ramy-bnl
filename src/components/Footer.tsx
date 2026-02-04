import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Instagram, ArrowRight, Code2, Heart, Palette } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useContact } from '../context/ContactContext';
import './Footer.css';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();
    const { openContact } = useContact();
    const location = useLocation();
    const navigate = useNavigate();

    const isDev = location.pathname === '/dev';
    const isCreative = location.pathname === '/creative';
    const isAbout = location.pathname === '/about';

    const getNavLinks = () => {
        if (isDev) {
            return [
                { name: t('header.projects'), id: 'projects' },
                { name: t('header.skills'), id: 'skills' },
            ];
        }
        if (isCreative) {
            return [
                { name: t('header.creative_showcase'), id: 'projects' },
                { name: t('header.creative_toolbox'), id: 'tools' },
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

    return (
        <footer className={`footer-dynamic ${theme}`}>
            <div className="container">
                {/* Top Section - CTA */}
                <div className="footer-cta-section">
                    <div className="footer-cta-content">
                        <div className="cta-icon">
                            {theme === 'dev' ? <Code2 size={40} /> : <Palette size={40} />}
                        </div>
                        <div className="cta-text">
                            <h2 className="cta-title">{t('footer.cta_title')}</h2>
                            <p className="cta-subtitle">{t('footer.cta_subtitle')}</p>
                        </div>
                    </div>
                    <button onClick={openContact} className="footer-cta-btn">
                        <span>{t('footer.cta_btn')}</span>
                        <ArrowRight size={20} />
                    </button>
                </div>

                {/* Main Footer Content */}
                <div className="footer-main">
                    {/* Brand Column */}
                    <div className="footer-column footer-brand">
                        <div className="brand-logo">
                            <div className="logo-symbol">{'/>'}</div>
                            <h3>{t('header.brand')}</h3>
                        </div>
                        <p className="brand-tagline">
                            {t('footer.brand_tagline')}
                        </p>
                        <div className="footer-socials">
                            <a href="https://github.com/RamyBenali" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/ramy-benali-248b70282/" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.instagram.com/rmba.exe/" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.nav_title')}</h4>
                        <ul className="footer-links">
                            <li>
                                <Link to="/dev" onClick={() => setTheme('dev')}>
                                    {t('footer.nav_dev')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/creative" onClick={() => setTheme('creative')}>
                                    {t('footer.nav_creative')}
                                </Link>
                            </li>
                            <li><Link to="/about">{t('footer.nav_about')}</Link></li>
                        </ul>
                    </div>

                    {/* Dynamic Sections Column */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">
                            {isCreative ? t('footer.nav_creative') : isAbout ? t('footer.nav_about') : t('footer.projects_title')}
                        </h4>
                        <ul className="footer-links">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <button onClick={() => scrollToSection(link.id)} className="footer-link-btn">
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                            {isDev && (
                                <li>
                                    <a href="https://github.com/RamyBenali" target="_blank" rel="noopener noreferrer">
                                        {t('footer.projects_github')}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.contact_title')}</h4>
                        <ul className="footer-links">
                            <li><a href="mailto:benali.ramy.2@gmail.com">{t('footer.contact_email')}</a></li>
                            <li><a href="https://www.linkedin.com/in/ramy-benali-248b70282/" target="_blank" rel="noopener noreferrer">{t('footer.contact_linkedin')}</a></li>
                            <li><button onClick={openContact} className="footer-link-btn">{t('footer.nav_contact')}</button></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p className="copyright">
                        © {new Date().getFullYear()} {t('header.brand')}. {t('footer.copyright')}
                    </p>
                    <p className="made-with">
                        {t('footer.made_with')} <Heart size={14} className="heart-icon" /> {t('footer.made_coffee')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
