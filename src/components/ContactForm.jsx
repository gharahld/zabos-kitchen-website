import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Navigation } from 'lucide-react';
import { ContactService } from '../services/contactService';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await ContactService.submitContactForm(formData);

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-orange/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-brand-yellow/5 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-brand-orange/10 rounded-full animate-pulse delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-charcoal mb-6">
            Get in <span className="text-brand-orange">Touch</span>
          </h2>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
            Have questions about our menu, want to make a reservation, or just want to say hello? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-2xl font-bold text-brand-charcoal mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-1">Address</h4>
                    <p className="text-brand-gray">
                      3080 Sheridan St<br />
                      Hollywood, FL 33021
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-1">Phone</h4>
                    <p className="text-brand-gray">
                      <a href="tel:+19541234567" className="hover:text-brand-orange transition-colors">
                        +1 (954) 123-4567
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-1">Email</h4>
                    <p className="text-brand-gray">
                      <a href="mailto:info@zaboskitchen.com" className="hover:text-brand-orange transition-colors">
                        info@zaboskitchen.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal mb-1">Hours</h4>
                    <div className="text-brand-gray space-y-1">
                      <p>Monday - Sunday: 11:00 AM - 10:00 PM</p>
                      <p className="text-sm text-brand-orange font-medium">Open 7 days a week!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="mt-8">
              <h4 className="font-semibold text-brand-charcoal mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-orange" />
                Find Us
              </h4>
              <div className="relative">
                {/* Map Container */}
                <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  {/* Embedded Google Map */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.1234567890123!2d-80.1495!3d26.0112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9a4b8b8b8b8b8%3A0x1234567890abcdef!2s3080%20Sheridan%20St%2C%20Hollywood%2C%20FL%2033021!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Zabo's Kitchen Location"
                  ></iframe>
                </div>
                
                {/* Map Overlay with Directions Button */}
                <div className="absolute top-4 right-4">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=3080+Sheridan+St,+Hollywood,+FL+33021"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg hover:bg-white transition-all duration-300 group"
                  >
                    <Navigation className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-semibold text-brand-charcoal">Directions</span>
                  </a>
                </div>

                {/* Location Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-brand-orange" />
                      <span className="font-semibold text-brand-charcoal text-sm">Zabo's Kitchen</span>
                    </div>
                    <p className="text-xs text-brand-gray">3080 Sheridan St, Hollywood, FL 33021</p>
                    <p className="text-xs text-brand-orange font-medium mt-1">Free parking available</p>
                  </div>
                </div>
              </div>

              {/* Additional Location Info */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-brand-orange/5 p-4 rounded-lg">
                  <h5 className="font-semibold text-brand-charcoal mb-2 text-sm">Parking</h5>
                  <p className="text-xs text-brand-gray">Free parking available in front of the restaurant and in the adjacent lot.</p>
                </div>
                <div className="bg-brand-orange/5 p-4 rounded-lg">
                  <h5 className="font-semibold text-brand-charcoal mb-2 text-sm">Public Transit</h5>
                  <p className="text-xs text-brand-gray">Bus stop 2 blocks away. Hollywood Blvd & Sheridan St intersection.</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold text-brand-charcoal mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-300 group">
                  <svg className="w-5 h-5 text-brand-orange group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-300 group">
                  <svg className="w-5 h-5 text-brand-orange group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all duration-300 group">
                  <svg className="w-5 h-5 text-brand-orange group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-brand-light/50">
            <h3 className="font-heading text-2xl font-bold text-brand-charcoal mb-6">
              Send us a Message
            </h3>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800">Thank you! Your message has been sent successfully. We'll get back to you soon!</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800">Sorry, there was an error sending your message. Please try again or call us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-brand-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-brand-light rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-brand-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-brand-light rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-brand-charcoal mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-brand-light rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-brand-charcoal mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-brand-light rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Reservation">Reservation</option>
                  <option value="Catering">Catering</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-brand-charcoal mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-brand-light rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-orange to-orange-600 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
