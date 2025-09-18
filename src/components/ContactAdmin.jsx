import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Eye, Archive, Trash2, RefreshCw } from 'lucide-react';

export function ContactAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const loadMessages = async () => {
    setLoading(true);
    try {
      // Load from localStorage (mock data)
      const storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      setMessages(storedMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const updateMessageStatus = (messageId, newStatus) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: newStatus, updatedAt: new Date().toISOString() }
        : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
  };

  const deleteMessage = (messageId) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    setSelectedMessage(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'UNREAD': return 'bg-red-100 text-red-800';
      case 'READ': return 'bg-blue-100 text-blue-800';
      case 'REPLIED': return 'bg-green-100 text-green-800';
      case 'ARCHIVED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
              <p className="text-gray-600 mt-1">Manage customer inquiries and feedback</p>
            </div>
            <button
              onClick={loadMessages}
              className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  All Messages ({messages.length})
                </h2>
              </div>
              
              {messages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No contact messages yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id ? 'bg-brand-orange/5 border-r-4 border-brand-orange' : ''
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{message.name}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(message.status)}`}>
                              {message.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{message.subject}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500 ml-4">
                          <p>{formatDate(message.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 space-y-4">
                  {/* Contact Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{selectedMessage.email}</span>
                      </div>
                      {selectedMessage.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{selectedMessage.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(selectedMessage.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Subject</h4>
                    <p className="text-sm text-gray-700">{selectedMessage.subject}</p>
                  </div>

                  {/* Message */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Message</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Actions</h4>
                    <div className="space-y-2">
                      {selectedMessage.status === 'UNREAD' && (
                        <button
                          onClick={() => updateMessageStatus(selectedMessage.id, 'READ')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Mark as Read
                        </button>
                      )}
                      
                      {selectedMessage.status !== 'REPLIED' && (
                        <button
                          onClick={() => updateMessageStatus(selectedMessage.id, 'REPLIED')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          Mark as Replied
                        </button>
                      )}
                      
                      {selectedMessage.status !== 'ARCHIVED' && (
                        <button
                          onClick={() => updateMessageStatus(selectedMessage.id, 'ARCHIVED')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <Archive className="w-4 h-4" />
                          Archive
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
