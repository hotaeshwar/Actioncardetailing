import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Shield, Clock, Star, ArrowRight, Phone } from 'lucide-react';
import windowTintVideo from '../assets/images/WindowtintHomepage.mp4';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import Reference1 from '../components/Reference1'; // Added import

const WindowTintingComponent = () => {
  const videoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('residential');
  const [scrollY, setScrollY] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  // Handle scroll for animations
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const runningTexts = [
    "SUN GLARE",
    "SKIN RADIATION", 
    "UV DAMAGE",
    "FADED INTERIORS"
  ];

  // Animation effect for changing text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % runningTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Video handling effect (same as Hero component)
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

  // iPad-specific height calculation to prevent stretching
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

  // Check if element should be visible based on scroll position
  const isVisible = (offset = 150) => { // Reduced from 400 to 150
    return scrollY > offset;
  };

  const services = [
    {
      id: 'residential',
      title: 'Residential Tinting',
      description: 'Professional window tinting for homes with energy efficiency and privacy solutions',
      features: ['Energy savings up to 30%', 'UV protection for furniture', 'Enhanced privacy and security']
    },
    {
      id: 'commercial',
      title: 'Commercial Tinting',
      description: 'Advanced window film solutions for offices and commercial buildings',
      features: ['Reduced cooling costs', 'Improved employee comfort', 'Professional appearance']
    },
    {
      id: 'automotive',
      title: 'Automotive Tinting',
      description: 'Premium car window tinting for comfort, style, and protection',
      features: ['Heat reduction up to 60%', 'Glare elimination', 'Interior protection']
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'UV Protection',
      description: 'Block up to 99% of harmful UV rays'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Quick Installation',
      description: 'Professional installation in 2-4 hours'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Premium Films',
      description: 'High-quality tinting films with warranties'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Lifetime Warranty',
      description: 'Guaranteed quality with lifetime coverage'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Custom CSS for animations */}
      <style jsx>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px); // Reduced from 50px
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); // Reduced from 0.8s
        }
        
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-left {
          opacity: 0;
          transform: translateX(-30px); // Reduced from -50px
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); // Reduced from 0.8s
        }
        
        .fade-in-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .fade-in-right {
          opacity: 0;
          transform: translateX(30px); // Reduced from 50px
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); // Reduced from 0.8s
        }
        
        .fade-in-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.9); // Reduced from 0.8
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); // Reduced from 0.8s
        }
        
        .scale-in.visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .stagger-1 { transition-delay: 0.05s; } // Reduced from 0.1s
        .stagger-2 { transition-delay: 0.1s; } // Reduced from 0.2s
        .stagger-3 { transition-delay: 0.15s; } // Reduced from 0.3s
        .stagger-4 { transition-delay: 0.2s; } // Reduced from 0.4s

        .running-text {
          color: #1393c4;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>

      {/* Hero Video Section - FIXED to match Hero component */}
      <section className="bg-black">
        <div 
          className="relative w-full overflow-hidden bg-black"
          style={{ 
            height: getContainerHeight(),
            minHeight: isSmallScreen ? '300px' : '400px'
          }}
        >
          {/* Video background - NO stretching approach */}
          <div className="absolute inset-0 z-0" style={{ height: '100%', width: '100%' }}>
            <video
              ref={videoRef}
              className="w-full h-full"
              src={windowTintVideo}
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

          {/* Main Title Overlay on video */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-center px-4">
              WINDOW TINTING
            </h1>
          </div>

          {/* Running Text Below Video */}
          <div className="absolute -bottom-12 sm:-bottom-16 left-0 right-0 z-20">
            <div className="bg-white py-4 sm:py-6">
              <div className="text-center px-4">
                <div className="running-text text-lg sm:text-xl lg:text-2xl">
                  Say Goodbye To... <span className="font-bold">SUN</span> Before It Happens
                </div>
              </div>
            </div>
          </div>

          {/* Responsive gradient overlay */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 sm:h-1/3 md:h-1/3 lg:h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10" />

          {/* Responsive scroll indicator */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-col items-center">
              <span className="text-white text-xs sm:text-sm md:text-base mb-1 sm:mb-2 tracking-widest font-medium drop-shadow-md">SCROLL</span>
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-[#1393c4]/40 animate-pulse"></div>
                <div className="animate-bounce bg-[#1393c4]/90 p-1.5 sm:p-2 rounded-full shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Section BELOW hero video */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl md:text-2xl mb-4" style={{ color: '#1393c4' }}>Say Goodbye to...</p>
          <div className="h-12 md:h-16 mb-8">
            <h2 className="text-3xl md:text-5xl font-bold animate-pulse" style={{ color: '#1393c4' }}>
              {runningTexts[currentText]}
            </h2>
          </div>
          <p className="text-xl md:text-2xl" style={{ color: '#1393c4' }}>Before It Happens</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Services Section */}
          <div className={`text-center mb-12 sm:mb-16 fade-in-up ${isVisible(50) ? 'visible' : ''}`}>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-0" style={{color: '#1393c4'}}>
              <span className="font-bold">Professional</span>
            </h3>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{color: '#1393c4'}}>
              <span className="font-bold">Window Tinting Services</span>
            </h1>
          </div>

          <div className="max-w-4xl mx-auto mb-16">

            {/* Service Tabs */}
            <div className="space-y-6">
              
              {/* Tab Navigation */}
              <div className={`flex flex-col sm:flex-row gap-2 justify-center fade-in-up ${isVisible(100) ? 'visible' : ''}`}>
                {services.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 text-center shadow-lg stagger-${index + 1} ${
                      activeTab === service.id
                        ? 'text-white shadow-blue-200 transform scale-105'
                        : 'bg-white hover:bg-blue-50 border-2 hover:border-blue-300'
                    }`}
                    style={activeTab === service.id ? {backgroundColor: '#1393c4'} : {color: '#1393c4', borderColor: '#1393c4'}}
                  >
                    <span className="text-sm sm:text-base font-bold">{service.title}</span>
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div className={`bg-white rounded-2xl p-8 sm:p-10 shadow-xl border-2 scale-in ${isVisible(150) ? 'visible' : ''}`} style={{borderColor: '#1393c4'}}>
                {services.map((service) => (
                  activeTab === service.id && (
                    <div key={service.id} className="space-y-6 text-center">
                      <h3 className="text-2xl sm:text-3xl font-bold" style={{color: '#1393c4'}}>
                        <span>{service.title}</span>
                      </h3>
                      <p className="text-lg sm:text-xl leading-relaxed" style={{color: '#1393c4'}}>
                        <span>{service.description}</span>
                      </p>
                      
                      <div className="space-y-4 max-w-md mx-auto">
                        {service.features.map((feature, index) => (
                          <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg fade-in-left stagger-${index + 1} ${isVisible(200) ? 'visible' : ''}`} style={{backgroundColor: '#e6f3ff'}}>
                            <CheckCircle className="w-6 h-6 flex-shrink-0" style={{color: '#1393c4'}} />
                            <span className="font-medium text-base sm:text-lg" style={{color: '#1393c4'}}>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`pt-6 fade-in-up ${isVisible(250) ? 'visible' : ''}`}>
                        <button className="text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto" style={{backgroundColor: '#1393c4'}}>
                          <span>Get Free Estimate</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 text-center shadow-xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 fade-in-up stagger-${index + 1} ${isVisible(300) ? 'visible' : ''}`}
                style={{borderColor: '#1393c4'}}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 shadow-lg" style={{backgroundColor: '#1393c4'}}>
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3" style={{color: '#1393c4'}}>
                  <span>{benefit.title}</span>
                </h4>
                <p className="leading-relaxed" style={{color: '#1393c4'}}>
                  <span>{benefit.description}</span>
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className={`bg-white rounded-3xl p-10 sm:p-16 text-center shadow-2xl border-2 scale-in ${isVisible(400) ? 'visible' : ''}`} style={{borderColor: '#1393c4'}}>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6" style={{color: '#1393c4'}}>
              <span className="block">Ready to Protect</span>
              <span>Your Space?</span>
            </h3>
            <p className="text-xl sm:text-2xl mb-10 leading-relaxed" style={{color: '#1393c4'}}>
              <span className="block">Contact Action Car Wash today for a</span>
              <span className="font-bold">free estimate</span>
              <span> on your window tinting needs</span>
            </p>
          </div>

          {/* Reference1 Component - Added above ContactForm */}
          <Reference1 />

          <ContactForm />
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default WindowTintingComponent;
