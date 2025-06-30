
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BarChart3, Package, Users, ShoppingCart, Image as ImageIcon, Edit as EditIcon, Mails } from 'lucide-react';
// import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar.jsx';
import AdminDashboardTab from '@/components/admin/AdminDashboardTab.jsx';
import AdminProductsTab from '@/components/admin/AdminProductsTab.jsx';
import AdminOrdersTab from '@/components/admin/AdminOrdersTab.jsx';
import AdminCustomersTab from '@/components/admin/AdminCustomersTab.jsx';
import AdminBannerTab from '@/components/admin/AdminBannerTab.jsx';
import AdminBlogTab from '@/components/admin/AdminBlogTab.jsx';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AdminContactUs from '../components/admin/AdminContactUs';
import { useAuthContext } from '../contexts/AuthContext';

const AdminPanel = () => {
  // const { user, isAdmin, isLoading: authLoading } = useAuth();
  const { user, authLoading, isAdmin } = useAuthContext();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin())) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, authLoading, navigate]);


  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('meenora_orders') || '[]');
    setOrders(savedOrders);

    const mockCustomers = [
      { id: 1, name: 'Priya Sharma', email: 'priya.s@example.com', orders: 3, totalSpent: 156.99, joinDate: '2024-01-15', role: 'user' },
      { id: 2, name: 'Rohan Verma', email: 'rohan.v@example.com', orders: 5, totalSpent: 289.50, joinDate: '2024-02-20', role: 'user' },
      { id: 3, name: 'Aisha Khan', email: 'aisha.k@example.com', orders: 2, totalSpent: 98.75, joinDate: '2024-03-10', role: 'user' },
      { id: 4, name: 'Admin User', email: 'admin@meenora.in', orders: 0, totalSpent: 0, joinDate: '2024-01-01', role: 'admin' }
    ];
    const registeredUsers = JSON.parse(localStorage.getItem('meenora_users_list') || '[]');
    const combinedCustomers = [...mockCustomers];
    registeredUsers.forEach(regUser => {
      if (!combinedCustomers.find(c => c.email === regUser.email)) {
        combinedCustomers.push({
          id: regUser.id || Date.now() + Math.random(),
          name: regUser.name,
          email: regUser.email,
          orders: 0,
          totalSpent: 0,
          joinDate: new Date().toISOString().split('T')[0],
          role: regUser.role
        });
      }
    });
    setCustomers(combinedCustomers);

  }, []);
  
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }



  if (!user || !isAdmin()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 bg-card p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-display font-bold text-destructive">Access Denied</h1>
          <p className="text-muted-foreground text-lg">
            You do not have permission to view this page. Please log in as an administrator.
          </p>
          <Button onClick={() => navigate('/admin/login')} className="btn-primary">
            Go to Admin Login
          </Button>
        </div>
      </div>
    );
  }

  const TABS_CONFIG = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: <AdminDashboardTab orders={orders} customers={customers} /> },
    { id: 'products', label: 'Products', icon: Package, component: <AdminProductsTab /> },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, component: <AdminOrdersTab orders={orders} /> },
    { id: 'customers', label: 'Users & Roles', icon: Users, component: <AdminCustomersTab customers={customers} setCustomers={setCustomers} /> },
    { id: 'banners', label: 'Banners', icon: ImageIcon, component: <AdminBannerTab /> },
    { id: 'blog', label: 'Blog Management', icon: EditIcon, component: <AdminBlogTab /> },
    { id: 'contactus', label: 'Contact Us', icon: Mails, component: <AdminContactUs /> }
  ];

  const ActiveComponent = TABS_CONFIG.find(tab => tab.id === activeTab)?.component;

  return (
    <>
      <Helmet>
        <title>Admin Panel - Manage Store | Meenora</title>
        <meta name="description" content="Admin dashboard for managing Meenora store - products, orders, customers, and analytics." />
      </Helmet>

      <div className="h-screen bg-background flex">
        <AdminSidebar tabs={TABS_CONFIG} activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8 overflow-y-auto pt-16 md:pt-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {ActiveComponent}
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
