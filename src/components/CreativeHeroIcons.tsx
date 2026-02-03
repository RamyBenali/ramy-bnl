import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Brush, Palette, Pen, Sparkles } from 'lucide-react';
import '../pages/CreativePage.css'; // Reuse existing styles

const CreativeHeroIcons: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const icons = [
        { id: 'ct1', icon: <Brush size={24} />, delay: 0 },
        { id: 'ct2', icon: <Palette size={28} />, delay: 0.5 },
        { id: 'ct3', icon: <Pen size={22} />, delay: 1 },
        { id: 'ct4', icon: <Sparkles size={26} />, delay: 1.5 },
        { id: 'ct5', icon: <Palette size={24} />, delay: 2 },
        { id: 'ct6', icon: <Brush size={26} />, delay: 2.5 },
    ];

    // Animation variants to replicate the existing CSS animations but with motion
    // Actually, the CSS animations (floating) were done via `animate` prop in CreativePage.tsx.
    // We should replicate those here.

    // Original animations from CreativePage.tsx:
    // ct1: y: [0, -20, 0], rotate: [0, 5, 0], duration 4
    // ct2: y: [0, -15, 0], rotate: [0, -5, 0], duration 5
    // ct3: y: [0, -18, 0], rotate: [0, 8, 0], duration 4.5
    // ct4: y: [0, -22, 0], rotate: [0, -6, 0], duration 4.8
    // ct5: y: [0, -16, 0], rotate: [0, 4, 0], duration 5.2
    // ct6: y: [0, -19, 0], rotate: [0, -7, 0], duration 4.3

    const getFloatingAnimation = (index: number) => {
        const animations = [
            { y: [0, -20, 0], rotate: [0, 5, 0], duration: 4 },
            { y: [0, -15, 0], rotate: [0, -5, 0], duration: 5 },
            { y: [0, -18, 0], rotate: [0, 8, 0], duration: 4.5 },
            { y: [0, -22, 0], rotate: [0, -6, 0], duration: 4.8 },
            { y: [0, -16, 0], rotate: [0, 4, 0], duration: 5.2 },
            { y: [0, -19, 0], rotate: [0, -7, 0], duration: 4.3 },
        ];
        return animations[index % animations.length];
    };

    return (
        <div className="floating-creative-tools" style={{ pointerEvents: 'none' }}>
            {icons.map((item, index) => (
                <MagneticIcon
                    key={item.id}
                    item={item}
                    mousePos={mousePos}
                    animation={getFloatingAnimation(index)}
                />
            ))}
        </div>
    );
};

interface MagneticIconProps {
    item: { id: string; icon: React.ReactNode; delay: number };
    mousePos: { x: number; y: number };
    animation: { y: number[]; rotate: number[]; duration: number };
}

const MagneticIcon: React.FC<MagneticIconProps> = ({ item, mousePos, animation }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const elemX = rect.left + rect.width / 2;
        const elemY = rect.top + rect.height / 2;

        const dx = mousePos.x - elemX;
        const dy = mousePos.y - elemY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const interactionRadius = 250; // Larger radius for hero elements
        const maxDisplacement = 100;

        if (dist < interactionRadius) {
            const force = (interactionRadius - dist) / interactionRadius;
            const angle = Math.atan2(dy, dx);
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
            className={item.id} // Apply positioning class (ct1, ct2...) to wrapper
            style={{
                position: 'absolute', // Ensure wrapper respects top/left from class
                pointerEvents: 'auto',
                x: offset.x,
                y: offset.y,
                zIndex: 10
            }}
        >
            {/* Apply Floating Animation AND Visual Styles to the same element */}
            <motion.div
                className="creative-tool"
                animate={{
                    y: animation.y,
                    rotate: animation.rotate
                }}
                transition={{
                    duration: animation.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay
                }}
                style={{
                    position: 'relative', // Override CSS absolute positioning
                    top: 'auto',
                    left: 'auto',
                    right: 'auto',
                    bottom: 'auto',
                    margin: 0
                }}
            >
                {item.icon}
            </motion.div>
        </motion.div>
    );
};

export default CreativeHeroIcons;
