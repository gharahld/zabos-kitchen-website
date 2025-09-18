import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';

export function SecurityNotice({ showDetails = false }) {
  const [isExpanded, setIsExpanded] = useState(showDetails);

  const securityFeatures = [
    {
      icon: <Lock className="w-5 h-5" />,
      title: "256-bit Encryption",
      description: "All payment data is encrypted using industry-standard AES-256 encryption"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "PCI DSS Compliant",
      description: "We follow Payment Card Industry Data Security Standards"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Fraud Detection",
      description: "Advanced fraud detection and rate limiting protect your transactions"
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Secure Storage",
      description: "Your payment information is never stored on our servers"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Secure Payment Processing</h3>
            <p className="text-sm text-blue-700">Your payment information is protected with bank-level security</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-blue-100 rounded-full transition-colors"
        >
          {isExpanded ? <EyeOff className="w-5 h-5 text-blue-600" /> : <Eye className="w-5 h-5 text-blue-600" />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-100">
                <div className="text-blue-600 mt-0.5">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 text-sm">{feature.title}</h4>
                  <p className="text-xs text-blue-700 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h4 className="font-semibold text-amber-900 text-sm">Security Tips</h4>
            </div>
            <ul className="text-xs text-amber-800 space-y-1">
              <li>• Always verify the website URL before entering payment information</li>
              <li>• Look for the lock icon in your browser's address bar</li>
              <li>• Never share your payment details via email or phone</li>
              <li>• Use strong, unique passwords for your accounts</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-blue-200">
        <div className="flex items-center justify-between text-xs text-blue-600">
          <span>🔒 SSL Secured Connection</span>
          <span>🛡️ PCI DSS Compliant</span>
          <span>🔐 256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
}

