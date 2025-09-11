export function DishTile({ dish }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-brand-light/50 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img 
          src={dish.img} 
          alt={dish.name} 
          className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Popular Badge */}
        {dish.tags?.includes('Popular') && (
          <div className="absolute top-3 right-3 bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            ⭐ Popular
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-heading text-xl font-bold text-brand-charcoal group-hover:text-brand-orange transition-colors duration-300">
            {dish.name}
          </h3>
          <span className="text-2xl font-bold text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-lg">
            {dish.price}
          </span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {dish.tags?.map(tag => (
            <span 
              key={tag} 
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                tag === 'Popular' 
                  ? 'bg-brand-orange/20 text-brand-orange border border-brand-orange/30' 
                  : tag === 'Spicy' 
                  ? 'bg-red-100 text-red-600 border border-red-200' 
                  : tag === 'Healthy'
                  ? 'bg-green-100 text-green-600 border border-green-200'
                  : tag === 'Premium'
                  ? 'bg-purple-100 text-purple-600 border border-purple-200'
                  : 'bg-brand-yellow/20 text-brand-charcoal border border-brand-yellow/30'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Add to Cart Button */}
        <button className="w-full mt-4 bg-brand-orange text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Add to Cart
        </button>
      </div>
    </article>
  );
}
