
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call / User validation
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('meenora_users_list') || '[]');
      const foundUser = users.find(u => u.email === email);

      if (foundUser && foundUser.password === password) {
        if (foundUser.role === 'admin') {
           toast({
            title: "Admin Login Required",
            description: "Please use the admin login page for admin accounts.",
            variant: "destructive",
          });
          setIsLoading(false);
          navigate('/admin/login');
          return;
        }
        
        const mockToken = `mockJWT_${Date.now()}_${foundUser.id}`;
        login(foundUser, mockToken);
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${foundUser.name}!`,
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Login - Access Your Account | Meenora</title>
        <meta name="description" content="Login to your Meenora account to access your dashboard, orders, and wishlist. Secure login for our beauty and skincare store." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <Link to="/" className="mb-4 flex justify-center">
                <img className='w-44 h-auto object-cover'  src="/Logo/Company_logo2.png" alt="" />
              </Link>
              <CardTitle className="text-3xl font-display">Welcome Back!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Sign in to continue your journey to radiant beauty.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 text-base py-3"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
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
                  <div className="text-right">
                    <Button variant="link" size="sm" className="text-primary h-auto p-0 text-xs" onClick={() => toast({ description: "🚧 Password reset isn't implemented yet. 🚀"})}>
                      Forgot password?
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full btn-primary text-base py-3" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                       <LogIn className="h-5 w-5 mr-2" /> Sign In
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center space-y-3 pt-6 border-t border-border/70">
              <p className="text-sm text-muted-foreground">
                Don't have an account?
                <Button variant="link" asChild className="text-primary h-auto p-0 ml-1 font-semibold">
                  <Link to="/signup">Create one now</Link>
                </Button>
              </p>
               <p className="text-sm text-muted-foreground">
                Are you an Admin?
                <Button variant="link" asChild className="text-secondary h-auto p-0 ml-1 font-semibold">
                  <Link to="/admin/login">Admin Login</Link>
                </Button>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
