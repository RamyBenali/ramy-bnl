import React, { useEffect, useRef, useState } from 'react';
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
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="orbit-scene interactive-scene" ref={containerRef}>
            {tags.map((tag, index) => (
                <MagneticTag
                    key={index}
                    tag={tag}
                    mousePos={mousePos}
                />
            ))}
        </div>
    );
};

interface MagneticTagProps {
    tag: TagData;
    mousePos: { x: number; y: number };
}

const MagneticTag: React.FC<MagneticTagProps> = ({ tag, mousePos }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        // Calculate center relative to the container logic if possible, 
        // but here rect is viewport relative, and mousePos is container relative.
        // Let's use viewport coordinates for simplicity in physics.

        // We need the element's center position in viewport
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Mouse position in viewport is available from the parent if we passed raw event clientX/Y
        // Actually, let's just use the logic relative to the element itself vs mouse

        // Re-calibrating: The container might be relative.
        // Let's use a simpler approach: 
        // We know the mouse position relative to the container (mousePos).
        // We need the element's position relative to the container.

        const elemX = ref.current.offsetLeft + ref.current.offsetWidth / 2;
        const elemY = ref.current.offsetTop + ref.current.offsetHeight / 2;

        const dx = mousePos.x - elemX;
        const dy = mousePos.y - elemY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const interactionRadius = 300; // Pixels
        const maxDisplacement = 150; // Max pixels to move away

        if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius; // 0 to 1
            const angle = Math.atan2(dy, dx);

            // Push away: opposite to angle
            const moveX = -Math.cos(angle) * force * maxDisplacement;
            const moveY = -Math.sin(angle) * force * maxDisplacement;

            setOffset({ x: moveX, y: moveY });
        } else {
            setOffset({ x: 0, y: 0 });
        }
    }, [mousePos]);

    return (
        <div
            ref={ref}
            className={`floating-tag-wrapper ${tag.class}`}
            style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition: 'transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)',
                // Overriding the CSS positioning mechanism for wrapper
            }}
        >
            {/* Inner div keeps the CSS float animation */}
            <div className="floating-tag-inner">
                {tag.content}
            </div>
        </div>
    );
};

export default InteractiveFloatingTags;
