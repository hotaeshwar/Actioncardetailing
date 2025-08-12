import React from 'react';
import bbbLogo from '../assets/images/bbb_logo.png.png';
import car6 from '../assets/images/car6.jpg';

const Reference1 = () => {
  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${car6})` }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20 text-center">
        
        {/* BBB Logo */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 shadow-lg mb-6 sm:mb-8">
          <img 
            src={bbbLogo} 
            alt="Better Business Bureau Logo" 
            className="h-20 w-auto sm:h-24 md:h-28 lg:h-32 object-contain mx-auto"
          />
        </div>

        {/* Contact Text Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-6 sm:mb-8 md:mb-10 leading-relaxed">
            CONTACT US TO REQUEST MORE<br />
            INFORMATION ON OUR RATES AND<br />
            SERVICES
          </h2>
          
          {/* Phone number in vivid azure */}
          <span 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold inline-block"
            style={{ color: '#1393ca' }}
          >
            (204) 775-0005
          </span>
        </div>

      </div>
    </div>
  );
};

export default Reference1;
