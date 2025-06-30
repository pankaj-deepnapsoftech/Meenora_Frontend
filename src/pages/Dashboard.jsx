
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut, Eye, Calendar, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { useAuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  // const { user, logout } = useAuth();
  const { user, UserLogout
  } = useAuthContext()
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  console.log(user)
  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('meenora_orders') || '[]');
    setOrders(savedOrders);

    // Load wishlist from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('meenora_wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  const handleLogout = () => {
    UserLogout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

if (!user || user.role !== 'user') {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">Only regular users can access the dashboard.</p>
        <Button onClick={() => window.location.href = user?.role === 'admin' ? '/admin' : '/'}>
          {user?.role === 'admin' ? 'Go to Admin Panel' : 'Go to Home'}
        </Button>
      </div>
    </div>
  );
}


  return (
    <>
      <Helmet>
        <title>My Dashboard - Account Overview | Meenora</title>
        <meta name="description" content="Manage your Meenora account, view orders, wishlist, and update your profile settings." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">
                Manage your account and track your beauty journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>

                    <nav className="space-y-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${activeTab === tab.id
                            ? 'bg-pink-100 text-pink-700'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                          <tab.icon className="h-4 w-4" />
                          <span>{tab.label}</span>
                        </button>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </nav>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Package className="h-5 w-5 mr-2" />
                          My Orders ({orders.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {orders.length === 0 ? (
                          <div className="text-center py-8">
                            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">No orders yet</p>
                            <p className="text-sm text-gray-500 mb-4">
                              Start shopping to see your orders here
                            </p>
                            <Button onClick={() => window.location.href = '/shop'}>
                              Start Shopping
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {orders.map((order) => (
                              <Card key={order.id} className="border">
                                <CardContent className="p-6">
                                  <div className="flex items-center justify-between mb-4">
                                    <div>
                                      <h3 className="font-semibold text-gray-900">
                                        Order #{order.id}
                                      </h3>
                                      <p className="text-sm text-gray-600 flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {new Date(order.date).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <Badge className={getStatusColor(order.status)}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                      </Badge>
                                      <p className="text-lg font-bold text-gray-900 mt-1">
                                        ${order.total.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    {order.items.map((item) => (
                                      <div key={item.id} className="flex items-center space-x-3">
                                        <img
                                          className="w-12 h-12 object-cover rounded-lg"
                                          alt={item.name}
                                          src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                                        <div className="flex-1">
                                          <p className="font-medium text-gray-900">{item.name}</p>
                                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-gray-900">
                                          ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-4 w-4 mr-2" />
                                      View Details
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => toast({ description: "🚧 Reorder feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                                    >
                                      Reorder
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Heart className="h-5 w-5 mr-2" />
                          My Wishlist ({wishlist.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Your wishlist is empty</p>
                          <p className="text-sm text-gray-500 mb-4">
                            Save products you love for later
                          </p>
                          <Button onClick={() => window.location.href = '/shop'}>
                            Browse Products
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          Profile Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={user.name}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={user.email}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                              readOnly
                            />
                          </div>
                        </div>
                        <Button
                          className="btn-primary text-white"
                          onClick={() => toast({ description: "🚧 Profile editing isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                        >
                          Update Profile
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Settings className="h-5 w-5 mr-2" />
                            Account Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between py-3 border-b">
                            <div>
                              <h4 className="font-medium text-gray-900">Email Notifications</h4>
                              <p className="text-sm text-gray-600">Receive updates about your orders</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toast({ description: "🚧 Notification settings aren't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                            >
                              Manage
                            </Button>
                          </div>
                          <div className="flex items-center justify-between py-3 border-b">
                            <div>
                              <h4 className="font-medium text-gray-900">Payment Methods</h4>
                              <p className="text-sm text-gray-600">Manage your saved payment methods</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toast({ description: "🚧 Payment method management isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Manage
                            </Button>
                          </div>
                          <div className="flex items-center justify-between py-3">
                            <div>
                              <h4 className="font-medium text-gray-900">Privacy Settings</h4>
                              <p className="text-sm text-gray-600">Control your privacy preferences</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toast({ description: "🚧 Privacy settings aren't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                            >
                              Manage
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
