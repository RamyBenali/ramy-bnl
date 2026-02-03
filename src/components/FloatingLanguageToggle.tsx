import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './FloatingLanguageToggle.css';

const FloatingLanguageToggle: React.FC = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'fr' ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
        localStorage.setItem('lang', newLang);
    };

    return (
        <div className="lang-switch">
            <input
                type="checkbox"
                id="lang-toggle"
                checked={i18n.language === 'en'}
                onChange={toggleLanguage}
            />
            <label htmlFor="lang-toggle" className="lang-toggle-label">
                <span className="lang-pill">FR</span>
                <span className="lang-pill">EN</span>
                <motion.span
                    className="thumb"
                    animate={{ x: i18n.language === 'en' ? '100%' : 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                >
                    {i18n.language.toUpperCase()}
                </motion.span>
            </label>
        </div>
    );
};

export default FloatingLanguageToggle;
