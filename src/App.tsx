import { useState, useEffect } from 'react';
import { Tree } from './components/Tree';
import { Present } from './components/Present';
import { Modal } from './components/Modal';
import { Snow } from './components/Snow';
import { Santa } from './components/Santa';
import { presents, type PresentData } from './presents';

function App() {
  const [selectedPresent, setSelectedPresent] = useState<PresentData | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [sentPresents, setSentPresents] = useState<Set<string>>(() => {
    // Load sent presents from localStorage
    const saved = localStorage.getItem('sentPresents');
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  useEffect(() => {
    // Remove any dark mode class that might be lingering
    document.documentElement.classList.remove('dark');
    // Clean up any dark mode localStorage entry
    localStorage.removeItem('darkMode');
    
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Update on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Save sent presents to localStorage whenever it changes
    localStorage.setItem('sentPresents', JSON.stringify(Array.from(sentPresents)));
  }, [sentPresents]);

  const handlePresentSent = (presentId: string) => {
    setSentPresents(prev => new Set(prev).add(presentId));
  };

  const resetPresentsStatus = () => {
    setSentPresents(new Set<string>());
    localStorage.removeItem('sentPresents');
  };

  return (
    <div className="h-screen bg-slate-900 text-white overflow-hidden relative font-sans flex flex-col">
      {/* Reset Presents Button */}
      <button
        onClick={resetPresentsStatus}
        type="button"
        className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
        aria-label="Reset presents status"
        title="Reset all presents to unsent"
      >
        <svg 
          className="w-5 h-5 text-gray-700" 
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

      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#d6eef2]">
        {/* Blurred background to fill space */}
        <div className="absolute inset-0">
          <img 
            src="/scene.png" 
            alt="" 
            className="w-full h-full object-cover blur-3xl scale-110 transition-opacity duration-500" 
          />
        </div>
        {/* Main image fully visible */}
        <img 
          src="/scene.png" 
          alt="Winter Scene" 
          className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500" 
        />

        <div className="absolute inset-0 bg-black/10 z-20 transition-colors duration-500"></div> {/* Overlay for text readability */}
      </div>

      <Snow />
      <Santa />

      <main className="relative z-10 flex flex-col items-center h-full w-full p-4">
        <header className="text-center shrink-0 z-30">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-600 tracking-wide font-merry-christmas">
            Share.Grow.Learn
          </h1>
          <p className="text-black font-sans text-xl md:text-2xl -mt-2">Holiday Edition</p>
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
                        disabled={present.id ? sentPresents.has(present.id) : false}
                      />
                    </div>
                  );
                });
              })()}
            </div>

            {/* Placeholder if no presents yet */}
            {presents.length === 0 && (
              <div className="text-slate-500 italic pointer-events-auto text-center">No presents yet. Add yours in src/presents!</div>
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
        presentId={selectedPresent?.id || undefined}
        onSend={handlePresentSent}
        isAlreadySent={selectedPresent && selectedPresent.id ? sentPresents.has(selectedPresent.id) : false}
      />
    </div>
  );
}

export default App;
