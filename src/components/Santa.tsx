import React from 'react';
import { motion } from 'framer-motion';

export const Santa: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[15] overflow-hidden">
      <motion.div
        className="absolute"
        style={{
          bottom: '15%', // Position Santa near the bottom of the screen
          left: 0,
          width: '200px',
          height: 'auto',
        }}
        initial={{ x: '-200px', y: 0, rotate: 0 }} // Start completely off-screen to the left
        animate={{
          x: 'calc(100vw + 200px)', // End completely off-screen to the right
          y: [0, -12, 0, -12, 0], // Bouncing up and down to simulate walking steps
          rotate: [0, 4, 0, -4, 0], // Slight rotation left and right for walking motion
        }}
        transition={{
          x: {
            duration: 20, // Takes 20 seconds to cross the screen
            repeat: Infinity,
            repeatDelay: 5, // Wait 5 seconds before starting again
            ease: 'linear',
          },
          y: {
            duration: 0.5, // Each step takes 0.5 seconds (bounce cycle)
            repeat: Infinity,
            ease: [0.42, 0, 0.58, 1], // Custom easing for more natural bounce
            times: [0, 0.3, 0.5, 0.8, 1], // More time at bottom, quick at top
          },
          rotate: {
            duration: 0.5, // Rotation syncs with the bounce
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.3, 0.5, 0.8, 1], // Sync with y animation
          },
        }}
      >
        <img
          src="/santa.webp"
          alt="Santa Claus"
          className="w-full h-auto drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
          }}
        />
      </motion.div>
    </div>
  );
};

