import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Users, 
  ShoppingCart, 
  Mail, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Send,
  Download,
  RefreshCw
} from 'lucide-react';
import { AdminService } from '../services/adminService';
import { AdminOrders } from './AdminOrders';
import { AdminReservations } from './AdminReservations';
import { AdminMessages } from './AdminMessages';
import { AdminStats } from './AdminStats';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [session, setSession] = useState(null);

  useEffect(() => {
    const currentSession = AdminService.getCurrentSession();
    if (!currentSession) {
      // Redirect to login if no valid session
      window.location.reload();
      return;
    }
    
    setSession(currentSession);
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const statsResult = await AdminService.getDashboardStats();
      if (statsResult.success) {
        setStats(statsResult.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    AdminService.logout();
    window.location.reload();
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: Mail }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminStats stats={stats} onRefresh={loadDashboardData} isLoading={isLoading} />;
      case 'orders':
        return <AdminOrders />;
      case 'reservations':
        return <AdminReservations />;
      case 'messages':
        return <AdminMessages />;
      default:
        return <AdminStats stats={stats} onRefresh={loadDashboardData} isLoading={isLoading} />;
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Zabo's Kitchen Management System</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <span>Welcome, {session.username}</span>
            <span>•</span>
            <span>Admin Access</span>
            <span>•</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex justify-center space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-100 text-orange-700 border-b-2 border-orange-500'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
