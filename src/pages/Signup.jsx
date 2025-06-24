
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Mismatch",
        description: "Please ensure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('meenora_users_list') || '[]');
      if (users.find(u => u.email === email)) {
         toast({
          title: "Signup Failed",
          description: "An account with this email already exists.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const newUser = {
        id: Date.now().toString(), 
        name,
        email,
        password, // In real app, hash password server-side
        role: 'user', 
      };
      
      const signupResult = signup(newUser); // Use the signup from AuthContext

      if (signupResult.success) {
        toast({
          title: "Account Created!",
          description: "Welcome to Meenora! You're now logged in.",
        });
        navigate('/dashboard'); // Redirect to dashboard after signup
      } else {
        // This part might not be reached with current mock logic but good for future
        toast({
          title: "Signup Failed",
          description: signupResult.message || "Could not create your account. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Create Your Meenora Account</title>
        <meta name="description" content="Join Meenora today to experience premium natural beauty products. Create your account for a personalized shopping experience." />
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
               <Link to="/" className="inline-block mb-4">
                 <span className="text-4xl font-display font-bold text-primary">Meenora</span>
              </Link>
              <CardTitle className="text-3xl font-display">Create Your Account</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Join our community and start your journey to natural beauty.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                   <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Anya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 text-base py-3"
                    />
                  </div>
                </div>
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
                      placeholder="•••••••• (min. 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 text-base py-3"
                    />
                  </div>
                </div>
                 <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</label>
                   <div className="relative">
                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className="pl-10 text-base py-3"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full btn-primary text-base py-3" disabled={isLoading}>
                  {isLoading ? (
                     <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <UserPlus className="h-5 w-5 mr-2" /> Create Account
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
             <CardFooter className="flex flex-col items-center space-y-3 pt-6 border-t border-border/70">
              <p className="text-sm text-muted-foreground">
                Already have an account?
                <Button variant="link" asChild className="text-primary h-auto p-0 ml-1 font-semibold">
                  <Link to="/login">Sign In</Link>
                </Button>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SignupPage;
