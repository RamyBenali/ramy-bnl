import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';
import Layout from '../components/Layout';
import ModernProjectCard from '../components/ModernProjectCard';
import ProjectDetailOverlay from '../components/ProjectDetailOverlay';
import Typewriter from '../components/Typewriter';
import InteractiveFloatingTags from '../components/InteractiveFloatingTags';
import AnimatedProgressBar from '../components/AnimatedProgressBar';
import { useContact } from '../context/ContactContext';
import {
    Rocket, Eye, Code2, Server, Wrench
} from 'lucide-react';
import './DevPage.css';

interface Project {
    id: string | number;
    title: string;
    description: string;
    modalDescription: string;
    image: string;
    tech: string[];
    github?: string;
    external?: string;
    features: string[];
    images: string[];
    featured: boolean;
}

const DevPage: React.FC = () => {
    const { t } = useTranslation();
    const { openContact } = useContact();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projectKeys = ['bonzai', 'pong', 'home-inspire', 'echoes', 'saldae-trip', 'sopenbiz', 'caryago', 'swat'];

    const projects = projectKeys.map(key => ({
        id: key,
        title: t(`dev.projects.list.${key}.title`),
        description: t(`dev.projects.list.${key}.desc`),
        modalDescription: t(`dev.projects.list.${key}.modal`),
        image: key === 'pong' ? "assets/images/pong-logo.jpg" :
            key === 'echoes' ? "assets/images/Echoes.jpg" :
                key === 'home-inspire' ? "assets/images/Home-inspire.jpg" :
                    key === 'saldae-trip' ? "assets/images/SaldaeTrip.jpg" :
                        key === 'sopenbiz' ? "assets/images/Sopenbiz.png" :
                            key === 'bonzai' ? "assets/images/bonzai/screenshot1.png" :
                                key === 'swat' ? "assets/images/swat/swat-logo.png" :
                                    "assets/images/caryago/caryago-screen1.png",
        tech: key === 'pong' ? ["C", "Raylib"] :
            key === 'echoes' ? ["HTML5", "React", "MySQL"] :
                key === 'home-inspire' ? ["Java", "JavaFX", "MySQL"] :
                    key === 'saldae-trip' ? ["Kotlin", "Flutter", "SupaBase"] :
                        key === 'sopenbiz' ? ["WordPress", "Elementor Pro"] :
                            key === 'bonzai' ? ["PHP", "JavaScript", "HTML", "CSS"] :
                                key === 'swat' ? ["React", "TypeScript", "JS", "CSS", "HTML"] :
                                    ["React", "TypeScript", "JS", "CSS"],
        github: key === 'pong' ? "https://github.com/RamyBenali/Pong-Game" :
            key === 'home-inspire' ? "https://github.com/RamyBenali/HomeInspire" :
                key === 'saldae-trip' ? "https://github.com/RamyBenali/SaldaeTrip" :
                    key === 'bonzai' ? "https://github.com/BonzaiPro?tab=repositories" : undefined,
        external: key === 'sopenbiz' ? "https://sopenbiz.com/" :
            key === 'caryago' ? "https://caryago.lovable.app/" :
                key === 'swat' ? "https://swat-vision.lovable.app/" : undefined,
        features: t(`dev.projects.list.${key}.features`, { returnObjects: true }) as string[],
        images: key === 'pong' ? [
            "assets/images/pong/screenshot1.png",
            "assets/images/pong/screenshot2.png",
            "assets/images/pong/screenshot3.png"
        ] : key === 'echoes' ? [
            "assets/images/echoes/screenshot1.png",
            "assets/images/echoes/screenshot2.png",
            "assets/images/echoes/screenshot3.png"
        ] : key === 'home-inspire' ? [
            "assets/images/homeinspire/screenshot1.png",
            "assets/images/homeinspire/screenshot2.png",
            "assets/images/homeinspire/screenshot3.png"
        ] : key === 'saldae-trip' ? [
            "assets/images/saldaetrip/screenshot1.png",
            "assets/images/saldaetrip/screenshot2.png",
            "assets/images/saldaetrip/screenshot3.png"
        ] : key === 'sopenbiz' ? [
            "assets/images/sopenbiz/sopenbiz-screen1.png",
            "assets/images/sopenbiz/sopenbiz-screen2.png",
            "assets/images/sopenbiz/sopenbiz-screen3.png"
        ] : key === 'bonzai' ? [
            "assets/images/bonzai/screenshot1.png",
            "assets/images/bonzai/screenshot2.png",
            "assets/images/bonzai/screenshot3.png"
        ] : key === 'swat' ? [
            "assets/images/swat/screenshot1.png",
            "assets/images/swat/screenshot2.png",
            "assets/images/swat/screenshot3.png",
            "assets/images/swat/screenshot4.png"
        ] : [
            "assets/images/caryago/caryago-screen1.png",
            "assets/images/caryago/caryago-screen2.png",
            "assets/images/caryago/caryago-screen3.png"
        ],
        featured: key === 'bonzai' || key === 'home-inspire' || key === 'saldae-trip' // Highlight best work
    }));




    return (
        <Layout hideLanguageToggle={!!selectedProject} hideNavbar={!!selectedProject}>
            <div className="dev-modern">
                {/* HERO SECTION - Split Layout (Personal) */}
                <section className="dev-hero-split">
                    <div className="hero-grid-bg" />

                    {/* Ambient Background (3D Atmosphere) */}
                    <div className="ambient-background">
                        <div className="ambient-shape s1" />
                        <div className="ambient-shape s2" />
                        <div className="ambient-shape s3" />
                    </div>

                    {/* Orbiting Tags - Scattered in background */}
                    <InteractiveFloatingTags />

                    <div className="container hero-container-split">
                        <motion.div
                            className="hero-text-left"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="hero-greeting">{t('dev.hero.greeting', 'Bonjour, je suis')}</span>
                            <h1 className="hero-name">Ramy Benali</h1>
                            <h2 className="hero-role">
                                <span className="text-gradient">
                                    <Typewriter
                                        texts={['Monteur Vidéo', 'Graphic Designer', 'Fullstack Developer', 'Motion Designer']}
                                        speed={100}
                                        delay={2000}
                                    />
                                </span>
                            </h2>

                            <p className="hero-bio">
                                {t('dev.hero.bio', "Étudiant en Master Génie Logiciel, je m’épanouis dans la création de solutions digitales innovantes. Passionné par le développement fullstack, je combine expertise technique et créativité pour transformer des concepts complexes en expériences utilisateur exceptionnelles.")}
                                <Link to="/about" className="bio-link">{t('dev.hero.read_more', "En savoir plus.")}</Link>
                            </p>

                            <div className="hero-qualities">
                                <div className="quality-pill">
                                    <span className="pill-icon">{"</>"}</span>
                                    <span>{t('dev.hero.q1')}</span>
                                </div>
                                <div className="quality-pill">
                                    <span className="pill-icon">{"⚡"}</span>
                                    <span>{t('dev.hero.q2')}</span>
                                </div>
                                <div className="quality-pill">
                                    <span className="pill-icon">{"🤝"}</span>
                                    <span>{t('dev.hero.q3')}</span>
                                </div>
                            </div>

                            <div className="hero-btns-left">
                                <button className="btn-modern-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                                    <Eye size={18} />
                                    {t('dev.hero.btn_work', 'Voir mes projets')}
                                </button>
                                <button className="btn-modern-outline" onClick={openContact}>
                                    <Rocket size={18} />
                                    {t('dev.hero.btn_contact', 'Me contacter')}
                                </button>
                            </div>
                        </motion.div>

                        <div className="hero-visuals-right">
                            {/* VS Code Symbol - Decorative Background */}
                            <div className="code-symbol-bg">
                                <svg viewBox="0 0 200 200" className="symbol-svg">
                                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="symbol-text">
                                        {'/>'}
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>


                {/* SKILLS SECTION - Now First */}
                <section id="skills" className="skills-section">
                    <div className="container">
                        <motion.h2
                            className="section-title-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {t('dev.skills.title')}
                        </motion.h2>

                        <motion.div
                            className="skills-grid"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.15
                                    }
                                }
                            }}
                        >
                            {/* Frontend */}
                            <motion.div
                                className="skill-card"
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                            >
                                <div className="skill-card-header">
                                    <Code2 size={24} className="skill-icon" />
                                    <h3>{t('dev.skills.frontend')}</h3>
                                </div>
                                <div className="skill-bars">
                                    <AnimatedProgressBar skillName="React" targetPercentage={90} delay={100} />
                                    <AnimatedProgressBar skillName="TypeScript" targetPercentage={85} delay={200} />
                                    <AnimatedProgressBar skillName="HTML & CSS" targetPercentage={95} delay={300} />
                                </div>
                            </motion.div>

                            {/* Backend */}
                            <motion.div
                                className="skill-card"
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                            >
                                <div className="skill-card-header">
                                    <Server size={24} className="skill-icon" />
                                    <h3>{t('dev.skills.backend')}</h3>
                                </div>
                                <div className="skill-bars">
                                    <AnimatedProgressBar skillName="Node.js" targetPercentage={80} delay={100} />
                                    <AnimatedProgressBar skillName="Python" targetPercentage={75} delay={200} />
                                    <AnimatedProgressBar skillName="MySQL" targetPercentage={70} delay={300} />
                                </div>
                            </motion.div>

                            {/* Tools */}
                            <motion.div
                                className="skill-card"
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                            >
                                <div className="skill-card-header">
                                    <Wrench size={24} className="skill-icon" />
                                    <h3>{t('dev.skills.tools')}</h3>
                                </div>
                                <div className="skill-bars">
                                    <AnimatedProgressBar skillName="Git" targetPercentage={85} delay={100} />
                                    <AnimatedProgressBar skillName="Flutter" targetPercentage={60} delay={200} />
                                    <AnimatedProgressBar skillName="Docker" targetPercentage={65} delay={300} />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* PROJECTS GRID - Now Second */}
                <section id="projects" className="work-section">
                    <div className="container">
                        <div className="work-header">
                            <h2 className="section-title-alt">{t('dev.projects.title')}</h2>
                            <p>{t('dev.projects.subtitle')}</p>
                        </div>
                        <div className="modern-projects-grid">
                            <LayoutGroup>
                                {projects.map((p, idx) => (
                                    <ModernProjectCard
                                        key={idx}
                                        project={{ ...p, id: idx }}
                                        onClick={() => setSelectedProject({ ...p, id: idx })}
                                    />
                                ))}
                            </LayoutGroup>
                        </div>
                    </div>
                </section>

                <ProjectDetailOverlay
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </div >
        </Layout >
    );
};

export default DevPage;
