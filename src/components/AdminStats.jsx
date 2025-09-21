import React from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Mail, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export function AdminStats({ stats, onRefresh, isLoading }) {
  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue?.toFixed(2) || '0.00'}`,
      change: `+$${stats.todayRevenue?.toFixed(2) || '0.00'} today`,
      icon: DollarSign,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders || 0,
      change: `${stats.todayOrders || 0} today`,
      icon: ShoppingCart,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders || 0,
      change: `${stats.completedOrders || 0} completed`,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Reservations',
      value: stats.totalReservations || 0,
      change: `${stats.pendingReservations || 0} pending`,
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Messages',
      value: stats.totalMessages || 0,
      change: `${stats.unreadMessages || 0} unread`,
      icon: Mail,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      borderColor: 'border-indigo-200'
    },
    {
      title: 'Monthly Orders',
      value: stats.monthlyOrders || 0,
      change: 'This month',
      icon: TrendingUp,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">Key metrics and statistics for your restaurant</p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-6 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.iconColor} p-3 rounded-full bg-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Completed Orders</h3>
              <p className="text-2xl font-bold text-green-600">{stats.completedOrders || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pending Orders</h3>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pending Reservations</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.pendingReservations || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Unread Messages</h3>
              <p className="text-2xl font-bold text-red-600">{stats.unreadMessages || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.todayOrders || 0}</p>
            <p className="text-sm text-gray-600">Orders Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">${stats.todayRevenue?.toFixed(2) || '0.00'}</p>
            <p className="text-sm text-gray-600">Revenue Today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.monthlyOrders || 0}</p>
            <p className="text-sm text-gray-600">Orders This Month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
