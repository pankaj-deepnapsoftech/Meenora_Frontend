import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products as allProducts } from '@/data/products'; 
import { Sparkles, Bell } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ComingSoonSection = () => {
  const sunscreen = allProducts.find(p => p.name.toLowerCase().includes('sunscreen') && p.comingSoon);
  const moisturiser = allProducts.find(p => p.name.toLowerCase().includes('moisturiser') && p.comingSoon);
  const faceWash = allProducts.find(p => p.name.toLowerCase().includes('face wash') && p.comingSoon);

  const comingSoonProducts = [sunscreen, moisturiser, faceWash].filter(Boolean);

  if (comingSoonProducts.length === 0) return null;

  return (
    <section id="coming-soon" className="py-20 lg:py-28 bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Coming Soon – Get Excited!
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            We’re always innovating. Be the first to experience our upcoming self-care heroes.
          </p>
        </motion.div>

        <div className="product-grid">
          {comingSoonProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Card className="card-hover bg-card shadow-lg hover:shadow-accent/20 overflow-hidden relative group flex flex-col h-full">
                <div className="relative">
                  <img 
                    className="w-full h-80 object-cover opacity-90 group-hover:opacity-75 transition-opacity duration-500 ease-in-out"
                    alt={product.name + " - Meenora coming soon product bottle"}
                   src="https://images.unsplash.com/photo-1695561115667-c2e975c7cf22" />
                  <Badge className="absolute top-4 left-4 coming-soon-badge px-3 py-1.5 text-xs shadow-md font-semibold tracking-wide">
                    Coming Soon
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6">
                    <div className="text-center">
                      <Sparkles className="h-10 w-10 text-white/80 mx-auto mb-3" />
                      <h3 className="text-2xl font-display text-white mb-2">Launching Soon</h3>
                      <p className="text-sm text-white/90">Be the first to experience the magic!</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow space-y-3">
                  <h3 className="text-xl font-display text-foreground group-hover:text-primary transition-colors" title={product.name}>{product.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 h-10 flex-grow">{product.description}</p>
                   <ul className="text-xs text-muted-foreground space-y-1 pt-1">
                    {product.name.toLowerCase().includes('sunscreen') && <li className="flex items-center"><Sparkles className="h-3 w-3 mr-1.5 text-accent" /> Lightweight, non-sticky, full-spectrum</li>}
                    {product.name.toLowerCase().includes('moisturiser') && <li className="flex items-center"><Sparkles className="h-3 w-3 mr-1.5 text-accent" /> Deep hydration that lasts all day</li>}
                    {product.name.toLowerCase().includes('face wash') && <li className="flex items-center"><Sparkles className="h-3 w-3 mr-1.5 text-accent" /> Clean, calm, and refresh without harsh chemicals</li>}
                  </ul>
                  <div className="flex items-center justify-between pt-2 mt-auto">
                     <span className="text-2xl font-display font-semibold text-primary">${product.price.toFixed(2)}</span>
                    <Button 
                      variant="outline"
                      className="border-accent text-accent hover:bg-accent hover:text-white font-semibold"
                      onClick={() => toast({
                        title: "We'll Notify You!",
                        description: `Thanks! We'll let you know when ${product.name} arrives.`,
                      })}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notify Me
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
          <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button 
            variant="default" 
            size="lg" 
            className="btn-primary"
            onClick={() => toast({
                title: "Stay Tuned!",
                description: `We'll notify you about all upcoming product launches.`,
            })}
          >
            Notify Me When Available
            <Bell className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoonSection;