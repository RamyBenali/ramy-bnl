import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, ArrowRight, Code2, Heart, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Footer.css';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();

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
                    <Link to="/contact" className="footer-cta-btn">
                        <span>{t('footer.cta_btn')}</span>
                        <ArrowRight size={20} />
                    </Link>
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
                            <a href="https://linkedin.com/in/ramy-benali" target="_blank" rel="noopener noreferrer" className="social-link">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
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
                            <li><Link to="/contact">{t('footer.nav_contact')}</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.projects_title')}</h4>
                        <ul className="footer-links">
                            <li><a href="#projects">{t('footer.projects_portfolio')}</a></li>
                            <li><a href="#skills">{t('footer.projects_skills')}</a></li>
                            <li><a href="https://github.com/RamyBenali" target="_blank" rel="noopener noreferrer">{t('footer.projects_github')}</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-column-title">{t('footer.contact_title')}</h4>
                        <ul className="footer-links">
                            <li><a href="mailto:ramy.benali@example.com">{t('footer.contact_email')}</a></li>
                            <li><a href="https://linkedin.com/in/ramy-benali" target="_blank" rel="noopener noreferrer">{t('footer.contact_linkedin')}</a></li>
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
