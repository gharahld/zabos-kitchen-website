import React, { useState, useEffect, useRef } from 'react';
import { Users, Clock, Star, Award } from 'lucide-react';

export function AnimatedCounters() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    customers: 0,
    years: 0,
    rating: 0,
    awards: 0
  });

  const sectionRef = useRef(null);

  const targetCounts = {
    customers: 15000,
    years: 8,
    rating: 4.9,
    awards: 12
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const counters = [
      { key: 'customers', target: targetCounts.customers, suffix: '+' },
      { key: 'years', target: targetCounts.years, suffix: '+' },
      { key: 'rating', target: targetCounts.rating, suffix: '', decimals: 1 },
      { key: 'awards', target: targetCounts.awards, suffix: '+' }
    ];

    counters.forEach(({ key, target, suffix, decimals }) => {
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setCounts(prev => ({
          ...prev,
          [key]: decimals ? parseFloat(current.toFixed(1)) : Math.floor(current)
        }));
      }, stepDuration);
    });
  }, [isVisible]);

  const stats = [
    {
      icon: Users,
      label: 'Happy Customers',
      value: counts.customers,
      suffix: '+',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Clock,
      label: 'Years of Excellence',
      value: counts.years,
      suffix: '+',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: counts.rating,
      suffix: '',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Award,
      label: 'Awards Won',
      value: counts.awards,
      suffix: '+',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-brand-charcoal via-gray-800 to-black text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-32 h-32 bg-brand-orange/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-yellow/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-6 relative animate-fade-in-up">
              Our Success Story
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange rounded-full"></div>
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            Numbers that speak for themselves. Join thousands of satisfied customers who have made us their favorite dining destination.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  {/* Icon Background */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-orange/30 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-brand-yellow/30 rounded-full animate-pulse delay-500"></div>
                </div>

                {/* Counter */}
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-white font-heading">
                    {stat.value}
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </h3>

                {/* Decorative Line */}
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up animate-delay-800">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-heading text-white mb-4">
              Ready to Join Our Story?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience the excellence that has made us a favorite among thousands of customers. 
              Book your table today and become part of our success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-brand-orange to-brand-yellow text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                📅 Make a Reservation
              </button>
              <button className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                📋 View Our Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
