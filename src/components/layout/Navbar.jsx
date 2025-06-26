import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Search, Heart, ChevronDown, BookOpen, Sun, Moon, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { products as allProducts } from '@/data/products.js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isComingSoonDropdownOpen, setIsComingSoonDropdownOpen] = useState(false);
  
  const comingSoonNavProducts = allProducts.filter(p => p.comingSoon);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthAction = () => {
    if (user) {
      logout();
      toast({
        title: "Logged out successfully!",
        description: "You've been logged out. See you soon!"
      });
    } else {
      const mockUser = {
        id: 1,
        name: "Aisha Khan", 
        email: "aisha@meenora.com",
        role: "user"
      };
      login(mockUser);
      toast({
        title: "Welcome, Aisha!",
        description: "You've successfully logged in."
      });
    }
  };

  const navItemsBase = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ];

  const navItemsEnd = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blog', path: '/blog'}
  ];
  
  const renderComingSoonDropdown = () => (
    <div 
      className="relative"
      onMouseEnter={() => setIsComingSoonDropdownOpen(true)}
      onMouseLeave={() => setIsComingSoonDropdownOpen(false)}
    >
      <button className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium text-[19px] flex items-center">
        Coming Soon <ChevronDown className={`ml-1 mt-1 h-4 w-4 transition-transform ${isComingSoonDropdownOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isComingSoonDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 mt-2 w-80 bg-card rounded-md shadow-xl py-2 z-50 border border-border/70"
          >
            {comingSoonNavProducts.length > 0 ? comingSoonNavProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className=" px-6 py-2.5 text-sm text-foreground/90 hover:bg-primary/10 hover:text-primary flex items-center justify-between"
                onClick={() => setIsComingSoonDropdownOpen(false)}
              >
                <span>{product.name.replace("Meenora ", "")}</span>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-accent/20 text-accent-foreground border-accent/50">Soon</Badge>
              </Link>
            )) : (
              <div className="px-4 py-3 text-sm text-muted-foreground">No upcoming products yet.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300  ${isScrolled ? 'backdrop-blur-md shadow-lg bg-[#dddddd83]' : 'border-b border-[#ffff] shadow-md bg-card/90'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center whitespace-nowrap h-24">
          <Link to="/" className="flex items-center space-x-2">
            <motion.span
              className="font-display"
              whileHover={{
                scale: 1.05,
                textShadow: "0px 0px 8px hsl(var(--primary))",
              }}
            >
              <img
                src="/Logo/Company_logo2.png"
                alt="Company Logo"
                className="object-contain w-48 h-auto"
              />
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center space-x-7">
            {navItemsBase.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={item.onClick}
                className={({ isActive }) =>
                  `text-[18px] font-medium transition-colors duration-200 px-4 py-2 rounded-md
              ${isActive ? 'bg-primary text-white px-6 ' : 'text-foreground/80 hover:text-primary'}`
                }
              >
                {item.name}
              </NavLink>
         
            ))}
            {renderComingSoonDropdown()}
            {navItemsEnd.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-[18px] font-medium transition-colors duration-200 px-4 py-2 rounded-md
              ${isActive ? 'bg-primary text-white px-6  ' : 'text-foreground/80 hover:text-primary'}`
                }
                onClick={item.onClick}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
             <Button
              variant="ghost"
              size="icon"
              className="text-foreground/70 hover:text-primary hover:bg-primary/10"
              onClick={() => toast({ description: "🚧 Search feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
            >
              <Search className="w-7" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/70 hover:text-primary hover:bg-primary/10"
              onClick={() => toast({ description: "🚧 Wishlist feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
            >
              <Heart className="w-7" />
            </Button>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary hover:bg-primary/10">
                <ShoppingBag className="w-7" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </Button>
            </Link>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground/70 hover:text-primary hover:bg-primary/10"
                onClick={() => user ? navigate('/dashboard') : handleAuthAction()}
              >
                <User className="w-7" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground/70 hover:text-primary hover:bg-primary/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 py-4 bg-card/95 shadow-lg"
            >
              <div className="flex flex-col space-y-3">
                {[...navItemsBase, {name: "Coming Soon", isDropdown: true}, ...navItemsEnd].map((item) => 
                  item.isDropdown ? (
                    <div key="coming-soon-mobile" className="px-4">
                       <button 
                        onClick={() => setIsComingSoonDropdownOpen(!isComingSoonDropdownOpen)}
                        className="text-foreground/90 hover:text-primary transition-colors duration-200 font-medium text-base py-2.5 rounded-md hover:bg-primary/10 w-full text-left flex justify-between items-center"
                      >
                        Coming Soon <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isComingSoonDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                      {isComingSoonDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 mt-1 space-y-1"
                        >
                          {comingSoonNavProducts.map(product => (
                            <Link key={product.id} to={`/product/${product.id}`} className="block text-foreground/80 hover:text-primary py-1.5 rounded-md hover:bg-primary/5 relative text-sm" onClick={() => {setIsComingSoonDropdownOpen(false); setIsMenuOpen(false);}}>
                              {product.name.replace("Meenora ", "").replace(" SPF 50", "")}
                              <Badge variant="secondary" className="ml-2 text-xs px-1 py-0.5 bg-accent/20 text-accent-foreground border-accent/50">Soon</Badge>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                      </AnimatePresence>
                    </div>
                  ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-foreground/90 hover:text-primary transition-colors duration-200 font-medium text-base px-4 py-2.5 rounded-md hover:bg-primary/10"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (item.onClick) item.onClick();
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    handleAuthAction();
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-3 text-base py-2.5 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {user ? 'Logout' : 'Login'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;