import React from 'react';
import { motion } from 'framer-motion';

interface PresentProps {
    onClick: () => void;
    color?: string; // Simple color name: 'red', 'blue', etc. or Tailwind class for backward compatibility
    disabled?: boolean;
}

// Map simple color names to Tailwind classes
const getColorClass = (color?: string): string => {
    if (!color) return 'bg-red-600';
    
    // If it already looks like a Tailwind class, use it directly (backward compatibility)
    if (color.startsWith('bg-')) return color;
    
    // Map simple color names to Tailwind classes
    const colorMap: Record<string, string> = {
        'red': 'bg-red-600',
        'blue': 'bg-blue-500',
        'green': 'bg-green-600',
        'purple': 'bg-purple-500',
        'pink': 'bg-pink-500',
        'orange': 'bg-orange-500',
        'yellow': 'bg-yellow-500',
        'teal': 'bg-teal-500',
        'indigo': 'bg-indigo-500',
    };
    
    return colorMap[color.toLowerCase()] || 'bg-red-600';
};

export const Present: React.FC<PresentProps> = ({ onClick, color, disabled = false }) => {
    const colorClass = getColorClass(color);
    
    return (
        <div className="relative group">
            <motion.div
                whileHover={disabled ? {} : { scale: 1.1, rotate: 5 }}
                whileTap={disabled ? {} : { scale: 0.9 }}
                className={`relative w-16 h-16 ${colorClass} rounded-md shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    disabled 
                        ? 'opacity-50 grayscale' 
                        : ''
                }`}
                onClick={onClick}
            >
                {/* Ribbon Vertical */}
                <div className="absolute w-4 h-full bg-yellow-400/80"></div>
                {/* Ribbon Horizontal */}
                <div className="absolute w-full h-4 bg-yellow-400/80"></div>

                {/* Bow */}
                <div className="absolute -top-3 w-8 h-4 bg-yellow-400 rounded-full shadow-sm"></div>
            </motion.div>
            
            {/* Tooltip */}
            {disabled && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    Already sent!
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                </div>
            )}
        </div>
    );
};
