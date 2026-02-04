import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Layout from '../components/Layout';
import { Play, ChevronRight, Sparkles, Palette, Brush, Eye, Rocket, Figma } from 'lucide-react';
import { useContact } from '../context/ContactContext';
import EmbedModal from '../components/EmbedModal';
import Typewriter from '../components/Typewriter';
import CreativeInteractiveTags from '../components/CreativeInteractiveTags';
import CreativeHeroIcons from '../components/CreativeHeroIcons';
import './CreativePage.css';

interface ShowcaseItem {
    id: number;
    type: 'figma' | 'video';
    title: string;
    description: string;
    pill: string;
    cover: string;
    src: string;
}

const CreativePage: React.FC = () => {
    const { t } = useTranslation();
    const { openContact } = useContact();
    const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const showcaseKeys = [
        'powerfitness1', 'powerfitness2', 'aylan1', 'aylan2',
        'weazel', 'belcourt', 'ofeeling',
        'vision3', 'vlog', 'palmera2', 'homeinspire_f',
        'binary_identity', 'echoes_design', 'saldaetrip_f',
        'medify', 'porte_ouverte'
    ];

    const showcaseItems: ShowcaseItem[] = showcaseKeys.map((key, idx) => ({
        id: idx,
        type: (key.endsWith('_f') || ['binary_identity', 'echoes_design', 'medify', 'porte_ouverte'].includes(key) ? 'figma' : 'video') as 'figma' | 'video',
        title: t(`creative.gallery.list.${key}.title`),
        description: t(`creative.gallery.list.${key}.desc`),
        pill: t(`creative.gallery.list.${key}.pill`),
        cover: key === 'powerfitness1' ? "assets/creative/covers/powerfitness1.jpg" :
            key === 'powerfitness2' ? "assets/creative/covers/powerfitness2.jpg" :
                key === 'aylan1' ? "assets/creative/covers/aylan1.png" :
                    key === 'aylan2' ? "assets/creative/covers/aylan2.png" :
                        key === 'palmera1' ? "assets/creative/covers/palmera1.png" :
                            key === 'weazel' ? "assets/creative/covers/Weazel.png" :
                                key === 'belcourt' ? "assets/creative/covers/belcourt1.png" :
                                    key === 'ofeeling' ? "assets/creative/covers/ofeeling.png" :
                                        key === 'vision3' ? "assets/creative/covers/bestofvision.jpg" :
                                            key === 'vlog' ? "assets/creative/covers/vlog-romain.png" :
                                                key === 'palmera2' ? "assets/creative/covers/palmera2.png" :
                                                    key === 'homeinspire_f' ? "assets/creative/covers/homeinspire.png" :
                                                        key === 'binary_identity' ? "assets/creative/covers/binary-identity.png" :
                                                            key === 'echoes_design' ? "assets/creative/covers/echoes.png" :
                                                                key === 'saldaetrip_f' ? "assets/creative/covers/SaldaeTrip.jpg" :
                                                                    key === 'medify' ? "assets/creative/covers/medify.png" :
                                                                        "assets/creative/covers/porte-ouverte.png",
        src: key === 'powerfitness1' ? "https://player.vimeo.com/video/1114686103" :
            key === 'powerfitness2' ? "https://player.vimeo.com/video/1114686311" :
                key === 'aylan1' ? "https://player.vimeo.com/video/1114691957" :
                    key === 'aylan2' ? "https://player.vimeo.com/video/1114691983" :
                        key === 'weazel' ? "https://drive.google.com/file/d/1ldxdP8fB07EH3S6uRtDikxe2uwMQ3pA0/preview" :
                            key === 'belcourt' ? "https://drive.google.com/file/d/1IU8favC8h31p69ORrsm-cHd8rFlgsJ4L/preview" :
                                key === 'ofeeling' ? "https://drive.google.com/file/d/1Y0wUHQEDgesu0gaGEpFdaaGZkAVMTlpq/preview" :
                                    key === 'vision3' ? "https://www.youtube.com/embed/5FoXX6dRAAA" :
                                        key === 'vlog' ? "https://drive.google.com/file/d/1RfDLbXr0dbFM2cn5AxtR4Tbs0aCQQFqC/preview" :
                                            key === 'palmera2' ? "https://drive.google.com/file/d/1UOIF4D8KODPu4_AnSQayRymA3OGcMwkL/preview" :
                                                key === 'homeinspire_f' ? "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FFHA0tnDw6x4uWszDp1RkJI" :
                                                    key === 'binary_identity' ? "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fc8IKKzvayzD8sdypDKH7Ee" :
                                                        key === 'echoes_design' ? "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FmNacvc3E69Ep8XOrVG5A6M" :
                                                            key === 'saldaetrip_f' ? "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FtqOS4wClGjLEeoXkjnWeMW" :
                                                                key === 'medify' ? "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FPZH3nH0Cq2xdkG0OF46H7o" :
                                                                    "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2Fro1AXrMIX7PxOsXpHc6ib1"
    }));

    return (
        <Layout hideNavbar={!!selectedItem}>
            <div className="crea-modern">
                {/* HERO SECTION - Split Layout */}
                <section className="crea-hero-split">
                    {/* Artistic Background */}
                    <div className="artistic-background">
                        <motion.div
                            className="paint-blob pb1"
                            animate={{ x: [0, 80, 0], y: [0, 40, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="paint-blob pb2"
                            animate={{ x: [0, -60, 0], y: [0, 90, 0], rotate: [0, -8, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="paint-blob pb3"
                            animate={{ x: [0, 50, 0], y: [0, -50, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    {/* Floating Creative Tools - Interactive */}
                    <CreativeHeroIcons />

                    {/* Brush Strokes Overlay */}
                    <svg className="brush-strokes-overlay" viewBox="0 0 1920 1080" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--crea-accent)" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="var(--crea-accent-2)" stopOpacity="0.05" />
                            </linearGradient>
                        </defs>
                        <motion.path
                            d="M 100 200 Q 400 100 700 250 T 1200 200"
                            stroke="url(#orangeGrad)"
                            strokeWidth="80"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M 1800 800 Q 1400 700 1100 850 T 600 800"
                            stroke="url(#orangeGrad)"
                            strokeWidth="60"
                            fill="none"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                        />
                    </svg>

                    <div className="crea-container hero-container-split">
                        <motion.div
                            className="hero-text-left"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="hero-greeting-crea">{t('creative.hero.greeting', 'Bonjour, je suis')}</span>
                            <h1 className="hero-name-crea">Ramy Benali</h1>
                            <h2 className="hero-role-crea">
                                <span className="text-gradient-crea">
                                    <Typewriter
                                        texts={[
                                            t('creative.hero.roles.video_creative'),
                                            t('creative.hero.roles.motion_designer'),
                                            t('creative.hero.roles.ui_ux_designer'),
                                            t('creative.hero.roles.art_director')
                                        ]}
                                        speed={100}
                                        delay={2000}
                                    />
                                </span>
                            </h2>

                            <p className="hero-bio-crea">
                                {t('creative.hero.bio', "Artiste digital passionné, je transforme des idées en expériences visuelles captivantes. De la conception UI/UX au montage vidéo, je donne vie à vos projets avec créativité et authenticité.")}
                            </p>

                            <div className="hero-qualities-crea">
                                <div className="quality-pill-crea">
                                    <Sparkles size={18} className="pill-icon-crea" />
                                    <span>{t('creative.hero.q1', 'Créatif')}</span>
                                </div>
                                <div className="quality-pill-crea">
                                    <Brush size={18} className="pill-icon-crea" />
                                    <span>{t('creative.hero.q2', 'Authentique')}</span>
                                </div>
                                <div className="quality-pill-crea">
                                    <Palette size={18} className="pill-icon-crea" />
                                    <span>{t('creative.hero.q3', 'Passionné')}</span>
                                </div>
                            </div>

                            <div className="hero-btns-crea">
                                <button className="btn-crea-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                                    <Eye size={18} />
                                    {t('creative.hero.cta', 'Voir mes créations')}
                                </button>
                                <button className="btn-crea-outline" onClick={openContact}>
                                    <Rocket size={18} />
                                    {t('creative.hero.btn_contact', 'Me contacter')}
                                </button>
                            </div>
                        </motion.div>

                        {/* Artistic Visual Element */}
                        <div className="hero-visuals-right-crea">
                            <motion.div
                                className="paint-palette-visual"
                                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                <svg viewBox="0 0 300 300" className="palette-svg">
                                    <defs>
                                        <filter id="glow">
                                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <circle cx="150" cy="80" r="25" fill="var(--crea-accent)" opacity="0.3" filter="url(#glow)" />
                                    <circle cx="220" cy="140" r="30" fill="var(--crea-accent-2)" opacity="0.25" filter="url(#glow)" />
                                    <circle cx="140" cy="200" r="28" fill="var(--crea-accent)" opacity="0.2" filter="url(#glow)" />
                                    <circle cx="80" cy="150" r="32" fill="var(--crea-accent-2)" opacity="0.28" filter="url(#glow)" />
                                </svg>
                                <Palette size={140} strokeWidth={1.5} className="palette-icon-center" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Tools Section - Redesigned */}
                <section id="tools" className="tools-section-crea-redesign">
                    <div className="container">
                        <motion.div
                            className="section-header-crea"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="section-title-crea-center">
                                <Sparkles size={40} className="title-icon" />
                                {t('creative.tools.title')}
                            </h2>
                        </motion.div>

                        <div className="crea-tools-grid">
                            {/* Left: Main Toolkit */}
                            <motion.div
                                className="crea-skill-card main-toolkit-card"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="card-content-wrapper">
                                    <div className="card-header-crea">
                                        <div className="icon-box-crea">
                                            <Sparkles size={28} />
                                        </div>
                                        <h3>{t('creative.tools.toolkit_title')}</h3>
                                    </div>

                                    <CreativeInteractiveTags
                                        tags={['Premiere Pro', 'After Effects', 'Figma', 'Photoshop', 'Illustrator', 'CapCut', 'DaVinci']}
                                    />
                                </div>
                            </motion.div>

                            {/* Right: Specialized Cards */}
                            <div className="crea-side-cards">
                                {/* Graphic Design Card */}
                                <motion.div
                                    className="crea-skill-card side-card"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <div className="side-card-content">
                                        <div className="icon-box-large">
                                            <Palette size={32} />
                                        </div>
                                        <div className="text-content">
                                            <h4>{t('creative.tools.design_label')}</h4>
                                            <p>{t('creative.tools.figma_specialist')}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Video Card */}
                                <motion.div
                                    className="crea-skill-card side-card"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <div className="side-card-content">
                                        <div className="icon-box-large">
                                            <Play size={32} />
                                        </div>
                                        <div className="text-content">
                                            <h4>{t('creative.tools.video_label')}</h4>
                                            <p>{t('creative.tools.motion_graphics')}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Artistic Background - Simplified for performance */}
                <div className="artistic-background">
                    <motion.div
                        className="paint-blob pb1"
                        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="paint-blob pb2"
                        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div id="projects" className="crea-container">
                    <div className="gallery-header">
                        <h2 className="section-title-crea">{t('creative.gallery.title')}</h2>
                        <div className="gallery-filters">
                            <button
                                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                {t('creative.gallery.filters.all')}
                            </button>
                            <button
                                className={`filter-btn ${activeFilter === 'video' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('video')}
                            >
                                {t('creative.gallery.filters.video')}
                            </button>
                            <button
                                className={`filter-btn ${activeFilter === 'design' ? 'active' : ''}`}
                                onClick={() => setActiveFilter('design')}
                            >
                                {t('creative.gallery.filters.design')}
                            </button>
                        </div>
                    </div>

                    <div className="immersive-grid">
                        <LayoutGroup>
                            <AnimatePresence mode='popLayout'>
                                {showcaseItems
                                    .filter(item => activeFilter === 'all' || (activeFilter === 'design' ? item.type === 'figma' : item.type === 'video'))
                                    .map((item, _idx) => (
                                        <motion.article
                                            layout
                                            key={item.id}
                                            className="immersive-card"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            onClick={() => setSelectedItem(item)}
                                        >
                                            <div className="immersive-image">
                                                <img
                                                    src={item.cover}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    className="gallery-cover-img"
                                                />
                                                <div className="immersive-overlay">
                                                    {item.type === 'figma' ? (
                                                        <Figma size={40} />
                                                    ) : (
                                                        <Play size={40} />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="immersive-info">
                                                <span className="card-pill">{item.pill}</span>
                                                <h3>{item.title}</h3>
                                                <p>{item.description}</p>
                                                <div className="card-link">
                                                    {t('creative.gallery.hint')} <ChevronRight size={16} />
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                            </AnimatePresence>
                        </LayoutGroup>
                    </div>
                </div>

                <EmbedModal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    src={selectedItem?.src || null}
                    title={selectedItem?.title || ''}
                />
            </div>
        </Layout>
    );
};

export default CreativePage;
