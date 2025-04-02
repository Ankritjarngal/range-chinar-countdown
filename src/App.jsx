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
      // Further reduce leaves count for very small screens
      const screenWidth = window.innerWidth;
      let leafCount = 12;
      
      if (screenWidth < 640) {
        leafCount = 6;
      } else if (screenWidth < 480) {
        leafCount = 4;
      }
      
      for (let i = 0; i < leafCount; i++) {
        newLeaves.push({
          id: i,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * (screenWidth < 480 ? 20 : 30) + (screenWidth < 480 ? 20 : 30)}px`, // Smaller leaves on mobile
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
    
    // Handle resize events to update leaves
    const handleResize = () => {
      createLeaves();
    };
    
    window.addEventListener('resize', handleResize);
    
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
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center p-2 sm:p-4" 
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
      <div className="relative z-20 w-11/12 max-w-3xl py-6 sm:py-10 rounded-lg border-4 sm:border-8 border-double shadow-2xl p-4 sm:p-8 mx-auto my-4 sm:my-6"
           style={{ 
             backgroundColor: 'rgba(41, 24, 15, 0.85)', 
             borderColor: '#593A27',
             boxShadow: '0 0 30px rgba(0,0,0,0.5)'
           }}>
        <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 sm:border-t-8 sm:border-l-8 border-amber-800"></div>
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 sm:border-t-8 sm:border-r-8 border-amber-800"></div>
        <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 sm:border-b-8 sm:border-l-8 border-amber-800"></div>
        <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 sm:border-b-8 sm:border-r-8 border-amber-800"></div>

        {/* Title - Modified to fit on smaller screens */}
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-2 sm:mb-4 tracking-wide text-center"
            style={{ color: '#E8B25B' }}>
          RANG-E-CHINAR 2.0
        </h1>
        
        <h3 className="text-md sm:text-xl font-serif text-center mb-4 sm:mb-6"
            style={{ color: '#C39355' }}>
          National Institute of Technology, Srinagar
        </h3>
        
        <div className="w-full h-px my-4 sm:my-6 relative"
             style={{ backgroundColor: '#8B4513' }}>
          <div className="absolute left-1/2 -translate-x-1/2 -top-2 px-4"
               style={{ backgroundColor: '#29180F' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                 style={{ color: '#8B4513' }}>
              <path d="M12 6L7 12H17L12 6Z" fill="currentColor" />
              <path d="M12 18L17 12H7L12 18Z" fill="currentColor" />
            </svg>
          </div>
        </div>
        
        {/* Timer Section - Improved for mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="p-2 sm:p-4 md:p-6 rounded-md text-center transform hover:scale-105 transition duration-300 shadow-lg"
              style={{ 
                backgroundColor: '#5D342C', 
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: '#704638'
              }}
            >
              <div className="text-2xl sm:text-3xl md:text-5xl font-bold" 
                   style={{ color: '#ECC089' }}>
                {value.toString().padStart(2, '0')}
              </div>
              <div className="capitalize text-xs sm:text-sm md:text-lg mt-1 sm:mt-2"
                   style={{ color: '#D9AB77' }}>
                {unit}
              </div>
            </div>
          ))}
        </div>
        
        <div className="w-full h-px my-4 sm:my-8"
             style={{ backgroundColor: '#8B4513' }}></div>
        
        {/* Event Details Section */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-6 rounded-md border-2 sm:border-4 text-center max-w-lg mx-auto"
             style={{ 
               backgroundColor: 'rgba(64, 37, 25, 0.7)',
               borderColor: '#593A27'
             }}>
          <div className="flex items-center justify-center gap-2 sm:gap-3"
               style={{ color: '#D9AB77' }}>
            <CalendarCheck className="w-5 h-5 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl md:text-2xl font-serif">4th,5th May 2025</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4"
               style={{ color: '#D9AB77' }}>
            <MapPin className="w-5 h-5 sm:w-8 sm:h-8" />
            <span className="text-lg sm:text-xl md:text-2xl font-serif">Hazratbal, Srinagar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;