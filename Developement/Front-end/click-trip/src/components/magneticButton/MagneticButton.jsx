import React, { useEffect, useRef } from 'react';
import './MagneticButton.scss';

const MagneticButton = ({ children, className = '', ...props }) => {
    const particleFieldRef = useRef(null);

    useEffect(() => {
        const particleField = particleFieldRef.current;
        if (!particleField) return;

        particleField.innerHTML = '';

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
            particle.style.setProperty('--y', `${Math.random() * 200 - 100}px`);
            particle.style.animation = `particleFloat ${1 + Math.random() * 2}s infinite`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particleField.appendChild(particle);
        }
    }, []);

    return (
        <button className={`btn magnetic ${className}`} {...props}>
            <span>{children}</span>
            <div className="particles-field" ref={particleFieldRef}></div>
        </button>
    );
};

export default MagneticButton;
