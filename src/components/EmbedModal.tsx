import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './EmbedModal.css';

interface EmbedModalProps {
    isOpen: boolean;
    onClose: () => void;
    src: string | null;
    title: string;
}

const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose, src, title }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    if (!src) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="embed-modal-overlay" onClick={onClose}>
                    <motion.div
                        className="embed-modal-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <header className="embed-header">
                            <h3>{title}</h3>
                            <button className="close-btn" onClick={onClose}><X size={20} /></button>
                        </header>
                        <div className="embed-body">
                            <iframe
                                src={src}
                                title={title}
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EmbedModal;
