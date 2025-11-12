import React, { useState, useEffect, useRef } from 'react';

// Import images and videos
import car1 from '../assets/images/car1.jpg';
import car3 from '../assets/images/car3.jpg';
import car4 from '../assets/images/car4.jpg';
import wash1 from '../assets/images/wash1.png';
import wash2 from '../assets/images/wash2.png';
import beforeAfterImage from '../assets/images/before-and-after-dent-repair.png';

// Import custom auto detailing assets
import autoDetailingVideo from '../assets/images/Auto detailing Service page.mp4';
import autoDetailingImage from '../assets/images/autodetailing.png';

// Import custom paint correction assets
import paintCorrectionVideo from '../assets/images/Paint Correction Polishing (1).mp4';
import paintCorrectionImage from '../assets/images/paint correction polishing.png';

// Import custom window tinting assets
import windowTintingVideo from '../assets/images/WindowtintHomepage.mp4';
import windowTintingImage from '../assets/images/windowtint.png';

// Import custom ceramic coating assets
import ceramicCoatingVideo from '../assets/images/Ceramic Coating Home page.mp4';

// Import custom paint protection film assets
import paintProtectionVideo from '../assets/images/PPF Home page.mp4';

// Import MPI Claims assets
import insuranceLogo from '../assets/images/insurance.png';

const ChooseYourService = ({ setCurrentView }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const touchTimerRef = useRef(null);
  const touchStartPos = useRef({ x: 0, y: 0 });
  const isTouchMoveRef = useRef(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isIPad = (
        (width === 768) || (width === 820) || (width === 834) || (width === 1024) ||
        navigator.userAgent.includes('iPad') || 
        (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document)
      );
      setIsSmallScreen(width < 768 && !isIPad);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
    };
  }, []);

  const servicesData = {
    "Auto Detailing": {
      displayName: "Auto Detailing",
      title: "Premium Auto Detailing",
      icon: autoDetailingImage,
      linkTo: 'auto-detailing'
    },
    "Paint Correction Polishing": {
      displayName: "Paint Correction Polishing",
      title: "Paint Correction Polishing",
      icon: paintCorrectionImage,
      linkTo: 'paint-correction'
    },
    "Window Tinting": {
      displayName: "Window Tinting",
      title: "Automotive Window Film",
      icon: windowTintingImage,
      linkTo: 'window-tinting'
    },
    "Ceramic Coating": {
      displayName: "Ceramic Coating",
      title: "Professional Ceramic Coating",
      icon: wash2,
      linkTo: 'ceramic-coatings'
    },
    "Paint Protection Film": {
      displayName: "Paint Protection Film",
      title: "Premium Paint Protection Film",
      icon: wash1,
      linkTo: 'paint-protection-film'
    },
    "MPI Claims": {
      displayName: "MPI Claims",
      title: "MPI Remediation Claims",
      icon: insuranceLogo,
      linkTo: 'remediation-claim'
    }
  };

  const handleServiceClick = (serviceName) => {
    const service = servicesData[serviceName];
    if (service?.linkTo) {
      setCurrentView(service.linkTo);
    } else {
      console.log("No page available for:", service.title);
    }
  };

  const handleTouchStart = (e, serviceName) => {
    isTouchMoveRef.current = false;
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchMove = (e) => {
    const moveThreshold = 10;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartPos.current.y);
    
    if (deltaX > moveThreshold || deltaY > moveThreshold) {
      isTouchMoveRef.current = true;
      setActiveCard(null);
    }
  };

  const handleTouchEnd = (serviceName) => {
    if (!isTouchMoveRef.current) {
      handleServiceClick(serviceName);
    }
    setActiveCard(null);
  };

  const handleTouchCancel = () => {
    setActiveCard(null);
    isTouchMoveRef.current = false;
  };

  const handleClick = (e, serviceName) => {
    e.stopPropagation();
    handleServiceClick(serviceName);
  };

  const renderServiceCard = (title) => {
    const serviceData = servicesData[title];
    const isActive = activeCard === title;
    
    return (
      <div 
        key={title}
        className="group cursor-pointer bg-white rounded-xl text-center transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-xl transform hover:-translate-y-1"
        onClick={(e) => handleClick(e, title)}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1393c4';
          const heading = e.currentTarget.querySelector('h3');
          const img = e.currentTarget.querySelector('img');
          if (heading) heading.style.color = 'white';
          if (img && title !== 'MPI Claims' && title !== 'Ceramic Coating' && title !== 'Paint Protection Film') {
            img.style.filter = 'brightness(0) invert(1)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          const heading = e.currentTarget.querySelector('h3');
          const img = e.currentTarget.querySelector('img');
          if (heading) heading.style.color = '#1393c4';
          if (img && title !== 'MPI Claims' && title !== 'Ceramic Coating' && title !== 'Paint Protection Film') {
            img.style.filter = 'brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(2878%) hue-rotate(180deg) brightness(96%) contrast(97%)';
          }
        }}
        onTouchStart={(e) => handleTouchStart(e, title)}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => handleTouchEnd(title)}
        onTouchCancel={handleTouchCancel}
        style={isActive ? {
          backgroundColor: '#1393c4',
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          borderColor: '#1393c4'
        } : {}}
      >
        <div className="mb-3 sm:mb-4 md:mb-6 flex justify-center py-2 sm:py-3">
          <img
            src={serviceData.icon}
            alt={title}
            className={`object-contain transition-all duration-300 ${
              title === 'Ceramic Coating' || title === 'Paint Protection Film'
                ? 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44'
                : 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32'
            }`}
            style={{ 
              filter: isActive && title !== 'MPI Claims' && title !== 'Ceramic Coating' && title !== 'Paint Protection Film'
                ? 'brightness(0) invert(1)' 
                : title === 'MPI Claims' || title === 'Ceramic Coating' || title === 'Paint Protection Film'
                  ? 'none' 
                  : 'brightness(0) saturate(100%) invert(65%) sepia(51%) saturate(2878%) hue-rotate(180deg) brightness(96%) contrast(97%)' 
            }}
          />
        </div>
        
        <h3 
          className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 px-2 transition-colors duration-300" 
          style={{ color: isActive ? 'white' : '#1393c4' }}
        >
          {serviceData.displayName}
        </h3>

        {isSmallScreen && isActive && (
          <div className="absolute inset-0 border-4 border-blue-400 rounded-xl pointer-events-none animate-pulse"></div>
        )}
      </div>
    );
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 sm:mb-4" style={{ color: '#1393c4' }}>
            CHOOSE YOUR SERVICE
          </h2>
          <div className="w-32 sm:w-40 h-1.5 sm:h-2 rounded-full mx-auto mb-4 sm:mb-6" style={{ background: 'linear-gradient(to right, #1393c4, #1580b0)' }}></div>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4" style={{ color: '#1393c4' }}>
            Transform your vehicle with our premium detailing services
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {renderServiceCard("Auto Detailing")}
          {renderServiceCard("Paint Correction Polishing")}
          {renderServiceCard("Window Tinting")}
          {renderServiceCard("Ceramic Coating")}
          {renderServiceCard("Paint Protection Film")}
          {renderServiceCard("MPI Claims")}
        </div>
      </div>
    </div>
  );
};

export default ChooseYourService;
