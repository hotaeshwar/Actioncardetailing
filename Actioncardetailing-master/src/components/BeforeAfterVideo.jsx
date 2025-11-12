import React from 'react';
import beforeAfterVideo from '../assets/images/BEFOREANDAFTER.mp4';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const BeforeAfterVideo = () => {
  return (
    <div className="min-h-screen bg-snow">
      <div className="w-full min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 pt-20 md:pt-24 lg:pt-28">
        {/* Header Text */}
        <div className="text-center mb-6 md:mb-8">
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold block mb-2" style={{ color: '#1393c4' }}>
            Before & After
          </span>
          <span className="text-lg md:text-xl lg:text-2xl font-semibold underline decoration-2 underline-offset-2" style={{ color: '#1393c4' }}>
            Here is Our Works
          </span>
        </div>

        {/* Video Card */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl aspect-video rounded-none sm:rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-none sm:shadow-lg md:shadow-xl lg:shadow-2xl">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            controls
            preload="metadata"
            webkit-playsinline="true"
          >
            <source src={beforeAfterVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <ContactForm />
      <Footer />
    </div>
  );
};

export default BeforeAfterVideo;
