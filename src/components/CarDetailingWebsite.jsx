import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, Car, Clock, Calendar, ShoppingCart, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Footer from '../components/Footer';
import Booking from '../components/Booking';
import ContactForm from '../components/ContactForm';
import References from '../components/Reference1';
import googlePng from '../assets/images/google png.png';
import autoDetailingVideo from '../assets/images/Auto Detailing final.mp4';

// Modal wrapper component that uses the existing Booking component
const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

      <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1393c4]/20 bg-white">
            <h1 className="text-lg sm:text-xl font-bold text-[#1393c4]">Book Your Car Detailing Service</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#1393c4]/20 rounded-full transition-colors duration-300"
            >
              <X className="w-5 h-5 text-[#1393c4]" />
            </button>
          </div>

          {/* Content - Using the existing Booking component */}
          <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
            <Booking isModal={true} onModalClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

const CarDetailingWebsite = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(Array(7).fill(false)); // Updated to 7 sections (removed services)
  const videoRef = useRef(null);

  useEffect(() => {
    // Video handling with responsive sizing like Hero component
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

      // FIXED: iPad-specific video adjustments to prevent stretching
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
        video.style.WebkitTransform = 'translateZ(0)';
        video.style.WebkitBackfaceVisibility = 'hidden';

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
  }, []);

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

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video */}
      <section className="relative">
        {/* Video Container with responsive sizing */}
        <div className="relative w-full h-screen sm:h-auto sm:aspect-video lg:h-screen overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              objectPosition: 'center center'
            }}
          >
            <source src={autoDetailingVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
                Action car detailing is made up of a team of experts who can handle any size vehicles in any condition. We are dedicated to getting the job done right, there is no better place in Winnipeg to get your car detailed. Quality products, quality work and quality service is our promise.
              </p>

              <p className="text-base text-[#1393c4] leading-relaxed">
                We are passionate about cars that's why we take our time with each vehicle. Our chemical and allergy-free interior cleaning methods will leave your car's interior spotless and scentless- the way it should be.
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
                Dual action brushing and biodegradable shampoo loosens and emulsifies dirt, oils, and stubborn stains.
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1393c4] mb-4">
              Read some of our Reviews
            </h2>

            <div className="inline-flex items-center justify-center bg-white border-2 border-[#1393c4] rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
                <img
                  src={googlePng}
                  alt="Google Reviews"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
            </div>
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
                review: "Been using Action Car Detailing for 3 years now. Consistently excellent results every time. Highly recommend!"
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

      {/* Booking Section - Using the existing Booking component */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <Booking isModal={false} />
      </section>

      {/* ContactForm Section - Added below Booking section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[5] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="[&>*]:before:hidden [&>*]:after:hidden [&_.loading]:hidden [&_.dots]:hidden [&_.spinner]:hidden [&_*[class*='animate']]:!animation-none">
          <ContactForm />
        </div>
      </section>

      {/* References Section - Added below ContactForm section */}
      <section className={`animate-section py-12 sm:py-16 bg-white transition-all duration-1000 ease-in-out ${isVisible[6] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="[&>*]:before:hidden [&>*]:after:hidden [&_.loading]:hidden [&_.dots]:hidden [&_.spinner]:hidden [&_*[class*='animate']]:!animation-none">
          <References />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </div>
  );
};

export default CarDetailingWebsite;
