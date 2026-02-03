import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import './ProjectModal.css';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        tech: string[];
        features?: string[];
        images?: string[];
        github?: string;
        demo?: string;
    } | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        setCurrentSlide(0);
    }, [isOpen]);

    if (!project) return null;

    const nextSlide = () => {
        if (project.images) {
            setCurrentSlide((prev) => (prev + 1) % project.images!.length);
        }
    };

    const prevSlide = () => {
        if (project.images) {
            setCurrentSlide((prev) => (prev - 1 + project.images!.length) % project.images!.length);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="project-modal-overlay" onClick={onClose}>
                    <motion.div
                        className="project-modal-container"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                            <X size={24} />
                        </button>

                        <div className="modal-content-grid">
                            <div className="modal-slider-section">
                                {project.images && project.images.length > 0 ? (
                                    <div className="modal-slider">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentSlide}
                                                src={project.images[currentSlide]}
                                                alt={`${project.title} screenshot ${currentSlide + 1}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="slider-image"
                                            />
                                        </AnimatePresence>

                                        {project.images.length > 1 && (
                                            <>
                                                <button className="slider-nav prev" onClick={prevSlide}>
                                                    <ChevronLeft size={24} />
                                                </button>
                                                <button className="slider-nav next" onClick={nextSlide}>
                                                    <ChevronRight size={24} />
                                                </button>
                                                <div className="slider-dots">
                                                    {project.images.map((_, idx) => (
                                                        <span
                                                            key={idx}
                                                            className={`dot ${currentSlide === idx ? 'active' : ''}`}
                                                            onClick={() => setCurrentSlide(idx)}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="modal-placeholder">No images available</div>
                                )}
                            </div>

                            <div className="modal-info-section">
                                <h2 className="modal-title">{project.title}</h2>
                                <div className="modal-tech-stack">
                                    {project.tech.map((t) => (
                                        <span key={t} className="tech-pill">{t}</span>
                                    ))}
                                </div>

                                <div className="modal-description" dangerouslySetInnerHTML={{ __html: project.description }} />

                                {project.features && project.features.length > 0 && (
                                    <div className="modal-features">
                                        <h3>Key Features</h3>
                                        <ul>
                                            {project.features.map((f, i) => (
                                                <li key={i}>{f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="modal-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="modal-link github">
                                            <Github size={18} /> GitHub Repository
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="modal-link demo">
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
