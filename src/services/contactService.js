// Contact service for handling contact form submissions
// This service handles both mock data (for demo) and real database operations

import { DatabaseService } from './databaseService';

export class ContactService {
  static async submitContactForm(formData) {
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('All required fields must be filled');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Try to use the database service first (for production)
      try {
        const result = await DatabaseService.createContactMessage(formData);
        return {
          success: true,
          message: 'Thank you for your message! We\'ll get back to you soon.',
          data: result
        };
      } catch (dbError) {
        // Fallback to mock service if database is not available
        console.log('Database not available, using mock service');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create mock contact message
        const contactMessage = {
          id: `contact_${Date.now()}`,
          ...formData,
          status: 'UNREAD',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Store in localStorage for demo purposes
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        existingMessages.push(contactMessage);
        localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

        return {
          success: true,
          message: 'Thank you for your message! We\'ll get back to you soon.',
          data: contactMessage
        };
      }

    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        message: error.message || 'An error occurred while sending your message. Please try again.',
        error: error.message
      };
    }
  }

  static async getContactMessages() {
    try {
      // In a real app, this would fetch from your backend API
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      return {
        success: true,
        data: messages
      };
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return {
        success: false,
        message: 'Error fetching contact messages',
        error: error.message
      };
    }
  }

  static async updateContactMessageStatus(messageId, status) {
    try {
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const messageIndex = messages.findIndex(msg => msg.id === messageId);
      
      if (messageIndex === -1) {
        throw new Error('Message not found');
      }

      messages[messageIndex].status = status;
      messages[messageIndex].updatedAt = new Date().toISOString();
      
      localStorage.setItem('contactMessages', JSON.stringify(messages));

      return {
        success: true,
        data: messages[messageIndex]
      };
    } catch (error) {
      console.error('Error updating contact message status:', error);
      return {
        success: false,
        message: 'Error updating message status',
        error: error.message
      };
    }
  }
}
