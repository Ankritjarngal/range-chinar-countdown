import React, { useState, useEffect } from 'react';
import { CalendarCheck, MapPin, Instagram, Youtube, Film } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [leaves, setLeaves] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Set scroll animation to start after a short delay
    setTimeout(() => {
      setIsOpen(true);
    }, 800);
    
    const createLeaves = () => {
      const newLeaves = [];
      const screenWidth = window.innerWidth;
      // Adjust leaf count for more intensity
      let leafCount = 25;
      
      if (screenWidth < 640) {
        leafCount = 25;
      } else if (screenWidth < 480) {
        leafCount = 25;
      }
      
      for (let i = 0; i < leafCount; i++) {
        // Updated color palette to match background image better
        const colorPalette = [
          '#ff4500', // orange red
          '#ff5e00', // bright orange
          '#ff7800', // tangerine
          '#8B2500', // dark red
          '#d2691e', // chocolate
          '#8B4513', // saddle brown
          '#A0522D'  // sienna
        ];
        
        newLeaves.push({
          id: i,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * (screenWidth < 480 ? 25 : 40) + (screenWidth < 480 ? 20 : 25)}px`,
          delay: `${Math.random() * 5}s`,
          duration: `${Math.random() * 4 + 7}s`,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          rotation: Math.floor(Math.random() * 360),
          scale: 0.8 + Math.random() * 0.4
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
    
    const targetDate = new Date('2025-10-25T00:00:00');
    
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
           background: 'linear-gradient(to bottom, rgba(56, 94, 77, 0.6), rgba(43, 29, 14, 0.8))',
           backgroundImage: "url('/bg.png')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundBlendMode: 'overlay',
           fontFamily: "'Marcellus', 'Cinzel Decorative', serif"
         }}>
      {/* Falling Leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute z-10 leaf-fall"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`
          }}
        >
          {/* Leaf SVG */}
          <svg viewBox="0 0 100 100" style={{ fill: leaf.color }}>
            <path d="M50,10 C65,25 90,25 90,50 C90,75 65,75 50,90 C35,75 10,75 10,50 C10,25 35,25 50,10 Z" />
            <path d="M50,10 C50,30 50,70 50,90" stroke="#00000033" strokeWidth="2" />
          </svg>
        </div>
      ))}
      
      {/* Main Content with Scroll Animation */}
      <div className="relative z-20 w-11/12 max-w-3xl mx-auto my-4 sm:my-6 overflow-hidden">
        {/* Top scroll roll */}
        <div 
          className={`w-full h-12 sm:h-16 transition-all duration-1000 ease-out ${isOpen ? 'transform -translate-y-full' : ''}`}
          style={{
            background: '#5D4037',
            borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
            boxShadow: 'inset 0 -10px 15px -5px rgba(0,0,0,0.4), 0 5px 10px rgba(0,0,0,0.3)',
            zIndex: 30,
            position: 'absolute',
            top: isOpen ? '0' : '-2rem',
            left: 0,
            transformOrigin: 'top',
          }}
        ></div>

        {/* Bottom scroll roll */}
        <div 
          className={`w-full h-12 sm:h-16 transition-all duration-1000 ease-out ${isOpen ? 'transform translate-y-full' : ''}`}
          style={{
            background: '#5D4037',
            borderRadius: '0 0 50% 50% / 0 0 100% 100%',
            boxShadow: 'inset 0 10px 15px -5px rgba(0,0,0,0.4), 0 -5px 10px rgba(0,0,0,0.3)',
            zIndex: 30,
            position: 'absolute',
            bottom: isOpen ? '0' : '-2rem',
            left: 0,
            transformOrigin: 'bottom',
          }}
        ></div>

        {/* Content wrapper with animation */}
        <div 
          className={`w-full transition-all duration-1500 ease-out overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
          style={{
            transition: ' 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)'
          }}
        >
          <div 
            className="w-full py-6 sm:py-10 rounded-lg border-4 sm:border-8 border-double shadow-2xl p-4 sm:p-8"
            style={{ 
              
              backgroundColor: 'rgba(150, 85, 29, 0.85)', 
              borderColor: '#221a18ff',
              boxShadow: '0 0 30px rgba(28, 23, 23, 0.5)',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23D7CCC8\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              backgroundBlendMode: 'overlay'
            }}>
            {/* Corner decorations */}
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 sm:border-t-8 sm:border-l-8 border-amber-700"></div>
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 sm:border-t-8 sm:border-r-8 border-amber-700"></div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 sm:border-b-8 sm:border-l-8 border-amber-700"></div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 sm:border-b-8 sm:border-r-8 border-amber-700"></div>

            {/* Tagline */}
            <h4 className="text-sm xs:text-lg sm:text-2xl font-semibold text-center mb-2"
                style={{ color: '#c0bcb9ff' }}>
              . . . The Rhythm Begins In . . .
            </h4>
            
            {/* Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 tracking-wide text-center"
                style={{ color: '#fffefdff' }}>
              RANG-E-CHINAR 2.0
            </h1>
            
            <h3 className="text-md sm:text-l font-serif text-center mb-4 sm:mb-6"
                style={{ color: '#c0bcb9ff' }}>
              National Institute of Technology Srinagar
            </h3>
            
            <div className="w-full h-px my-4 sm:my-6 relative"
                style={{ backgroundColor: '#A1887F' }}>
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 px-4"
                  style={{ backgroundColor: '#1F1812' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    style={{ color: '#A1887F' }}>
                  <path d="M12 6L7 12H17L12 6Z" fill="currentColor" />
                  <path d="M12 18L17 12H7L12 18Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            
            {/* Timer Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="p-2 sm:p-4 md:p-6 rounded-md text-center transform hover:scale-105 transition duration-300 shadow-lg"
                  style={{ 
                    backgroundColor: '#56241bff', 
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: '#5D4037'
                  }}
                >
                  <div className="text-2xl sm:text-3xl md:text-5xl font-bold" 
                      style={{ color: '#FFCA80' }}>
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="capitalize text-xs sm:text-sm md:text-lg mt-1 sm:mt-2"
                      style={{ color: '#D7CCC8' }}>
                    {unit}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full h-px my-4 sm:my-8"
                style={{ backgroundColor: '#A1887F' }}></div>
            
            {/* Event Details Section */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-6 rounded-md border-2 sm:border-4 text-center max-w-lg mx-auto"
                style={{ 
                  backgroundColor: '#56241bff',
                  borderColor: '#5D4037'
                }}>
              <div className="flex items-center justify-center gap-2 sm:gap-3"
                  style={{ color: '#D7CCC8' }}>
                <CalendarCheck className="w-5 h-5 sm:w-8 sm:h-8" />
                <span className="text-lg sm:text-xl md:text-2xl font-serif">25<sup>th</sup>-26<sup>th</sup> October 2025</span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4"
                  style={{ color: '#D7CCC8' }}>
                <MapPin className="w-5 h-5 sm:w-8 sm:h-8" />
                <span className="text-lg sm:text-xl md:text-2xl font-serif">NIT Srinagar, Hazratbal</span>
              </div>
            </div>
            
            {/* Links Section */}
            <span>
              <div className="w-full h-px my-4 sm:my-6" style={{ backgroundColor: '#A1887F' }}></div>
              
              <div className="mt-4 sm:mt-6 text-center flex flex-wrap justify-center gap-4">
                {/* Instagram Link */}
                <a 
                  href="https://www.instagram.com/rang_e_chinar?igsh=MTd6dnBleXd2NGd3Yg=="
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{ 
                    backgroundColor: '#56241bff',
                    border: '2px solid #6D4C41',
                    color: '#D7CCC8'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">INSTAGRAM</span>
                </a>
                
                {/* YouTube Link */}
                <a 
                  href="https://youtube.com/@nitsrinagarofficial?si=HJOsKPe1Z1gjM6kF"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{ 
                    backgroundColor: '#56241bff',
                    border: '2px solid #6D4C41',
                    color: '#D7CCC8'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">YOUTUBE</span>
                </a>
                
                {/* Aftermovie Link */}
                <a 
                  href="https://www.youtube.com/watch?v=mQySVXseGkA"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{ 
                    backgroundColor: '#56241bff',
                    border: '2px solid #6D4C41',
                    color: '#D7CCC8'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Film className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">AFTERMOVIE '24</span>
                  <span className="inline sm:hidden">AFTERMOVIE</span>
                </a>
              </div>

              <div className="w-full h-px my-4 sm:my-6" style={{ backgroundColor: '#A1887F' }}></div>
            </span>
           
          </div>
        </div>
      </div>

      {/* Enhanced CSS for leaf animations */}
      <style jsx>{`
        @keyframes leaf-fall {
          0% {
            top: -20%;
            transform: translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          25% {
            transform: translateX(50px) rotate(70deg);
          }
          40% {
            transform: translateX(-30px) rotate(170deg);
          }
          60% {
            transform: translateX(25px) rotate(250deg);
          }
          75% {
            transform: translateX(-50px) rotate(300deg);
            opacity: 0.8;
          }
          95% {
            opacity: 0.7;
          }
          100% {
            top: 110%;
            transform: translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }
        
        .leaf-fall {
          position: absolute;
          top: -10%;
          animation-name: leaf-fall;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: normal;
          filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
        }
        
        /* Font import for Marcellus */
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
      `}</style>
    </div>
  );
}

export default App;