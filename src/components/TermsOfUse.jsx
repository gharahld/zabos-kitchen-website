export function TermsOfUse() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="font-heading text-4xl md:text-5xl text-brand-charcoal mb-8">Terms of Use</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-brand-gray mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Acceptance of Terms</h2>
            <p className="text-brand-gray mb-4">
              By accessing and using Zabo's Kitchen website and services, you accept and agree to be bound 
              by the terms and provision of this agreement.
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Use License</h2>
            <p className="text-brand-gray mb-4">
              Permission is granted to temporarily download one copy of the materials on Zabo's Kitchen 
              website for personal, non-commercial transitory viewing only.
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Reservations and Orders</h2>
            <p className="text-brand-gray mb-4">
              When making reservations or placing orders through our website:
            </p>
            <ul className="list-disc list-inside text-brand-gray mb-4 space-y-2">
              <li>You must provide accurate and complete information</li>
              <li>Reservations are subject to availability</li>
              <li>We reserve the right to cancel reservations for any reason</li>
              <li>Orders are subject to our menu availability</li>
            </ul>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Payment Terms</h2>
            <p className="text-brand-gray mb-4">
              Payment for orders and services must be made in advance or upon delivery/pickup. 
              We accept major credit cards and cash payments.
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Cancellation Policy</h2>
            <p className="text-brand-gray mb-4">
              Reservations may be cancelled up to 2 hours before the scheduled time. 
              Orders may be cancelled up to 30 minutes after placement, subject to preparation status.
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-brand-gray mb-4">
              In no event shall Zabo's Kitchen or its suppliers be liable for any damages arising out 
              of the use or inability to use the materials on our website.
            </p>
            
            <h2 className="font-heading text-2xl text-brand-charcoal mt-8 mb-4">Contact Information</h2>
            <p className="text-brand-gray mb-4">
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className="bg-brand-orange/10 p-4 rounded-lg">
              <p className="text-brand-charcoal">
                <strong>Email:</strong> legal@zaboskitchen.com<br />
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



