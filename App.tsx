import React from 'react';
import { ValentineCard } from './components/ValentineCard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ddffe4] flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
      
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-green-300 text-6xl opacity-50 animate-bounce">♥</div>
      <div className="absolute bottom-20 right-20 text-green-300 text-8xl opacity-50 animate-pulse">♥</div>
      <div className="absolute top-1/2 right-10 text-white text-4xl opacity-40">♥</div>
      
      <ValentineCard />
    </div>
  );
};

export default App;