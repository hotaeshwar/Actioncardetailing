import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// Import existing images
import beforeImg from '../assets/images/before.jpg';
import before1Img from '../assets/images/before1.jpg';
import before2Img from '../assets/images/before2.jpg';
import before3Img from '../assets/images/before3.jpg';
import after4Img from '../assets/images/after4.jpg';

// Import new images
import after21Img from '../assets/images/After21.JPG';
import before21Img from '../assets/images/before21.JPG';
import before22Img from '../assets/images/before22.JPG';
import before23Img from '../assets/images/before23.jpg';
import before24Img from '../assets/images/before24.jpg';
import before25Img from '../assets/images/before25.JPG';
import before26Img from '../assets/images/before26.JPG';
import before27Img from '../assets/images/before27.JPG';
import before28Img from '../assets/images/before28.JPG';
import before29Img from '../assets/images/before29.JPG';
import before30Img from '../assets/images/before30.JPG';
import interiorbefore21Img from '../assets/images/interiorbefore21.JPG';

// Import Toyota images
import toyota4Runner from '../assets/images/Toyota 4 Runner .JPG';
import toyota4Runner1 from '../assets/images/Toyota 4 Runner 1.JPG';
import toyotaHighlander from '../assets/images/Toyota Highlander.JPG';
import toyotaTundra2 from '../assets/images/Toyota Tundra. 2.JPG';
import toyotaTundra from '../assets/images/Toyota Tundra.JPG';

const CardSliderCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(3);
  const intervalRef = useRef(null);
  const videoRefs = useRef([]);

  // Media items - organized sequence with all your images
  const mediaItems = [
    // All BEFORE images in one section
    { src: beforeImg, type: "image" },
    { src: before1Img, type: "image" },
    { src: before2Img, type: "image" },
    { src: before3Img, type: "image" },
    { src: before21Img, type: "image" },
    { src: before22Img, type: "image" },
    { src: before23Img, type: "image" },
    { src: before24Img, type: "image" },
    { src: before25Img, type: "image" },
    { src: before26Img, type: "image" },
    { src: before27Img, type: "image" },
    { src: before28Img, type: "image" },
    { src: before29Img, type: "image" },
    { src: before30Img, type: "image" },
    { src: interiorbefore21Img, type: "image" },
    
    // All AFTER images in one section
    { src: after4Img, type: "image" },
    { src: after21Img, type: "image" },
    
    // Toyota images
    { src: toyota4Runner, type: "image" },
    { src: toyota4Runner1, type: "image" },
    { src: toyotaHighlander, type: "image" },
    { src: toyotaTundra, type: "image" },
    { src: toyotaTundra2, type: "image" }
  ];

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Calculate max slides
  const maxSlides = Math.max(0, mediaItems.length - cardsPerView);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    setCurrentSlide(Math.min(index, maxSlides));
  }, [maxSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide >= maxSlides ? 0 : prevSlide + 1));
  }, [maxSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide <= 0 ? maxSlides : prevSlide - 1));
  }, [maxSlides]);

  // Auto-advance slides
  useEffect(() => {
    if (isAutoPlay && mediaItems.length > cardsPerView) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, nextSlide, mediaItems.length, cardsPerView]);

  // Handle auto-play toggle
  const handleAutoPlayToggle = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        handleAutoPlayToggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Handle video play/pause when slide changes
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && mediaItems[index]?.type === 'video') {
        const isVisible = index >= currentSlide && index < currentSlide + cardsPerView;
        if (isVisible) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentSlide, cardsPerView]);

  return (
    <div className="py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1393c4] mb-2">Before & After Gallery</h2>
          <p className="text-[#1393c4]">See the transformation power of our car wash services</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {mediaItems.length > cardsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20
                           w-12 h-12 bg-white shadow-lg hover:shadow-xl
                           rounded-full flex items-center justify-center
                           border border-gray-200 hover:border-[#1393c4]
                           transition-all duration-300 hover:scale-110
                           focus:outline-none focus:ring-2 focus:ring-[#1393c4]"
                aria-label="Previous slides"
              >
                <ChevronLeft className="w-6 h-6 text-[#1393c4]" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20
                           w-12 h-12 bg-white shadow-lg hover:shadow-xl
                           rounded-full flex items-center justify-center
                           border border-gray-200 hover:border-[#1393c4]
                           transition-all duration-300 hover:scale-110
                           focus:outline-none focus:ring-2 focus:ring-[#1393c4]"
                aria-label="Next slides"
              >
                <ChevronRight className="w-6 h-6 text-[#1393c4]" />
              </button>

              {/* Auto-play Toggle */}
              <button
                onClick={handleAutoPlayToggle}
                className="absolute top-0 right-0 z-20
                           w-10 h-10 bg-white/90 hover:bg-white
                           rounded-full flex items-center justify-center
                           border border-gray-200 hover:border-[#1393c4]
                           transition-all duration-300 hover:scale-110
                           focus:outline-none focus:ring-2 focus:ring-[#1393c4]"
                aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
              >
                {isAutoPlay ? (
                  <Pause className="w-4 h-4 text-[#1393c4]" />
                ) : (
                  <Play className="w-4 h-4 text-[#1393c4] ml-0.5" />
                )}
              </button>
            </>
          )}

          {/* Cards Container */}
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / cardsPerView)}%)`
              }}
            >
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {/* Media Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {item.type === 'video' ? (
                        <video
                          ref={el => videoRefs.current[index] = el}
                          src={item.src}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={`Car wash gallery image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          {mediaItems.length > cardsPerView && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1393c4] focus:ring-offset-2 ${
                    currentSlide === index
                      ? 'w-8 h-3 bg-[#1393c4]'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Counter */}
          {mediaItems.length > cardsPerView && (
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">
                {currentSlide + 1} of {maxSlides + 1} • {mediaItems.length} total images
              </span>
            </div>
          )}
        </div>

        {/* Navigation Hint */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Use arrow keys to navigate • Space to pause/play
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardSliderCarousel;
