import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  XCircle,
  Calendar,
  Users,
  Phone,
  Mail,
  Filter,
  Search
} from 'lucide-react';
import { AdminService } from '../services/adminService';

export function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    setIsLoading(true);
    try {
      const result = await AdminService.getReservations();
      if (result.success) {
        setReservations(result.data);
      }
    } catch (error) {
      console.error('Error loading reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      // In a real app, this would call the backend API
      setReservations(prev => prev.map(res => 
        res.id === reservationId ? { ...res, status: newStatus } : res
      ));
      
      if (selectedReservation && selectedReservation.id === reservationId) {
        setSelectedReservation(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return Clock;
      case 'CONFIRMED': return CheckCircle;
      case 'CANCELLED': return XCircle;
      case 'COMPLETED': return CheckCircle;
      default: return Clock;
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const ReservationModal = ({ reservation, onClose }) => {
    if (!reservation) return null;

    const StatusIcon = getStatusIcon(reservation.status);

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Reservation Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Reservation Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Reservation Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Reservation ID:</span> {reservation.id}</p>
                  <p><span className="font-medium">Date:</span> {new Date(reservation.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {reservation.time}</p>
                  <p><span className="font-medium">Party Size:</span> {reservation.partySize} people</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {reservation.customerName}</p>
                  <p><span className="font-medium">Email:</span> {reservation.email}</p>
                  <p><span className="font-medium">Phone:</span> {reservation.phone}</p>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {reservation.specialRequests && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Requests</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{reservation.specialRequests}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              {reservation.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => updateReservationStatus(reservation.id, 'CONFIRMED')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm
                  </button>
                  <button
                    onClick={() => updateReservationStatus(reservation.id, 'CANCELLED')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              )}
              {reservation.status === 'CONFIRMED' && (
                <button
                  onClick={() => updateReservationStatus(reservation.id, 'COMPLETED')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reservations Management</h2>
          <p className="text-gray-600">View and manage table reservations</p>
        </div>
        <button
          onClick={loadReservations}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reservations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reservations...</p>
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reservations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reservation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReservations.map((reservation) => {
                  const StatusIcon = getStatusIcon(reservation.status);
                  return (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{reservation.id.slice(-8)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                          <div className="text-sm text-gray-500">{reservation.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{new Date(reservation.date).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">{reservation.time}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{reservation.partySize}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          {reservation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedReservation(reservation);
                            setShowReservationModal(true);
                          }}
                          className="text-orange-600 hover:text-orange-900 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reservation Modal */}
      {showReservationModal && (
        <ReservationModal 
          reservation={selectedReservation} 
          onClose={() => {
            setShowReservationModal(false);
            setSelectedReservation(null);
          }} 
        />
      )}
    </div>
  );
}
