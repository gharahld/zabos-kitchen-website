import { Button } from './Button';
import { ImageCarousel } from './ImageCarousel';

export function Hero({ onOrderClick, onReserveClick }) {
  const heroImages = [
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Restaurant Background Carousel */}
      <div className="absolute inset-0">
        <ImageCarousel images={heroImages} autoPlay={true} interval={6000} />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Brand gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/40 via-orange-500/30 to-brand-yellow/40"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse delay-2000"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
        {/* Professional Square Transparent Container */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight font-bold">
            Come Hungry, <br />
            <span className="text-brand-yellow bg-gradient-to-r from-brand-yellow to-brand-orange bg-clip-text text-transparent">
              Leave Happy
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Hollywood's tastiest Haitian & Caribbean bites — fresh, bold, unforgettable.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onOrderClick}
              className="text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-brand-orange hover:bg-orange-600"
            >
              🍽️ Order Online
            </Button>
            <Button 
              variant="secondary" 
              onClick={onReserveClick}
              className="text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-white text-white hover:bg-white hover:text-brand-charcoal"
            >
              📅 Reserve a Table
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
