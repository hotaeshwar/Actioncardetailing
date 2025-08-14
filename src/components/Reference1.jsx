import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, Copy, Check } from 'lucide-react';
import bbbLogo from '../assets/images/bbb_logo.png.png';
import car6 from '../assets/images/car6.jpg';

const Reference1 = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const phoneNumber = '(204) 775-0005';
  const whatsappNumber = '2047750005'; // Remove formatting for WhatsApp

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handlePhoneClick = () => {
    setShowOptions(!showOptions);
  };

  const contactOptions = [
    {
      icon: Phone,
      label: 'Call Now',
      action: () => window.open(`tel:${phoneNumber}`, '_self'),
      color: '#10B981'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      action: () => window.open(`https://wa.me/${whatsappNumber}`, '_blank'),
      color: '#25D366'
    },
    {
      icon: Mail,
      label: 'Email',
      action: () => window.open('mailto:info@example.com', '_self'),
      color: '#3B82F6'
    },
    {
      icon: copied ? Check : Copy,
      label: copied ? 'Copied!' : 'Copy Number',
      action: handleCopyNumber,
      color: copied ? '#10B981' : '#6B7280'
    }
  ];

  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${car6})` }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50 md:opacity-60"></div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:px-16 xl:py-20 text-center">
        
        {/* BBB Logo Card - Responsive sizing */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 shadow-lg mb-6 sm:mb-8 md:mb-10 lg:mb-12 hover:shadow-xl transition-all duration-300">
          <img 
            src={bbbLogo} 
            alt="Better Business Bureau Logo" 
            className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 xl:h-20 2xl:h-24 object-contain mx-auto"
          />
        </div>

        {/* Contact Text Section - Enhanced responsive text */}
        <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-relaxed tracking-wide">
            CONTACT US TO REQUEST MORE<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>INFORMATION ON OUR RATES AND<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>SERVICES
          </h2>
          
          {/* Phone number - Enhanced responsive sizing & Clickable */}
          <div className="relative inline-block">
            <button
              onClick={handlePhoneClick}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 rounded-lg px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 lg:px-5 lg:py-3"
              style={{ color: '#1393ca' }}
              aria-label="Contact options"
            >
              {phoneNumber}
            </button>

            {/* Contact Options Popup - Enhanced responsive design */}
            {showOptions && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 sm:mt-3 md:mt-4 bg-white rounded-xl shadow-2xl p-3 sm:p-4 md:p-5 min-w-52 sm:min-w-60 md:min-w-64 lg:min-w-72 z-50 animate-fadeIn">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {contactOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          option.action();
                          setShowOptions(false);
                        }}
                        className="flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 group"
                        style={{ color: option.color }}
                      >
                        <IconComponent 
                          size={window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 22 : 24} 
                          className="mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-200"
                        />
                        <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 text-center leading-tight">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                {/* Close button - Responsive sizing */}
                <button
                  onClick={() => setShowOptions(false)}
                  className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center text-gray-600 text-xs sm:text-sm md:text-base font-bold transition-colors duration-200"
                  aria-label="Close options"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Click outside to close */}
        {showOptions && (
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Reference1;
