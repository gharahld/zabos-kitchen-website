export function Button({ children, className = "", variant = "primary", size = "md", ...props }) {
  const baseClasses = "font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-orange to-orange-500 text-white hover:from-orange-600 hover:to-orange-700 focus:ring-brand-orange shadow-lg hover:shadow-xl",
    secondary: "bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white focus:ring-brand-orange shadow-lg hover:shadow-xl",
    outline: "bg-transparent border-2 border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white focus:ring-brand-charcoal shadow-lg hover:shadow-xl",
    ghost: "bg-transparent text-brand-charcoal hover:bg-brand-orange/10 hover:text-brand-orange focus:ring-brand-orange"
  };

  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
