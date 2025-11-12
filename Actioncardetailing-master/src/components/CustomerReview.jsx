import React, { useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';

const CustomerReview = () => {
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  const reviews = [
    {
      date: 'May 3, 2025',
      name: 'Serge Martel',
      text: 'Did a great job',
      rating: 5
    },
    {
      date: 'May 3, 2025',
      name: 'Thomas Knight',
      text: 'Well I was warmly greeted by Bal and he took care of my needs. Did a fabulous job on my Golf R. I so impressed with the detailing of my car and wheels and the tint looks fabulous. I am so thankful for his attention to all the details.',
      rating: 5
    },
    {
      date: 'Apr 25, 2025',
      name: 'Yurii NikFear',
      text: 'Perfect service, no any problem',
      rating: 5
    },
    {
      date: 'Apr 24, 2025',
      name: 'k c',
      text: 'First time using them and they did an amazing job. Looked brand new in the inside that I feel bad stepping inside of it haha. They did everything within the timeframe they gave as well as made sure that the things we left in the car, are all in a bag. They also uninstalled and cleaned out our infant seat attachment. Will definately go back again. Thank you!',
      rating: 5
    },
    {
      date: 'Apr 21, 2025',
      name: 'Nhan',
      text: 'The service was great, my car came out of clean',
      rating: 5
    },
    {
      date: 'Apr 12, 2025',
      name: 'parveen kaur',
      text: 'It was great experience at Action car detailing, I gave them my car for one day for ceramic coating and after it looks so clean and shiny… they did really good job .',
      rating: 5
    },
    {
      date: 'Apr 11, 2025',
      name: 'Michel Henri',
      text: 'The place to get your car looking and smelling new to you! Fast, friendly, professional service. 5 star Clean.',
      rating: 5
    },
    {
      date: 'Apr 11, 2025',
      name: 'Walter Ajogbor',
      text: 'Go see Babir, he is very friendly. Great customer service, and they do a great job.',
      rating: 5
    },
    {
      date: 'Apr 6, 2025',
      name: 'Kevin Michel',
      text: '10 years of daily use. After one trip to Action car detailing and the interior looks and feels new. Thank you',
      rating: 5
    },
    {
      date: 'Apr 5, 2025',
      name: 'Jeffery',
      text: 'After watching countless videos of ceramic coating on YouTube, I was a bit skeptical on where to go. So I trusted everyone else\'s reviews and picked action, the price was right very polite and my car is coated perfectly. I actually waited a few weeks for our Winnipeg weather to hit it and see how it washes off. Seeing the beads of water beat off, that\'s what you can call it,, makes you feel good..... A year later... went there for a ceramic coating warranty check and touch-up. Car came out looking like a shiny diamond. Great work!',
      rating: 5
    }
  ];

  const toggleReviews = () => {
    if (isExpanded) {
      setVisibleReviews(6);
      setIsExpanded(false);
    } else {
      setVisibleReviews(reviews.length);
      setIsExpanded(true);
    }
  };

  return (
    <section 
      id="customer-reviews" 
      className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 relative overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-4 px-6 py-2 bg-sky-100/60 backdrop-blur-md rounded-full border border-sky-200/50">
            <span className="text-sm sm:text-base font-medium tracking-wide" style={{color: '#1393c4'}}>TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 relative">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 drop-shadow-2xl" style={{color: '#1393c4'}}>
              Customer Reviews
            </span>
            <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 lg:w-40 h-1 sm:h-2 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-full shadow-xl shadow-sky-500/50"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-sky-500/90 to-sky-700/90 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/50"
            >
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-white/90 font-medium">{review.date}</span>
                </div>
                
                <div className="mb-3 sm:mb-4">
                  <span className="font-bold text-white text-sm sm:text-base block mb-1 sm:mb-2">
                    {review.name}
                  </span>
                  <p className="text-white/90 text-xs sm:text-sm bg-white/10 backdrop-blur-md p-2 sm:p-3 rounded-lg border border-white/20 line-clamp-4 sm:line-clamp-5 md:line-clamp-none leading-relaxed">
                    {review.text}
                  </p>
                </div>
                
                <div className="flex items-center text-white/90 text-xs sm:text-sm">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span>Verified Review</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {reviews.length > 6 && (
          <div className="text-center mt-6 sm:mt-8">
            <button 
              onClick={toggleReviews}
              className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
            >
              {isExpanded ? 'Show Less Reviews' : 'Load More Reviews'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReview;