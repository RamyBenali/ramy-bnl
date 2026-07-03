import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './FeaturedProjectCard.css';

interface Project {
    id?: string | number;
    title: string;
    description: string;
    image: string;
    video?: string;
    tech: string[];
    context?: string;
    contextLabel?: string;
}

interface FeaturedProjectCardProps {
    project: Project;
    index: number;
    hero?: boolean;
    onClick: () => void;
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({ project, index, hero, onClick }) => {
    return (
        <motion.article
            layoutId={`card-container-${project.title}`}
            className={`feat-card ${hero ? 'feat-card--hero' : ''}`}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={project.title}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="feat-media">
                {project.video ? (
                    <video src={project.video} autoPlay loop muted playsInline />
                ) : (
                    <img src={project.image} alt={project.title} loading="lazy" />
                )}
            </div>

            <div className="feat-body">
                <div className="feat-meta">
                    <span className="feat-index">{String(index + 1).padStart(2, '0')}</span>
                    {project.contextLabel && (
                        <span className={`ctx-label ctx--${project.context}`}>{project.contextLabel}</span>
                    )}
                    <ArrowUpRight size={18} className="feat-arrow" aria-hidden="true" />
                </div>
                <h3 className="feat-title">{project.title}</h3>
                <p className="feat-desc">{project.description}</p>
                <p className="feat-tech">{project.tech.join(' · ')}</p>
            </div>
        </motion.article>
    );
};

export default FeaturedProjectCard;
