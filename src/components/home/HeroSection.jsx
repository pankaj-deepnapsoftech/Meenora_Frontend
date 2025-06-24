
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const heroImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3271a3af-83a5-4b91-a7b1-58d1978fa9d4/fc0aadef6556030140ba44161c44ce87.webp";

  return (
    <section className="bg-gradient-to-br from-background via-primary/5 to-background min-h-[calc(100vh-80px)] flex items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-accent/10 via-transparent to-transparent filter blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y:20 }}
              animate={{ opacity: 1, y:0 }}
              transition={{ duration:0.8, delay: 0.1}}
              className="text-primary font-semibold tracking-wider uppercase text-sm"
            >
              Meenora Professional
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground leading-tight tracking-tight"
            >
              Because Self-Care Should Be 
              <span className="block gradient-text mt-2 lg:mt-3">Simple, Clean, and Empowering.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Discover sulfate-free, cruelty-free, and vegan personal care that works with your body — not against it. Our expert-crafted formulations combine natural ingredients with science-backed research to bring out your healthiest self — one drop, one wash, one routine at a time.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/shop">
                <Button size="lg" className="btn-primary text-base py-3.5 px-8 group w-full sm:w-auto shadow-lg">
                  Shop Now
                  <ShoppingBag className="ml-2.5 h-5 w-5 group-hover:animate-pulse" />
                </Button>
              </Link>
              <Link to="/shop#coming-soon"> {/* This assumes you have an ID "coming-soon" on the ComingSoonSection */}
                <Button variant="outline" size="lg" className="text-base py-3.5 px-8 border-secondary text-secondary hover:bg-secondary hover:text-white w-full sm:w-auto shadow-sm">
                  Explore Coming Soon
                  <Sparkles className="ml-2.5 h-5 w-5 group-hover:animate-ping transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
            className="relative group flex justify-center"
          >
            <div className="relative z-10 p-3 bg-card/50 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full">
              <img 
                src={heroImageUrl}
                className="w-full h-auto rounded-xl object-contain aspect-[1/1]"
                alt="Meenora Professional Shampoo bottle displayed elegantly"
              />
            </div>
            <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-slow"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
