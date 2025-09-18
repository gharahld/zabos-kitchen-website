import { Facebook, Instagram, Twitter, Utensils } from 'lucide-react';

export function Footer({ onPageChange }) {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-32 h-32 bg-brand-orange/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-yellow/5 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Main Content - Single Row Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Restaurant Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-brand-yellow rounded-full flex items-center justify-center shadow-lg">
              <Utensils className="text-white w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-white">Zabo's Kitchen</h3>
              <p className="text-brand-orange font-medium text-xs">Come Hungry, Leave Happy</p>
            </div>
          </div>

          {/* Center: Description */}
          <div className="text-center flex-1 max-w-md">
            <p className="text-gray-300 text-xs leading-relaxed">
              Exceptional Haitian & Caribbean cuisine in Hollywood, Florida
            </p>
          </div>

          {/* Right: Social Media */}
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-orange transition-all duration-300 group shadow-lg backdrop-blur-sm">
              <Facebook className="w-4 h-4 text-white group-hover:text-white transition-colors duration-300" />
            </a>
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-orange transition-all duration-300 group shadow-lg backdrop-blur-sm">
              <Instagram className="w-4 h-4 text-white group-hover:text-white transition-colors duration-300" />
            </a>
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-orange transition-all duration-300 group shadow-lg backdrop-blur-sm">
              <Twitter className="w-4 h-4 text-white group-hover:text-white transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-3 mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-gray-400 text-xs">
              <p>&copy; 2024 Zabo's Kitchen Restaurant. All rights reserved.</p>
            </div>
            
            {/* Powered by Tech Action Studio */}
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span>Powered by</span>
              <a 
                href="https://techactionstudio.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-brand-orange transition-colors duration-300 group bg-white/5 px-2 py-1 rounded hover:bg-white/10 backdrop-blur-sm"
              >
                <img 
                  src="/tech-action-logo.svg" 
                  alt="Tech Action Studio" 
                  className="w-3 h-3 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-semibold">Tech Action Studio</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
