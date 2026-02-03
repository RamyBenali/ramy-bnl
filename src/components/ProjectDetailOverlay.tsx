import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './ProjectDetailOverlay.css';

interface Project {
    id?: string | number;
    title: string;
    description: string;
    image: string;
    tech: string[];
    features?: string[];
    github?: string;
    demo?: string;
}

interface ProjectDetailOverlayProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectDetailOverlay: React.FC<ProjectDetailOverlayProps> = ({ project, onClose }) => {
    const { t } = useTranslation();

    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [project]);

    if (!project) return null;

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
                            {/* Hero Image Section */}
                            <div className="overlay-hero">
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="overlay-hero-img"
                                    layoutId={`project-image-${project.title}`}
                                />
                                <div className="overlay-hero-gradient" />

                                <div className="overlay-hero-content">
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
                                        {project.demo && (
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-overlay-primary">
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
            )}
        </AnimatePresence>
    );
};

export default ProjectDetailOverlay;
