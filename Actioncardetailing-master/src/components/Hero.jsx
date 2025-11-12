import React, { useEffect, useRef, useState } from 'react';
import carwashVideo from '../assets/images/carwash.mp4';

const Hero = () => {
  const videoRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
      
      // AGGRESSIVE FIX: Performance optimizations for zero lag
      video.preload = 'auto';
      video.poster = '';
      video.loading = 'eager';
      video.crossOrigin = 'anonymous';
      
      // AGGRESSIVE FIX: Disable all animations and transitions during video load
      video.style.transition = 'none';
      video.style.animation = 'none';
      
      // AGGRESSIVE FIX: Force browser optimization
      video.style.willChange = 'auto';
      video.style.backfaceVisibility = 'hidden';
      video.style.perspective = '1000px';
      video.style.transformStyle = 'preserve-3d';
      
      // AGGRESSIVE FIX: Reduce quality on slower devices
      if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === '2g' || connection.effectiveType === '3g') {
          video.style.filter = 'blur(0.5px)'; // Slight blur to reduce rendering load
        }
      }
      
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
      
      // AGGRESSIVE FIX: Minimal resize handling to reduce lag
      let resizeTimeout;
      const throttledResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustVideoFit, 500); // Increased to 500ms
      };
      
      // AGGRESSIVE FIX: Only listen to essential events
      window.addEventListener('resize', throttledResize, { passive: true });
      window.addEventListener('orientationchange', () => {
        setTimeout(adjustVideoFit, 600); // Increased delay
      }, { passive: true });
      
      // AGGRESSIVE FIX: Force complete video load before any playback
      const forceVideoLoad = () => {
        return new Promise((resolve) => {
          if (video.readyState === 4) { // HAVE_ENOUGH_DATA
            resolve();
            return;
          }
          
          const checkLoad = () => {
            if (video.readyState === 4) {
              resolve();
            } else {
              setTimeout(checkLoad, 50);
            }
          };
          
          video.addEventListener('canplaythrough', resolve, { once: true });
          video.addEventListener('loadeddata', checkLoad, { once: true });
          
          // Force load
          video.load();
        });
      };
      
      // AGGRESSIVE FIX: Play only when fully loaded
      const playVideo = async () => {
        try {
          // Wait for complete loading
          await forceVideoLoad();
          
          // Additional delay to ensure smooth start
          await new Promise(resolve => setTimeout(resolve, 200));
          
          await video.play();
        } catch (error) {
          console.log('Initial autoplay failed, setting up user interaction');
          
          const enableVideo = async () => {
            try {
              await forceVideoLoad();
              await video.play();
              document.removeEventListener('click', enableVideo);
              document.removeEventListener('touchstart', enableVideo);
              document.removeEventListener('scroll', enableVideo);
            } catch (err) {
              console.log('Video play failed:', err);
            }
          };
          
          document.addEventListener('click', enableVideo, { once: true });
          document.addEventListener('touchstart', enableVideo, { once: true });
          document.addEventListener('scroll', enableVideo, { once: true });
        }
      };
      
      // AGGRESSIVE FIX: Much longer delay to ensure everything is ready
      setTimeout(playVideo, 1000);
      
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

  // FIXED: iPad-specific height calculation to prevent stretching
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

  return (
    <div 
      className="relative w-full overflow-hidden bg-black"
      style={{ 
        height: getContainerHeight(),
        minHeight: isSmallScreen ? '300px' : '400px'
      }}
    >
      {/* OPTIMIZED: Video background with better loading attributes */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full"
          src={carwashVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster=""
          controls={false}
          crossOrigin="anonymous"
          loading="eager"
          disablePictureInPicture
          disableRemotePlayback
          x-webkit-airplay="deny"
          style={{
            objectFit: 'cover',
            objectPosition: 'center center',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'auto',
            WebkitTransform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            // AGGRESSIVE FIX: Additional performance styles
            imageRendering: 'optimizeSpeed',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            transition: 'none',
            animation: 'none',
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
  );
};

export default Hero;