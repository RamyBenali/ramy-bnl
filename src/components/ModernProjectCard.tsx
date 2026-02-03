import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './ModernProjectCard.css';

interface Project {
    id?: string | number; // For layoutId
    title: string;
    description: string;
    image: string;
    tech: string[];
    github?: string;
    demo?: string;
    featured?: boolean; // New: mark as spotlight project
}

interface ModernProjectCardProps {
    project: Project;
    onClick: () => void;
}

const ROTATION_RANGE = 15;
const HALF_ROTATION_RANGE = 15 / 2;

const ModernProjectCard: React.FC<ModernProjectCardProps> = ({ project, onClick }) => {
    const { t } = useTranslation();
    const cardRef = useRef<HTMLDivElement | null>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layoutId={`card-container-${project.title}`} // Shared layout ID
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={`modern-card-3d ${project.featured ? 'featured-project' : ''}`}
        >
            {project.featured && (
                <div className="featured-badge">
                    <span>✨ Featured</span>
                </div>
            )}
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="modern-card-content"
            >
                {/* Image Background with Gradient Overlay */}
                <div
                    className="card-bg-image"
                    style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="card-gradient-overlay" />

                {/* Content */}
                <div className="card-info">
                    <motion.div
                        className="card-header"
                        style={{ transform: "translateZ(50px)" }}
                    >
                        <h3 className="card-title-3d">{project.title}</h3>
                        <div className="card-tech-row">
                            {project.tech.slice(0, 3).map(t => (
                                <span key={t} className="tech-pill-mini">{t}</span>
                            ))}
                            {project.tech.length > 3 && <span className="tech-pill-mini">+{project.tech.length - 3}</span>}
                        </div>
                    </motion.div>

                    <motion.div
                        className="card-footer"
                        style={{ transform: "translateZ(40px)" }}
                    >
                        <p className="card-desc-short">{project.description.substring(0, 80)}...</p>
                        <button className="btn-view-project">
                            {t('dev.projects.view_project')} <ArrowUpRight size={16} />
                        </button>
                    </motion.div>
                </div>

                {/* Holographic Shine */}
                <div className="holographic-shine" />
            </div>
        </motion.div>
    );
};

export default ModernProjectCard;
