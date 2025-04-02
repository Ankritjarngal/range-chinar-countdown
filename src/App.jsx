import React, { useState, useEffect } from 'react';
import { CalendarCheck, MapPin } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [leaves, setLeaves] = useState([]);
  
  useEffect(() => {
    const createLeaves = () => {
      const newLeaves = [];
      const leafCount = window.innerWidth < 640 ? 6 : 12; // Reduce leaves for small screens
      
      for (let i = 0; i < leafCount; i++) {
        newLeaves.push({
          id: i,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 30 + 30}px`, 
          delay: `${Math.random() * 3}s`,
          duration: `${Math.random() * 5 + 8}s`,
          color: [
            '#8B4513', '#A52A2A', '#CD853F', '#D2691E', '#AA5303', '#9B2D06'
          ][Math.floor(Math.random() * 6)]
        });
      }
      
      setLeaves(newLeaves);
    };
    
    createLeaves();
    
    const targetDate = new Date('2025-05-04T00:00:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center p-4" 
         style={{ 
           background: 'linear-gradient(to bottom, #3E2723, #5D4037)',
           backgroundImage: "url('/autumn-bg.jpg')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundBlendMode: 'overlay'
         }}>
      {/* Falling Leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute z-10 simple-fall"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration
          }}
        >
          <svg viewBox="0 0 100 100" style={{ fill: leaf.color }}>
            <path d="M50,0 C70,25 100,25 100,50 C100,75 70,75 50,100 C30,75 0,75 0,50 C0,25 30,25 50,0 Z" />
          </svg>
        </div>
      ))}
      
      {/* Main Content */}
      <div className="relative z-20 w-11/12 max-w-3xl py-10 rounded-lg border-8 border-double shadow-2xl p-8 mx-auto my-6"
           style={{ 
             backgroundColor: 'rgba(41, 24, 15, 0.85)', 
             borderColor: '#593A27',
             boxShadow: '0 0 30px rgba(0,0,0,0.5)'
           }}>
        <div className="absolute -top-4 -left-4 w-8 h-8 border-t-8 border-l-8 border-amber-800"></div>
        <div className="absolute -top-4 -right-4 w-8 h-8 border-t-8 border-r-8 border-amber-800"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-8 border-l-8 border-amber-800"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-8 border-r-8 border-amber-800"></div>

        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 tracking-wide text-center"
            style={{ color: '#E8B25B' }}>
          RANG-E-CHINAR
        </h1>
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-2"
            style={{ color: '#D6A05C' }}>
          2025 Cultural Festival
        </h2>
        <h3 className="text-xl md:text-2xl font-serif text-center mb-6"
            style={{ color: '#C39355' }}>
          National Institute of Technology, Srinagar
        </h3>
        
        <div className="w-full h-px my-6 relative"
             style={{ backgroundColor: '#8B4513' }}>
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 px-4"
               style={{ backgroundColor: '#29180F' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" 
                 style={{ color: '#8B4513' }}>
              <path d="M12 6L7 12H17L12 6Z" fill="currentColor" />
              <path d="M12 18L17 12H7L12 18Z" fill="currentColor" />
            </svg>
          </div>
        </div>
        
        {/* Timer Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="p-4 sm:p-6 rounded-md text-center transform hover:scale-105 transition duration-300 shadow-lg"
              style={{ 
                backgroundColor: '#5D342C', 
                borderWidth: '4px',
                borderStyle: 'solid',
                borderColor: '#704638'
              }}
            >
              <div className="text-4xl sm:text-5xl font-bold" 
                   style={{ color: '#ECC089' }}>
                {value.toString().padStart(2, '0')}
              </div>
              <div className="capitalize text-md sm:text-lg mt-2"
                   style={{ color: '#D9AB77' }}>
                {unit}
              </div>
            </div>
          ))}
        </div>
        
        <div className="w-full h-px my-8"
             style={{ backgroundColor: '#8B4513' }}></div>
        
        {/* Event Details Section */}
        <div className="mt-6 p-6 rounded-md border-4 text-center max-w-lg mx-auto"
             style={{ 
               backgroundColor: 'rgba(64, 37, 25, 0.7)',
               borderColor: '#593A27'
             }}>
          <div className="flex items-center justify-center gap-3"
               style={{ color: '#D9AB77' }}>
            <CalendarCheck className="w-8 h-8" />
            <span className="text-xl sm:text-2xl font-serif">4th May 2025</span>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4"
               style={{ color: '#D9AB77' }}>
            <MapPin className="w-8 h-8" />
            <span className="text-xl sm:text-2xl font-serif">Hazratbal, Srinagar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
