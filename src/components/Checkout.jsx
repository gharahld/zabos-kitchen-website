import React, { useState } from 'react';
import { X, CreditCard, Smartphone, MapPin, User, Mail, Phone, Calendar, Clock, Download, CheckCircle, Shield } from 'lucide-react';
import jsPDF from 'jspdf';
import { SecurePaymentProcessor } from './SecurePaymentProcessor';
import { PaymentSecurity } from '../utils/paymentSecurity';

export function Checkout({ cart, onClose, onOrderComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showSecurePayment, setShowSecurePayment] = useState(false);
  const [securityErrors, setSecurityErrors] = useState([]);
  
  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    method: 'pickup', // pickup or delivery
    deliveryTime: '',
    specialInstructions: ''
  });

  const security = new PaymentSecurity();

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getCartTotal() * 0.08; // 8% tax
  };

  const getDeliveryFee = () => {
    return deliveryInfo.method === 'delivery' ? 3.99 : 0;
  };

  const getFinalTotal = () => {
    return getCartTotal() + getTax() + getDeliveryFee();
  };

  const handleInputChange = (setter, field, value) => {
    // Sanitize input based on field type
    let sanitizedValue = value;
    
    if (field === 'cardNumber') {
      // Remove non-digits and format card number
      sanitizedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (field === 'expiryDate') {
      // Format expiry date as MM/YY
      sanitizedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/');
    } else if (field === 'cvv') {
      // Only allow digits for CVV
      sanitizedValue = value.replace(/\D/g, '');
    } else if (field === 'phone') {
      // Format phone number
      sanitizedValue = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (field === 'zipCode') {
      // Only allow digits and hyphens for ZIP
      sanitizedValue = value.replace(/[^\d-]/g, '');
    }
    
    setter(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone'];
    return required.every(field => customerInfo[field].trim() !== '');
  };

  const validateStep2 = () => {
    if (paymentInfo.method === 'credit') {
      const cardValidation = security.validateCardNumber(paymentInfo.cardNumber);
      const expiryValidation = security.validateExpiryDate(paymentInfo.expiryDate);
      const cvvValidation = security.validateCVV(paymentInfo.cvv, cardValidation.cardType);
      
      return cardValidation.valid && expiryValidation.valid && cvvValidation.valid && paymentInfo.nameOnCard.trim() !== '';
    }
    return true; // For other payment methods
  };

  const processPayment = async () => {
    // Prepare payment data for security validation
    const paymentData = {
      customerInfo,
      paymentInfo,
      deliveryInfo,
      cart,
      subtotal: getCartTotal(),
      tax: getTax(),
      deliveryFee: getDeliveryFee(),
      total: getFinalTotal()
    };
    
    // Validate payment data with security
    const validation = security.validatePaymentData(paymentData);
    
    if (!validation.valid) {
      setSecurityErrors(validation.errors);
      return;
    }
    
    // Show secure payment processor
    setShowSecurePayment(true);
  };

  const handlePaymentSuccess = (transactionResult) => {
    // Generate order details
    const order = {
      id: `ORD-${Date.now()}`,
      transactionId: transactionResult.transactionId,
      customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
      email: customerInfo.email,
      phone: customerInfo.phone,
      deliveryAddress: deliveryInfo.method === 'delivery' ? customerInfo.address : null,
      deliveryType: deliveryInfo.method.toUpperCase(),
      paymentMethod: paymentInfo.method.toUpperCase(),
      paymentStatus: 'COMPLETED',
      orderStatus: 'PENDING',
      subtotal: getCartTotal(),
      tax: getTax(),
      deliveryFee: getDeliveryFee(),
      total: getFinalTotal(),
      specialInstructions: deliveryInfo.specialInstructions,
      orderItems: cart.map(item => ({
        dishName: item.name,
        dishPrice: item.price,
        quantity: item.quantity,
        specialRequests: null
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Save order to localStorage for admin to view
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // Also save in the old format for PDF generation
    const orderForPDF = {
      id: order.id,
      transactionId: transactionResult.transactionId,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      customer: customerInfo,
      items: cart,
      subtotal: getCartTotal(),
      tax: getTax(),
      deliveryFee: getDeliveryFee(),
      total: getFinalTotal(),
      paymentMethod: paymentInfo.method,
      deliveryMethod: deliveryInfo.method,
      status: 'confirmed',
      securityStatus: 'verified'
    };
    
    setOrderDetails(orderForPDF);
    setOrderComplete(true);
    setShowSecurePayment(false);
    
    // Generate and download PDF receipt
    generatePDFReceipt(orderForPDF);
  };

  const handlePaymentError = (error) => {
    setSecurityErrors([error]);
    setShowSecurePayment(false);
  };

  const generatePDFReceipt = (order) => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(247, 148, 29); // Brand orange
    pdf.text('Zabo\'s Kitchen', 20, 30);
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Come Hungry, Leave Happy', 20, 40);
    pdf.text('123 Hollywood Blvd, Hollywood, CA 90028', 20, 50);
    pdf.text('Phone: (555) 123-4567', 20, 60);
    
    // Order details
    pdf.setFontSize(16);
    pdf.text('ORDER RECEIPT', 20, 80);
    
    pdf.setFontSize(10);
    pdf.text(`Order ID: ${order.id}`, 20, 95);
    pdf.text(`Date: ${order.date}`, 20, 105);
    pdf.text(`Time: ${order.time}`, 20, 115);
    
    // Customer info
    pdf.text('CUSTOMER INFORMATION:', 20, 130);
    pdf.text(`${order.customer.firstName} ${order.customer.lastName}`, 20, 140);
    pdf.text(order.customer.email, 20, 150);
    pdf.text(order.customer.phone, 20, 160);
    
    if (order.deliveryMethod === 'delivery') {
      pdf.text('DELIVERY ADDRESS:', 20, 175);
      pdf.text(order.customer.address, 20, 185);
      pdf.text(`${order.customer.city}, ${order.customer.zipCode}`, 20, 195);
    }
    
    // Items
    pdf.text('ORDER ITEMS:', 20, 210);
    let yPosition = 220;
    
    order.items.forEach(item => {
      pdf.text(`${item.name} x${item.quantity}`, 20, yPosition);
      pdf.text(`$${(item.price * item.quantity).toFixed(2)}`, 150, yPosition);
      yPosition += 10;
    });
    
    // Totals
    yPosition += 10;
    pdf.text('SUBTOTAL:', 130, yPosition);
    pdf.text(`$${order.subtotal.toFixed(2)}`, 150, yPosition);
    yPosition += 10;
    
    pdf.text('TAX (8%):', 130, yPosition);
    pdf.text(`$${order.tax.toFixed(2)}`, 150, yPosition);
    yPosition += 10;
    
    if (order.deliveryFee > 0) {
      pdf.text('DELIVERY FEE:', 130, yPosition);
      pdf.text(`$${order.deliveryFee.toFixed(2)}`, 150, yPosition);
      yPosition += 10;
    }
    
    pdf.setFontSize(12);
    pdf.text('TOTAL:', 130, yPosition);
    pdf.text(`$${order.total.toFixed(2)}`, 150, yPosition);
    
    // Payment method
    yPosition += 20;
    pdf.setFontSize(10);
    pdf.text(`PAYMENT METHOD: ${order.paymentMethod.toUpperCase()}`, 20, yPosition);
    pdf.text(`DELIVERY METHOD: ${order.deliveryMethod.toUpperCase()}`, 20, yPosition + 10);
    
    // Footer
    yPosition += 30;
    pdf.text('Thank you for choosing Zabo\'s Kitchen!', 20, yPosition);
    pdf.text('We appreciate your business and look forward to serving you again.', 20, yPosition + 10);
    
    // Save the PDF
    pdf.save(`zabos-kitchen-receipt-${order.id}.pdf`);
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (orderComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your order #{orderDetails.id} has been placed successfully.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            A receipt has been downloaded to your device.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                onOrderComplete();
                onClose();
              }}
              className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => generatePDFReceipt(orderDetails)}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showSecurePayment) {
    const paymentData = {
      customerInfo,
      paymentInfo,
      deliveryInfo,
      cart,
      subtotal: getCartTotal(),
      tax: getTax(),
      deliveryFee: getDeliveryFee(),
      total: getFinalTotal()
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <SecurePaymentProcessor
          paymentData={paymentData}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onCancel={() => setShowSecurePayment(false)}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Security Errors */}
          {securityErrors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-800">Security Validation Failed</h4>
              </div>
              <ul className="space-y-1">
                {securityErrors.map((error, index) => (
                  <li key={index} className="text-sm text-red-700">• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step 
                    ? 'bg-brand-orange text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-brand-orange' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Customer Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange(setCustomerInfo, 'firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange(setCustomerInfo, 'lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange(setCustomerInfo, 'email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange(setCustomerInfo, 'phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange(setCustomerInfo, 'address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Enter your address (for delivery)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange(setCustomerInfo, 'city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={customerInfo.zipCode}
                    onChange={(e) => handleInputChange(setCustomerInfo, 'zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="Enter ZIP code"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h3>
              
              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleInputChange(setPaymentInfo, 'method', 'credit')}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      paymentInfo.method === 'credit' 
                        ? 'border-brand-orange bg-brand-orange/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    Credit Card
                  </button>
                  <button
                    onClick={() => handleInputChange(setPaymentInfo, 'method', 'paypal')}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      paymentInfo.method === 'paypal' 
                        ? 'border-brand-orange bg-brand-orange/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    PayPal
                  </button>
                  <button
                    onClick={() => handleInputChange(setPaymentInfo, 'method', 'cash')}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      paymentInfo.method === 'cash' 
                        ? 'border-brand-orange bg-brand-orange/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    💵 Cash
                  </button>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentInfo.method === 'credit' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handleInputChange(setPaymentInfo, 'cardNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handleInputChange(setPaymentInfo, 'expiryDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => handleInputChange(setPaymentInfo, 'cvv', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                        placeholder="123"
                        maxLength="4"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                    <input
                      type="text"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => handleInputChange(setPaymentInfo, 'nameOnCard', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      placeholder="Enter name as it appears on card"
                    />
                  </div>
                </div>
              )}

              {/* Delivery Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Delivery Method</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleInputChange(setDeliveryInfo, 'method', 'pickup')}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      deliveryInfo.method === 'pickup' 
                        ? 'border-brand-orange bg-brand-orange/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                    Pickup
                  </button>
                  <button
                    onClick={() => handleInputChange(setDeliveryInfo, 'method', 'delivery')}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      deliveryInfo.method === 'delivery' 
                        ? 'border-brand-orange bg-brand-orange/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                    Delivery (+$3.99)
                  </button>
                </div>
              </div>

              {deliveryInfo.method === 'delivery' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                  <textarea
                    value={deliveryInfo.specialInstructions}
                    onChange={(e) => handleInputChange(setDeliveryInfo, 'specialInstructions', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    rows="3"
                    placeholder="Any special delivery instructions..."
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Order Summary */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              
              {/* Order Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <img src={item.image || item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%):</span>
                  <span className="font-semibold">${getTax().toFixed(2)}</span>
                </div>
                {getDeliveryFee() > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee:</span>
                    <span className="font-semibold">${getDeliveryFee().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total:</span>
                  <span className="text-brand-orange">${getFinalTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !validateStep1()) ||
                  (currentStep === 2 && !validateStep2())
                }
                className="px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={processPayment}
                disabled={isProcessing}
                className="px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Complete Order
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
