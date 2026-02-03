import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

interface ContactFormProps {
    isOpen: boolean;
    onClose: () => void;
    theme: 'dev' | 'creative' | 'fusion';
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, onClose, theme }) => {
    const { t } = useTranslation();
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const formRef = React.useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '' // Honeypot
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Load Turnstile script if not present
            if (!document.getElementById('cf-turnstile-script')) {
                const script = document.createElement('script');
                script.id = 'cf-turnstile-script';
                script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
            }
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const getSubjects = () => {
        if (theme === 'creative') {
            return [t('contact.subjects.crea.b'), t('contact.subjects.crea.m'), t('contact.subjects.crea.u'), t('contact.subjects.other')];
        }
        // Default to dev subjects for 'dev' and 'fusion'
        return [t('contact.subjects.dev.p'), t('contact.subjects.dev.e'), t('contact.subjects.dev.c'), t('contact.subjects.other')];
    };

    const subjects = getSubjects();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Honeypot check
        if (formData.company !== '') {
            setStatus('success'); // Silently ignore bots
            return;
        }

        setStatus('sending');

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id',
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id',
                formRef.current!,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key'
            );
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                onClose();
            }, 3000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="contact-overlay"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`contact-modal ${theme}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-btn" onClick={onClose} aria-label="Close"><X /></button>

                        <header className="contact-header">
                            <h2>{t('contact.heading')}</h2>
                            <p>{t('contact.sub')}</p>
                        </header>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="success-message"
                            >
                                <CheckCircle size={60} color="var(--accent-color)" />
                                <h3>{t('contact.success')}</h3>
                            </motion.div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="name">{t('contact.name')}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="user_name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">{t('contact.email')}</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="user_email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">{t('contact.subject')}</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option value="">{t('contact.choose_subject')}</option>
                                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="message">{t('contact.message')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                {/* Honeypot */}
                                <div className="form-group hp" style={{ display: 'none' }}>
                                    <label htmlFor="company">Company</label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="turnstile-container">
                                    <div
                                        id="cf-turnstile-widget"
                                        className="cf-turnstile"
                                        data-sitekey="0x4AAAAAAABxojW3QyIclF93l"
                                    ></div>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? t('contact.sending') : (
                                        <>
                                            <span>{t('contact.send')}</span>
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                        {status === 'error' && (
                            <p className="error-text" style={{ color: '#ff4444', textAlign: 'center', marginTop: '1rem' }}>
                                Une erreur est survenue. Veuillez réessayer.
                            </p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ContactForm;
