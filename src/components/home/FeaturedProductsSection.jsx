
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { ShoppingCart, Eye, ArrowRight, Heart } from 'lucide-react';
import { useAdminProductContext } from '../../contexts/AdminProductContext';

const FeaturedProductsSection = () => {
  const { addToCart } = useCart();
  const { productData }  =  useAdminProductContext()
  // Find Shampoo and Conditioner specifically
  const shampoo = productData.find(p => p.name.toLowerCase().includes('shampoo') && p.category === 'Hair Care' && !p.comingSoon);
  const conditioner = productData .find(p => p.name.toLowerCase().includes('conditioner') && p.category === 'Hair Care' && !p.comingSoon);
  
  const hairCareEssentials = [shampoo, conditioner].filter(Boolean); // Filter out undefined if not found

  const placeholderImage = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3271a3af-83a5-4b91-a7b1-58d1978fa9d4/ff29976cca7dcad09825798e79b09247.webp";

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been successfully added to your cart.`
    });
  };

  if (hairCareEssentials.length === 0) {
    return (
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-display text-foreground">No Hair Care Essentials Found</h2>
            <p className="text-muted-foreground">Please check your product data.</p>
          </div>
        </section>
    );
  }
//  console.log(productData)
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Hair Care That Works
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Start your journey with our two best-selling essentials: Meenora Super Shampoo – Targets breakage, adds strength and shine, and Meenora Super Conditioner – Deeply nourishes and smoothens dry hair. Formulated with powerful plant-based ingredients and dermatologically tested, our hair care line is gentle enough for daily use yet effective enough for visible results.
          </p>
        </motion.div>

        <div className="product-grid">
          {hairCareEssentials.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <Card className="card-hover bg-card shadow-lg hover:shadow-primary/20 overflow-hidden group flex flex-col h-full">
                <div className="relative">
                  <Link to={`/product/${product.id}`} className="block">
                    <img 
                      src={product.image ? product.image : placeholderImage}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      alt={product.name + " - Meenora hair care essential"}
                     />
                  </Link>
                   <div className="absolute top-4 right-4">
                     <Button variant="outline" size="icon" className="bg-card/80 hover:bg-card border-border text-secondary hover:text-primary backdrop-blur-sm" onClick={() => toast({ description: "🚧 Wishlist feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>
                        <Heart className="h-5 w-5" />
                      </Button>
                   </div>
                  {product.tags?.includes("Bestseller") && (
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 text-xs shadow-md font-semibold tracking-wide">
                        Bestseller
                      </Badge>
                    )}
                </div>
                <CardContent className="p-6 flex flex-col flex-grow space-y-3">
                  <h3 className="text-xl font-display text-foreground group-hover:text-primary transition-colors" title={product.name}>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 h-10 flex-grow">{product.description}</p>
                  <div className="flex items-center justify-between pt-2 mt-auto">
                    <span className="text-2xl font-display font-semibold text-primary">₹{product.price.toFixed(2)}</span>
                    <Button 
                      size="default" 
                      className="btn-primary group/btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:animate-pulse" />
                      Add to Cart
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
          asChild
          variant="outline"
          size="lg"
          className="text-primary border-primary hover:bg-primary hover:text-white text-base"
        >
            <Link to="/shop">
              View All Products
              <Eye className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
