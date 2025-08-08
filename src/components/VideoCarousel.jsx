import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const VideoCardCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);

  // Video data with titles and descriptions
  const videos = [
    {
      src: '/assets/images/carasoul1.MP4',
      title: "Premium Detailing",
      description: "Complete exterior detailing"
    },
    {
      src: '/assets/images/carasoul2.MP4',
      title: "Complete Exterior and Interior Detailing",
      description: "Professional Detailing services"
    },
    {
      src: '/assets/images/carasoul3.MP4',
      title: "Interior Detailing",
      description: "Deep cleaning and protection"
    }
  ];

  // Memoize callback functions to prevent unnecessary re-renders
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setIsPlaying(true);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % videos.length);
  }, [currentSlide, videos.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + videos.length) % videos.length);
  }, [currentSlide, videos.length, goToSlide]);

  // Check device type
  useEffect(() => {
    const checkDeviceType = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobileDevice(isMobile || window.innerWidth < 768);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const interval = isMobileDevice ? 10000 : 8000;

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, nextSlide, isMobileDevice]);

  // Handle video playback
  const handlePlayPause = useCallback(() => {
    const currentVideo = videoRefs.current[currentSlide];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play().catch(error => {
          console.log("Play failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [currentSlide, isPlaying]);

  // Optimized video loading and playback
  useEffect(() => {
    const playCurrentVideo = async () => {
      try {
        // Pause all other videos
        videoRefs.current.forEach((video, index) => {
          if (video && index !== currentSlide) {
            video.pause();
            video.currentTime = 0;
          }
        });

        const currentVideo = videoRefs.current[currentSlide];
        if (currentVideo) {
          if (isMobileDevice) {
            currentVideo.load();
            await new Promise(resolve => {
              const onLoadedData = () => {
                currentVideo.removeEventListener('loadeddata', onLoadedData);
                resolve();
              };
              currentVideo.addEventListener('loadeddata', onLoadedData);
              setTimeout(resolve, 2000); // Fallback timeout
            });
          }

          try {
            if (isPlaying) {
              await currentVideo.play();
              setIsVideoLoaded(true);
            }
          } catch (playError) {
            console.log("Video play failed:", playError);
            // Retry logic
            setTimeout(async () => {
              try {
                if (isPlaying) {
                  await currentVideo.play();
                  setIsVideoLoaded(true);
                }
              } catch (retryError) {
                console.log("Video play retry failed:", retryError);
                setIsVideoLoaded(false);
              }
            }, 500);
          }
        }
      } catch (error) {
        console.log("Video management error:", error);
        setIsVideoLoaded(false);
      }
    };

    playCurrentVideo();
  }, [currentSlide, isMobileDevice, isPlaying]);

  return (
    <div className="py-8 md:py-12 lg:py-16 xl:py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Video Carousel */}
        <div className="relative max-w-6xl mx-auto rounded-3xl shadow-3xl shadow-black/50 overflow-hidden border-4 border-white/20">
          <div className="relative aspect-video bg-black">
            {videos.map((video, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <video
                  ref={el => videoRefs.current[index] = el}
                  src={video.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload={index === 0 ? "auto" : isMobileDevice ? "none" : "metadata"}
                  onLoadedData={() => {
                    if (index === currentSlide) {
                      setIsVideoLoaded(true);
                    }
                  }}
                  onError={(e) => {
                    console.log(`Video ${index} error:`, e);
                    setIsVideoLoaded(false);
                  }}
                  onWaiting={() => {
                    console.log(`Video ${index} buffering...`);
                  }}
                  onCanPlay={() => {
                    if (index === currentSlide) {
                      console.log(`Video ${index} can play`);
                    }
                  }}
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                {/* Loading indicator for mobile */}
                {isMobileDevice && !isVideoLoaded && index === currentSlide && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-white/70 text-sm">Loading video...</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-20 group video-nav-btn"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-cyan-400 transition-colors duration-300" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-20 group video-nav-btn"
            aria-label="Next video"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-cyan-400 transition-colors duration-300" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/30 shadow-lg hover:scale-110 z-20 group"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-cyan-400 transition-colors duration-300" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-cyan-400 transition-colors duration-300 ml-0.5" />
            )}
          </button>

          {/* Video indicators - Mobile friendly with click functionality */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 video-indicators">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>

          {/* Video Information */}
          <div className="absolute bottom-16 left-4 right-4 z-20">
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-1">
                {videos[currentSlide].title}
              </h3>
              <p className="text-white/80 text-sm sm:text-base">
                {videos[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        /* Video Navigation Button Styles */
        .video-nav-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        
        .video-nav-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .video-nav-btn:active {
          transform: scale(0.95);
        }

        /* Enhanced touch targets for mobile */
        @media (max-width: 768px) {
          .video-nav-btn {
            width: 3rem !important;
            height: 3rem !important;
            min-width: 44px;
            min-height: 44px;
          }
          
          .video-nav-btn svg {
            width: 1.25rem !important;
            height: 1.25rem !important;
          }
        }

        /* Video indicator enhancements */
        .video-indicators button {
          min-width: 12px;
          min-height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .video-indicators button:hover {
          transform: scale(1.2);
        }
        
        .video-indicators button:focus-visible {
          outline: 2px solid #0ea5e9;
          outline-offset: 2px;
          border-radius: 50%;
        }

        /* Performance optimizations */
        * {
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
};

export default VideoCardCarousel;
