import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './LightFollower.css';

const LightFollower: React.FC = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 40, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="light-follower"
            style={{
                translateX: x,
                translateY: y,
                left: -250,
                top: -250,
            }}
        />
    );
};

export default LightFollower;
