import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CreativeTagProps {
    tags: string[];
}

const CreativeInteractiveTags: React.FC<CreativeTagProps> = ({ tags }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        if (window.innerWidth < 900) return; // Skip logic on mobile

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        // Attach listener to window or specific container? 
        // For physics to work smoothly even when cursor leaves the exact div quickly, window is often better,
        // but we need coordinates relative to the specific container. 
        // Let's use window and calc relative pos, or just attach to container if we only care when inside.
        // User said "when they pass over", implying local interaction.
        // But InteractiveFloatingTags uses window. Let's stick to window for smoothness.

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="tools-tags-cloud" ref={containerRef} style={{ position: 'relative' }}>
            {tags.map((tag, index) => (
                <MagneticPill
                    key={index}
                    content={tag}
                    mousePos={mousePos}
                    index={index}
                />
            ))}
        </div>
    );
};

interface MagneticPillProps {
    content: string;
    mousePos: { x: number; y: number };
    index: number;
}

const MagneticPill: React.FC<MagneticPillProps> = ({ content, mousePos, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!ref.current) return;

        // Element center relative to the container
        const elem = ref.current;
        const elemX = elem.offsetLeft + elem.offsetWidth / 2;
        const elemY = elem.offsetTop + elem.offsetHeight / 2;

        const dx = mousePos.x - elemX;
        const dy = mousePos.y - elemY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const interactionRadius = 150; // Smaller radius for these pills
        const maxDisplacement = 60;   // Smaller displacement

        if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            const angle = Math.atan2(dy, dx);

            // Push away
            const moveX = -Math.cos(angle) * force * maxDisplacement;
            const moveY = -Math.sin(angle) * force * maxDisplacement;

            setOffset({ x: moveX, y: moveY });
        } else {
            setOffset({ x: 0, y: 0 });
        }
    }, [mousePos]);

    return (
        <motion.div
            ref={ref}
            className="crea-tool-pill"
            style={{
                display: 'inline-block', // Ensure it sits in the flow but can be transformed
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                cursor: 'default'
            }}
            // Keep the exit/enter animations from before
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3, // Fast physics transition managed by style, entrance managed here
                delay: index * 0.1
            }}
        // We use standard style transition for physics to be performant, 
        // but we can also use animate if we want. 
        // Let's stick to style transform for physics + CSS transition for smoothness
        >
            <div style={{ pointerEvents: 'none' }}> {/* Content wrapper */}
                {content}
            </div>
        </motion.div>
    );
};

export default CreativeInteractiveTags;
