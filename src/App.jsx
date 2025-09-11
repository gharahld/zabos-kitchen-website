import React, { useState } from 'react';
import { ChevronDown, Clock, MapPin, Phone, Mail, Star, ShoppingCart, Users, Utensils, Heart, Award, Facebook, Instagram, Twitter } from 'lucide-react';
import ReservationForm from './ReservationForm';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { PhotoGallery } from './components/PhotoGallery';
import { InteractiveMenu } from './components/InteractiveMenu';
import { AnimatedCounters } from './components/AnimatedCounters';
import ErrorBoundary from './components/ErrorBoundary';

const RestaurantWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Menu items
  const menuItems = [
    {
      id: 1,
      category: 'Appetizers',
      name: 'Crispy Calamari',
      description: 'Fresh squid rings with marinara sauce',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      popular: true
    },
    {
      id: 2,
      category: 'Appetizers',
      name: 'Buffalo Wings',
      description: 'Spicy wings with blue cheese dip',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      popular: false
    },
    {
      id: 3,
      category: 'Main Course',
      name: 'Grilled Salmon',
      description: 'Atlantic salmon with seasonal vegetables',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      popular: true
    },
    {
      id: 4,
      category: 'Main Course',
      name: 'Ribeye Steak',
      description: '12oz prime cut with garlic mashed potatoes',
      price: 32.99,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      popular: true
    },
    {
      id: 5,
      category: 'Main Course',
      name: 'Chicken Parmesan',
      description: 'Breaded chicken with pasta marinara',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      popular: false
    },
    {
      id: 6,
      category: 'Desserts',
      name: 'Chocolate Cake',
      description: 'Rich triple layer chocolate cake',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      popular: true
    }
  ];

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center mr-3">
              <Utensils className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-charcoal">Flavor Haven</h1>
              <p className="text-sm text-brand-gray">Come Hungry, Leave Happy</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['home', 'menu', 'reservations', 'about', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === page 
                    ? 'text-brand-orange border-b-2 border-brand-orange' 
                    : 'text-brand-charcoal hover:text-brand-orange'
                }`}
              >
                {page === 'home' ? 'Home' : page}
              </button>
            ))}
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-brand-charcoal" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
            <span className="text-sm font-medium">${getCartTotal().toFixed(2)}</span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-charcoal hover:text-brand-orange"
            >
              <ChevronDown className={`w-6 h-6 transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-brand-light">
            <div className="py-2 space-y-1">
              {['home', 'menu', 'reservations', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-brand-charcoal hover:bg-orange-50 hover:text-brand-orange capitalize"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Hero Section
  const HeroSection = () => (
    <div className="relative h-96 bg-gradient-to-r from-brand-orange to-orange-600 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Flavor Haven</h1>
        <p className="text-xl mb-6">Come Hungry, Leave Happy</p>
        <div className="space-x-4">
          <button
            onClick={() => setCurrentPage('menu')}
            className="bg-white text-brand-orange px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            View Menu
          </button>
          <button
            onClick={() => setCurrentPage('reservations')}
            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-brand-orange transition-colors"
          >
            Book Table
          </button>
        </div>
      </div>
      {/* Grand Opening Banner */}
      <div className="absolute top-4 right-4 bg-brand-blue text-white px-6 py-2 rounded-full font-bold">
        🎉 Grand Opening!
      </div>
    </div>
  );

  // Home Page
  const HomePage = () => (
    <div className="page-transition">
      <Hero 
        onOrderClick={() => setCurrentPage('menu')} 
        onReserveClick={() => setCurrentPage('reservations')} 
      />
      
      {/* Animated Counters */}
      <AnimatedCounters />
      
      {/* Restaurant Gallery */}
      <PhotoGallery 
        title="Restaurant Gallery"
        photos={[
          {
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            title: 'Elegant Dining Room',
            description: 'Our beautifully designed main dining area with warm lighting and comfortable seating',
            alt: 'Restaurant dining room'
          },
          {
            image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            title: 'Cozy Bar Area',
            description: 'Perfect spot for drinks and appetizers with our friendly bartenders',
            alt: 'Restaurant bar area'
          },
          {
            image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            title: 'Outdoor Patio',
            description: 'Enjoy your meal in our beautiful outdoor seating area',
            alt: 'Restaurant outdoor patio'
          },
          {
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            title: 'Chef\'s Kitchen',
            description: 'Watch our talented chefs prepare your meal in our open kitchen',
            alt: 'Restaurant kitchen'
          },
          {
            image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            title: 'Private Dining',
            description: 'Perfect for special occasions and business meetings',
            alt: 'Private dining room'
          },
          {
            image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            title: 'Wine Cellar',
            description: 'Extensive collection of fine wines from around the world',
            alt: 'Wine cellar'
          }
        ]}
      />
      
      {/* Interactive Menu Preview */}
      <InteractiveMenu menuItems={menuItems} />
      
      <Menu />
      
      {/* Enhanced Why Choose Us Section */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-orange/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-yellow/5 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-blue/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block relative">
              <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-6 relative">
                Why Choose Us?
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-brand-orange to-brand-yellow rounded-full"></div>
              </h2>
            </div>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto leading-relaxed">
              Experience exceptional Haitian & Caribbean dining with fresh ingredients, expert chefs, and warm hospitality that makes every visit memorable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-orange to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Award className="text-white w-10 h-10" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-brand-charcoal">Award Winning</h3>
              <p className="text-brand-gray leading-relaxed">Recognized for culinary excellence and outstanding service in Hollywood's dining scene</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-orange to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Heart className="text-white w-10 h-10" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-brand-charcoal">Fresh Ingredients</h3>
              <p className="text-brand-gray leading-relaxed">Locally sourced, premium quality ingredients in every authentic Haitian & Caribbean dish</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-orange to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Users className="text-white w-10 h-10" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-brand-charcoal">Family Atmosphere</h3>
              <p className="text-brand-gray leading-relaxed">Warm, welcoming environment perfect for any occasion - from casual meals to celebrations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Popular Dishes Preview */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-32 h-32 bg-brand-yellow/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-brand-orange/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-orange/10 to-brand-yellow/10 px-6 py-3 rounded-full border border-brand-orange/20 mb-6">
              <span className="text-2xl">⭐</span>
              <h2 className="font-heading text-3xl md:text-4xl text-brand-charcoal font-bold">
                Popular Dishes
              </h2>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto">
              Try our customer favorites that keep them coming back for more
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {menuItems.filter(item => item.popular).slice(0, 3).map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Popular Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-brand-yellow to-brand-orange text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300 z-10">
                  🔥 Popular
                </div>
                
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold mb-3 text-brand-charcoal group-hover:text-brand-orange transition-colors duration-300">{item.name}</h3>
                  <p className="text-brand-gray mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-lg">${item.price}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-brand-orange to-orange-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setCurrentPage('menu')}
              className="bg-gradient-to-r from-brand-orange to-brand-yellow text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              📋 View Full Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main App Render
  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'menu': return <Menu />;
      case 'reservations': return <ReservationForm />;
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsOfUse />;
      default: return <HomePage />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Navbar onPageChange={setCurrentPage} />
        <div className="page-transition">
          {renderPage()}
        </div>
        <Footer onPageChange={setCurrentPage} />
      </div>
    </ErrorBoundary>
  );
};

export default RestaurantWebsite;