import React from 'react';
import { motion } from 'framer-motion';

export const Snow: React.FC = () => {
    // Create 50 snowflakes
    const snowflakes = React.useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 5,
        size: Math.random() * 10 + 5,
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    className="absolute bg-white rounded-full opacity-80"
                    style={{
                        left: flake.left,
                        width: flake.size,
                        height: flake.size,
                        top: -20,
                    }}
                    animate={{
                        top: ['0%', '100%'],
                        x: [0, Math.random() * 30 - 15, 0], // Slight horizontal drift
                    }}
                    transition={{
                        duration: flake.duration,
                        repeat: Infinity,
                        delay: flake.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};
