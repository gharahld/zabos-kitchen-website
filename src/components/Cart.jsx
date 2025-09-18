import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, CreditCard, Trash2 } from 'lucide-react';
import { Checkout } from './Checkout';

export function Cart({ cart, onUpdateQuantity, onRemoveItem, onClearCart, isOpen, onClose }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleOrderComplete = () => {
    onClearCart();
    setShowCheckout(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-brand-orange to-orange-600 text-white">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6" />
              <h2 className="text-xl font-bold">Your Cart</h2>
              {getCartItemCount() > 0 && (
                <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  {getCartItemCount()}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
                <button
                  onClick={onClose}
                  className="bg-brand-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-brand-orange hover:bg-orange-600 text-white flex items-center justify-center transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="ml-auto p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-brand-orange">
                  ${getCartTotal().toFixed(2)}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-brand-orange to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={onClearCart}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </>
  );
}
