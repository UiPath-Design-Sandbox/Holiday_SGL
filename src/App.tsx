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
          className="absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500" 
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
        <div className="flex-1 w-full flex justify-center items-end pb-4 min-h-0">
          <Tree />
        </div>

        {/* Presents in Semi-Circle/Arch */}
        <div className="absolute bottom-4 left-0 right-0 w-full z-20 px-8 pointer-events-none">
          <div className="relative w-full h-48 pointer-events-auto">
            {windowWidth > 0 && (() => {
              // Reorder presents to start from center and alternate left-right
              const reorderedPresents: typeof presents = [];
              const center = Math.floor(presents.length / 2);

              // Add center present first
              if (presents.length > 0) {
                reorderedPresents.push(presents[center]);
              }

              // Alternate adding presents to right and left
              for (let i = 1; i <= center; i++) {
                // Add to the right
                if (center + i < presents.length) {
                  reorderedPresents.push(presents[center + i]);
                }
                // Add to the left
                if (center - i >= 0) {
                  reorderedPresents.push(presents[center - i]);
                }
              }

              return reorderedPresents.map((present, index) => {
                // Calculate position along an inverted semi-circle (top-bottom-top)
                const totalPresents = reorderedPresents.length;

                // Dynamic arc span: starts narrow with few presents, expands to full width with more
                // With 3 presents: ~60 degrees, with 10+: 180 degrees (full arch)
                const maxArcSpan = 180;
                const minArcSpan = 60;
                const arcSpan = Math.min(maxArcSpan, minArcSpan + (totalPresents - 1) * 12);

                // Center the arc by starting at the appropriate offset
                const startAngle = (180 - arcSpan) / 2;
                const angle = startAngle + (arcSpan / (totalPresents - 1 || 1)) * index;
                const angleRad = (angle * Math.PI) / 180;

                // Radius of the arc - use viewport width for full-width arch
                const radius = windowWidth * 0.45; // 45% of viewport width for nice curvature

                // Calculate x and y positions
                // For inverted arc: x goes from left to right, y goes down then up
                const x = 50 + (Math.cos(angleRad) * 45); // 45% spread from center
                const y = (Math.sin(angleRad) * radius * 100) / 800; // Shallower arch - increased divisor

                return (
                  <div
                    key={present.id}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
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
