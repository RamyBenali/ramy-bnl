import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useContact } from '../context/ContactContext';
import {
    Code2, Palette, Terminal, Cpu, Layout as LayoutIcon,
    Camera, Globe, User, MapPin, Mail,
    GraduationCap, Briefcase, Zap, Heart,
    Smartphone, Layers, Award, Download, Github, Linkedin, Instagram,
    PenTool, Dumbbell
} from 'lucide-react'; // Added PenTool, Dumbbell
import './AboutPage.css';


const AboutPage: React.FC = () => {
    const { t } = useTranslation();
    const { openContact } = useContact();
    const navigate = useNavigate();

    // Scroll for Parallax
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, (window.innerWidth < 1200 || window.innerHeight < 950) ? 0 : 200]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const experience = t('about.resume.experience_list', { returnObjects: true }) as any[];
    const education = t('about.resume.education_list', { returnObjects: true }) as any[];

    return (
        <Layout className="page-about">
            <div className="about-fusion" ref={containerRef}>

                {/* --- HERO FUSION --- */}
                <section className="hero-fusion">
                    <motion.div
                        className="fusion-content"
                        style={{ y: yHero, opacity: opacityHero }}
                    >
                        <motion.div
                            className="fusion-pill"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Zap size={16} color="var(--dev-accent)" fill="var(--dev-accent)" />
                            <span>{t('about.fusion.pill', 'Hybrid Profile')}</span>
                            <Heart size={16} color="var(--crea-accent)" fill="var(--crea-accent)" />
                        </motion.div>

                        <h1 className="fusion-title">
                            <motion.span
                                className="text-dev"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "backOut" }}
                            >
                                {t('about.fusion.dev', 'Full Stack')}
                            </motion.span>
                            <br />
                            <motion.span
                                className="text-crea"
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
                            >
                                {t('about.fusion.crea', 'Creative')}
                            </motion.span>
                        </h1>

                        <div className="fusion-divider" />

                        <motion.p
                            className="fusion-lead"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {t('about.fusion.lead', "I don't just write code, and I don't just design interfaces. I bridge the gap between technical logic and artistic emotion to build complete digital experiences.")}
                        </motion.p>
                    </motion.div>
                </section>

                {/* --- PROFILE FUSION SECTION --- */}
                <section id="infos" className="profile-fusion-section">
                    <div className="profile-fusion-grid">

                        {/* LEFT: BIO & INTRO */}
                        <div className="profile-bio-card">
                            <h2 className="bio-greeting">{t('about.bio.greeting', 'Salut, je suis')}</h2>
                            <h1 className="bio-name">Ramy Benali</h1>
                            <p className="bio-text">
                                {t('about.bio.text', "Étudiant en Master Génie Logiciel...")}
                            </p>

                            <div className="bio-tags">
                                <span className="fusion-tag"><Code2 size={14} /> {t('about.tags.fs', 'Full-stack')}</span>
                                <span className="fusion-tag"><Palette size={14} /> {t('about.tags.da', 'Direction Artistique')}</span>
                                <span className="fusion-tag"><Layers size={14} /> {t('about.tags.motion', 'Motion & Montage')}</span>
                                <span className="fusion-tag"><LayoutIcon size={14} /> {t('about.tags.uiux', 'UI/UX')}</span>
                            </div>

                            <div className="bio-actions">
                                <button className="btn-fusion-primary" onClick={openContact}>
                                    <Zap size={18} /> {t('contact.btn', 'Me contacter')}
                                </button>
                                <a href="/assets/CV-ramy-benali.pdf" target="_blank" className="btn-fusion-outline">
                                    <Download size={18} /> CV
                                </a>
                            </div>
                        </div>

                        {/* RIGHT: INFOS GRID */}
                        <div className="profile-infos-card">
                            <h3 className="infos-title">{t('about.infos.title', 'Mes Infos')}</h3>
                            <div className="infos-grid">
                                <div className="info-item">
                                    <span className="i-label"><User size={14} /> {t('about.infos.age', 'Âge')}</span>
                                    <span className="i-val">21 ans</span>
                                </div>
                                <div className="info-item">
                                    <span className="i-label"><Smartphone size={14} /> {t('about.infos.phone', 'Téléphone')}</span>
                                    <span className="i-val">+213 555 35 46 81</span>
                                </div>
                                <div className="info-item">
                                    <span className="i-label"><MapPin size={14} /> {t('about.infos.city', 'Ville')}</span>
                                    <span className="i-val">Béjaïa (DZ)</span>
                                </div>
                                <div className="info-item">
                                    <span className="i-label"><Mail size={14} /> Email</span>
                                    <span className="i-val">benali.ramy.2@gmail.com</span>
                                </div>
                                <div className="info-item">
                                    <span className="i-label"><Briefcase size={14} /> {t('about.infos.status', 'Statut')}</span>
                                    <span className="i-val">Étudiant / Freelance</span>
                                </div>
                                <div className="info-item">
                                    <span className="i-label"><Globe size={14} /> {t('about.infos.langs', 'Langues')}</span>
                                    <span className="i-val">FR, EN, AR, KAB</span>
                                </div>
                            </div>

                            <div className="social-fusion-row">
                                <a href="https://github.com/RamyBenali" target="_blank" className="s-icon"><Github size={20} /></a>
                                <a href="https://www.linkedin.com/in/ramy-benali-248b70282/" target="_blank" className="s-icon"><Linkedin size={20} /></a>
                                <a href="https://www.instagram.com/rmba.exe/" target="_blank" className="s-icon"><Instagram size={20} /></a>
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- JOURNEY TIMELINE (SPLIT) --- */}
                <section id="journey" className="timeline-section">
                    <div className="timeline-split-container">

                        {/* LEFT COLUMN: EXPERIENCE */}
                        <div className="timeline-column">
                            <motion.div
                                className="col-header"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <Briefcase size={28} color="var(--dev-accent)" />
                                <h2 style={{ color: 'var(--dev-accent)', margin: 0 }}>{t('about.resume.exp', 'Experience')}</h2>
                            </motion.div>

                            <div className="col-list">
                                {experience.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="t-card-visual"
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <span className="t-date">{item.date}</span>
                                        <h3 className="t-title">{item.title}</h3>
                                        <span className="t-place" style={{ color: 'var(--dev-accent)' }}>{item.place}</span>
                                        <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>{item.description || item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: EDUCATION */}
                        <div className="timeline-column">
                            <motion.div
                                className="col-header"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <GraduationCap size={28} color="var(--crea-accent)" />
                                <h2 style={{ color: 'var(--crea-accent)', margin: 0 }}>{t('about.resume.edu', 'Education')}</h2>
                            </motion.div>

                            <div className="col-list">
                                {education.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        className="t-card-visual"
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <span className="t-date">{item.date}</span>
                                        <h3 className="t-title">{item.title}</h3>
                                        <span className="t-place" style={{ color: 'var(--crea-accent)' }}>{item.place}</span>
                                        <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>{item.description || item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- FUSION BENTO --- */}
                <section id="skills" className="fusion-bento-section">
                    <div className="fusion-grid">

                        {/* 1. Tech Stack (Dev Focus) */}
                        <div className="f-card large">
                            <span className="f-title"><Terminal size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} /> {t('about.grid.eng', 'Engineering')}</span>
                            <div className="f-content">
                                <div className="stack-list">
                                    {['React', 'TypeScript', 'Node.js', 'Next.js', 'Python', 'Tailwind', 'MongoDB'].map(tech => (
                                        <span key={tech} className="stack-pill">{tech}</span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ position: 'absolute', bottom: -20, right: -20, opacity: 0.05 }}>
                                <Code2 size={200} />
                            </div>
                        </div>

                        {/* 2. Creative Studio (Design Focus) */}
                        <div className="f-card tall">
                            <span className="f-title"><Palette size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} /> {t('about.grid.crea', 'Creative Suite')}</span>
                            <div className="f-content" style={{ justifyContent: 'flex-start', paddingTop: '1rem', gap: '1rem' }}>
                                {['Figma', 'After Effects', 'Premiere Pro', 'Photoshop', 'DaVinci Resolve'].map(tool => (
                                    <div key={tool} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Layers size={16} color="var(--crea-accent)" />
                                        <span>{tool}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ position: 'absolute', bottom: -20, right: -20, opacity: 0.05 }}>
                                <Palette size={150} />
                            </div>
                        </div>

                        {/* 3. Global Stats */}
                        <div className="f-card">
                            <span className="f-title"><Globe size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} /> {t('about.grid.exp', 'Experience')}</span>
                            <div className="f-content">
                                <span className="stat-val">3+</span>
                                <span style={{ opacity: 0.6 }}>{t('about.grid.exp_sub', 'Years Global Exp.')}</span>
                            </div>
                        </div>

                        {/* 4. Projects Completed */}
                        <div className="f-card">
                            <span className="f-title"><Award size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} /> {t('about.grid.proj', 'Projects')}</span>
                            <div className="f-content">
                                <span className="stat-val">20+</span>
                                <span style={{ opacity: 0.6 }}>{t('about.grid.proj_sub', 'Successfully Delivered')}</span>
                            </div>
                        </div>

                        {/* 5. Device / Testing */}
                        <div className="f-card">
                            <span className="f-title"><Smartphone size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} /> {t('about.grid.resp', 'Responsive')}</span>
                            <div className="f-content">
                                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                    {t('about.grid.resp_sub', 'Mobile First Obsession')}
                                </span>
                            </div>
                            <div style={{ position: 'absolute', bottom: -10, right: -10, opacity: 0.1 }}>
                                <Cpu size={80} />
                            </div>
                        </div>

                        {/* 6. Hobbies / Personal */}
                        <div className="f-card">
                            <span className="f-title"><Heart size={18} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} /> {t('about.grid.beyond', 'Beyond Work')}</span>
                            <div className="f-content">
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', marginTop: '1rem' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Dumbbell size={28} style={{ marginBottom: 8, opacity: 0.8 }} />
                                        <div style={{ fontSize: '0.75rem' }}>{t('about.grid.athlete', 'Hybrid Athlete')}</div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <Camera size={28} style={{ marginBottom: 8, opacity: 0.8 }} />
                                        <div style={{ fontSize: '0.75rem' }}>{t('about.grid.photo', 'Photography')}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* --- NAVIGATION ACCESS (NEW) --- */}
                <section className="access-section">
                    <div className="access-grid">

                        {/* CREATIVE ACCESS */}
                        <motion.div
                            className="access-card crea"
                            whileHover={{ y: -5 }}
                            onClick={() => navigate('/creative')}
                        >
                            <h3 className="access-title">{t('about.access.crea_title', 'Profil créatif')}</h3>
                            <p className="access-desc">{t('about.access.crea_desc', 'Direction artistique, montage & motion...')}</p>

                            <div className="access-tags">
                                <span>{t('about.access.tags_crea.da', 'DA')}</span>
                                <span>{t('about.access.tags_crea.motion', 'Motion')}</span>
                                <span>{t('about.access.tags_crea.retouch', 'Retouche')}</span>
                                <span>{t('about.access.tags_crea.uiux', 'UI/UX')}</span>
                                <span>{t('about.access.tags_crea.figma', 'Figma')}</span>
                            </div>

                            <button className="access-btn">
                                <PenTool size={16} /> {t('about.access.crea_btn', 'Mon portfolio Créatif')}
                            </button>
                        </motion.div>

                        {/* DEV ACCESS */}
                        <motion.div
                            className="access-card dev"
                            whileHover={{ y: -5 }}
                            onClick={() => navigate('/dev')}
                        >
                            <h3 className="access-title">{t('about.access.dev_title', 'Profil développeur')}</h3>
                            <p className="access-desc">{t('about.access.dev_desc', 'Développement full-stack (web & mobile)...')}</p>

                            <div className="access-tags">
                                <span>{t('about.access.tags_dev.react', 'React')}</span>
                                <span>{t('about.access.tags_dev.node', 'Node.js')}</span>
                                <span>{t('about.access.tags_dev.java', 'Java')}</span>
                                <span>{t('about.access.tags_dev.kotlin', 'Kotlin')}</span>
                                <span>{t('about.access.tags_dev.sql', 'MySQL')}</span>
                            </div>

                            <button className="access-btn">
                                <Code2 size={16} /> {t('about.access.dev_btn', 'Mon portfolio Dev')}
                            </button>
                        </motion.div>

                    </div>
                </section>

                <div style={{ height: '100px' }} />
            </div>
        </Layout>
    );
};

export default AboutPage;
