import React, { useState, useEffect } from 'react';

interface TypewriterProps {
    texts: string[];
    speed?: number;
    delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ texts, speed = 100, delay = 2000 }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullText = texts[currentTextIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length + 1));
                if (currentText === fullText) {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length - 1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTextIndex, texts, speed, delay]);

    return (
        <span className="typewriter">
            {currentText}
            <span className="typewriter-cursor">|</span>
        </span>
    );
};

export default Typewriter;
