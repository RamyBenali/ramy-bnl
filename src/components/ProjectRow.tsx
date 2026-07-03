import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './ProjectRow.css';

interface Project {
    id?: string | number;
    title: string;
    description: string;
    image: string;
    tech: string[];
    context?: string;
    contextLabel?: string;
}

interface ProjectRowProps {
    project: Project;
    index: number;
    onClick: () => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({ project, index, onClick }) => {
    return (
        <motion.article
            layoutId={`card-container-${project.title}`}
            className="proj-row"
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
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (index % 5) * 0.045, ease: [0.22, 1, 0.36, 1] }}
        >
            <span className="row-index">{String(index + 1).padStart(2, '0')}</span>

            <div className="row-thumb">
                <img src={project.image} alt={project.title} loading="lazy" />
            </div>

            <div className="row-main">
                <h4 className="row-title">{project.title}</h4>
                <p className="row-desc">{project.description}</p>
            </div>

            <span className="row-tech">{project.tech.slice(0, 3).join(' · ')}</span>

            {project.contextLabel && (
                <span className={`ctx-label ctx--${project.context}`}>{project.contextLabel}</span>
            )}

            <ArrowUpRight size={17} className="row-arrow" aria-hidden="true" />
        </motion.article>
    );
};

export default ProjectRow;
