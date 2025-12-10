import { useState, useEffect, useRef } from 'react';

export const MusicPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true); // Start muted by default
  const [showTooltip, setShowTooltip] = useState(true); // Show tooltip until first interaction
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Set volume to a reasonable level
      audio.volume = 0.5;
      
      // Start muted (music off by default)
      audio.muted = true;
      setIsMuted(true);

      // Function to try playing muted (to allow autoplay)
      const tryPlayMuted = () => {
        audio.muted = true;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio started playing (muted)');
            })
            .catch((error) => {
              console.log('Autoplay prevented:', error);
            });
        }
      };

      // Handle when audio can play
      const handleCanPlay = () => {
        tryPlayMuted();
      };

      // Try to play immediately (muted)
      tryPlayMuted();

      // Also listen for when audio is ready
      audio.addEventListener('canplaythrough', handleCanPlay);

      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlay);
      };
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      // Hide tooltip on first interaction
      if (showTooltip) {
        setShowTooltip(false);
      }

      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      audio.muted = newMutedState;
      
      // Make sure audio is playing (whether muting or unmuting)
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('Play failed:', error);
          });
        }
      }
    }
  };

  return (
    <>
      {/* Audio element with local music file */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/Jingle Bells (Instrumental).mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Mute/Unmute Button */}
      <div className="fixed top-16 left-4 z-50">
        <button
          onClick={toggleMute}
          type="button"
          className="relative w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          title={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? (
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
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
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
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>
        
        {/* Tooltip - visible until first interaction */}
        {showTooltip && (
          <div className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none animate-pulse">
            Click to unmute music
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-0 h-0 border-t-4 border-t-transparent border-r-4 border-r-gray-900 border-b-4 border-b-transparent"></div>
          </div>
        )}
      </div>
    </>
  );
};

