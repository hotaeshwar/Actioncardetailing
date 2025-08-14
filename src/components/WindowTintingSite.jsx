import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Shield, Sun, Zap, Wifi, CheckCircle, Play } from 'lucide-react';
import Footer from '../components/Footer';
import Quote from '../components/Quote';
import ContactForm from '../components/ContactForm';
import References from '../components/Reference1';
// Import Window Tint Video
import windowTintVideo from '../assets/images/window tint (1).mp4';

const WindowTintingSite = () => {
  const videoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedTint, setSelectedTint] = useState(35);
  const [selectedFilm, setSelectedFilm] = useState('prime-cs');
  const [showQuote, setShowQuote] = useState(false);
  const [currentText, setCurrentText] = useState(0);

  const runningTexts = [
    "SUN GLARE",
    "SKIN RADIATION", 
    "UV DAMAGE",
    "FADED INTERIORS"
  ];

  // Running text animation effect
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

  // Scroll animation for cards
  useEffect(() => {
    const cards = document.querySelectorAll('.animate-card');
    const animatedCards = new Set();

    const handleScroll = () => {
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.85 && !animatedCards.has(card)) {
          animatedCards.add(card);
          setTimeout(() => {
            card.classList.add('animate-fade-in');
          }, index * 150);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tintOptions = [5, 20, 35, 50, 70];

  const filmTypes = {
    'prime-cs': {
      name: 'Prime Color Stable',
      subtitle: 'Cost Effective Quality',
      description: 'Safety and Color Stability Like Never Before. When comfort and cost is key, dyed window tint won\'t let you down. PRIME CS BLACK can cut out the glare, protect your skin from harmful UV rays, and make any journey that much more enjoyable.',
      features: ['UV Ray Protection - SPF 500 protection from 99% harmful UV Rays', 'Good Looks - Stylish statement that won\'t fade or turn purple', 'Crystal Clear Signal - Clear communication in today\'s digital world'],
      grade: 'GOOD',
      logo: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/cs1.jpg.webp',
      carImage: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/goodcar.jpg'
    },
    'prime-hp': {
      name: 'Prime HP',
      subtitle: 'Heat Rejection Tint',
      description: 'XPEL High Performance window tint like PRIME HP BLACK can give your vehicle the look & feel you want without breaking the bank. Providing powerful UV protection and a full spectrum selection of VLTs, HP window tint is a great film option for vehicles of all varieties.',
      features: ['High Performance Technology - Blocks 53% infrared heat to keep vehicle cooler', 'UV Ray Protection - Blocks the vast majority of the sun\'s heat-causing radiation', 'Blend Performance & Value - Ceramic Window Tint is a perfect marriage of value and performance', 'Crystal Clear Signal - Clear Communication in today\'s digital world'],
      grade: 'BETTER',
      logo: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/image14.jpg.webp',
      carImage: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/image24.jpg'
    },
    'nano-ceramic': {
      name: 'NANO-CERAMIC (IR)',
      subtitle: 'Max UV & Heat Rejection Tint',
      description: 'There\'s no better place to start than the top. If you\'re looking for maximum performance & protection, look no further than nano-ceramic PRIME XR. Ceramic tint is designed to provide the most heat rejection possible, while reflecting harmful UV rays to keep you safe. This window tint will your vehicle cooler & more comfortable wherever you\'re headed.',
      features: ['Nano Ceramic Technology - Blocks 88% infrared heat', 'UV Ray Protection - SPF 1000 protection from 99% harmful UV Rays'],
      grade: 'BEST',
      logo: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/image17.png',
      carImage: 'https://actioncardetailing.ca/wp-content/uploads/2021/05/image3.jpg.webp'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        .animate-card {
          opacity: 0;
          transform: translateY(60px);
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-card.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .running-text {
          display: inline-block;
          animation: scroll-left 15s linear infinite;
          white-space: nowrap;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .running-text-container {
          overflow: hidden;
          width: 100%;
          position: relative;
        }

        .typewriter {
          display: inline-block;
          border-right: 3px solid #1393c4;
          animation: blink 0.7s infinite;
          min-height: 1.2em;
        }

        @keyframes blink {
          0%, 50% { border-color: #1393c4; }
          51%, 100% { border-color: transparent; }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 1rem;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background-color: #f3f4f6;
          color: #333;
        }

        /* Responsive tint levels image - BETTER FIX */
        .tint-levels-image {
          width: 100%;
          height: auto;
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .tint-levels-image {
            height: auto;
            max-height: none;
            width: 100%;
            object-fit: contain;
            background-color: #f8fafc;
            padding: 10px;
          }
        }

        @media (max-width: 480px) {
          .tint-levels-image {
            padding: 8px;
            border-radius: 6px;
            background-color: #f1f5f9;
          }
        }

        /* Fix for the specific tint levels car image */
        .why-tinting-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .why-tinting-image {
            height: 250px;
            object-fit: contain;
            background-color: #f8fafc;
            padding: 10px;
          }
        }
      `}</style>

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

          {/* Responsive gradient overlay */}
          <div className="absolute bottom-0 left-0 w-full h-1/4 sm:h-1/3 md:h-1/3 lg:h-1/3 bg-gradient-to-t from-black/40 to-transparent z-10" />

          {/* Responsive scroll indicator */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex flex-col items-center">
              <span className="text-white text-sm mb-2 tracking-widest font-medium drop-shadow-md">SCROLL</span>
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-sky-500/40 animate-pulse"></div>
                <div className="animate-bounce bg-sky-600/90 p-2 rounded-full shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Content - positioned below video */}
      <section className="bg-white">
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6 leading-tight" style={{ color: '#1393c4' }}>
              WINDOW TINTING
            </h1>
            <p className="text-lg mb-4 font-medium" style={{ color: '#1393c4' }}>Say Goodbye To...</p>
            <div className="h-8 mb-4">
              <h3 className="text-3xl font-bold typewriter" style={{ color: '#1393c4' }}>
                {runningTexts[currentText]}
              </h3>
            </div>
            <p className="text-lg mb-8 font-medium" style={{ color: '#1393c4' }}>
              Before It Happens
            </p>
            <button
              onClick={() => setShowQuote(true)}
              className="text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:opacity-90"
              style={{ backgroundColor: '#1393c4' }}
            >
              Get Quote Now
            </button>
          </div>
        </div>
      </section>

      {/* Why Window Tinting Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 leading-tight" style={{ color: '#1393c4' }}>
                WHY WINDOW TINTING?
              </h2>
              <div className="mb-8">
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/action1.jpg.webp"
                  alt="Tint Levels"
                  className="why-tinting-image"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-6 rounded-xl bg-white border-2" style={{ borderColor: '#1393c4' }}>
                <h3 className="text-2xl font-bold mb-4 leading-tight" style={{ color: '#1393c4' }}>
                  Experience a New Level of Heat Rejection, UV Protection, & Good Looks
                </h3>
                <p className="text-lg leading-relaxed mb-6" style={{ color: '#1393c4' }}>
                  We recommend Ceramic window film for maximum heat rejection, glare reduction, and comfort. Gone are the days of needing dark windows to provide relief; even our ultra-light films provide extreme heat reduction, so choose your shade based on your style. All films provide +99% UV protection & Lifetime Warranty. Protect delicate interiors and your loved ones!!!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="animate-card p-6 rounded-xl bg-white border-2" style={{ borderColor: '#1393c4' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#1393c4' }}>
                      <Sun className="text-white" size={16} />
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#1393c4' }}>Superior Heat Rejection</h4>
                  </div>
                  <p className="text-sm" style={{ color: '#1393c4' }}>Our multilayer nano-ceramic particle technology blocks up to 88% of the infrared heat</p>
                </div>

                <div className="animate-card p-6 rounded-xl bg-white border-2" style={{ borderColor: '#1393c4' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#1393c4' }}>
                      <Shield className="text-white" size={16} />
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#1393c4' }}>UV Ray Protection</h4>
                  </div>
                  <p className="text-sm" style={{ color: '#1393c4' }}>XPEL PRIME XR PLUS provides SPF 1,000 protection that effectively blocks over 99% of harmful UV rays</p>
                </div>

                <div className="animate-card p-6 rounded-xl bg-white border-2" style={{ borderColor: '#1393c4' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#1393c4' }}>
                      <Zap className="text-white" size={16} />
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#1393c4' }}>Greater Clarity</h4>
                  </div>
                  <p className="text-sm" style={{ color: '#1393c4' }}>Advanced nano construction in XPEL PRIMETM XR provides superior performance without reducing outbound visibility</p>
                </div>

                <div className="animate-card p-6 rounded-xl bg-white border-2" style={{ borderColor: '#1393c4' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#1393c4' }}>
                      <Wifi className="text-white" size={16} />
                    </div>
                    <h4 className="font-bold text-lg" style={{ color: '#1393c4' }}>Crystal Clear Signal</h4>
                  </div>
                  <p className="text-sm" style={{ color: '#1393c4' }}>In the digital world, clear communication is key. PRIME XR PLUS construction will not interfere with radio, cellular, or Bluetooth signals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Window Tint as Easy as 1,2,3 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 leading-tight" style={{ color: '#1393c4' }}>
            Window Tint as Easy as <span style={{ color: '#1393c4', opacity: 0.8 }}>1, 2, 3</span>:
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="animate-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{ backgroundColor: '#1393c4' }}>1</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1393c4' }}>Select the Film</h3>
              <div className="bg-white p-6 rounded-lg shadow-lg border-2" style={{ borderColor: '#1393c4' }}>
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/filmselection-1.jpg.webp"
                  alt="Film Selection"
                  className="w-full rounded mb-4"
                />
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-white px-3 py-2 rounded text-sm" style={{ backgroundColor: '#1393c4', opacity: 0.7 }}>
                    <span>PRIME CS</span>
                    <span>GOOD</span>
                  </div>
                  <div className="flex items-center justify-between text-white px-3 py-2 rounded text-sm" style={{ backgroundColor: '#1393c4', opacity: 0.85 }}>
                    <span>PRIME HP</span>
                    <span>BETTER</span>
                  </div>
                  <div className="flex items-center justify-between text-white px-3 py-2 rounded text-sm" style={{ backgroundColor: '#1393c4' }}>
                    <span>PRIME XR</span>
                    <span>BEST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{ backgroundColor: '#1393c4' }}>2</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1393c4' }}>Select the Coverage</h3>
              <div className="bg-white p-6 rounded-lg shadow-lg border-2" style={{ borderColor: '#1393c4' }}>
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/action1.jpg.webp"
                  alt="Coverage Selection"
                  className="w-full rounded mb-4"
                />
                <div className="flex justify-center space-x-2">
                  {tintOptions.map((tint) => (
                    <button
                      key={tint}
                      className={`px-3 py-2 rounded text-sm ${selectedTint === tint
                        ? 'text-white'
                        : 'hover:opacity-80'
                        }`}
                      style={{
                        backgroundColor: selectedTint === tint ? '#1393c4' : '#f0f9ff',
                        color: selectedTint === tint ? 'white' : '#1393c4'
                      }}
                      onClick={() => setSelectedTint(tint)}
                    >
                      {tint}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-card text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{ backgroundColor: '#1393c4' }}>3</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#1393c4' }}>Select the Shade</h3>
              <div className="bg-white p-6 rounded-lg shadow-lg border-2" style={{ borderColor: '#1393c4' }}>
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/step3.jpg.webp"
                  alt="Shade Selection"
                  className="w-full rounded mb-4"
                />
                <div className="flex justify-center space-x-2 text-sm" style={{ color: '#1393c4' }}>
                  <span>5%</span>
                  <span>20%</span>
                  <span>35%</span>
                  <span>50%</span>
                  <span>70%</span>
                  <span>NONE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="text-center">
            <div className="relative inline-block max-w-2xl mx-auto">
              <img
                src="https://actioncardetailing.ca/wp-content/uploads/2021/05/step3.jpg.webp"
                alt="XPEL PRIME Window Film Video"
                className="w-full rounded-lg shadow-2xl"
              />
              <a
                href="https://youtu.be/RPLIOjXU_oQ"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center rounded-lg hover:opacity-75 transition-all duration-300"
                style={{ backgroundColor: 'rgba(19, 147, 196, 0.5)' }}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#1393c4' }}>
                  <Play className="text-white ml-1" size={32} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What Film Section - Film Cards Only */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 leading-tight" style={{ color: '#1393c4' }}>
            1. WHAT FILM?
          </h2>
          <p className="text-center max-w-4xl mx-auto mb-8 text-lg leading-relaxed" style={{ color: '#1393c4' }}>
            Many shops offering window tint will quote you pricing based on their lowest grade film just to get you in the door. Once there, they educate you on films and upsell you after you realize the kind of film you desire and the number of windows you really need (eg Cal legal), thus you end up spending much more then you originally thought.
          </p>
          <p className="text-center max-w-4xl mx-auto mb-16 text-lg font-semibold" style={{ color: '#1393c4' }}>
            We are straight forward with all of our Pricing and Options as we treat our clients as we like to be treated; no surprises! The Color Stable, Ceramic or Nano Ceramic choice simply comes down to budget as both films lines we carry are quality, lifetime warrantied products.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(filmTypes).map(([key, film], index) => (
              <div key={key} className={`animate-card bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 ${selectedFilm === key ? 'ring-4' : ''}`}
                style={{
                  borderColor: '#1393c4',
                  ringColor: selectedFilm === key ? '#1393c4' : 'transparent'
                }}>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#1393c4' }}>{film.name}</h3>
                    <div className="mb-4">
                      <img
                        src={film.logo}
                        alt={`${film.name} Logo`}
                        className="h-16 mx-auto mb-2"
                      />
                    </div>
                    <p className="font-semibold text-lg" style={{ color: '#1393c4' }}>{film.subtitle}</p>
                  </div>

                  <div className="mb-6">
                    <img
                      src="https://actioncardetailing.ca/wp-content/uploads/2021/05/xpel.png.webp"
                      alt="XPEL Logo"
                      className="w-24 mx-auto mb-4"
                    />
                    <img
                      src={film.carImage}
                      alt={`${film.name} Car`}
                      className="w-full rounded-lg"
                    />
                  </div>

                  <div className={`text-center text-3xl font-black mb-6`} style={{ color: '#1393c4' }}>
                    {film.grade}
                  </div>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#1393c4' }}>{film.description}</p>

                  <div className="space-y-3">
                    {film.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="mt-0.5 flex-shrink-0" style={{ color: '#1393c4' }} size={16} />
                        <span className="text-sm" style={{ color: '#1393c4' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Coverage Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 leading-tight" style={{ color: '#1393c4' }}>
            2. WHAT COVERAGE?
          </h2>
          <p className="text-center max-w-4xl mx-auto mb-16 text-lg leading-relaxed" style={{ color: '#1393c4' }}>
            For maximum UV Protection, heat rejection, and comfort we recommend doing as much as the budget allows. A chain is only as strong as its weakest link and for highest levels of interior protection consider all glass. Many think that factory "privacy" glass is a protective tint but unfortunately it is shaded for looks only and does not help with UV or Heat.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-card text-center">
              <h3 className="text-2xl font-bold mb-8" style={{ color: '#1393c4' }}>TWO FRONTS ONLY:</h3>
              <div className="bg-white p-8 rounded-xl shadow-lg border-2" style={{ borderColor: '#1393c4' }}>
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/side.png.webp"
                  alt="Two Fronts Only"
                  className="w-full max-w-md mx-auto mb-6"
                />
                <button
                  onClick={() => setShowQuote(true)}
                  className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 text-base"
                  style={{ backgroundColor: '#1393c4' }}
                >
                  Get A Quote
                </button>
              </div>
            </div>

            <div className="animate-card text-center">
              <h3 className="text-2xl font-bold mb-8" style={{ color: '#1393c4' }}>SIDES AND BACK:</h3>
              <div className="bg-white p-8 rounded-xl shadow-lg border-2" style={{ borderColor: '#1393c4' }}>
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/side_back.png.webp"
                  alt="Sides and Back"
                  className="w-full max-w-md mx-auto mb-6"
                />
                <button
                  onClick={() => setShowQuote(true)}
                  className="text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 text-base"
                  style={{ backgroundColor: '#1393c4' }}
                >
                  Get A Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Window Tint Simulator Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 leading-tight" style={{ color: '#1393c4' }}>
            3. WHAT SHADE?
          </h2>
          <p className="text-center max-w-4xl mx-auto mb-12 text-lg leading-relaxed" style={{ color: '#1393c4' }}>
            Try our interactive window tint simulator to see how different shades will look on your vehicle.
          </p>

          <div className="text-center mb-12">
            <div className="p-8 rounded-xl shadow-xl w-full bg-white border-2" style={{ borderColor: '#1393c4' }}>
              <a
                href="https://www.xpel.com/automotive-window-tint-simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity duration-300"
              >
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/image10.png.webp"
                  alt="Window Tint Simulator - Click to access XPEL interactive simulator"
                  className="w-full max-w-4xl mx-auto rounded-lg cursor-pointer"
                  style={{ height: '400px', objectFit: 'contain' }}
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tinting Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 leading-tight" style={{ color: '#1393c4' }}>
            OUR TINTING PROCESS
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-card text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{ backgroundColor: '#1393c4' }}>
                1
              </div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#1393c4' }}>WE PREP</h3>
              <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-lg border-2" style={{ borderColor: '#1393c4' }}>
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/prep.jpg.webp"
                  alt="We Prep"
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="text-lg leading-relaxed" style={{ color: '#1393c4' }}>
                Using Xpels DAP software and the best patterns available we computer cut all film for a precise fit. We then thermally shrink each panel onto the glass and shave all edges for a smooth install.
              </p>
            </div>

            <div className="animate-card text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{ backgroundColor: '#1393c4' }}>
                2
              </div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#1393c4' }}>WE PLOT</h3>
              <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-lg border-2" style={{ borderColor: '#1393c4' }}>
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/plot.jpg.webp"
                  alt="We Plot"
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="text-lg leading-relaxed" style={{ color: '#1393c4' }}>
                WE PLOT With XPEL's Design Access Program (DAP), we create a perfect blueprint for your vehicle's glass. Every cut is digitally mapped to match your exact year, make, and model, ensuring maximum coverage and precision. This plotting process eliminates the need for risky hand-cutting on your vehicle, preserving your glass and trim while setting the stage for a flawless installation.
              </p>
            </div>

            <div className="animate-card text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white" style={{ backgroundColor: '#1393c4' }}>
                3
              </div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#1393c4' }}>WE EXECUTE</h3>
              <div className="bg-white rounded-xl overflow-hidden mb-6 shadow-lg border-2" style={{ borderColor: '#1393c4' }}>
                <img
                  src="https://actioncardetailing.ca/wp-content/uploads/2021/05/execute.jpg.webp"
                  alt="We Execute"
                  className="w-full h-48 object-cover"
                />
              </div>
              <p className="text-lg leading-relaxed" style={{ color: '#1393c4' }}>
                We don't take short cuts and aren't a "volume" shop that rushes the jobs in and out to remain profitable; Rather one that goes the extra mile to help you choose the right film, make the install as dust-free as possible, and return the vehicle cleaner than we received it. We want you to find value in how we treat both you and your vehicle, ultimately earning your repeat and referral business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 leading-tight" style={{ color: '#1393c4' }}>
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto font-medium" style={{ color: '#1393c4' }}>
            Experience the ultimate in UV protection, heat rejection, and style with our professional window tinting services.
          </p>
          <button
            onClick={() => setShowQuote(true)}
            className="text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:opacity-90"
            style={{ backgroundColor: '#1393c4' }}
          >
            Get Your Free Quote Today
          </button>
        </div>
      </section>

      {/* References Section */}
      <References />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Quote Modal */}
      {showQuote && (
        <div className="modal-overlay" onClick={() => setShowQuote(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowQuote(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            <Quote isOpen={showQuote} onClose={() => setShowQuote(false)} />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default WindowTintingSite;
