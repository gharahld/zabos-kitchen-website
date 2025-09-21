import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Send, 
  Download, 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  XCircle,
  Truck,
  Package,
  Filter,
  Search
} from 'lucide-react';
import { AdminService } from '../services/adminService';
import jsPDF from 'jspdf';

export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const result = await AdminService.getOrders();
      if (result.success) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const result = await AdminService.updateOrderStatus(orderId, newStatus);
      if (result.success) {
        setOrders(prev => prev.map(order => 
          order.id === orderId ? { ...order, orderStatus: newStatus } : order
        ));
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ ...prev, orderStatus: newStatus }));
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const sendEmailReceipt = async (order) => {
    try {
      const result = await AdminService.sendEmailReceipt(order.id, order.email);
      if (result.success) {
        alert('Email receipt sent successfully!');
      } else {
        alert('Failed to send email receipt');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email receipt');
    }
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
    pdf.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 105);
    pdf.text(`Time: ${new Date(order.createdAt).toLocaleTimeString()}`, 20, 115);
    
    // Customer info
    pdf.text('CUSTOMER INFORMATION:', 20, 130);
    pdf.text(order.customerName, 20, 140);
    pdf.text(order.email, 20, 150);
    pdf.text(order.phone, 20, 160);
    
    if (order.deliveryAddress) {
      pdf.text('DELIVERY ADDRESS:', 20, 175);
      pdf.text(order.deliveryAddress, 20, 185);
    }
    
    // Items
    pdf.text('ORDER ITEMS:', 20, 200);
    let yPosition = 210;
    
    order.orderItems?.forEach(item => {
      pdf.text(`${item.dishName} x${item.quantity}`, 20, yPosition);
      pdf.text(`$${(item.dishPrice * item.quantity).toFixed(2)}`, 150, yPosition);
      yPosition += 10;
    });
    
    // Totals
    yPosition += 10;
    pdf.text('SUBTOTAL:', 130, yPosition);
    pdf.text(`$${order.subtotal.toFixed(2)}`, 150, yPosition);
    yPosition += 10;
    
    pdf.text('TAX:', 130, yPosition);
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
    pdf.text(`PAYMENT METHOD: ${order.paymentMethod}`, 20, yPosition);
    pdf.text(`DELIVERY TYPE: ${order.deliveryType}`, 20, yPosition + 10);
    pdf.text(`STATUS: ${order.orderStatus}`, 20, yPosition + 20);
    
    // Footer
    yPosition += 40;
    pdf.text('Thank you for choosing Zabo\'s Kitchen!', 20, yPosition);
    
    // Save the PDF
    pdf.save(`zabos-kitchen-receipt-${order.id}.pdf`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'PREPARING': return 'bg-orange-100 text-orange-800';
      case 'READY': return 'bg-green-100 text-green-800';
      case 'OUT_FOR_DELIVERY': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return Clock;
      case 'CONFIRMED': return CheckCircle;
      case 'PREPARING': return Package;
      case 'READY': return CheckCircle;
      case 'OUT_FOR_DELIVERY': return Truck;
      case 'DELIVERED': return CheckCircle;
      case 'CANCELLED': return XCircle;
      default: return Clock;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus;
    const matchesSearch = searchTerm === '' || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const OrderModal = ({ order, onClose }) => {
    if (!order) return null;

    const StatusIcon = getStatusIcon(order.orderStatus);

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Order ID:</span> {order.id}</p>
                  <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {new Date(order.createdAt).toLocaleTimeString()}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {order.customerName}</p>
                  <p><span className="font-medium">Email:</span> {order.email}</p>
                  <p><span className="font-medium">Phone:</span> {order.phone}</p>
                  {order.deliveryAddress && (
                    <p><span className="font-medium">Address:</span> {order.deliveryAddress}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Items</h3>
              <div className="space-y-2">
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.dishName}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.dishPrice * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                {order.deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span>${order.deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => generatePDFReceipt(order)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={() => sendEmailReceipt(order)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Send className="w-4 h-4" />
                Email Receipt
              </button>
              
              {/* Status Update Buttons */}
              {order.orderStatus === 'PENDING' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirm Order
                </button>
              )}
              {order.orderStatus === 'CONFIRMED' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  Start Preparing
                </button>
              )}
              {order.orderStatus === 'PREPARING' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'READY')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Ready
                </button>
              )}
              {order.orderStatus === 'READY' && order.deliveryType === 'DELIVERY' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'OUT_FOR_DELIVERY')}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Truck className="w-4 h-4" />
                  Out for Delivery
                </button>
              )}
              {(order.orderStatus === 'OUT_FOR_DELIVERY' || (order.orderStatus === 'READY' && order.deliveryType === 'PICKUP')) && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'DELIVERED')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Delivered
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders Management</h2>
          <p className="text-gray-600">View and manage customer orders</p>
        </div>
        <button
          onClick={loadOrders}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PREPARING">Preparing</option>
            <option value="READY">Ready</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.orderStatus);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">#{order.id.slice(-8)}</div>
                          <div className="text-sm text-gray-500">{order.deliveryType}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                          <StatusIcon className="w-3 h-3" />
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                          className="text-orange-600 hover:text-orange-900 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <OrderModal 
          order={selectedOrder} 
          onClose={() => {
            setShowOrderModal(false);
            setSelectedOrder(null);
          }} 
        />
      )}
    </div>
  );
}
