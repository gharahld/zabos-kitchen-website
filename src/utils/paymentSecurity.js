import CryptoJS from 'crypto-js';
import validator from 'validator';
import Cookies from 'js-cookie';

// Security configuration
const SECURITY_CONFIG = {
  // Encryption key (in production, this should be from environment variables)
  ENCRYPTION_KEY: 'zabos-kitchen-secure-key-2024',
  
  // Rate limiting
  MAX_ATTEMPTS: 3,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  
  // Session timeout
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  
  // PCI DSS compliance settings
  PCI_COMPLIANCE: {
    maskCardNumber: true,
    secureStorage: true,
    tokenization: true
  }
};

// Security utilities
export class PaymentSecurity {
  constructor() {
    this.attempts = this.getAttempts();
    this.sessionStart = Date.now();
  }

  // Encryption methods
  encrypt(data) {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECURITY_CONFIG.ENCRYPTION_KEY).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt payment data');
    }
  }

  decrypt(encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECURITY_CONFIG.ENCRYPTION_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt payment data');
    }
  }

  // Input validation and sanitization
  validateCardNumber(cardNumber) {
    // Remove spaces and non-digits
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    // Check length (13-19 digits)
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return { valid: false, error: 'Invalid card number length' };
    }
    
    // Luhn algorithm validation
    if (!this.luhnCheck(cleanNumber)) {
      return { valid: false, error: 'Invalid card number' };
    }
    
    // Check card type
    const cardType = this.getCardType(cleanNumber);
    if (!cardType) {
      return { valid: false, error: 'Unsupported card type' };
    }
    
    return { valid: true, cardType, maskedNumber: this.maskCardNumber(cleanNumber) };
  }

  validateExpiryDate(expiryDate) {
    const [month, year] = expiryDate.split('/');
    
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      return { valid: false, error: 'Invalid date format (MM/YY)' };
    }
    
    const monthNum = parseInt(month);
    const yearNum = parseInt('20' + year);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (monthNum < 1 || monthNum > 12) {
      return { valid: false, error: 'Invalid month' };
    }
    
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return { valid: false, error: 'Card has expired' };
    }
    
    return { valid: true };
  }

  validateCVV(cvv, cardType) {
    const cleanCVV = cvv.replace(/\D/g, '');
    
    if (cardType === 'amex') {
      if (cleanCVV.length !== 4) {
        return { valid: false, error: 'CVV must be 4 digits for American Express' };
      }
    } else {
      if (cleanCVV.length !== 3) {
        return { valid: false, error: 'CVV must be 3 digits' };
      }
    }
    
    return { valid: true };
  }

  validateEmail(email) {
    if (!validator.isEmail(email)) {
      return { valid: false, error: 'Invalid email address' };
    }
    return { valid: true };
  }

  validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return { valid: false, error: 'Invalid phone number' };
    }
    return { valid: true };
  }

  // Luhn algorithm for card validation
  luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }

  // Card type detection
  getCardType(cardNumber) {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(cardNumber)) {
        return type;
      }
    }
    
    return null;
  }

  // Mask sensitive data
  maskCardNumber(cardNumber) {
    if (cardNumber.length < 8) return cardNumber;
    const start = cardNumber.substring(0, 4);
    const end = cardNumber.substring(cardNumber.length - 4);
    const middle = '*'.repeat(cardNumber.length - 8);
    return start + middle + end;
  }

  maskEmail(email) {
    const [local, domain] = email.split('@');
    if (local.length <= 2) return email;
    const maskedLocal = local.substring(0, 2) + '*'.repeat(local.length - 2);
    return `${maskedLocal}@${domain}`;
  }

  // Rate limiting and fraud detection
  getAttempts() {
    const attempts = Cookies.get('payment_attempts');
    return attempts ? JSON.parse(attempts) : { count: 0, lastAttempt: 0 };
  }

  updateAttempts() {
    const now = Date.now();
    this.attempts.count += 1;
    this.attempts.lastAttempt = now;
    
    Cookies.set('payment_attempts', JSON.stringify(this.attempts), {
      expires: 1, // 1 day
      secure: true,
      sameSite: 'strict'
    });
  }

  isRateLimited() {
    const now = Date.now();
    const timeSinceLastAttempt = now - this.attempts.lastAttempt;
    
    if (this.attempts.count >= SECURITY_CONFIG.MAX_ATTEMPTS) {
      if (timeSinceLastAttempt < SECURITY_CONFIG.LOCKOUT_DURATION) {
        return {
          limited: true,
          remainingTime: Math.ceil((SECURITY_CONFIG.LOCKOUT_DURATION - timeSinceLastAttempt) / 1000 / 60)
        };
      } else {
        // Reset attempts after lockout period
        this.attempts = { count: 0, lastAttempt: 0 };
        Cookies.remove('payment_attempts');
      }
    }
    
    return { limited: false };
  }

  // Session management
  isSessionValid() {
    const now = Date.now();
    return (now - this.sessionStart) < SECURITY_CONFIG.SESSION_TIMEOUT;
  }

  // Secure data storage
  secureStore(key, data) {
    try {
      const encrypted = this.encrypt(data);
      sessionStorage.setItem(key, encrypted);
      return true;
    } catch (error) {
      console.error('Secure storage error:', error);
      return false;
    }
  }

  secureRetrieve(key) {
    try {
      const encrypted = sessionStorage.getItem(key);
      if (!encrypted) return null;
      return this.decrypt(encrypted);
    } catch (error) {
      console.error('Secure retrieval error:', error);
      return null;
    }
  }

  secureClear(key) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Secure clear error:', error);
      return false;
    }
  }

  // Comprehensive payment validation
  validatePaymentData(paymentData) {
    const errors = [];
    
    // Rate limiting check
    const rateLimit = this.isRateLimited();
    if (rateLimit.limited) {
      errors.push(`Too many attempts. Please wait ${rateLimit.remainingTime} minutes.`);
      return { valid: false, errors };
    }
    
    // Session validation
    if (!this.isSessionValid()) {
      errors.push('Session expired. Please refresh the page.');
      return { valid: false, errors };
    }
    
    // Card validation
    if (paymentData.method === 'credit') {
      const cardValidation = this.validateCardNumber(paymentData.cardNumber);
      if (!cardValidation.valid) {
        errors.push(cardValidation.error);
      }
      
      const expiryValidation = this.validateExpiryDate(paymentData.expiryDate);
      if (!expiryValidation.valid) {
        errors.push(expiryValidation.error);
      }
      
      const cvvValidation = this.validateCVV(paymentData.cvv, cardValidation.cardType);
      if (!cvvValidation.valid) {
        errors.push(cvvValidation.error);
      }
    }
    
    // Customer info validation
    const emailValidation = this.validateEmail(paymentData.customerInfo.email);
    if (!emailValidation.valid) {
      errors.push(emailValidation.error);
    }
    
    const phoneValidation = this.validatePhone(paymentData.customerInfo.phone);
    if (!phoneValidation.valid) {
      errors.push(phoneValidation.error);
    }
    
    // Update attempts
    this.updateAttempts();
    
    return {
      valid: errors.length === 0,
      errors,
      maskedData: this.maskSensitiveData(paymentData)
    };
  }

  // Mask all sensitive data for logging
  maskSensitiveData(paymentData) {
    const masked = { ...paymentData };
    
    if (masked.method === 'credit') {
      masked.cardNumber = this.maskCardNumber(masked.cardNumber);
      masked.cvv = '***';
    }
    
    masked.customerInfo.email = this.maskEmail(masked.customerInfo.email);
    
    return masked;
  }

  // Generate secure token for payment processing
  generatePaymentToken(paymentData) {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2);
    const tokenData = {
      ...paymentData,
      timestamp,
      nonce: randomString
    };
    
    return this.encrypt(tokenData);
  }

  // Clean up sensitive data
  cleanup() {
    // Clear all sensitive data from storage
    const keys = ['payment_data', 'customer_info', 'payment_token'];
    keys.forEach(key => this.secureClear(key));
    
    // Clear cookies
    Cookies.remove('payment_attempts');
  }
}

// Security middleware for payment processing
export const paymentSecurityMiddleware = {
  // Validate all inputs before processing
  validateInputs: (data) => {
    const security = new PaymentSecurity();
    return security.validatePaymentData(data);
  },
  
  // Secure the payment data
  securePaymentData: (data) => {
    const security = new PaymentSecurity();
    return security.generatePaymentToken(data);
  },
  
  // Clean up after processing
  cleanup: () => {
    const security = new PaymentSecurity();
    security.cleanup();
  }
};

// Export default instance
export default new PaymentSecurity();

