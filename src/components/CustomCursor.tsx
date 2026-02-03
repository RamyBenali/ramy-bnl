import React, { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="cursor-dot"
            style={{
                x: cursorX,
                y: cursorY,
            }}
        />
    );
};

export default CustomCursor;
