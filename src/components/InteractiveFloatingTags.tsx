import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './InteractiveFloatingTags.css';

interface TagData {
    content: string;
    class: string;
}

const tags: TagData[] = [
    { content: 'React', class: 't1' },
    { content: 'Node.js', class: 't2' },
    { content: 'TypeScript', class: 't3' },
    { content: 'Python', class: 't4' },
    { content: 'Java', class: 't5' },
    { content: 'Docker', class: 't6' },
    { content: 'Flutter', class: 't7' },
    { content: 'Git', class: 't8' },
];

const InteractiveFloatingTags: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    useEffect(() => {
        if (window.innerWidth < 900) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="orbit-scene interactive-scene" ref={containerRef}>
            {tags.map((tag, index) => (
                <MagneticTag
                    key={index}
                    tag={tag}
                    containerMouseX={mouseX}
                    containerMouseY={mouseY}
                />
            ))}
        </div>
    );
};

interface MagneticTagProps {
    tag: TagData;
    containerMouseX: any;
    containerMouseY: any;
}

const MagneticTag: React.FC<MagneticTagProps> = ({ tag, containerMouseX, containerMouseY }) => {
    const ref = useRef<HTMLDivElement>(null);

    // Using springs for smooth, hardware-accelerated movement
    const translateX = useSpring(0, { damping: 25, stiffness: 150 });
    const translateY = useSpring(0, { damping: 25, stiffness: 150 });

    useEffect(() => {
        const updateOffset = () => {
            if (!ref.current) return;

            const elemX = ref.current.offsetLeft + ref.current.offsetWidth / 2;
            const elemY = ref.current.offsetTop + ref.current.offsetHeight / 2;

            const dx = containerMouseX.get() - elemX;
            const dy = containerMouseY.get() - elemY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const interactionRadius = 300;
            const maxDisplacement = 150;

            if (dist < interactionRadius) {
                const force = (interactionRadius - dist) / interactionRadius;
                const angle = Math.atan2(dy, dx);

                translateX.set(-Math.cos(angle) * force * maxDisplacement);
                translateY.set(-Math.sin(angle) * force * maxDisplacement);
            } else {
                translateX.set(0);
                translateY.set(0);
            }
        };

        // Subscribe to motion values without triggering React renders
        const unsubscribeX = containerMouseX.on("change", updateOffset);
        const unsubscribeY = containerMouseY.on("change", updateOffset);

        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [containerMouseX, containerMouseY, translateX, translateY]);

    return (
        <motion.div
            ref={ref}
            className={`floating-tag-wrapper ${tag.class}`}
            style={{
                x: translateX,
                y: translateY,
            }}
        >
            <div className="floating-tag-inner">
                {tag.content}
            </div>
        </motion.div>
    );
};

export default InteractiveFloatingTags;
