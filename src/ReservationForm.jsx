import React, { useState } from 'react';

const ReservationForm = () => {
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2'
  });

  const handleReservation = (e) => {
    e.preventDefault();
    alert('Reservation request sent! We\'ll confirm via email within 2 hours.');
    setReservationForm({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-heading font-bold text-brand-charcoal mb-4">Make a Reservation</h1>
        <p className="font-body text-brand-gray">Book your table for an unforgettable dining experience</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Reservation Form */}
        <div className="bg-brand-white rounded-card shadow-food p-6">
          <form onSubmit={handleReservation}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium font-body text-brand-charcoal mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={reservationForm.name}
                  onChange={(e) => setReservationForm({...reservationForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-brand-light rounded-card focus:ring-2 focus:ring-brand-orange focus:border-transparent font-body"
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-body text-brand-charcoal mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={reservationForm.email}
                  onChange={(e) => setReservationForm({...reservationForm, email: e.target.value})}
                  className="w-full px-4 py-2 border border-brand-light rounded-card focus:ring-2 focus:ring-brand-orange focus:border-transparent font-body"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium font-body text-brand-charcoal mb-2">Phone</label>
              <input
                type="tel"
                required
                value={reservationForm.phone}
                onChange={(e) => setReservationForm({...reservationForm, phone: e.target.value})}
                className="w-full px-4 py-2 border border-brand-light rounded-card focus:ring-2 focus:ring-brand-orange focus:border-transparent font-body"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium font-body text-brand-charcoal mb-2">Date</label>
                <input
                  type="date"
                  required
                  value={reservationForm.date}
                  onChange={(e) => setReservationForm({...reservationForm, date: e.target.value})}
                  className="w-full px-4 py-2 border border-brand-light rounded-card focus:ring-2 focus:ring-brand-orange focus:border-transparent font-body"
                />
              </div>
              <div>
                <label className="block text-sm font-medium font-body text-brand-charcoal mb-2">Time</label>
                <select
                  required
                  value={reservationForm.time}
                  onChange={(e) => setReservationForm({...reservationForm, time: e.target.value})}
                  className="w-full px-4 py-2 border border-brand-light rounded-card focus:ring-2 focus:ring-brand-orange focus:border-transparent font-body"
                >
                  <option value="">Select Time</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="6:30 PM">6:30 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium font-body text-brand-charcoal mb-2">Guests</label>
                <select
                  value={reservationForm.guests}
                  onChange={(e) => setReservationForm({...reservationForm, guests: e.target.value})}
                  className="w-full px-4 py-2 border border-brand-light rounded-card focus:ring-2 focus:ring-brand-orange focus:border-transparent font-body"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-orange text-brand-white py-3 rounded-card font-semibold hover:bg-orange-600 transition-colors font-body"
            >
              Reserve Table
            </button>
          </form>
        </div>

        {/* Restaurant Info */}
        <div className="space-y-6">
          <div className="bg-brand-white rounded-card shadow-food p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center font-heading text-brand-charcoal">
              <svg className="w-5 h-5 mr-2 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hours of Operation
            </h3>
            <div className="space-y-2 font-body text-brand-gray">
              <div className="flex justify-between">
                <span>Monday - Thursday</span>
                <span>11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Friday - Saturday</span>
                <span>11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-white rounded-card shadow-food p-6">
            <h3 className="text-xl font-semibold mb-4 font-heading text-brand-charcoal">Reservation Policy</h3>
            <ul className="font-body text-brand-gray space-y-2">
              <li>• Reservations recommended for parties of 4+</li>
              <li>• 24-hour cancellation policy</li>
              <li>• Large parties (8+) require deposit</li>
              <li>• Walk-ins welcome based on availability</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
