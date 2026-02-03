import React from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';

interface AnimatedProgressBarProps {
    skillName: string;
    targetPercentage: number;
    delay?: number;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
    skillName,
    targetPercentage,
    delay = 0
}) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = React.useState(0);

    const springValue = useSpring(0, {
        stiffness: 40,
        damping: 20,
        mass: 1
    });

    const width = useTransform(springValue, (value) => `${value}%`);

    // Sync spring updates to state for text rendering
    React.useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplayValue(Math.round(latest));
        });
        return () => unsubscribe();
    }, [springValue]);

    React.useEffect(() => {
        if (isInView) {
            setTimeout(() => {
                springValue.set(targetPercentage);
            }, delay);
        }
    }, [isInView, targetPercentage, delay, springValue]);

    return (
        <div className="skill-item" ref={ref}>
            <div className="skill-info">
                <span>{skillName}</span>
                <motion.span className="skill-percentage" style={{ opacity: isInView ? 1 : 0 }}>
                    {displayValue}%
                </motion.span>
            </div>
            <div className="progress-bg">
                <motion.div className="progress-fill" style={{ width }} />
            </div>
        </div>
    );
};

export default AnimatedProgressBar;
