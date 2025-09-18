import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, Users } from 'lucide-react';

export function InteractiveMenu({ menuItems, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  // Filter items based on search, category, and price
  useEffect(() => {
    setIsLoading(true);
    
    const filtered = menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Simulate loading delay for smooth animation
    setTimeout(() => {
      setFilteredItems(filtered);
      setIsLoading(false);
    }, 300);
  }, [searchTerm, selectedCategory, priceRange, menuItems]);

  const handlePriceChange = (value, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-orange/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-blue/5 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-6 relative animate-fade-in-up">
              Interactive Menu
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange rounded-full"></div>
            </h2>
          </div>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            Explore our menu with interactive filters. Find exactly what you're craving!
          </p>
        </div>

        {/* Interactive Filters */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-16 animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray w-5 h-5" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-gray w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-300 appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e.target.value, 0)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e.target.value, 1)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8 animate-fade-in-up">
          <p className="text-lg text-brand-gray">
            Showing <span className="font-bold text-brand-orange">{filteredItems.length}</span> dishes
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="loading-spinner"></div>
          </div>
        )}

        {/* Menu Items Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {item.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-brand-yellow to-brand-orange text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300 z-10">
                    <Star className="w-4 h-4 inline mr-1" />
                    Popular
                  </div>
                )}
                
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center text-sm text-brand-gray">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>15-20 min</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold mb-3 text-brand-charcoal group-hover:text-brand-orange transition-colors duration-300">
                    {item.name}
                  </h3>
                  
                  <p className="text-brand-gray mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-lg">
                      ${item.price}
                    </span>
                    <button 
                      onClick={() => addToCart && addToCart(item)}
                      className="bg-gradient-to-r from-brand-orange to-orange-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-heading text-brand-charcoal mb-4">No dishes found</h3>
            <p className="text-brand-gray mb-6">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setPriceRange([0, 50]);
              }}
              className="bg-gradient-to-r from-brand-orange to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

