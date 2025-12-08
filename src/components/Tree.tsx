import React from 'react';

export const Tree: React.FC = () => {
    return (
        <div className="relative flex flex-col items-center justify-end h-[65vh] w-full mt-4 origin-bottom">
            {/* Invisible spacer to push presents down */}
            <div className="w-full h-full"></div>
        </div>
    );
};
