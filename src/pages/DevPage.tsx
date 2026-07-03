import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, LayoutGroup, MotionConfig } from 'framer-motion';
import Layout from '../components/Layout';
import FeaturedProjectCard from '../components/FeaturedProjectCard';
import ProjectRow from '../components/ProjectRow';
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
    video?: string;
    tech: string[];
    github?: string;
    external?: string;
    features: string[];
    images: string[];
    featured: boolean;
    context: string;
    contextLabel: string;
}

const DevPage: React.FC = () => {
    const { t } = useTranslation();
    const { openContact } = useContact();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Order shown on the page (best / most recent work first)
    const projectKeys = ['squidlane', 'alfea', 'drakos', 'nexus', 'karrily', 'bonzai', 'detectinfo', 'swat', 'home-inspire', 'saldae-trip', 'echoes', 'caryago', 'sopenbiz', 'pong'];

    // Per-project metadata (images, stack, links). Text lives in i18n (dev.projects.list.<key>).
    // context: 'pro' | 'client' | 'uni' | 'perso' — shown as a label on cards/rows.
    const projectMeta: Record<string, {
        image: string;
        video?: string;
        tech: string[];
        github?: string;
        external?: string;
        images: string[];
        featured?: boolean;
        context: string;
    }> = {
        squidlane: {
            context: 'pro',
            image: "assets/images/squidlane/screenshot1.png",
            tech: ["Laravel", "React", "TypeScript", "Tailwind", "Livewire"],
            external: "https://www.squidlane.com",
            images: [
                "assets/images/squidlane/screenshot1.png",
                "assets/images/squidlane/screenshot2.png",
                "assets/images/squidlane/screenshot3.png"
            ],
            featured: true
        },
        alfea: {
            context: 'perso',
            image: "assets/images/alfea/screenshot1.png",
            tech: ["React", "TypeScript", "Supabase", "Tailwind"],
            images: [
                "assets/images/alfea/screenshot1.png",
                "assets/images/alfea/screenshot2.png",
                "assets/images/alfea/screenshot3.png"
            ],
            featured: true
        },
        drakos: {
            context: 'client',
            image: "assets/images/Drakos/screen-drakos-1.png",
            video: "assets/images/Drakos/Portfolio drakos demo.webm",
            tech: ["React", "TypeScript", "JS", "CSS"],
            external: "https://drakos.pages.dev",
            images: [
                "assets/images/Drakos/Portfolio drakos demo.webm",
                "assets/images/Drakos/screen-drakos-1.png",
                "assets/images/Drakos/screen-drakos-2.png",
                "assets/images/Drakos/screen-drakos-3.png"
            ],
            featured: true
        },
        nexus: {
            context: 'uni',
            image: "assets/images/nexus/screenshot1.png",
            tech: ["React", "TypeScript", "Express", "Supabase", "Python"],
            images: [
                "assets/images/nexus/screenshot1.png",
                "assets/images/nexus/screenshot2.png",
                "assets/images/nexus/screenshot3.png"
            ],
            featured: true
        },
        karrily: {
            context: 'uni',
            image: "assets/images/karrily/screenshot1.png",
            tech: ["React", "TypeScript", "Express", "Supabase", "Capacitor"],
            images: [
                "assets/images/karrily/screenshot1.png",
                "assets/images/karrily/screenshot2.png",
                "assets/images/karrily/screenshot3.png"
            ],
            featured: true
        },
        bonzai: {
            context: 'pro',
            image: "assets/images/bonzai/screenshot1.png",
            tech: ["PHP", "JavaScript", "HTML", "CSS"],
            github: "https://github.com/BonzaiPro?tab=repositories",
            images: [
                "assets/images/bonzai/screenshot1.png",
                "assets/images/bonzai/screenshot2.png",
                "assets/images/bonzai/screenshot3.png"
            ]
        },
        detectinfo: {
            context: 'uni',
            image: "assets/images/detectinfo/screenshot1.png",
            tech: ["Python", "PyTorch", "Mamba", "Flask"],
            images: [
                "assets/images/detectinfo/screenshot1.png",
                "assets/images/detectinfo/screenshot2.png",
                "assets/images/detectinfo/screenshot3.png"
            ]
        },
        swat: {
            context: 'perso',
            image: "assets/images/swat/swat-logo.png",
            tech: ["React", "TypeScript", "JS", "CSS", "HTML"],
            external: "https://swat-vision.lovable.app/",
            images: [
                "assets/images/swat/screenshot1.png",
                "assets/images/swat/screenshot2.png",
                "assets/images/swat/screenshot3.png",
                "assets/images/swat/screenshot4.png"
            ]
        },
        "home-inspire": {
            context: 'uni',
            image: "assets/images/Home-inspire.jpg",
            tech: ["Java", "JavaFX", "MySQL"],
            github: "https://github.com/RamyBenali/HomeInspire",
            images: [
                "assets/images/homeinspire/screenshot1.png",
                "assets/images/homeinspire/screenshot2.png",
                "assets/images/homeinspire/screenshot3.png"
            ]
        },
        "saldae-trip": {
            context: 'uni',
            image: "assets/images/SaldaeTrip.jpg",
            tech: ["Kotlin", "Flutter", "SupaBase"],
            github: "https://github.com/RamyBenali/SaldaeTrip",
            images: [
                "assets/images/saldaetrip/screenshot1.png",
                "assets/images/saldaetrip/screenshot2.png",
                "assets/images/saldaetrip/screenshot3.png"
            ]
        },
        echoes: {
            context: 'uni',
            image: "assets/images/Echoes.jpg",
            tech: ["HTML5", "React", "MySQL"],
            images: [
                "assets/images/echoes/screenshot1.png",
                "assets/images/echoes/screenshot2.png",
                "assets/images/echoes/screenshot3.png"
            ]
        },
        caryago: {
            context: 'client',
            image: "assets/images/caryago/caryago-screen1.png",
            tech: ["React", "TypeScript", "JS", "CSS"],
            external: "https://caryago.com/",
            images: [
                "assets/images/caryago/caryago-screen1.png",
                "assets/images/caryago/caryago-screen2.png",
                "assets/images/caryago/caryago-screen3.png"
            ]
        },
        sopenbiz: {
            context: 'client',
            image: "assets/images/Sopenbiz.png",
            tech: ["WordPress", "Elementor Pro"],
            external: "https://sopenbiz.com/",
            images: [
                "assets/images/sopenbiz/sopenbiz-screen1.png",
                "assets/images/sopenbiz/sopenbiz-screen2.png",
                "assets/images/sopenbiz/sopenbiz-screen3.png"
            ]
        },
        pong: {
            context: 'perso',
            image: "assets/images/pong-logo.jpg",
            tech: ["C", "Raylib"],
            github: "https://github.com/RamyBenali/Pong-Game",
            images: [
                "assets/images/pong/screenshot1.png",
                "assets/images/pong/screenshot2.png",
                "assets/images/pong/screenshot3.png"
            ]
        }
    };

    const projects: Project[] = projectKeys.map(key => {
        const meta = projectMeta[key];
        return {
            id: key,
            title: t(`dev.projects.list.${key}.title`),
            description: t(`dev.projects.list.${key}.desc`),
            modalDescription: t(`dev.projects.list.${key}.modal`),
            image: meta.image,
            video: meta.video,
            tech: meta.tech,
            github: meta.github,
            external: meta.external,
            features: t(`dev.projects.list.${key}.features`, { returnObjects: true }) as string[],
            images: meta.images,
            featured: meta.featured ?? false,
            context: meta.context,
            contextLabel: t(`dev.projects.context.${meta.context}`)
        };
    });

    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);




    return (
        <Layout hideLanguageToggle={!!selectedProject} hideNavbar={!!selectedProject}>
            <MotionConfig reducedMotion="user">
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

                {/* PROJECTS — featured editorial grid + compact archive list */}
                <section id="projects" className="work-section">
                    <div className="container">
                        <div className="work-header">
                            <span className="work-kicker">{t('dev.projects.kicker')}</span>
                            <h2 className="work-title">{t('dev.projects.title')}</h2>
                            <p className="work-sub">{t('dev.projects.subtitle')}</p>
                        </div>

                        <LayoutGroup>
                            <div className="featured-grid">
                                {featuredProjects.map((p, idx) => (
                                    <FeaturedProjectCard
                                        key={p.id}
                                        project={p}
                                        index={idx}
                                        hero={idx === 0}
                                        onClick={() => setSelectedProject(p)}
                                    />
                                ))}
                            </div>

                            <div className="archive-block">
                                <div className="archive-head">
                                    <h3>{t('dev.projects.more_title')}</h3>
                                    <span className="archive-count">
                                        {String(otherProjects.length).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="archive-list">
                                    {otherProjects.map((p, idx) => (
                                        <ProjectRow
                                            key={p.id}
                                            project={p}
                                            index={featuredProjects.length + idx}
                                            onClick={() => setSelectedProject(p)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </LayoutGroup>
                    </div>
                </section>

                <ProjectDetailOverlay
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </div >
            </MotionConfig>
        </Layout >
    );
};

export default DevPage;
