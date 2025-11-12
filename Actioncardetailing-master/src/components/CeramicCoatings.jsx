import React, { useState, useEffect, useRef } from 'react';
import { Play, Check, Shield, Star, Droplets, Settings, HardHat, Sun, Atom, Beaker, X } from 'lucide-react';
import Footer from '../components/Footer';
import Quote from '../components/Quote';
import ContactForm from '../components/ContactForm';
import References from '../components/Reference1';

// Import Ceramic Coating Video
import ceramicCoatingVideo from '../assets/images/Ceramic coating (1).mp4';

// Import Ceramic Coating Images
import financeitLogo from '../assets/images/financeit.jpg.webp';
import fusionPlusLite from '../assets/images/XPEL FUSION PLUS LITE COATING.webp';
import fusionPlusPaintPPF from '../assets/images/XPEL FUSION PLUS PAINT& PPF COATING.webp';
import fusionPlusPremium from '../assets/images/XPEL FUSION PLUS PREMIUM COATING.webp';
import protectVehicleLogo from '../assets/images/PROTECT YOUR VEHICLE WITH XPEL FUSION PLUS CERAMIC COATING.webp';
import fusionPlusProcess from '../assets/images/FUSION PLUS ceamic coating.webp';

const CeramicCoatings = ({ setCurrentView }) => {
  const videoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

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
      (height === 768 && width === 1024) ||
      // iPad Air: 820x1180
      (width === 820 && height === 1180) ||
      (height === 820 && width === 1180) ||
      // iPad Pro 11": 834x1194
      (width === 834 && height === 1194) ||
      (height === 834 && width === 1194) ||
      // iPad Pro 12.9": 1024x1366
      (width === 1024 && height === 1366) ||
      (height === 1024 && width === 1366) ||
      // User agent check
      navigator.userAgent.includes('iPad') ||
      (navigator.userAgent.includes('Macintosh') && 'ontouchend' in document)
    );
    
    if (isIPad) {
      return `${height}px`; // Use actual viewport height on iPad
    }
    
    return '100vh';
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = cardRefs.current.indexOf(entry.target);
          setVisibleCards(prev => new Set([...prev, index]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Benefits data with icons
  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Superior Protection",
      description: "Advanced ceramic formula creates a durable barrier against UV rays, oxidation, and environmental contaminants"
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Hydrophobic Shield",
      description: "Extreme water and dirt repellency makes cleaning effortless while maintaining that showroom shine"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Enhanced Gloss",
      description: "Deep, mirror-like finish that intensifies your vehicle's color and creates stunning visual depth"
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Scratch Resistance",
      description: "Hard ceramic layer helps prevent minor scratches and swirl marks, keeping your paint pristine"
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "UV Protection",
      description: "Blocks harmful UV rays that cause paint fading and oxidation, preserving your vehicle's appearance"
    },
    {
      icon: <HardHat className="w-8 h-8" />,
      title: "Chemical Defense",
      description: "Resists harsh chemicals, bird droppings, tree sap, and road salts that can etch into paint"
    }
  ];

  // Package tiers with premium styling
  const packages = [
    {
      name: "FUSION PLUS LITE",
      duration: "1 years",
      features: [
        "Professional-Grade 9H Ceramic Coating",
        "1-year warranty protection",
        "Enhanced gloss & hydrophobic properties",
        "Basic paint protection",
        "Professional application"
      ],
      image: fusionPlusLite,
      gradient: "from-blue-400 to-cyan-500",
      popular: false
    },
    {
      name: "FUSION PLUS PAINT & PPF",
      duration: "4 years",
      features: [
        "Professional-Grade 9H Ceramic Coating",
        "4-year warranty coverage",
        "PPF-safe formula",
        "Superior chemical resistance",
        "Maximum gloss enhancement",
        "Paint correction included"
      ],
      image: fusionPlusPaintPPF,
      gradient: "from-cyan-500 to-blue-600",
      popular: true
    },
    {
      name: "FUSION PLUS PREMIUM",
      duration: "8 years",
      features: [
        "Professional-Grade 9H Ceramic Coating",
        "8-year warranty protection",
        "Ultimate scratch resistance",
        "Premium hydrophobic coating",
        "Complete paint correction",
        "Full vehicle coverage",
        "Complimentary maintenance kit"
      ],
      image: fusionPlusPremium,
      gradient: "from-blue-600 to-indigo-700",
      popular: false
    }
  ];

  // Process steps with enhanced visuals
  const processSteps = [
    {
      icon: <Beaker className="w-10 h-10" />,
      step: "1",
      title: "Deep Cleaning & Decontamination",
      description: "Thorough washing and clay bar treatment removes all surface contaminants, iron particles, and embedded debris for a pristine foundation",
      color: "#1393c4"
    },
    {
      icon: <Settings className="w-10 h-10" />,
      step: "2",
      title: "Paint Correction",
      description: "Multi-stage polishing removes swirl marks, scratches, and imperfections to restore your paint to showroom condition",
      color: "#0f7a9c"
    },
    {
      icon: <Atom className="w-10 h-10" />,
      step: "3",
      title: "Surface Preparation",
      description: "Panel wipe ensures perfect surface preparation, removing polish oils and residues for optimal coating adhesion",
      color: "#1393c4"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      step: "4",
      title: "Ceramic Application",
      description: "Precision application of XPEL FUSION PLUS in controlled environment, ensuring even coverage and proper curing",
      color: "#0f7a9c"
    },
    {
      icon: <Star className="w-10 h-10" />,
      step: "5",
      title: "Curing & Inspection",
      description: "24-48 hour curing process followed by detailed quality inspection and final finishing touches",
      color: "#1393c4"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video Background */}
      <section 
        className="relative overflow-hidden"
        style={{ height: getContainerHeight() }}
      >
        {/* Background Video or Image */}
        {!isSmallScreen ? (
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              objectPosition: 'center center',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform'
            }}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="metadata"
          >
            <source src={ceramicCoatingVideo} type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${ceramicCoatingVideo.replace('.mp4', '-poster.jpg')})`,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1393c4' }}>
              Why Choose Ceramic Coating?
            </h2>
            <div className="w-32 h-1 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, #1393c4, #0f7a9c)' }} />
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#1393c4' }}>
              Experience the ultimate in paint protection with our advanced ceramic coating technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                  visibleCards.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  style={{ backgroundColor: '#1393c4' }}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#1393c4' }}>
                  {benefit.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#1393c4' }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gradient-to-br from-white via-sky-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1393c4' }}>
              Choose Your Protection Level
            </h2>
            <div className="w-32 h-1 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, #1393c4, #0f7a9c)' }} />
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#1393c4' }}>
              Professional ceramic coating packages designed for every need and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                ref={el => cardRefs.current[benefits.length + index] = el}
                className={`relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform ${
                  visibleCards.has(benefits.length + index) ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                } ${pkg.popular ? 'ring-4 ring-blue-400 scale-105' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {pkg.popular && (
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className={`h-64 bg-gradient-to-br ${pkg.gradient} relative overflow-hidden`}>
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-contain p-6"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#1393c4' }}>
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold" style={{ color: '#1393c4' }}>
                      {pkg.duration}
                    </span>
                    <span style={{ color: '#1393c4' }}>warranty</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#1393c4' }} />
                        <span style={{ color: '#1393c4' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg ${
                      pkg.popular ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-blue-500 to-cyan-600'
                    }`}
                  >
                    GET PRICING
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1393c4' }}>
              Our Professional Process
            </h2>
            <div className="w-32 h-1 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, #1393c4, #0f7a9c)' }} />
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Meticulous attention to detail at every step ensures flawless results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div
                key={index}
                ref={el => cardRefs.current[benefits.length + packages.length + index] = el}
                className={`flex flex-col gap-4 bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-500 transform ${
                  visibleCards.has(benefits.length + packages.length + index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl"
                    style={{ background: `linear-gradient(135deg, #1393c4, #0f7a9c)` }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: '#1393c4' }}
                    >
                      {step.step}
                    </span>
                    <h3 className="text-xl font-bold" style={{ color: '#1393c4' }}>
                      {step.title}
                    </h3>
                  </div>
                </div>
                <p className="leading-relaxed" style={{ color: '#1393c4' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* XPEL Fusion Plus Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Top Section - Protect Your Vehicle */}
            <div className="p-8 lg:p-12 bg-white">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <h2 className="text-3xl font-bold text-[#1393c4] mb-8">
                    PROTECT YOUR VEHICLE WITH XPEL FUSION PLUS CERAMIC COATING
                  </h2>
                  <div className="space-y-4">
                    <div
                      className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
                      onClick={() => setCurrentView('fusion-plus-lite')}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: '#1393c4' }}></span>
                      <span className="font-semibold text-lg underline transition-colors hover:text-[#0f7ba3]" style={{ color: '#1393c4', textDecorationColor: '#1393c4' }}>
                        FUSION PLUS LITE
                      </span>
                    </div>
                    <div 
                      className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
                      onClick={() => setCurrentView('fusion-plus-paint-ppf')}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: '#1393c4' }}></span>
                      <span className="font-semibold text-lg underline transition-colors hover:text-[#0f7ba3]" style={{ color: '#1393c4', textDecorationColor: '#1393c4' }}>
                        FUSION PLUS PAINT & PPF
                      </span>
                    </div>
                    <div 
                      className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
                      onClick={() => setCurrentView('fusion-plus-premium')}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: '#1393c4' }}></span>
                      <span className="font-semibold text-lg underline transition-colors hover:text-[#0f7ba3]" style={{ color: '#1393c4', textDecorationColor: '#1393c4' }}>
                        FUSION PLUS PREMIUM
                      </span>
                    </div>
                    <div 
                      className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
                      onClick={() => setCurrentView('fusion-plus-wheel-caliper')}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: '#1393c4' }}></span>
                      <span className="font-semibold text-lg underline transition-colors hover:text-[#0f7ba3]" style={{ color: '#1393c4', textDecorationColor: '#1393c4' }}>
                        FUSION PLUS WHEEL & CALIPER
                      </span>
                    </div>
                    <div 
                      className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
                      onClick={() => setCurrentView('fusion-plus-glass')}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: '#1393c4' }}></span>
                      <span className="font-semibold text-lg underline transition-colors hover:text-[#0f7ba3]" style={{ color: '#1393c4', textDecorationColor: '#1393c4' }}>
                        FUSION PLUS GLASS
                      </span>
                    </div>
                    <div 
                      className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
                      onClick={() => setCurrentView('fusion-plus-plastic-trims')}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: '#1393c4' }}></span>
                      <span className="font-semibold text-lg underline transition-colors hover:text-[#0f7ba3]" style={{ color: '#1393c4', textDecorationColor: '#1393c4' }}>
                        FUSION PLUS PLASTIC & TRIMS
                      </span>
                    </div>
                    <div 
                      className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300 cursor-pointer"
                      onClick={() => setCurrentView('fusion-plus-upholstery')}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ background: '#1393c4' }}></span>
                      <span className="font-semibold text-lg underline transition-colors hover:text-[#0f7ba3]" style={{ color: '#1393c4', textDecorationColor: '#1393c4' }}>
                        FUSION PLUS UPHOLSTERY
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 lg:pl-12">
                  <div className="max-w-md mx-auto hover:scale-105 transition-transform duration-300">
                    <img
                      src={protectVehicleLogo}
                      alt="XPEL Logo"
                      className="w-full h-auto object-contain drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Fusion Plus Details */}
            <div className="bg-white p-8 lg:p-12 border-t border-gray-200">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <h2 className="text-3xl font-bold mb-6" style={{ color: '#1393c4' }}>
                    FUSION PLUS
                    <span className="block text-2xl">CERAMIC COATING</span>
                  </h2>

                  <div className="space-y-4 text-base">
                    <p className="leading-relaxed bg-gray-50 p-4 rounded-lg" style={{ color: '#1393c4' }}>
                      Developed to perform in a wide variety of surface types, <span className="font-bold" style={{ color: '#1393c4' }}>FUSION PLUS</span> Ceramic Coating offers unrivaled gloss, superior hydrophobic protection, and improved scratch resistance.
                    </p>
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="text-xl font-bold" style={{ color: '#1393c4' }}>+</span>
                      <span className="font-semibold" style={{ color: '#1393c4' }}>Provides protection from the elements</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="text-xl font-bold" style={{ color: '#1393c4' }}>+</span>
                      <span className="font-semibold" style={{ color: '#1393c4' }}>Repels water, dirt & road grime</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="text-xl font-bold" style={{ color: '#1393c4' }}>+</span>
                      <span className="font-semibold" style={{ color: '#1393c4' }}>Resist stains & chemical etching</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 lg:pl-12">
                  <img
                    src={fusionPlusProcess}
                    alt="Fusion Plus Ceramic Coating Process"
                    className="w-full h-auto object-contain rounded-lg shadow-2xl border-4 border-gray-200 hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* References Section */}
      <section className="py-16 bg-gradient-to-br from-sky-100 via-white to-sky-50">
        <div className="container mx-auto px-4">
          <References />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-br from-sky-100 via-white to-sky-50">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>

      {/* Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" style={{ color: '#1393c4' }} />
            </button>
            <div className="p-1">
              <Quote onClose={() => setIsQuoteModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default CeramicCoatings;
