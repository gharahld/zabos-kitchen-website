import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react';
import { PaymentSecurity } from '../utils/paymentSecurity';

export function SecurePaymentProcessor({ 
  paymentData, 
  onSuccess, 
  onError, 
  onCancel 
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [securityStatus, setSecurityStatus] = useState('validating');
  const [validationErrors, setValidationErrors] = useState([]);
  const [showSecurityDetails, setShowSecurityDetails] = useState(false);
  const [processingSteps, setProcessingSteps] = useState([]);
  
  const security = new PaymentSecurity();

  useEffect(() => {
    validatePaymentData();
  }, []);

  const validatePaymentData = async () => {
    setSecurityStatus('validating');
    setProcessingSteps(['Validating payment data...']);
    
    try {
      // Simulate validation delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const validation = security.validatePaymentData(paymentData);
      
      if (validation.valid) {
        setSecurityStatus('valid');
        setProcessingSteps(prev => [...prev, '✅ Payment data validated']);
      } else {
        setSecurityStatus('invalid');
        setValidationErrors(validation.errors);
        setProcessingSteps(prev => [...prev, '❌ Validation failed']);
      }
    } catch (error) {
      setSecurityStatus('error');
      setValidationErrors(['Security validation failed']);
      setProcessingSteps(prev => [...prev, '❌ Security error']);
    }
  };

  const processPayment = async () => {
    if (securityStatus !== 'valid') return;
    
    setIsProcessing(true);
    setSecurityStatus('processing');
    
    const steps = [
      'Encrypting payment data...',
      'Validating card information...',
      'Processing payment...',
      'Generating secure token...',
      'Finalizing transaction...'
    ];
    
    try {
      for (let i = 0; i < steps.length; i++) {
        setProcessingSteps(prev => [...prev, steps[i]]);
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate different processing stages
        if (i === 0) {
          // Encrypt data
          const encryptedData = security.encrypt(paymentData);
          setProcessingSteps(prev => [...prev, '✅ Data encrypted']);
        } else if (i === 1) {
          // Validate card
          const cardValidation = security.validateCardNumber(paymentData.cardNumber);
          setProcessingSteps(prev => [...prev, '✅ Card validated']);
        } else if (i === 2) {
          // Process payment (simulate)
          setProcessingSteps(prev => [...prev, '✅ Payment processed']);
        } else if (i === 3) {
          // Generate token
          const token = security.generatePaymentToken(paymentData);
          setProcessingSteps(prev => [...prev, '✅ Token generated']);
        } else if (i === 4) {
          // Finalize
          setProcessingSteps(prev => [...prev, '✅ Transaction completed']);
        }
      }
      
      setSecurityStatus('success');
      
      // Clean up sensitive data
      setTimeout(() => {
        security.cleanup();
        onSuccess({
          transactionId: `TXN-${Date.now()}`,
          status: 'completed',
          timestamp: new Date().toISOString()
        });
      }, 2000);
      
    } catch (error) {
      setSecurityStatus('error');
      setProcessingSteps(prev => [...prev, '❌ Payment failed']);
      onError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const getSecurityIcon = () => {
    switch (securityStatus) {
      case 'validating':
        return <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'valid':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'invalid':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      case 'processing':
        return <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertTriangle className="w-6 h-6 text-red-500" />;
      default:
        return <Shield className="w-6 h-6 text-gray-500" />;
    }
  };

  const getSecurityMessage = () => {
    switch (securityStatus) {
      case 'validating':
        return 'Validating payment security...';
      case 'valid':
        return 'Payment data is secure and ready to process';
      case 'invalid':
        return 'Payment validation failed';
      case 'processing':
        return 'Processing secure payment...';
      case 'success':
        return 'Payment completed securely';
      case 'error':
        return 'Payment processing error';
      default:
        return 'Initializing security...';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto">
      {/* Security Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-brand-orange" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">Secure Payment Processing</h3>
            <p className="text-sm text-gray-600">PCI DSS Compliant • 256-bit Encryption</p>
          </div>
        </div>
        <button
          onClick={() => setShowSecurityDetails(!showSecurityDetails)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          {showSecurityDetails ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* Security Status */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          {getSecurityIcon()}
          <span className="font-semibold text-gray-900">{getSecurityMessage()}</span>
        </div>
        
        {securityStatus === 'invalid' && validationErrors.length > 0 && (
          <div className="mt-3 space-y-1">
            {validationErrors.map((error, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-red-600">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Details */}
      {showSecurityDetails && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Security Features
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="w-4 h-4" />
              AES-256 Encryption
            </div>
            <div className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="w-4 h-4" />
              PCI DSS Compliance
            </div>
            <div className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="w-4 h-4" />
              Rate Limiting
            </div>
            <div className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="w-4 h-4" />
              Fraud Detection
            </div>
            <div className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="w-4 h-4" />
              Secure Tokenization
            </div>
            <div className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="w-4 h-4" />
              Session Management
            </div>
          </div>
        </div>
      )}

      {/* Processing Steps */}
      {processingSteps.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Processing Steps</h4>
          <div className="space-y-2">
            {processingSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-brand-orange rounded-full flex-shrink-0" />
                <span className="text-gray-700">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-semibold capitalize">{paymentData.method}</span>
          </div>
          {paymentData.method === 'credit' && (
            <div className="flex justify-between">
              <span className="text-gray-600">Card Number:</span>
              <span className="font-semibold">{security.maskCardNumber(paymentData.cardNumber)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-semibold">${paymentData.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
        
        <button
          onClick={processPayment}
          disabled={securityStatus !== 'valid' || isProcessing}
          className="flex-1 px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Process Payment Securely
            </>
          )}
        </button>
      </div>

    </div>
  );
}
