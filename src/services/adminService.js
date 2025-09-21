// Admin service for handling admin authentication and operations
import CryptoJS from 'crypto-js';

export class AdminService {
  static ADMIN_CREDENTIALS = {
    username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'ZaboAdmin2024!',
    email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@zaboskitchen.com'
  };

  static SESSION_KEY = 'admin_session';
  static SESSION_TIMEOUT = parseInt(import.meta.env.VITE_SESSION_TIMEOUT) || 24 * 60 * 60 * 1000; // 24 hours
  static SECRET_KEY = import.meta.env.VITE_ADMIN_SECRET_KEY || 'zabo-admin-secret-key';

  // Generate secure session token
  static generateSessionToken(username) {
    const timestamp = Date.now();
    const data = `${username}:${timestamp}`;
    return CryptoJS.AES.encrypt(data, this.SECRET_KEY).toString();
  }

  // Verify session token
  static verifySessionToken(token) {
    try {
      const decrypted = CryptoJS.AES.decrypt(token, this.SECRET_KEY).toString(CryptoJS.enc.Utf8);
      const [username, timestamp] = decrypted.split(':');
      const sessionTime = parseInt(timestamp);
      
      // Check if session is still valid
      if (Date.now() - sessionTime > this.SESSION_TIMEOUT) {
        return null;
      }
      
      return { username, timestamp: sessionTime };
    } catch (error) {
      return null;
    }
  }

  // Admin login
  static async login(username, password) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (username === this.ADMIN_CREDENTIALS.username && password === this.ADMIN_CREDENTIALS.password) {
        const sessionToken = this.generateSessionToken(username);
        const sessionData = {
          token: sessionToken,
          username,
          loginTime: Date.now(),
          expiresAt: Date.now() + this.SESSION_TIMEOUT
        };

        // Store session in localStorage
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
        
        return {
          success: true,
          message: 'Login successful',
          data: sessionData
        };
      } else {
        return {
          success: false,
          message: 'Invalid username or password'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  }

  // Check if admin is logged in
  static isLoggedIn() {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return false;

      const session = JSON.parse(sessionData);
      const verification = this.verifySessionToken(session.token);
      
      if (!verification) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  // Get current session
  static getCurrentSession() {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      const verification = this.verifySessionToken(session.token);
      
      if (!verification) {
        this.logout();
        return null;
      }

      return session;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  // Admin logout
  static logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Get mock orders data (in production, this would come from your backend)
  static async getOrders() {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get orders from localStorage (mock data)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      return {
        success: true,
        data: orders
      };
    } catch (error) {
      console.error('Error fetching orders:', error);
      return {
        success: false,
        message: 'Failed to fetch orders',
        data: []
      };
    }
  }

  // Get mock reservations data
  static async getReservations() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      
      return {
        success: true,
        data: reservations
      };
    } catch (error) {
      console.error('Error fetching reservations:', error);
      return {
        success: false,
        message: 'Failed to fetch reservations',
        data: []
      };
    }
  }

  // Get mock contact messages
  static async getContactMessages() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      
      return {
        success: true,
        data: messages
      };
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return {
        success: false,
        message: 'Failed to fetch contact messages',
        data: []
      };
    }
  }

  // Update order status
  static async updateOrderStatus(orderId, status) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex === -1) {
        return {
          success: false,
          message: 'Order not found'
        };
      }

      orders[orderIndex].orderStatus = status;
      orders[orderIndex].updatedAt = new Date().toISOString();
      
      localStorage.setItem('orders', JSON.stringify(orders));

      return {
        success: true,
        message: 'Order status updated successfully',
        data: orders[orderIndex]
      };
    } catch (error) {
      console.error('Error updating order status:', error);
      return {
        success: false,
        message: 'Failed to update order status'
      };
    }
  }

  // Send email with PDF receipt
  static async sendEmailReceipt(orderId, customerEmail) {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real application, this would integrate with an email service like SendGrid, AWS SES, etc.
      console.log(`Sending email receipt to ${customerEmail} for order ${orderId}`);
      
      return {
        success: true,
        message: 'Email receipt sent successfully'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: 'Failed to send email receipt'
      };
    }
  }

  // Generate dashboard statistics
  static async getDashboardStats() {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

      const today = new Date().toDateString();
      const thisMonth = new Date().getMonth();
      const thisYear = new Date().getFullYear();

      const stats = {
        totalOrders: orders.length,
        todayOrders: orders.filter(order => new Date(order.createdAt).toDateString() === today).length,
        monthlyOrders: orders.filter(order => {
          const orderDate = new Date(order.createdAt);
          return orderDate.getMonth() === thisMonth && orderDate.getFullYear() === thisYear;
        }).length,
        totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
        todayRevenue: orders
          .filter(order => new Date(order.createdAt).toDateString() === today)
          .reduce((sum, order) => sum + (order.total || 0), 0),
        totalReservations: reservations.length,
        pendingReservations: reservations.filter(res => res.status === 'PENDING').length,
        totalMessages: messages.length,
        unreadMessages: messages.filter(msg => msg.status === 'UNREAD').length,
        pendingOrders: orders.filter(order => order.orderStatus === 'PENDING').length,
        completedOrders: orders.filter(order => order.orderStatus === 'DELIVERED' || order.orderStatus === 'READY').length
      };

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        success: false,
        message: 'Failed to fetch dashboard statistics',
        data: {}
      };
    }
  }
}
