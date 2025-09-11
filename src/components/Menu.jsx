import { DishTile } from './DishTile';

const menuData = [
  {
    name: "Crispy Calamari",
    price: "$12.99",
    img: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Appetizer"]
  },
  {
    name: "Buffalo Wings",
    price: "$14.99",
    img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Appetizer", "Spicy"]
  },
  {
    name: "Grilled Salmon",
    price: "$24.99",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Main Course", "Healthy"]
  },
  {
    name: "Ribeye Steak",
    price: "$32.99",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Main Course", "Premium"]
  },
  {
    name: "Chicken Parmesan",
    price: "$19.99",
    img: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Main Course", "Italian"]
  },
  {
    name: "Chocolate Cake",
    price: "$8.99",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Dessert"]
  },
  {
    name: "Strawberry Cheesecake",
    price: "$9.99",
    img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Dessert"]
  },
  {
    name: "Tiramisu",
    price: "$10.99",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Dessert"]
  },
  {
    name: "Red Velvet Cake",
    price: "$9.49",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Dessert"]
  }
];

export function Menu() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-orange/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-brand-yellow/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute top-40 right-1/4 w-24 h-24 bg-brand-orange/15 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-brand-yellow/15 rounded-full blur-lg animate-pulse delay-1500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="font-heading text-4xl md:text-6xl text-brand-charcoal mb-6 relative">
              Our Menu
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-orange rounded-full"></div>
            </h2>
          </div>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto leading-relaxed">
            Delicious dishes made with love and fresh ingredients. Each plate tells a story of authentic flavors and culinary passion.
          </p>
        </div>
        
        {/* Menu Items */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuData.map((dish, index) => (
              <div 
                key={index} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DishTile dish={dish} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-brand-orange/10 to-brand-yellow/10 rounded-3xl p-8 border border-brand-orange/20">
            <h4 className="font-heading text-2xl text-brand-charcoal mb-4">
              Ready to Experience Our Flavors?
            </h4>
            <p className="text-brand-gray mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made Zabo's Kitchen their go-to dining destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-brand-orange to-brand-yellow text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                📋 View Full Menu
              </button>
              <button className="bg-transparent border-2 border-brand-orange text-brand-orange px-12 py-4 rounded-2xl font-bold text-lg hover:bg-brand-orange hover:text-white transition-all duration-300">
                📞 Call to Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
