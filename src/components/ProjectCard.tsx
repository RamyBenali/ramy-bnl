import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Eye } from 'lucide-react';
import './ProjectCard.css';

interface ProjectCardProps {
    title: string;
    description: string;
    image: string;
    tech: string[];
    github?: string;
    demo?: string;
    onClick?: () => void;
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 20
        }
    }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, tech, github, demo, onClick }) => {
    return (
        <motion.article
            className="project-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-image" />
                <div className="card-overlay">
                    <div className="tech-tags">
                        {tech.map((t) => (
                            <span key={t} className="tech-tag">{t}</span>
                        ))}
                    </div>
                    <div className="overlay-actions">
                        <button className="icon-btn" onClick={onClick}><Eye size={20} /></button>
                    </div>
                </div>
            </div>

            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <div className="card-links">
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" className="link-item">
                            <Github size={18} />
                            <span>Code</span>
                        </a>
                    )}
                    {demo && (
                        <a href={demo} target="_blank" rel="noopener noreferrer" className="link-item">
                            <ExternalLink size={18} />
                            <span>Demo</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

export default ProjectCard;
