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
    }, 500);
    
    const createLeaves = () => {
      const newLeaves = [];
      const screenWidth = window.innerWidth;
      // Increase leaf count for more intensity
      let leafCount = 25;
      
      if (screenWidth < 640) {
        leafCount = 15;
      } else if (screenWidth < 480) {
        leafCount = 10;
      }
      
      for (let i = 0; i < leafCount; i++) {
        // Determine if this should be a spring color or autumn color
        const isSpringColor = Math.random() > 0.7; // 30% chance for spring colors
        
        let colorPalette;
        if (isSpringColor) {
          // Spring colors with some transparency
          colorPalette = [
            'rgba(152, 251, 152, 0.9)', // pale green
            'rgba(144, 238, 144, 0.9)', // light green
            'rgba(50, 205, 50, 0.9)',   // lime green
            'rgba(124, 252, 0, 0.9)',   // lawn green
            'rgba(173, 255, 47, 0.9)'   // green yellow
          ];
        } else {
          // Autumn colors as in the reference image - rich oranges and reds
          colorPalette = [
            '#ff4500', // orange red
            '#ff5e00', // bright orange
            '#ff7800', // tangerine
            '#ff8c00', // dark orange
            '#d2691e', // chocolate
            '#b22222', // firebrick red
            '#8b2500'  // dark red
          ];
        }
        
        newLeaves.push({
          id: i,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * (screenWidth < 480 ? 25 : 40) + (screenWidth < 480 ? 20 : 25)}px`,
          delay: `${Math.random() * 5}s`,
          duration: `${Math.random() * 4 + 7}s`,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          rotation: Math.floor(Math.random() * 360),
          // Add some variety to the scale to mimic the reference image
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
    
    const targetDate = new Date('2025-05-02T00:00:00');
    
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
           background: 'linear-gradient(to bottom, rgba(62, 39, 35, 0.8), rgba(93, 64, 55, 0.8))',
           backgroundImage: "url('/newBG.jpg')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundBlendMode: 'overlay',
           fontFamily: "'Marcellus', 'Cinzel Decorative', serif"
         }}>
      {/* Falling Maple Leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute z-10 maple-fall"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDelay: leaf.delay,
            animationDuration: leaf.duration,
            transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})` // Initial rotation and scale
          }}
        >
          {/* Realistic Maple Leaf SVG based on reference image */}
          <svg viewBox="0 0 100 100" style={{ fill: leaf.color }}>
            <path d="M50,3 C50,3 62,25 62,40 C70,38 80,25 82,18 C85,45 60,50 50,60 
                    C40,50 15,45 18,18 C20,25 30,38 38,40 C38,25 50,3 50,3 Z
                    M50,60 C55,70 68,75 75,80 C60,85 55,70 50,90 C45,70 40,85 25,80
                    C32,75 45,70 50,60 Z" />
          </svg>
        </div>
      ))}
      
      {/* Main Content with Scroll Animation */}
      <div className="relative z-20 w-11/12 max-w-3xl mx-auto my-4 sm:my-6 overflow-hidden">
        {/* Top scroll roll */}
        <div 
          className={`w-full h-12 sm:h-16 transition-all duration-1000 ease-out ${isOpen ? 'transform -translate-y-full' : ''}`}
          style={{
            background: '#8B5A2B',
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
            background: '#8B5A2B',
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
            transition: 'max-height 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)'
          }}
        >
          <div 
            className="w-full py-6 sm:py-10 rounded-lg border-4 sm:border-8 border-double shadow-2xl p-4 sm:p-8"
            style={{ 
              backgroundColor: 'rgba(41, 24, 15, 0.85)', 
              borderColor: '#593A27',
              boxShadow: '0 0 30px rgba(0,0,0,0.5)',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23593a27\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              backgroundBlendMode: 'overlay'
            }}>
            {/* Corner decorations */}
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 sm:border-t-8 sm:border-l-8 border-amber-800"></div>
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 sm:border-t-8 sm:border-r-8 border-amber-800"></div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 sm:border-b-8 sm:border-l-8 border-amber-800"></div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 sm:border-b-8 sm:border-r-8 border-amber-800"></div>

            {/* Tagline */}
            <h4 className="text-sm xs:text-lg sm:text-2xl font-semibold text-center mb-2"
                style={{ color: '#E8B25B' }}>
              The Rhythm Begins In...
            </h4>
            
            {/* Title - Modified to fit on smaller screens */}
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 tracking-wide text-center"
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
                <span className="text-lg sm:text-xl md:text-2xl font-serif">2<sup>nd</sup>-3<sup>rd</sup> May 2025</span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4"
                  style={{ color: '#D9AB77' }}>
                <MapPin className="w-5 h-5 sm:w-8 sm:h-8" />
                <span className="text-lg sm:text-xl md:text-2xl font-serif">NIT Srinagar, Hazratbal</span>
              </div>
            </div>
            
            {/* Links Section */}
            <span>
              <div className="w-full h-px my-4 sm:my-6" style={{ backgroundColor: '#8B4513' }}></div>
              
              <div className="mt-4 sm:mt-6 text-center flex flex-wrap justify-center gap-4">
                {/* Instagram Link */}
                <a 
                  href="https://www.instagram.com/rang_e_chinar?igsh=MTd6dnBleXd2NGd3Yg=="
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{ 
                    backgroundColor: '#5D342C',
                    border: '2px solid #704638',
                    color: '#D9AB77'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>
                
                {/* YouTube Link */}
                <a 
                  href="https://youtube.com/@nitsrinagarofficial?si=HJOsKPe1Z1gjM6kF"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{ 
                    backgroundColor: '#5D342C',
                    border: '2px solid #704638',
                    color: '#D9AB77'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">YouTube</span>
                </a>
                
                {/* Aftermovie Link */}
                <a 
                  href="https://www.youtube.com/watch?v=rangechinar24aftermovie"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  style={{ 
                    backgroundColor: '#5D342C',
                    border: '2px solid #704638',
                    color: '#D9AB77'
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Film className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline">Aftermovie '24</span>
                  <span className="inline sm:hidden">Aftermovie</span>
                </a>
              </div>

              <div className="w-full h-px my-4 sm:my-6" style={{ backgroundColor: '#8B4513' }}></div>
            </span>
           
          </div>
        </div>
      </div>

      {/* Enhanced CSS for maple leaf animations */}
      <style jsx>{`
        @keyframes maple-fall {
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
        
        .maple-fall {
          position: absolute;
          top: -10%;
          animation-name: maple-fall;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: normal;
          filter: drop-shadow(0 2px 2px rgba(198, 20, 20, 0.3));
        }
        
        /* Font import for Marcellus */
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
      `}</style>
    </div>
  );
}

export default App;