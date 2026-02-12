import React, { useState, useRef, useCallback } from 'react';
import '../types'; // Import global types

export const ValentineCard: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [noBtnStyle, setNoBtnStyle] = useState<React.CSSProperties>({});
  const [noBtnScale, setNoBtnScale] = useState(1);
  
  // Specific cute shiba image
  const shibaImage = "https://images.dog.ceo/breeds/shiba/shiba-8.jpg";

  const handleNoHover = useCallback(() => {
    // Calculate random position
    const x = Math.random() * 200 - 100; // -100 to 100
    const y = Math.random() * 200 - 100; // -100 to 100
    
    setNoBtnStyle({
      transform: `translate(${x}px, ${y}px)`,
      transition: 'all 0.2s ease-out',
    });
    
    // Shrink the button slightly each time to make it harder
    setNoBtnScale(prev => Math.max(0.5, prev - 0.1));
  }, []);

  const handleYesClick = useCallback(() => {
    setAccepted(true);
    triggerFireworks();
  }, []);

  const triggerFireworks = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      // launch a few confetti from the left edge
      window.confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff69b4', '#ddffe4', '#ffeb3b', '#a5d8ff']
      });
      // and launch a few from the right edge
      window.confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff69b4', '#ddffe4', '#ffeb3b', '#a5d8ff']
      });

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
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition-transform active:scale-95 hover:shadow-green-200"
            >
              Yes!
            </button>

            {/* No Button */}
            <button
              onMouseEnter={handleNoHover}
              onClick={handleNoHover} /* In case they manage to click, it moves away */
              style={{
                ...noBtnStyle,
                scale: `${noBtnScale}`
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-3 px-8 rounded-full text-xl shadow-md transition-colors cursor-pointer"
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