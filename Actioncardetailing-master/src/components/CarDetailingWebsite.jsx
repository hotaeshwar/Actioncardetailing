import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, Car, Clock, Calendar, ShoppingCart, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Footer from '../components/Footer';
import Booking from '../components/Booking';
import ContactForm from '../components/ContactForm';
import References from '../components/Reference1';
import googlePng from '../assets/images/google png.png';
import detailingVideo from '../assets/images/Auto detailing Service page.mp4';

const CarDetailingWebsite = () => {
  const [isVisible, setIsVisible] = useState(Array(7).fill(false));
  const videoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Video handling like Hero component
  useEffect(() => {
    // Check if screen is small or iPad
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

    // Optimized video handling with performance improvements
    const video = videoRef.current;
    
    if (video) {
      // Essential settings for smooth playback
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      
      // Performance optimizations for smoother playback
      video.preload = 'metadata';
      video.poster = '';
      
      // Hardware acceleration and smooth rendering
      video.style.willChange = 'transform';
      video.style.backfaceVisibility = 'hidden';
      
      // iPad-specific video adjustments to prevent stretching
      const adjustVideoFit = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Detect iPad devices
        const isIPad = (
          (width === 768 && height === 1024) ||
          (width === 820 && height === 1180) ||
          (width === 834 && height === 1194) ||
          (width === 1024 && height === 1366) ||
          (height === 768 && width === 1024) ||
          (height === 820 && width === 1180) ||
          (height === 834 && width === 1194) ||
          (height === 1024 && width === 1366) ||
          (navigator.userAgent.includes('iPad') || 
           (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document))
        );
        
        // Calculate aspect ratios
        const screenRatio = width / height;
        const videoRatio = 16 / 9; // Assuming your video is 16:9
        
        // Base styles for all devices
        video.style.objectFit = 'cover';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.transform = 'translateZ(0)';
        
        // iPad-specific positioning to prevent stretching
        if (isIPad) {
          video.style.objectPosition = 'center center';
          // Ensure the video covers properly without stretching
          video.style.minWidth = '100%';
          video.style.minHeight = '100%';
        }
        // Other devices
        else if (screenRatio > videoRatio) {
          video.style.objectPosition = 'center center';
        } else {
          video.style.objectPosition = 'center 40%';
        }
      };
      
      // Apply initial adjustments
      adjustVideoFit();
      
      // Optimized event listeners with throttling
      let resizeTimeout;
      const throttledResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustVideoFit, 100);
      };
      
      window.addEventListener('resize', throttledResize);
      window.addEventListener('orientationchange', () => {
        setTimeout(adjustVideoFit, 300);
      });
      
      // Enhanced autoplay with better error handling
      const playVideo = async () => {
        try {
          if (video.readyState >= 2) {
            await video.play();
          } else {
            video.addEventListener('loadeddata', async () => {
              try {
                await video.play();
              } catch (error) {
                console.log('Autoplay failed, waiting for user interaction');
              }
            }, { once: true });
          }
        } catch (error) {
          const enableVideo = async () => {
            try {
              await video.play();
              document.removeEventListener('click', enableVideo);
              document.removeEventListener('touchstart', enableVideo);
            } catch (err) {
              console.log('Video play failed:', err);
            }
          };
          
          document.addEventListener('click', enableVideo, { once: true });
          document.addEventListener('touchstart', enableVideo, { once: true });
        }
      };
      
      setTimeout(playVideo, 100);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', throttledResize);
        window.removeEventListener('orientationchange', adjustVideoFit);
        clearTimeout(resizeTimeout);
      };
    }

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Height calculation from Hero component
  const getContainerHeight = () => {
    if (typeof window === 'undefined') return '100vh';
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Detect iPad devices by common resolutions
    const isIPad = (
      // iPad Mini: 768x1024
      (width === 768 && height === 1024) ||
      // iPad Air: 820x1180  
      (width === 820 && height === 1180) ||
      // iPad Pro 11": 834x1194
      (width === 834 && height === 1194) ||
      // iPad Pro 12.9": 1024x1366
      (width === 1024 && height === 1366) ||
      // Landscape orientations
      (height === 768 && width === 1024) ||
      (height === 820 && width === 1180) ||
      (height === 834 && width === 1194) ||
      (height === 1024 && width === 1366) ||
      // General iPad detection for other cases
      (navigator.userAgent.includes('iPad') || 
       (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document))
    );
    
    // Mobile phones (portrait)
    if (width < 768) {
      return Math.min(height * 0.6, 500);
    }
    // iPad specific handling
    else if (isIPad) {
      // For iPads, use fixed height based on width to maintain proper video aspect ratio
      return Math.min(width * 0.5625, height * 0.6); // 0.5625 = 9/16 for 16:9 aspect ratio
    }
    // Other tablets and small laptops
    else if (width < 1024) {
      return Math.min(height * 0.7, 600);
    }
    // Desktop
    else {
      return '100vh';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setIsVisible(prev => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="relative">
        {/* Video Container with proper responsive sizing */}
        <div 
          className="relative w-full overflow-hidden bg-black"
          style={{ 
            height: getContainerHeight(),
            minHeight: isSmallScreen ? '300px' : '400px'
          }}
        >
          {/* Video background with proper positioning */}
          <div className="absolute inset-0 z-0" style={{ height: '100%', width: '100%' }}>
            <video
              ref={videoRef}
              className="w-full h-full"
              src={detailingVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster=""
              controls={false}
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                WebkitTransform: 'translateZ(0)',
                WebkitBackfaceVisibility: 'hidden',
                height: '100%',
                width: '100%',
                minHeight: '100%',
                minWidth: '100%'
              }}
            />
          </div>

          {/* Responsive gradient overlay */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 sm:h-1/3 md:h-1/3 lg:h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10" />

          {/* Responsive scroll indicator */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-col items-center">
              <span className="text-white text-xs sm:text-sm md:text-base mb-1 sm:mb-2 tracking-widest font-medium drop-shadow-md">SCROLL</span>
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-sky-500/40 animate-pulse"></div>
                <div className="animate-bounce bg-sky-600/90 p-1.5 sm:p-2 rounded-full shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content - positioned below video with reduced spacing */}
        <div className={`animate-section transition-all duration-1000 ease-in-out ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1393c4]">
                AUTO DETAILING
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with reduced spacing */}
      <section className={`animate-section py-8 sm:py-12 bg-white transition-all duration-1000 ease-in-out ${isVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-base text-[#1393c4] leading-relaxed">
                Action car detailing is made up of a team of experts who can handle any size vehicles in any condition. We are dedicated to get the job done right, there is no better place in Winnipeg to get your car detailed. Quality products, quality work and quality service is our promise.
              </p>

              <p className="text-base text-[#1393c4] leading-relaxed">
                We are passionate about cars,that's why we take our time with each vehicle. Our chemical and allergy-free interior cleaning methods will leave your car's interior spotless and scentless- the way it should be.
              </p>

              <div className="bg-white p-4 rounded-lg border-l-4 border-[#1393c4]">
                <p className="text-base text-[#1393c4] font-medium">
                  Action car Detailing offers a very thorough, deep cleaning of interior and exterior. We specialize in Auto Detailing, Ceramic Coating, Window Tinting, Paint Protection Film (PPF), and Paintless Dent Removal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-md border border-[#1393c4]/20">
                <div className="text-2xl font-bold text-[#1393c4] mb-1">14+</div>
                <div className="text-[#1393c4] text-sm">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md border border-[#1393c4]/20">
                <div className="text-2xl font-bold text-[#1393c4] mb-1">A+</div>
                <div className="text-[#1393c4] text-sm">BBB Rating</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md border border-[#1393c4]/20">
                <CheckCircle className="w-6 h-6 text-[#1393c4] mx-auto mb-1" />
                <div className="text-[#1393c4] text-sm">MPI Accredited</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-md border border-[#1393c4]/20">
                <Star className="w-6 h-6 text-[#1393c4] mx-auto mb-1" />
                <div className="text-[#1393c4] text-sm">Premium Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1393c4] mb-4">
              OUR EXCLUSIVE 5-STEP SYSTEM
            </h2>
            <p className="text-[#1393c4] text-base max-w-3xl mx-auto">
              Our proven process ensures your vehicle receives the most thorough cleaning possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white border border-[#1393c4]/20 p-4 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#1393c4] text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  1
                </div>
                <h3 className="text-lg font-bold text-[#1393c4]">Step 1</h3>
              </div>
              <p className="text-sm text-[#1393c4] leading-relaxed">
                Our Forced Air Extractor thoroughly cleans between and under seats, inside the dash seams and venting ducts, and all other hard-to-reach areas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#1393c4]/20 p-4 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#1393c4] text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  2
                </div>
                <h3 className="text-lg font-bold text-[#1393c4]">Step 2</h3>
              </div>
              <p className="text-sm text-[#1393c4] leading-relaxed">
                Turbo brush vacuuming removes deeply embedded sand, dirt and pet hair.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#1393c4]/20 p-4 rounded-xl shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#1393c4] text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  3
                </div>
                <h3 className="text-lg font-bold text-[#1393c4]">Step 3</h3>
              </div>
              <p className="text-sm text-[#1393c4] leading-relaxed">
                Dual action brushing and biodegradable shampoo loosens and emulsify dirt, oils, and stubborn stains.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-[#1393c4]/20 p-4 rounded-xl shadow-lg md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#1393c4] text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  4
                </div>
                <h3 className="text-lg font-bold text-[#1393c4]">Step 4</h3>
              </div>
              <p className="text-sm text-[#1393c4] leading-relaxed">
                Our exclusive Italian Dry Steam System™ lifts and removes any remaining residue, leaving your carpets and upholstery bright, soft, and dry.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white border border-[#1393c4]/20 p-4 rounded-xl shadow-lg md:col-span-2 lg:col-span-2">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#1393c4] text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  5
                </div>
                <h3 className="text-lg font-bold text-[#1393c4]">Step 5</h3>
              </div>
              <p className="text-sm text-[#1393c4] leading-relaxed">
                Final turbo brush vacuuming removes any remaining residue, leaving your interior perfectly clean and fresh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1393c4] mb-4">
              Read some of our Reviews
            </h2>

            <a 
              href="https://www.google.com/search?q=Action+Car+Detailing%2C+1143+Sanford+St%2C+Winnipeg%2C+MB+R3E+3A1&rlz=1C1CHBF_enCA782CA782&oq=action&aqs=chrome.1.69i60j69i59l2j69i57j69i60l3j69i65.3647j0j4&sourceid=chrome&ie=UTF-8#lrd=0x52ea739fed0ea273:0x8650232388e22059,1,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white border-2 border-[#1393c4] rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-white rounded-full flex items-center justify-center">
                <img
                  src={googlePng}
                  alt="Google Reviews"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
                />
              </div>
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                review: "Absolutely amazing service! My car looks brand new. The attention to detail is incredible and the team is very professional."
              },
              {
                name: "Mike Chen",
                rating: 5,
                review: "Been using Action Car Detailing for 3 years now. Consistently excellent results every time. Highly recommend it!"
              },
              {
                name: "Lisa Rodriguez",
                rating: 5,
                review: "The 5-step system really works. My interior was completely transformed. Worth every penny!"
              }
            ].map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-[#1393c4]/20 shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#1393c4] fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[#1393c4] mb-3 italic text-sm">"{review.review}"</p>
                <p className="font-semibold text-[#1393c4] text-sm">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section - FIXED: Remove animations to prevent modal issues */}
      <section className="py-12 sm:py-16 bg-white">
        <Booking isModal={false} />
      </section>

      {/* ContactForm Section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="[&>*]:before:hidden [&>*]:after:hidden [&_.loading]:hidden [&_.dots]:hidden [&_.spinner]:hidden [&_*[class*='animate']]:!animation-none">
          <ContactForm />
        </div>
      </section>

      {/* References Section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="[&>*]:before:hidden [&>*]:after:hidden [&_.loading]:hidden [&_.dots]:hidden [&_.spinner]:hidden [&_*[class*='animate']]:!animation-none">
          <References />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CarDetailingWebsite;
