import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Code, Palette, ArrowRight, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    const { t } = useTranslation();
    const { setTheme } = useTheme();
    const navigate = useNavigate();

    // Track which side is being hovered: 'dev', 'creative', or null
    const [hoveredSide, setHoveredSide] = useState<'dev' | 'creative' | null>(null);

    const handleChoice = (choice: 'dev' | 'creative') => {
        setTheme(choice);
        navigate(`/${choice}`);
    };

    // Animation constants
    const transition = { type: 'spring', stiffness: 200, damping: 30 };

    // Dynamic Frontier Logic
    const splitPosition = hoveredSide === 'dev' ? '70%' : hoveredSide === 'creative' ? '30%' : '50%';

    // Intense Colors (Neon)
    const activeColor = hoveredSide === 'dev' ? 'var(--dev-accent)' : hoveredSide === 'creative' ? 'var(--crea-accent)' : '#ffffff';

    return (
        <div className="landing-container">
            {/* --- HEADER --- */}
            <header className="landing-header">
                <div className="landing-brand">Ramy's Portfolio</div>
                <Link to="/about" className="landing-about-link">
                    {t('header.about')} <User size={18} />
                </Link>
            </header>

            {/* --- DEVELOPER SIDE --- */}
            <motion.div
                className={`landing-side dev-side ${hoveredSide === 'creative' ? 'compressed' : ''}`}
                onHoverStart={() => setHoveredSide('dev')}
                onHoverEnd={() => setHoveredSide(null)}
                onClick={() => handleChoice('dev')}
                animate={{ width: hoveredSide === 'dev' ? '70%' : hoveredSide === 'creative' ? '30%' : '50%' }}
                transition={transition}
            >
                <div className="side-bg dev-bg" />
                <div className="side-overlay" />
                <div className="side-content">
                    <motion.div
                        className="icon-wrapper"
                        animate={{ scale: hoveredSide === 'dev' ? 1.2 : 1 }}
                        transition={transition}
                    >
                        <Code size={48} />
                    </motion.div>

                    <h2 className="side-title">
                        {t('landing.dev.title')}
                    </h2>

                    <AnimatePresence>
                        {hoveredSide !== 'creative' && (
                            <motion.p
                                className="side-desc"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {t('landing.dev.text')}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <motion.button
                        className="side-cta"
                        whileHover={{ x: 10 }}
                    >
                        {t('landing.dev.cta')} <ArrowRight size={16} />
                    </motion.button>
                </div>
            </motion.div>

            {/* --- CREATIVE SIDE --- */}
            <motion.div
                className={`landing-side crea-side ${hoveredSide === 'dev' ? 'compressed' : ''}`}
                onHoverStart={() => setHoveredSide('creative')}
                onHoverEnd={() => setHoveredSide(null)}
                onClick={() => handleChoice('creative')}
                animate={{ width: hoveredSide === 'creative' ? '70%' : hoveredSide === 'dev' ? '30%' : '50%' }}
                transition={transition}
            >
                <div className="side-bg crea-bg" />
                <div className="side-overlay" />
                <div className="side-content">
                    <motion.div
                        className="icon-wrapper"
                        animate={{ scale: hoveredSide === 'creative' ? 1.2 : 1 }}
                        transition={transition}
                    >
                        <Palette size={48} />
                    </motion.div>

                    <h2 className="side-title">
                        {t('landing.creative.title')}
                    </h2>

                    <AnimatePresence>
                        {hoveredSide !== 'dev' && (
                            <motion.p
                                className="side-desc"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {t('landing.creative.text')}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <motion.button
                        className="side-cta"
                        whileHover={{ x: 10 }}
                    >
                        {t('landing.creative.cta')} <ArrowRight size={16} />
                    </motion.button>
                </div>
            </motion.div>

            {/* --- ACTIVE LASER FRONTIER --- */}
            <motion.div
                className="frontier-line"
                animate={{ left: splitPosition }}
                transition={transition}
                style={{ color: activeColor }}
            />

            {/* --- BADGE ON RAILS --- */}
            <motion.div
                className="center-badge-container"
                animate={{ left: splitPosition }}
                transition={transition}
            >
                <div
                    className="badge-inner-dynamic"
                    style={{ color: activeColor }}
                >
                    <span className="badge-text">{t('header.choose')}</span>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;
