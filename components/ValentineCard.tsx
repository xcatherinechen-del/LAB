import React, { useState, useCallback, useEffect } from 'react';

// Declare window.confetti locally to satisfy TypeScript compiler
declare global {
  interface Window {
    confetti: any;
  }
}

export const ValentineCard: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [hasRunAway, setHasRunAway] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState<{ x: number; y: number } | null>(null);
  const [transitionDuration, setTransitionDuration] = useState('0.1s'); // Start fast for the first jump

  // Specific cute shiba image
  const shibaImage = "https://images.dog.ceo/breeds/shiba/shiba-8.jpg";

  // Helper to get safe random position
  const getRandomPosition = () => {
    // Button dimensions approx 150x60. We use generous padding to keep it on screen.
    const padding = 40;
    const buttonWidth = 160;
    const buttonHeight = 60;
    
    const maxWidth = window.innerWidth - buttonWidth - padding;
    const maxHeight = window.innerHeight - buttonHeight - padding;
    
    return {
      x: Math.max(padding, Math.random() * maxWidth),
      y: Math.max(padding, Math.random() * maxHeight)
    };
  };

  // Continuous "Brownian" motion effect
  useEffect(() => {
    if (hasRunAway && !accepted) {
      // Create a drifting interval
      const intervalId = setInterval(() => {
        setTransitionDuration('1.5s'); // Slow, smooth drift
        setNoBtnPosition(getRandomPosition());
      }, 1500);

      return () => clearInterval(intervalId);
    }
  }, [hasRunAway, accepted]);

  const handleNoInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // 1. Trigger Confetti
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const xOrigin = clientX / window.innerWidth;
    const yOrigin = clientY / window.innerHeight;

    if (window.confetti) {
      window.confetti({
        particleCount: 20,
        spread: 50,
        origin: { x: xOrigin, y: yOrigin },
        colors: ['#ff69b4', '#ddffe4', '#ffeb3b', '#a5d8ff'],
        scalar: 0.6,
        startVelocity: 15,
        ticks: 60
      });
    }

    // 2. Run Away Logic
    setHasRunAway(true);
    setTransitionDuration('0.15s'); // Fast evasion
    setNoBtnPosition(getRandomPosition());

  }, []);

  const handleYesClick = useCallback(() => {
    setAccepted(true);
    triggerFireworks();
  }, []);

  const triggerFireworks = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      if (window.confetti) {
        window.confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff69b4', '#ddffe4', '#ffeb3b', '#a5d8ff']
        });
        window.confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff69b4', '#ddffe4', '#ffeb3b', '#a5d8ff']
        });
      }

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full border-4 border-white transition-all duration-500 transform hover:scale-[1.01]">
      {/* Top Half: Shiba Image */}
      <div className="h-64 w-full relative bg-gray-100 overflow-hidden group">
        <img 
          src={shibaImage} 
          alt="Cute Shiba Inu" 
          className={`w-full h-full object-cover transition-all duration-300 ${accepted ? 'shiba-party' : 'group-hover:scale-105'}`}
        />
        {accepted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-6xl animate-bounce">💖</span>
          </div>
        )}
      </div>

      {/* Bottom Half: Content */}
      <div className="p-8 text-center flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
          {accepted ? (
            <span className="text-pink-500 drop-shadow-sm">Amanda, you've made a shiba very happy!</span>
          ) : (
            "Amanda, will you be my valentine?"
          )}
        </h1>

        {!accepted && (
          <div className="flex gap-4 items-center justify-center w-full relative min-h-[60px]">
            {/* Yes Button */}
            <button
              onClick={handleYesClick}
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition-transform active:scale-95 hover:shadow-green-200 z-10"
            >
              Yes!
            </button>

            {/* No Button */}
            <button
              onMouseEnter={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              onClick={handleNoInteraction} // Fallback if they manage to click
              style={
                hasRunAway && noBtnPosition 
                  ? { 
                      position: 'fixed', 
                      left: noBtnPosition.x, 
                      top: noBtnPosition.y,
                      transition: `all ${transitionDuration} ease-in-out`,
                      zIndex: 50 // Ensure it floats above everything
                    } 
                  : {}
              }
              className={`bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-3 px-8 rounded-full text-xl shadow-md cursor-pointer whitespace-nowrap ${!hasRunAway ? 'animate-attention' : ''}`}
            >
              No
            </button>
          </div>
        )}

        {accepted && (
          <div className="animate-fade-in-up">
            <p className="text-gray-500 text-lg">
              Let's go for a walk and get some treats! 🦴
            </p>
            <div className="mt-6 flex justify-center gap-2 text-3xl">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🐕</span>
              <span className="animate-bounce" style={{ animationDelay: '100ms' }}>💕</span>
              <span className="animate-bounce" style={{ animationDelay: '200ms' }}>🐾</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};