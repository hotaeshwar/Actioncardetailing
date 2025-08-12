import React from 'react';

const BusinessDescription = ({ setCurrentView }) => {
  const handleAboutClick = () => {
    if (setCurrentView) {
      setCurrentView('about');
    } else {
      console.warn('setCurrentView prop not provided. Please ensure proper routing is set up.');
    }
  };

  return (
    <div className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16">
      <div className="max-w-sm mx-auto px-4 sm:max-w-2xl sm:px-6 md:max-w-4xl md:px-8 lg:max-w-6xl lg:px-10 xl:max-w-7xl xl:px-12">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          {/* Main content container */}
          <div className="text-center sm:text-center md:text-center lg:text-left xl:text-left">
            {/* Business description text */}
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
              <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed sm:leading-relaxed md:leading-loose lg:leading-loose xl:leading-loose block" style={{ color: '#1393c4' }}>
                <span className="font-semibold">Locally owned and operated since 2011</span>,
                specialized in <span className="font-medium">deep interior cleaning</span>,
                <span className="font-medium">paint correction</span>,
                <span className="font-medium">Ceramic coating</span>, and
                <span className="font-medium">Window tinting</span>.
                We are <span className="font-semibold">MPI accredited auto detailing shop</span>.
                We are proud to be member of <span className="font-semibold">CFIB and BBB with A+ rating</span>.
                Our reputation is backed up by several accolades that prove our years of commitment to consumer care.
                Our most recent has come in the form of a
                <span className="font-bold">2025 Consumer Choice Award</span>.
                We're proud to be the <span className="font-semibold">only winner in our industry</span>.
                We have team of <span className="font-medium">factory trained professionals</span> to work on your vehicle.
                We are certified <span className="font-semibold">XPEL certified dealer and installation center</span>.
              </span>
            </div>

            {/* Call-to-action button */}
            <div className="flex justify-center sm:justify-center md:justify-center lg:justify-start xl:justify-start">
              <button
                onClick={handleAboutClick}
                className="
                  inline-flex items-center justify-center
                  px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-4
                  text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold
                  text-white rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg xl:rounded-xl
                  shadow-sm sm:shadow-md md:shadow-md lg:shadow-lg xl:shadow-lg
                  hover:shadow-md sm:hover:shadow-lg md:hover:shadow-lg lg:hover:shadow-xl xl:hover:shadow-xl
                  transform hover:scale-105 transition-all duration-300
                  focus:outline-none focus:ring-2 sm:focus:ring-3 md:focus:ring-4 lg:focus:ring-4 xl:focus:ring-4
                  active:scale-95
                  w-full sm:w-full md:w-auto lg:w-auto xl:w-auto
                  max-w-xs sm:max-w-sm md:max-w-none lg:max-w-none xl:max-w-none
                "
                style={{
                  backgroundColor: '#1393c4',
                  '--tw-ring-color': '#1393c4',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0f7ba8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1393c4'}
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5 mr-1 sm:mr-2 md:mr-2 lg:mr-2 xl:mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Learn More About Us</span>
                <span className="sm:hidden">About Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDescription;