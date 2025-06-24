
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Zap, Users, ArrowRight } from 'lucide-react'; // Changed Sparkles to relevant icons
import { Button } from '@/components/ui/button';

const CtaSection = () => {
  const mindsetPoints = [
    { icon: Heart, text: "Daily self-care isn’t an indulgence — it’s a discipline" },
    { icon: Zap, text: "Clean products don’t have to be boring" },
    { icon: Users, text: "Confidence is the best glow-up" },
    { icon: Heart, text: "When you respect your body, your mind follows" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-r from-primary via-secondary to-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-background mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-background/90 max-w-3xl mx-auto leading-relaxed">
              To transform self-care from a task to a sacred daily ritual that nurtures your body, mind, and confidence. We envision a world where wellness isn’t limited by price, complexity, or toxicity — but led by simplicity, transparency, and trust.
            </p>
          </div>

          <div className="pt-8">
            <h3 className="text-3xl lg:text-4xl font-display font-semibold text-background mb-8">
              The Meenora Mindset
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {mindsetPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-background/10 rounded-lg text-left">
                  <point.icon className="h-6 w-6 text-background/90 mt-1 flex-shrink-0" />
                  <p className="text-background/90 text-lg">{point.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/about">
              <Button
                size="lg"
                variant="secondary"
                className="bg-background text-primary hover:bg-background/90 text-lg py-4 px-10 shadow-2xl transform hover:scale-105 transition-transform duration-300 group w-full sm:w-auto"
              >
                Read Our Story
                <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/shop"> 
              <Button
                variant="outline"
                size="lg"
                className="border-background/50 text-background bg-background/10 hover:text-primary hover:bg-background  text-lg py-4 px-10 w-full sm:w-auto"
              >
                Join the Meenora Movement
                <Users className="ml-2.5 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
