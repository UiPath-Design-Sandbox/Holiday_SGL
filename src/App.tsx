import { useState, useEffect } from 'react';
import { Tree } from './components/Tree';
import { Present } from './components/Present';
import { Modal } from './components/Modal';
import { Snow } from './components/Snow';
import { presents, type PresentData } from './presents';

function App() {
  const [selectedPresent, setSelectedPresent] = useState<PresentData | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [sentPresents, setSentPresents] = useState<Set<string>>(() => {
    // Load sent presents from localStorage
    const saved = localStorage.getItem('sentPresents');
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference, default to false
    const saved = localStorage.getItem('darkMode');
    const darkMode = saved ? JSON.parse(saved) : false;
    // Apply dark mode class immediately on initial load
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return darkMode;
  });

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Update on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Apply dark mode class to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    // Save sent presents to localStorage whenever it changes
    localStorage.setItem('sentPresents', JSON.stringify(Array.from(sentPresents)));
  }, [sentPresents]);

  const handlePresentSent = (presentId: string) => {
    setSentPresents(prev => new Set(prev).add(presentId));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const resetPresentsStatus = () => {
    setSentPresents(new Set<string>());
    localStorage.removeItem('sentPresents');
  };

  return (
    <div className="h-screen bg-slate-900 dark:bg-slate-950 text-white overflow-hidden relative font-sans flex flex-col">
      {/* Reset Presents Button */}
      <button
        onClick={resetPresentsStatus}
        type="button"
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
        aria-label="Reset presents status"
        title="Reset all presents to unsent"
      >
        <svg 
          className="w-5 h-5 text-gray-700 dark:text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
      </button>

      {/* Dark Mode Toggle Switch */}
      <button
        onClick={toggleDarkMode}
        type="button"
        className="fixed top-4 right-4 z-50 w-16 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center p-1 cursor-pointer"
        aria-label="Toggle dark mode"
        role="switch"
        aria-checked={isDarkMode}
      >
        {/* Toggle Track */}
        <div className="relative w-full h-full flex items-center pointer-events-none">
          {/* Sliding Toggle Circle */}
          <div
            className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-blue-400 dark:to-purple-500 shadow-md transition-all duration-300 ease-in-out z-0 flex items-center justify-center pointer-events-none"
            style={{
              left: isDarkMode ? 'calc(100% - 1.5rem)' : '0',
            }}
          >
            {/* Icon inside the circle - shows based on mode */}
            {isDarkMode ? (
              <svg className="w-4 h-4 text-yellow-300 z-10 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-yellow-600 z-10 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          
          {/* Sun Icon (Light Mode) - Fixed position on left */}
          <div className={`absolute left-1 z-10 transition-opacity duration-300 flex items-center justify-center pointer-events-none ${isDarkMode ? 'opacity-30' : 'opacity-100'}`}>
            <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* Moon Icon (Dark Mode) - Fixed position on right */}
          <div className={`absolute right-1 z-10 transition-opacity duration-300 flex items-center justify-center pointer-events-none ${isDarkMode ? 'opacity-100' : 'opacity-30'}`}>
            <svg className="w-4 h-4 text-blue-400 dark:text-yellow-300 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </div>
        </div>
      </button>

      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#d6eef2] dark:bg-slate-900">
        {/* Blurred background to fill space */}
        <div className="absolute inset-0">
          <img 
            src={isDarkMode ? "/bg.png" : "/scene.png"} 
            alt="" 
            className="w-full h-full object-cover blur-3xl scale-110 transition-opacity duration-500" 
          />
        </div>
        {/* Main image fully visible */}
        <img 
          src={isDarkMode ? "/bg.png" : "/scene.png"} 
          alt={isDarkMode ? "Dark Winter Scene" : "Winter Scene"} 
          className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500" 
        />

        <div className="absolute inset-0 bg-black/10 dark:bg-black/30 z-20 transition-colors duration-500"></div> {/* Overlay for text readability */}
      </div>

      <Snow />

      <main className="relative z-10 flex flex-col items-center h-full w-full p-4">
        <header className="text-center shrink-0 z-30">
          <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] tracking-wide">
            Share.Grow.Learn
          </h1>
          <p className="text-white mt-1 text-2xl font-medium tracking-wider uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">Holiday edition</p>
        </header>

        {/* The Tree - Takes available space */}
        <div className="flex-1 w-full flex justify-center items-end pb-4 min-h-0 relative">
          <Tree />
          
          {/* Presents scattered below the tree */}
          <div className="absolute bottom-0 left-0 right-0 w-full h-40 md:h-48 lg:h-56 z-20 px-4 md:px-8 pointer-events-none">
            <div className="relative w-full h-full pointer-events-auto">
              {windowWidth > 0 && (() => {
                // Show all presents
                const totalPresents = presents.length;
                
                // Calculate optimal spacing to prevent overlap
                // Each present is about 64px (w-16 h-16), so we need at least 80px spacing
                const presentSize = 80; // Approximate size including spacing
                
                // Calculate number of columns based on available width
                const availableWidth = windowWidth - 64; // Account for padding
                const maxCols = Math.floor(availableWidth / presentSize);
                // For 30 presents, aim for a balanced grid (e.g., 6x5 or 7x5)
                const cols = Math.min(maxCols, Math.max(5, Math.ceil(Math.sqrt(totalPresents * 1.2))));
                const rows = Math.ceil(totalPresents / cols);
                
                return presents.map((present, index) => {
                  const seed = index * 137.508; // Golden angle for consistent distribution
                  
                  // Calculate grid position
                  const row = Math.floor(index / cols);
                  const col = index % cols;
                  
                  // Base position with proper spacing to prevent overlap
                  const spacingX = 100 / (cols + 1);
                  const spacingY = 100 / (rows + 1);
                  
                  const baseX = spacingX * (col + 1);
                  const baseY = spacingY * (row + 1);
                  
                  // Add small organic variation (reduced to prevent overlap)
                  // Use smaller variation to ensure no overlap with 30 presents
                  const maxVariationX = Math.min(4, spacingX * 0.15); // Max 4% or 15% of spacing
                  const maxVariationY = Math.min(3, spacingY * 0.15); // Max 3% or 15% of spacing
                  const variationX = (Math.sin(seed) * maxVariationX);
                  const variationY = (Math.cos(seed * 1.3) * maxVariationY);
                  
                  // Add slight rotation for natural look
                  const rotation = (Math.sin(seed * 2) * 10); // ±10 degrees (reduced for tighter spacing)
                  
                  // Ensure positions stay within bounds with margin
                  const x = Math.max(6, Math.min(94, baseX + variationX));
                  const y = Math.max(6, Math.min(94, baseY + variationY));

                  return (
                    <div
                      key={present.id}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                      }}
                    >
                      <Present
                        color={present.color}
                        onClick={() => setSelectedPresent(present)}
                        disabled={sentPresents.has(present.id)}
                      />
                    </div>
                  );
                });
              })()}
            </div>

            {/* Placeholder if no presents yet */}
            {presents.length === 0 && (
              <div className="text-slate-500 dark:text-slate-400 italic pointer-events-auto text-center">No presents yet. Add yours in src/presents!</div>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={!!selectedPresent}
        onClose={() => setSelectedPresent(null)}
        sender={selectedPresent?.sender || ''}
        postcardImage={selectedPresent?.postcardImage}
        wishes={selectedPresent?.wishes}
        presentId={selectedPresent?.id}
        onSend={handlePresentSent}
        isAlreadySent={selectedPresent ? sentPresents.has(selectedPresent.id) : false}
      />
    </div>
  );
}

export default App;
