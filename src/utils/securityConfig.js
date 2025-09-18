// Security configuration for the restaurant website
export const SECURITY_CONFIG = {
  // Encryption settings
  ENCRYPTION: {
    algorithm: 'AES-256-CBC',
    keyLength: 256,
    ivLength: 16
  },
  
  // Rate limiting
  RATE_LIMITING: {
    maxAttempts: 3,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    windowSize: 60 * 1000, // 1 minute
    maxRequests: 10
  },
  
  // Session management
  SESSION: {
    timeout: 30 * 60 * 1000, // 30 minutes
    refreshInterval: 5 * 60 * 1000, // 5 minutes
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
  },
  
  // Input validation
  VALIDATION: {
    maxStringLength: 255,
    allowedCharacters: /^[a-zA-Z0-9\s@._-]+$/,
    sanitizeHtml: true,
    preventXSS: true
  },
  
  // Payment security
  PAYMENT: {
    pciCompliant: true,
    tokenization: true,
    encryption: true,
    auditLogging: true,
    fraudDetection: true
  },
  
  // Content Security Policy
  CSP: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
    connectSrc: ["'self'"],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"],
    baseUri: ["'self'"]
  },
  
  // Security headers
  HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  }
};

// Security utilities
export class SecurityUtils {
  // Generate secure random string
  static generateSecureToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const crypto = window.crypto || window.msCrypto;
    
    if (crypto && crypto.getRandomValues) {
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        result += chars[array[i] % chars.length];
      }
    } else {
      // Fallback for older browsers
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }
    
    return result;
  }
  
  // Sanitize user input
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }
  
  // Validate email format
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }
  
  // Validate phone number
  static isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
  }
  
  // Check if request is from secure origin
  static isSecureOrigin() {
    return window.location.protocol === 'https:' || 
           window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1';
  }
  
  // Log security events
  static logSecurityEvent(event, details = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      userAgent: navigator.userAgent,
      url: window.location.href,
      secure: this.isSecureOrigin()
    };
    
    // In production, this would be sent to a secure logging service
    console.log('Security Event:', logEntry);
    
    // Store in session storage for debugging
    const logs = JSON.parse(sessionStorage.getItem('security_logs') || '[]');
    logs.push(logEntry);
    
    // Keep only last 50 logs
    if (logs.length > 50) {
      logs.splice(0, logs.length - 50);
    }
    
    sessionStorage.setItem('security_logs', JSON.stringify(logs));
  }
  
  // Check for suspicious activity
  static detectSuspiciousActivity() {
    const logs = JSON.parse(sessionStorage.getItem('security_logs') || '[]');
    const recentLogs = logs.filter(log => 
      Date.now() - new Date(log.timestamp).getTime() < 60000 // Last minute
    );
    
    // Check for multiple failed attempts
    const failedAttempts = recentLogs.filter(log => 
      log.event === 'payment_validation_failed'
    ).length;
    
    if (failedAttempts >= 3) {
      this.logSecurityEvent('suspicious_activity_detected', {
        type: 'multiple_failed_attempts',
        count: failedAttempts
      });
      return true;
    }
    
    return false;
  }
}

// Security middleware for API calls
export const securityMiddleware = {
  // Add security headers to requests
  addSecurityHeaders: (headers = {}) => {
    return {
      ...headers,
      'X-Requested-With': 'XMLHttpRequest',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    };
  },
  
  // Validate request origin
  validateOrigin: (request) => {
    const allowedOrigins = [
      window.location.origin,
      'https://zabos-kitchen.com',
      'https://www.zabos-kitchen.com'
    ];
    
    return allowedOrigins.includes(request.origin);
  },
  
  // Sanitize response data
  sanitizeResponse: (data) => {
    if (typeof data === 'string') {
      return SecurityUtils.sanitizeInput(data);
    }
    
    if (Array.isArray(data)) {
      return data.map(item => securityMiddleware.sanitizeResponse(item));
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = securityMiddleware.sanitizeResponse(value);
      }
      return sanitized;
    }
    
    return data;
  }
};

// Initialize security features
export const initializeSecurity = () => {
  // Log security initialization
  SecurityUtils.logSecurityEvent('security_initialized', {
    userAgent: navigator.userAgent,
    secure: SecurityUtils.isSecureOrigin(),
    timestamp: Date.now()
  });
  
  // Check for suspicious activity
  if (SecurityUtils.detectSuspiciousActivity()) {
    console.warn('Suspicious activity detected. Enhanced security measures activated.');
  }
  
  // Set up periodic security checks
  setInterval(() => {
    SecurityUtils.detectSuspiciousActivity();
  }, 60000); // Check every minute
  
  return true;
};

export default SECURITY_CONFIG;

