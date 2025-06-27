import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, MessageCircle, Instagram as Pinterest, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest updates and exclusive offers."
    });
    e.target.reset();
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/meenoraindia/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@MeenoraIndia', label: 'YouTube' },
    { icon: Facebook, href: 'https://www.facebook.com/meenoraindia', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/MIndia430', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', placeholder: true },
    { icon: MessageCircle, href: '#', label: 'WhatsApp', placeholder: true }, 
    { icon: Pinterest, href: '#', label: 'Pinterest', placeholder: true }
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Return and Refound', path: '#' },
    { name: 'Privacy Policy', path: '#' }, 
    { name: 'Terms of Service', path: '#' } 
  ];

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-6">
            {/* Logo */}
            <Link to="/" className="block w-fit">
              <img
                src="/Logo/Company_logo2.png"
                alt="Company Logo"
                className="w-36 h-auto  object-contain"
              />
            </Link>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium beauty & skincare products crafted with love and natural ingredients for your radiant skin.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.placeholder ? "_self" : "_blank"}
                  rel={!social.placeholder ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary/20 transition-all duration-200"
                  onClick={(e) => {
                    if (social.placeholder) {
                      e.preventDefault();
                      toast({
                        description: `🚧 ${social.label} link isn't set up yet—but don't worry! You can request it in your next prompt! 🚀`,
                      });
                    }
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <span className="text-lg font-semibold text-foreground">Quick Links</span>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    onClick={(e) => {
                      if (link.path === '#') {
                        e.preventDefault();
                        toast({ description: "🚧 This page isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" });
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <span className="text-lg font-semibold text-foreground">Contact Info</span>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>123 Beauty Street, Skincare City, SC 12345, USA</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-primary">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:hello@meenora.com" className="hover:text-primary">hello@meenora.com</a>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <span className="text-lg font-semibold text-foreground">Newsletter</span>
            <p className="text-muted-foreground text-sm">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex items-center space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full text-sm flex-1"
                required
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="btn-primary px-4 py-2">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 lg:mt-16 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Meenora. All rights reserved. Crafted with <span className="text-primary">❤️</span> for luminous skin.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;