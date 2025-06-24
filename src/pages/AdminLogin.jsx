
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const adminCredentials = {
    email: 'admin@meenora.in',
    password: 'Admin123', // Store securely in .env for real app
    role: 'admin',
    name: 'Meenora Admin'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock Admin API call / User validation
    setTimeout(() => {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        const mockToken = `mockJWT_admin_${Date.now()}`;
        login({
          id: 'admin_user_01',
          name: adminCredentials.name,
          email: adminCredentials.email,
          role: adminCredentials.role
        }, mockToken);

        toast({
          title: "Admin Login Successful!",
          description: `Welcome, ${adminCredentials.name}! Accessing Admin Panel...`,
        });
        navigate('/admin');
      } else {
        toast({
          title: "Admin Login Failed",
          description: "Invalid admin credentials. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Meenora Store Management</title>
        <meta name="description" content="Secure login for Meenora administrators to manage products, orders, and store settings." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-foreground/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-primary/20">
            <CardHeader className="text-center">
              <Link to="/" className="mb-4 flex justify-center">
                <img className='w-44 h-auto object-cover' src="/Logo/Company_logo2.png" alt="" />
              </Link>
              <CardTitle className="text-3xl font-display flex items-center justify-center">
                <Shield className="h-8 w-8 mr-2 text-primary" /> Admin Portal
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Secure access for store management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Admin Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@meenora.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 text-base py-3"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">Admin Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 text-base py-3"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full btn-primary text-base py-3" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                      Authenticating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <LogIn className="h-5 w-5 mr-2" /> Access Panel
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="pt-6 border-t border-border/70">
              <p className="text-xs text-muted-foreground text-center w-full">
                This portal is for authorized personnel only. All activities are monitored.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLoginPage;
