import React from 'react';
import bbbLogo from '../assets/images/bbb_logo.png.png';
import car6 from '../assets/images/car6.jpg';

const Reference1 = () => {
  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${car6})` }}
    >
      {/* Light blue transparent overlay */}
      <div className="absolute inset-0 bg-blue-400 opacity-60"></div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
        
        {/* BBB Logo only */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg sm:shadow-xl md:shadow-2xl">
          <img 
            src={bbbLogo} 
            alt="Better Business Bureau Logo" 
            className="h-28 w-auto sm:h-32 md:h-40 lg:h-48 xl:h-56 object-contain mx-auto"
          />
        </div>

      </div>
    </div>
  );
};

export default Reference1;