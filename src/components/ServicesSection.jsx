import React, { useState, useEffect, useRef } from 'react';
import References from './References';
import Footer from './Footer';

// Import local media files
import ceramicCoatingVideo from '../assets/images/ceramic coating.mp4';
import interiorDetailingVideo from '../assets/images/interior detailing.mp4';
import headlightRestorationImage from '../assets/images/Headlight Restoration.png';
import paintCorrectionVideo from '../assets/images/paintcorrectionservice.mp4';

const ServicesSection = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef(null);

  const services = [
    {
      id: 'interior-detailing',
      title: 'Interior Detailing',
      media: interiorDetailingVideo,
      mediaType: 'video',
      description: 'We use vapor steam to clean the vehicles dashboard, vents, center console, cup holder area and door panels. Shampoo seats and carpet. We also use special vacuum attachments to get between seats and hard to reach areas. We then protect all interior surfaces with a conditioner.'
    },
    {
      id: 'paint-correction',
      title: 'Paint Correction',
      media: paintCorrectionVideo,
      mediaType: 'video',
      description: 'Paint correction is a machine polish process to remove swirl marks, scratches, scuffs, bird dropping etching, acid rain etching, and other imperfections from your vehicle paint work, restoring an incredible high gloss finish.'
    },
    {
      id: 'ceramic-coating',
      title: 'Paint Protection Ceramic Coating',
      media: ceramicCoatingVideo,
      mediaType: 'video',
      description: 'CERAMIC PRO® is a permanent Nano-ceramic coating that will protects your car from damaging environmental fallout and help keep your car cleaner for longer and easier to clean with its slick Hydrophobic Effect. CERAMIC PRO® coating protect your vehicle from UV rays(ultraviolet rays), chemical stain, water spots, scratches and swirls marks.'
    },
    {
      id: 'headlight-restoration',
      title: 'Headlight Restoration',
      media: headlightRestorationImage,
      mediaType: 'image',
      description: 'Headlight restoration removes dull, yellowed headlight build up. We clean and restore your headlight with our dry sanding, wet sanding techniques then apply clear coat for maximum visibility.'
    },
    {
      id: 'engine-cleaning',
      title: 'Grim to Grime',
      media: 'https://actioncardetailing.ca/wp-content/uploads/2019/03/Engine_Bay_After_Detail.jpg.webp', // Keep original since no local file provided
      mediaType: 'image',
      description: 'An important part of vehicle detailing includes skilled and experienced engine cleaning from auto detailing experts equipped with the necessary knowledge to help ensure the engine appearance. We recommend cleaning your engine compartment to not only help retain the value of your vehicle, but to ultimately help keep your vehicle\'s engine cooler through the removal of grease, grim, and dirt.'
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const renderMedia = (service) => {
    if (service.mediaType === 'video') {
      return (
        <video
          src={service.media}
          className="w-full h-64 sm:h-72 lg:h-80 xl:h-96 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 rounded-xl"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      );
    } else {
      return (
        <img
          src={service.media}
          alt={service.title}
          className="w-full h-64 sm:h-72 lg:h-80 xl:h-96 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />
      );
    }
  };

  return (
    <>
      {/* Services Section */}
      <section className="bg-white min-h-screen py-12 lg:py-20">
        {/* Add top padding to account for fixed navbar */}
        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Moved down and centered */}
          <div 
            id="services-header"
            data-animate
            className={`text-center mb-16 lg:mb-20 transition-all duration-1000 transform ${
              visibleItems.has('services-header') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1393c4] mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-[#1393c4] mx-auto"></div>
          </div>

          {/* Services Cards - Ladder/Staggered Layout */}
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={service.id}
                  id={service.id}
                  data-animate
                  className={`transition-all duration-1000 transform ${
                    visibleItems.has(service.id)
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-16'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 300}ms` 
                  }}
                >
                  {/* Ladder Layout Container */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:ml-8'
                  }`}>
                    
                    {/* Text Content */}
                    <div className={`space-y-6 ${
                      isEven 
                        ? 'order-1 lg:order-1 lg:pr-8' 
                        : 'order-1 lg:order-2 lg:pl-8'
                    }`}>
                      <div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1393c4] mb-4 leading-tight">
                          {service.title}
                        </h3>
                        <div className="w-16 h-1 bg-[#1393c4] mb-6"></div>
                      </div>
                      
                      <p className="text-[#1393c4] text-base sm:text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Media (Video or Image) */}
                    <div className={`${
                      isEven 
                        ? 'order-2 lg:order-2' 
                        : 'order-2 lg:order-1'
                    }`}>
                      <div className="relative overflow-hidden rounded-xl shadow-2xl group">
                        {renderMedia(service)}
                        {/* Overlay effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1393c4]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Line for Ladder Effect (Optional Visual Enhancement) */}
                  {index < services.length - 1 && (
                    <div className={`hidden lg:block relative mt-12 ${
                      isEven ? 'ml-0' : 'ml-8'
                    }`}>
                      <div className={`absolute w-px h-8 bg-gradient-to-b from-[#1393c4]/30 to-transparent ${
                        isEven ? 'right-1/2' : 'left-1/2'
                      }`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* References Component */}
      <References />

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default ServicesSection;