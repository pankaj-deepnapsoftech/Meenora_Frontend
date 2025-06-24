
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ShoppingCart, Package, Users, DollarSign, AlertTriangle, CheckCircle2, LineChart, BarChartBig, PieChart as PieChartIcon } from 'lucide-react';
import { products as allProducts } from '@/data/products';
import { ResponsiveContainer, LineChart as ReLineChart, BarChart as ReBarChart, PieChart as RePieChart, Pie, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { toast } from '@/components/ui/use-toast';

const AdminDashboardTab = ({ orders, customers }) => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const lowStockProducts = allProducts.filter(p => p.inStock && (p.stockCount || 10) < 5).length; 

  const stats = [
    {
      title: 'Total Revenue',
      value: `${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-main',
      bgColor: 'bg-gradient-to-r from-green-50 to-green-50', // gradient light green
      bgIconColor: 'bg-green-200',
      trend: '+12.5% vs last month'
    },
    {
      title: 'Total Orders',
      value: orders.length.toString(),
      icon: ShoppingCart,
      color: 'text-blue-main',
      bgColor: 'bg-gradient-to-r from-blue-50  to-blue-50',  // gradient light blue
      bgIconColor: 'bg-blue-200',
      trend: '+8.2% new orders'
    },
    {
      title: 'Total Products',
      value: allProducts.length.toString(),
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-r from-purple-50  to-purple-50', // gradient light purple
      bgIconColor: 'bg-purple-200',
      trend: `${allProducts.filter(p => p.inStock).length} in stock`
    },
    {
      title: 'Total Customers',
      value: customers.length.toString(),
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-gradient-to-r from-pink-50  to-pink-50',  // gradient light pink
      bgIconColor: 'bg-pink-200',
      trend: '+15.3% growth'
    }
  ];
  

  const quickInsights = [
    { title: "Average Order Value", value: `${averageOrderValue.toFixed(2)}`, icon: TrendingUp, color: 'text-primary', bgColor: 'bg-primary-soft' },
    { title: "Low Stock Items", value: lowStockProducts.toString(), icon: lowStockProducts > 0 ? AlertTriangle : CheckCircle2, color: lowStockProducts > 0 ? 'text-red-main' : 'text-green-main', bgColor: lowStockProducts > 0 ? 'bg-red-soft' : 'bg-green-soft' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'order-status-pending';
      case 'processing': return 'order-status-processing';
      case 'shipped': return 'order-status-shipped';
      case 'delivered': return 'order-status-delivered';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock chart data
  const salesData = [
    { name: 'Jan', sales: Math.floor(Math.random() * 3000) + 1000 },
    { name: 'Feb', sales: Math.floor(Math.random() * 3000) + 1000 },
    { name: 'Mar', sales: Math.floor(Math.random() * 3000) + 1000 },
    { name: 'Apr', sales: Math.floor(Math.random() * 3000) + 1000 },
    { name: 'May', sales: Math.floor(Math.random() * 3000) + 1000 },
    { name: 'Jun', sales: Math.floor(Math.random() * 3000) + 1000 },
  ];

  const categoryData = allProducts.reduce((acc, product) => {
    const categoryName = product.category;
    const existingCategory = acc.find(item => item.name === categoryName);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: categoryName, value: 1 });
    }
    return acc;
  }, []).filter(cat => cat.name !== "All Products");

  const PIE_COLORS = ['#4f5e9d', '#6cb2eb', '#a7d2e9', '#cce6f4', '#e6f3fa']; // Primary, secondary, and tertiary colors

  const handleChartClick = (chartName) => {
     toast({
      title: `${chartName} Clicked`,
      description: `🚧 Interacting with ${chartName} is not fully implemented yet. 🚀`,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-1">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome back, Admin! Here's your store's performance at a glance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <Card className={` shadow-md ${stat.bgColor}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${stat.bgIconColor}`}>
                    <stat.icon className={`h-7 w-7 ${stat.color}`} />
                  </div>
                  <Badge variant="outline" className={`font-normal text-xs ${stat.color.replace('text-', 'border-').replace('-main', '-500')}`}>{stat.trend.split(' ')[0]}</Badge>
                </div>
                <p className="text-3xl font-bold text-foreground mt-4">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="shadow-md h-full">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Sales Over Time</CardTitle>
              <CardDescription>Monthly sales performance for the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pb-4 pr-0">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={salesData} onClick={() => handleChartClick('Sales Line Chart')}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Legend wrapperStyle={{ fontSize: "14px" }} />
                  <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 6 }} />
                </ReLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="shadow-md h-full">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Product Categories</CardTitle>
              <CardDescription>Distribution of products by category.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart onClick={() => handleChartClick('Category Pie Chart')}>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`} >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}/>
                  <Legend wrapperStyle={{ fontSize: "14px" }} />
                </RePieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">No recent orders to display.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                      <div>
                        <h4 className="font-medium text-foreground">Order #{order.id.slice(0,8)}...</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right">
                         <Badge className={`px-2.5 py-1 text-xs ${getStatusClass(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <span className="block mt-1 font-semibold text-foreground text-lg">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          {quickInsights.map(insight => (
            <Card key={insight.title} className="stats-card shadow-md">
              <CardContent className="p-5">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-md ${insight.bgColor}`}>
                     <insight.icon className={`h-5 w-5 ${insight.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{insight.title}</p>
                    <p className="text-xl font-bold text-foreground">{insight.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardTab;
