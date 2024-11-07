"use client";
import React, { useState } from 'react';

const Testimonials = ({ testimonialsData }) => {
  const { title, testimonials } = testimonialsData;
  const [startIndex, setStartIndex] = useState(0);

  // Function to navigate to the next testimonials
  const nextTestimonials = () => {
    setStartIndex((prevIndex) => 
      prevIndex + 2 < testimonials.length ? prevIndex + 1 : 0
    );
  };

  // Function to navigate to the previous testimonials
  const prevTestimonials = () => {
    setStartIndex((prevIndex) => 
      prevIndex - 2 >= 0 ? prevIndex - 2 : testimonials.length - 1
    );
  };

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 2);

  return (
    <section className="py-20 font-ibm max-w-7xl mx-auto px-4 relative">
      <h2 className="text-2xl md:text-4xl text-center font-bold mb-10">{title}</h2>
      
      <div className="relative">
        <div className="hs-carousel w-full overflow-hidden rounded-lg">
          <div className="relative min-h-72">
            <div className="hs-carousel-body flex flex-wrap justify-center gap-2 transition-opacity duration-700">
              {visibleTestimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="hs-carousel-slide px-5 w-full sm:w-2/5 lg:w-2/5"
                >
                  <div className="bg-gray-100 rounded-lg p-8 shadow-md flex flex-col justify-between h-80">
                    <div className="flex flex-row gap-2">
                      <div>
                        <img
                          src={testimonial.image}
                          alt={`${testimonial.name}'s photo`}
                          className="w-16 h-16 mb-4 rounded-full border-2 border-gray-800"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                        <p className="text-md font-medium mb-4">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-md text-gray-700">{testimonial.feedback}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2"></div>
      </div>

      
      <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center sm:px-10 md:px-32">
        <button
          type="button"
          onClick={prevTestimonials}
          className="hs-carousel-prev flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg focus:outline-none"
        >
          <span className="text-xl">‹</span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          type="button"
          onClick={nextTestimonials}
          className="hs-carousel-next flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg focus:outline-none"
        >
          <span className="text-xl">›</span>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
