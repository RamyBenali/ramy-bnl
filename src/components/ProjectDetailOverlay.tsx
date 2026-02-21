import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './ProjectDetailOverlay.css';

interface Project {
    id?: string | number;
    title: string;
    description: string;
    image: string;
    video?: string;
    images?: string[];
    tech: string[];
    features?: string[];
    github?: string;
    demo?: string;
    external?: string;
}

interface ProjectDetailOverlayProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectDetailOverlay: React.FC<ProjectDetailOverlayProps> = ({ project, onClose }) => {
    const { t } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
            setCurrentImageIndex(0); // Reset index when project changes
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [project]);

    if (!project) return null;

    const displayImages = project.images && project.images.length > 0 ? project.images : [project.image];

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
    };

    const isVideo = (path: string) => path.toLowerCase().endsWith('.webm') || path.toLowerCase().endsWith('.mp4');

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="overlay-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Main Container */}
                    <motion.div
                        className="project-overlay-container"
                        layoutId={`card-container-${project.title}`}
                    >
                        {/* Close Button */}
                        <motion.button
                            className="btn-close-overlay"
                            onClick={onClose}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
                            exit={{ opacity: 0 }}
                        >
                            <X size={24} />
                        </motion.button>

                        <div className="overlay-scroll-wrapper">
                            {/* Hero Image Section / Carousel */}
                            <div className="overlay-hero">
                                <AnimatePresence mode="wait">
                                    {isVideo(displayImages[currentImageIndex]) ? (
                                        <motion.video
                                            key={currentImageIndex}
                                            src={displayImages[currentImageIndex]}
                                            className="overlay-hero-img"
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    ) : (
                                        <motion.img
                                            key={currentImageIndex}
                                            src={displayImages[currentImageIndex]}
                                            alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                            className="overlay-hero-img"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Carousel Controls */}
                                {displayImages.length > 1 && (
                                    <div className="carousel-controls">
                                        <button className="carousel-btn prev" onClick={prevImage}>
                                            <ChevronLeft size={24} />
                                        </button>
                                        <div className="carousel-dots">
                                            {displayImages.map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`dot ${i === currentImageIndex ? 'active' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex(i);
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <button className="carousel-btn next" onClick={nextImage}>
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                )}

                                <div className="overlay-hero-gradient" />

                                <div className="overlay-hero-content" style={{ zIndex: 20 }}>
                                    <motion.h1
                                        className="overlay-title"
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                                    >
                                        {project.title}
                                    </motion.h1>

                                    <motion.div
                                        className="overlay-links"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                                    >
                                        {(project.external || project.demo) && (
                                            <a href={project.external || project.demo} target="_blank" rel="noopener noreferrer" className="btn-overlay-primary">
                                                {t('dev.projects.modal.visit_site')} <ExternalLink size={18} />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-overlay-secondary">
                                                <Github size={18} /> {t('dev.projects.modal.source_code')}
                                            </a>
                                        )}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <motion.div
                                className="overlay-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.4 } }}
                            >
                                <div className="content-grid">
                                    <div className="content-main">
                                        <h3>{t('dev.projects.modal.overview')}</h3>
                                        <div className="project-long-desc" dangerouslySetInnerHTML={{ __html: project.description }} />

                                        {project.features && (
                                            <div className="features-block">
                                                <h3>{t('dev.projects.modal.key_features')}</h3>
                                                <ul className="features-list">
                                                    {project.features.map((f, i) => (
                                                        <li key={i}>{f}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="content-sidebar">
                                        <div className="sidebar-block">
                                            <h4>{t('dev.projects.modal.technologies')}</h4>
                                            <div className="tech-cloud">
                                                {project.tech.map(t => (
                                                    <span key={t} className="tech-tag-overlay">{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="sidebar-block">
                                            <h4>{t('dev.projects.modal.role_year')}</h4>
                                            <p className="sidebar-text">{t('dev.projects.modal.fullstack_dev')}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )
            }
        </AnimatePresence >
    );
};

export default ProjectDetailOverlay;
