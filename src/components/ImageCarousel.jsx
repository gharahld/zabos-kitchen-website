import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ImageCarousel({ images, autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.src = images[currentIndex];
  }, [currentIndex, images]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Main Image */}
      <div className="relative w-full h-full">
        <img
          src={images[currentIndex]}
          alt={`Restaurant image ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {autoPlay && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((currentIndex + 1) / images.length) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  );
}

