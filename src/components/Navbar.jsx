import { useState } from 'react';
import { Button } from './Button';
import { Menu, X, ShoppingCart } from 'lucide-react';

export function Navbar({ onPageChange, cart, onCartToggle }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-light/50 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onPageChange('home')}>
          <div className="relative">
            <img src="/logo.svg" alt="Zabo's Kitchen" className="h-12 w-12 rounded-full group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-brand-orange/20 group-hover:bg-brand-orange/30 transition-colors duration-300"></div>
          </div>
          <div>
            <span className="font-heading text-2xl font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors duration-300">
              Zabo's Kitchen
            </span>
            <p className="text-xs text-brand-gray -mt-1">Come Hungry, Leave Happy</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            className="text-brand-charcoal hover:text-brand-orange font-medium transition-colors duration-300 relative group" 
            onClick={() => onPageChange('menu')}
          >
            Menu
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            className="text-brand-charcoal hover:text-brand-orange font-medium transition-colors duration-300 relative group" 
            onClick={() => onPageChange('reservations')}
          >
            Reservations
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300"></span>
          </button>
          <button 
            className="text-brand-charcoal hover:text-brand-orange font-medium transition-colors duration-300 relative group" 
            onClick={() => onPageChange('contact')}
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300"></span>
          </button>
          
          
          <Button className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" onClick={() => onPageChange('menu')}>
            🍽️ Order Online
          </Button>
          
          {/* Cart Button */}
          <button
            onClick={onCartToggle}
            className="relative p-3 rounded-lg hover:bg-brand-orange/10 transition-colors duration-300 group"
          >
            <ShoppingCart className="w-6 h-6 text-brand-charcoal group-hover:text-brand-orange transition-colors duration-300" />
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold animate-bounce-in">
                {getCartItemCount()}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-brand-orange/10 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6 text-brand-charcoal" /> : <Menu className="w-6 h-6 text-brand-charcoal" />}
        </button>
      </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-brand-light/50 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button 
                className="block w-full text-left text-brand-charcoal hover:text-brand-orange font-medium py-2 transition-colors duration-300" 
                onClick={() => {
                  onPageChange('menu');
                  setIsMenuOpen(false);
                }}
              >
                Menu
              </button>
              <button 
                className="block w-full text-left text-brand-charcoal hover:text-brand-orange font-medium py-2 transition-colors duration-300" 
                onClick={() => {
                  onPageChange('reservations');
                  setIsMenuOpen(false);
                }}
              >
                Reservations
              </button>
              <button 
                className="block w-full text-left text-brand-charcoal hover:text-brand-orange font-medium py-2 transition-colors duration-300" 
                onClick={() => {
                  onPageChange('contact');
                  setIsMenuOpen(false);
                }}
              >
                Contact
              </button>
              
              
              <div className="pt-4 space-y-3">
                <Button className="w-full shadow-lg" onClick={() => {
                  onPageChange('menu');
                  setIsMenuOpen(false);
                }}>
                  🍽️ Order Online
                </Button>
                
                {/* Mobile Cart Button */}
                <button
                  onClick={() => {
                    onCartToggle();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-brand-orange/10 text-brand-charcoal hover:bg-brand-orange/20 transition-colors duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart ({getCartItemCount()})</span>
                </button>
              </div>
            </div>
          </div>
        )}
    </header>
  );
}
