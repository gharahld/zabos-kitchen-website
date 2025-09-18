export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-brand-gray mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Information We Collect</h2>
            <p className="text-brand-gray mb-4">
              We collect information you provide directly to us, such as when you make a reservation, 
              place an order, or contact us. This may include your name, email address, phone number, 
              and payment information.
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-brand-gray mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-brand-gray mb-4 space-y-2">
              <li>Process reservations and orders</li>
              <li>Send you confirmations and updates</li>
              <li>Improve our services and customer experience</li>
              <li>Send you promotional materials (with your consent)</li>
            </ul>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Information Sharing</h2>
            <p className="text-brand-gray mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy or as required by law.
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Data Security</h2>
            <p className="text-brand-gray mb-4">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Contact Us</h2>
            <p className="text-brand-gray mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-brand-orange/10 p-4 rounded-lg">
              <p className="text-brand-charcoal">
                <strong>Email:</strong> privacy@zaboskitchen.com<br />
                <strong>Phone:</strong> (954) 123-4567<br />
                <strong>Address:</strong> 3080 Sheridan St, Hollywood, FL 33021
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



