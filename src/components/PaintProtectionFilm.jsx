import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Play, Shield, Star, Award, Clock, Zap, X } from 'lucide-react';
import Footer from '../components/Footer';
import PaintPolishingForm from '../components/PaintPolishingForm';
import Quote from '../components/Quote';
import References from '../components/Reference1'; // Added References import
import PPFVideo from '../assets/images/PPFHomepage.mp4';
import InstallImage from '../assets/images/Install.png';
import PrepImage from '../assets/images/Prep.png';
import ExecuteImage from '../assets/images/Execute.png';
// Import package images
import BumperImage from '../assets/images/Bumper.png';
import EconomyImage from '../assets/images/economy.png';
import FullFrontImage from '../assets/images/fullfront.png';
import OffsetImage from '../assets/images/offset.png';
import ContactForm from '../components/ContactForm';

const PaintProtectionFilm = () => {
  const videoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentText, setCurrentText] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  const runningTexts = [
    "ROAD DEBRIS",
    "HIGHWAY SCRATCHES",
    "ROCK CHIPS",
    "WEATHER DAMAGE"
  ];

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

  // Smooth scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const rect = card.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Check if card is in viewport (with some offset for better UX)
          if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
            if (!visibleCards.has(index)) {
              setTimeout(() => {
                setVisibleCards(prev => new Set([...prev, index]));
              }, index * 50); // Reduced delay for faster appearance
            }
          }
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll listener with throttling
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [visibleCards]);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleGetQuote = () => {
    setIsQuoteOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const closeQuote = () => {
    setIsQuoteOpen(false);
  };

  const serviceCards = [
    {
      image: InstallImage,
      title: "WE INSTALL",
      description: "Using the DAP (Xpel's premier computer cutting software) or custom bulk installation methods we create patterns to extend edges and offer our renowned \"signature\" wrap techniques to make all installations safe, clean, and as invisible as possible"
    },
    {
      image: PrepImage,
      title: "WE PREP",
      description: "Using our exclusive 5 step process with DI water, baby shampoo, clay treatment, isopropyl alcohol, and paint sealant we meticulously clean and prepare all surfaces of the vehicle for surgery"
    },
    {
      image: ExecuteImage,
      title: "WE EXECUTE",
      description: "What we do is an art, and because we push for excellence in every vehicle we protect, we treat it that way. Attention to detail is our goal and we stand behind our work satisfaction"
    }
  ];

  const packages = [
    {
      name: "BUMPER ONLY",
      price: "$599",
      serviceTime: "1 Day",
      image: BumperImage,
      features: [
        "Essential shield for maintaining the pristine condition of the most impact-prone portion of your vehicle",
        "Provides robust protection against impacts, scratches, and road debris",
        "Specifically designed for non-chrome bumpers",
        "Expertly installed, computer cut kits that wrap all leading edges",
        "10-year warranty against peeling, cracking, and yellowing"
      ]
    },
    {
      name: "ECONOMY KIT",
      price: "$999",
      serviceTime: "1.5 Day",
      image: EconomyImage,
      features: [
        "Full bumper",
        "Mirror caps",
        "24\" hood / fender tips",
        "Expertly installed, computer cut kits that wrap all leading edges",
        "10-year warranty against peeling, cracking, and yellowing"
      ]
    },
    {
      name: "FULL FRONT",
      price: "$1499",
      serviceTime: "1.5 Day",
      image: FullFrontImage,
      features: [
        "Everything in the partial front",
        "Full hood / fender",
        "Pillars & Partial Roof",
        "Mirror and doors handles insert"
      ]
    },
    {
      name: "OFFSET TIRE PACKAGE",
      price: "$1999",
      serviceTime: "2 Days",
      image: OffsetImage,
      features: [
        "Everything in full front",
        "Rockers",
        "Lower doors"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Preserve Your Car's Resale Value",
      description: "Paint Protection Film will lock-in and enhance your paint's gloss and shine to keep your car looking new at all times."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Enhance Long Term Aesthetics",
      description: "Scratches from years of driving and washing won't be an issue, scratches fade away once heat is applied."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Reduce Maintenance Costs",
      description: "Action car Detailing installs the world's number one paint protection film. This advanced PPF comes backed with a 10-year warranty."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Guard Against Rock Chips And Scratches",
      description: "Paint Protection Film is the highest level of paint protection and is the #1 recommended solution."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Peace Of Mind With Warranty",
      description: "Paint Protection Film comes with a fully transferable warranty to ensure the next owners peace of mind."
    }
  ];

  const faqData = [
    {
      question: "Preserve Car's Resale Value",
      answer: [
        "PPF prevents scratches and chips, maintaining your car's pristine condition.",
        "Potential buyers are willing to pay more for a well-preserved vehicle.",
        "Resale value can increase significantly, offsetting the cost of PPF.",
        "You avoid the depreciation associated with paint damage",
        "PPF adds to the appeal of your vehicle when you decide to sell or trade it."
      ]
    },
    {
      question: "Enhance Long-Term Aesthetics",
      answer: [
        "PPF is nearly invisible, so it doesn't alter your car's original appearance.",
        "It shields your car's paint from UV rays, preventing fading and oxidation.",
        "Environmental factors like bird droppings and tree sap won't harm your paint.",
        "Your car will maintain a showroom shine for years to come.",
        "PPF ensures that your vehicle always looks brand new."
      ]
    },
    {
      question: "Reduce Maintenance Costs",
      answer: [
        "PPF eliminates the need for frequent waxing and polishing.",
        "Paint touch-ups and repairs become less necessary.",
        "You save money on detailing and cosmetic maintenance",
        "PPF simplifies the upkeep of your vehicle's exterior.",
        "Over time, the cost savings from reduced maintenance add up."
      ]
    },
    {
      question: "Guard Against Road Hazards",
      answer: [
        "PPF acts as a shield against rocks, gravel, and debris on the road.",
        "It prevents unsightly dings, dents, and paint chips.",
        "Insect impacts and road tar won't damage your paint.",
        "Your car's front end remains free from damage caused by road hazards.",
        "PPF provides proactive protection for high-impact areas."
      ]
    },
    {
      question: "Peace Of Mind With Warranty",
      answer: [
        "Our PPF installations come with 10-Year warranty for added security.",
        "You're covered in case of damage or defects in the film.",
        "Our warranty offer long-term protection.",
        "It provides peace of mind, knowing your investment is safeguarded.",
        "You can enjoy your new car without worrying about potential paint damage and repair costs."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="bg-black">
        {/* Hero Video - FIXED to match Hero component */}
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
              src={PPFVideo}
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

      {/* Text Content Below Video */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-[#1393c4] via-[#1393c4] to-[#1393c4] bg-clip-text text-transparent">
            PAINT PROTECTION FILM
          </h1>
          <p className="text-lg md:text-xl mb-4" style={{ color: '#1393c4' }}>Say Goodbye To...</p>
          <div className="h-12 md:h-16 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold animate-pulse" style={{ color: '#1393c4' }}>
              {runningTexts[currentText]}
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-[#1393c4] to-[#1393c4] mx-auto rounded-full opacity-70"></div>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="py-16" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16" style={{ color: '#1393c4' }}>
            SELECT YOUR SERVICE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceCards.map((card, index) => (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:transform hover:scale-105 transition-all duration-500 transform ${visibleCards.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
                  }`}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-center mb-4" style={{ color: '#1393c4' }}>
                    {card.title}
                  </h3>
                  <p className="text-center leading-relaxed mb-6" style={{ color: '#1393c4' }}>
                    {card.description}
                  </p>
                  <div className="text-center">
                    <button
                      onClick={handleGetQuote}
                      className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105"
                      style={{ backgroundColor: '#1393c4' }}
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PPF Specialist Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="max-w-4xl mx-auto text-lg leading-relaxed" style={{ color: '#1393c4' }}>
              Below you will find our Paint Protection Film options, these packages are custom tailored to your vehicle needs. Our PPF installation comes with a 10 Year Manufacturer Warranty, self healing properties and installed by trained and experienced technicians.
            </p>
          </div>

          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ color: '#1393c4' }}>
              WATCH VIDEO
            </h3>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#1393c4' }}>
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/hI4lW8uNRqY"
                  title="XPEL ULTIMATE PLUS Paint Protection Film"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PPF Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16" style={{ color: '#1393c4' }}>
            WHY PAINT PROTECTION FILM?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                ref={el => cardRefs.current[index + 3] = el}
                className={`p-6 rounded-xl text-center hover:transform hover:scale-105 transition-all duration-500 shadow-xl text-white transform ${visibleCards.has(index + 3)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
                  }`}
                style={{ background: `linear-gradient(to bottom, #1393c4, #0e7aa3)` }}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4" style={{ color: '#1393c4' }}>
                  {benefit.icon}
                </div>
                <h3 className="text-base font-bold mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sky-100 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Peace of Mind Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#1393c4' }}>
              Enjoy Peace of Mind and Protect Your Investment
            </h2>
            <p className="max-w-4xl mx-auto text-lg leading-relaxed mb-8" style={{ color: '#1393c4' }}>
              PPF or "Clear Bra" is designed to minimize damage from rock chips, scratches, and road debris.
              We use templates that have been modified to custom wrap edges where applicable for an invisible install and because of our
              meticulous installation process we stand behind our workmanship and your satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://actioncardetailing.ca/wp-content/uploads/2021/05/car2-removebg-preview.png"
                alt="Protected Car"
                className="w-full h-auto"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#1393c4' }}>INCREASE AND RETAIN RESELL VALUE</h3>
                <p className="leading-relaxed" style={{ color: '#1393c4' }}>
                  Enhance the long-term value of your vehicle with our premium protection solutions. Our cutting-edge products not only shield your car from the elements but also ensure that it's resell value remains at its peak, making it a smart investment for years to come.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#1393c4' }}>HIGHEST LEVEL OF PROTECTION</h3>
                <p className="leading-relaxed" style={{ color: '#1393c4' }}>
                  Experience unmatched defense. Our advanced solutions provide the utmost protection against chips, scratches, and the elements.
                </p>
              </div>
            </div>
          </div>

          {/* XPEL Section */}
          <div className="rounded-2xl p-8 md:p-12 text-white" style={{ background: `linear-gradient(to right, #1393c4, #0e7aa3)` }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-8">
                  <img
                    src="https://actioncardetailing.ca/wp-content/uploads/2021/05/img.png"
                    alt="XPEL Ultimate Plus"
                    className="h-16 mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-4">Why XPEL?</h3>
                  <p className="text-sky-100 mb-6 leading-relaxed">
                    Not all Paint Protection Film is created equally. XPEL ULTIMATE PLUS is the industry leader for a reason. A trusted non-yellowing paint protection film that can self-heal minor scratches and swirls in the top coat.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <img
                    src="https://actioncardetailing.ca/wp-content/uploads/2021/05/XPEL_ULTIMATE_PLUS_767_510.png"
                    alt="XPEL Ultimate Plus Logo"
                    className="w-full h-auto rounded-lg"
                  />
                  <img
                    src="https://actioncardetailing.ca/wp-content/uploads/2021/05/b57d36_73bcb0b03ef9418c8fd49d59f165adedmv2.png"
                    alt="Tesla with XPEL"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-sky-200 mb-3">Non-Yellowing</h4>
                  <p className="text-sky-100">Proprietary film will not yellow from UV exposure, staying nearly invisible</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-sky-200 mb-3">Stain Resistant</h4>
                  <p className="text-sky-100">ULTIMATE PLUS is stain resistant & will maintain clarity against contaminants</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-sky-200 mb-3">Prevents Wear & Tear</h4>
                  <p className="text-sky-100">Stop rock chips, nicks & scratches in the paint, and keep your vehicle looking new</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-sky-200 mb-3">Edge Seal Technology</h4>
                  <p className="text-sky-100">Lifting & delamination are a thing of the past as our Edge Seal Technology ensures film stays stuck & keeps surfaces protected</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="text-lg font-bold text-sky-200 mb-3">Warranty and Durability</h4>
                  <p className="text-sky-100">Superior Impact Protection and Industry Leading 10 Year Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section className="py-16 bg-sky-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: '#1393c4' }}>
            FINANCING AVAILABLE
          </h2>
          <p className="mb-8" style={{ color: '#1393c4' }}>Click below to learn more</p>
          <img
            src="https://actioncardetailing.ca/wp-content/uploads/2021/05/financeit.jpg.webp"
            alt="Financeit"
            className="mx-auto h-16 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            onClick={() => window.open('https://www.financeit.ca/s/omao8A', '_blank')}
          />
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16" style={{ color: '#1393c4' }}>
            SELECT YOUR COVERAGE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                ref={el => cardRefs.current[index + 8] = el}
                className={`rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-500 shadow-2xl text-white transform ${visibleCards.has(index + 8)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
                  }`}
                style={{ background: `linear-gradient(to bottom, #1393c4, #0e7aa3)` }}
              >
                <div className="text-center mb-6">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-32 object-contain mb-4"
                  />
                  <h3 className="text-lg font-bold text-sky-200 mb-2">{pkg.name}</h3>
                  <div className="text-xl font-bold mb-2">Starting at {pkg.price}</div>
                  <div className="text-sky-100">Service Time {pkg.serviceTime}</div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="text-sky-200 font-semibold">WHAT IS INCLUDED:</h4>
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-sky-200 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sky-100 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleGetQuote}
                  className="w-full bg-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-sky-50"
                  style={{ color: '#1393c4' }}
                >
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Road Doesn't Have to Win */}
      <section className="py-16 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://actioncardetailing.ca/wp-content/uploads/2021/05/road.jpg"
                alt="Stressed Driver"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1393c4' }}>
                THE ROAD DOESN'T HAVE TO WIN...
              </h2>
              <div className="space-y-4 mb-8" style={{ color: '#1393c4' }}>
                <p>We get it. The thought of rock chips, scratches, weathering, oxidation, UV rays, stains, and fading create STRESS and ANXIETY.</p>
                <p>Fact- There is 100% chance that doing nothing will ensure inevitable damage!</p>
                <p className="text-lg font-semibold">We Provide The Peace of mind you and your vehicle deserve</p>
              </div>
              <button
                onClick={handleGetQuote}
                className="text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ background: `linear-gradient(to right, #1393c4, #0e7aa3)` }}
              >
                Get A Free Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="leading-relaxed max-w-4xl mx-auto mb-8" style={{ color: '#1393c4' }}>
            When you pay for a product with extensive warranties, you want to use a solid company for the service. The world's top paint
            protection films offer up to 10 years of warranty. You need a company with a long history of successful projects and just as
            importantly, future longevity. Yes, films are guaranteed based on the quality of the film itself. However, it's the shop that
            guarantees the work done. You want a company like us because you know we will be here, doing what we do and standing by our
            products. Our meticulous attention to detail here at <span className="font-bold" style={{ color: '#1393c4' }}>ACTION CAR DETAILING</span> is sure to keep your mind at ease. You can rest
            assured knowing your vehicle will receive an expert application of a superior PPF product.
          </p>
          <button
            onClick={handleGetQuote}
            className="text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 transform hover:scale-105"
            style={{ background: `linear-gradient(to right, #1393c4, #0e7aa3)` }}
          >
            Get A Free Quote
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1393c4' }}>
              DISCOVER THE HIGHEST LEVEL OF PAINT PROTECTION FILM IN WINNIPEG
            </h2>
            <h3 className="text-xl font-bold mb-8" style={{ color: '#1393c4' }}>
              WHY DO I NEED PAINT PROTECTION FILM?
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                ref={el => cardRefs.current[index + 12] = el}
                className={`rounded-xl overflow-hidden shadow-xl transition-all duration-500 transform ${visibleCards.has(index + 12)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
                  }`}
                style={{ background: `linear-gradient(to right, #1393c4, #0e7aa3)` }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-sky-500/50 transition-colors duration-300 text-white"
                >
                  <h4 className="text-lg font-semibold">{faq.question}</h4>
                  {openFAQ === index ? (
                    <ChevronUp className="w-6 h-6 text-sky-200" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-sky-200" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 bg-white/20 backdrop-blur-sm">
                    <div className="space-y-3">
                      {faq.answer.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-sky-200 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sky-100">{point}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleGetQuote}
                      className="mt-6 bg-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-sky-50"
                      style={{ color: '#1393c4' }}
                    >
                      GET MY QUOTE
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* References Section - Added before ContactForm */}
      <References />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Modal for Paint Polishing Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 z-10 text-white p-2 rounded-full hover:bg-sky-700 transition-colors duration-200"
              style={{ backgroundColor: '#1393c4' }}
            >
              <X className="w-6 h-6" />
            </button>
            <PaintPolishingForm />
          </div>
        </div>
      )}

      {/* Modal for Quote Form */}
      {isQuoteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={closeQuote}
              className="absolute top-4 right-4 z-10 text-white p-2 rounded-full hover:bg-sky-700 transition-colors duration-200"
              style={{ backgroundColor: '#1393c4' }}
            >
              <X className="w-6 h-6" />
            </button>
            <Quote />
          </div>
        </div>
      )}

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default PaintProtectionFilm;
