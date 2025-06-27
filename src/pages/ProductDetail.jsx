
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Heart, Share2, Star, ShieldCheck, CheckCircle, XCircle, ChevronUp, ChevronDown, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { getProductById, products as allProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { useAdminProductContext } from '../contexts/AdminProductContext';

const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border-b border-border/70">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-5 px-1 text-left text-xl font-display text-foreground hover:bg-primary/5 transition-colors duration-200"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-5 px-1 text-muted-foreground prose-sm max-w-none leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetail = () => {

  
  const { id } = useParams();
  const { GetProductById, productData } = useAdminProductContext();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await GetProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, GetProductById]);

  const [openAccordion, setOpenAccordion] = useState('benefits');
  const { addToCart } = useCart();
  const placeholderImage = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3271a3af-83a5-4b91-a7b1-58d1978fa9d4/ff29976cca7dcad09825798e79b09247.webp";


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center space-y-4">
          <XCircle className="h-16 w-16 text-destructive mx-auto" />
          <h1 className="text-3xl font-display font-bold text-foreground">Product Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, the product you are looking for does not exist or may have been removed.
          </p>
          <Button onClick={() => navigate('/shop')} className="btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }
  
  const handleAccordionToggle = (accordionId) => {
    setOpenAccordion(openAccordion === accordionId ? null : accordionId);
  };

  const handleAddToCart = () => {
    if (!product.status === "inStock") {
      toast({
        title: "Product Not Available",
        description: `${product.name} is coming soon. We'll notify you!`,
        variant: "destructive",
      });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} has been successfully added to your cart.`,
      action: <Button variant="outline" size="sm" onClick={() => navigate('/cart')}>View Cart</Button>
    });
  };

  const handleWishlist = () => {
    toast({ description: "🚧 Wishlist feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" });
  };
  const handleShare = () => {
    toast({ description: "🚧 Share feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" });
  };

  const relatedProducts = productData.filter(p => p.category === product.category && p._id !== product._id).slice(0, 3);
  
  const currentProductImage =
    product.image && product.image !== ""
      ? product.image
      : "https://storage.googleapis.com/hostinger-horizons-assets-prod/3271a3af-83a5-4b91-a7b1-58d1978fa9d4/fc0aadef6556030140ba44161c44ce87.webp";



  console.log(currentProductImage)
  return (
    <>
      <Helmet>
        <title>{`${product.name} - ${product.category} | Meenora`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/shop" className="inline-flex items-center text-primary hover:text-primary/85 transition-colors font-semibold group text-base">
              <ArrowLeft className="h-5 w-5 mr-2.5 group-hover:-translate-x-1 transition-transform" />
              Back to Collection
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="bg-card p-4 rounded-xl shadow-2xl border border-border/60">
                <img   
                  src={currentProductImage}
                  className="w-full h-auto aspect-square object-contain rounded-lg" 
                  alt={`High-quality studio shot of ${product.name}`}
                />
              </div>
              <div className="absolute top-6 left-6 space-x-2">
                {product.tags?.map(tag => (
                  <Badge key={tag} variant={tag === "Coming Soon" ? "secondary" : "default"} className="shadow-md text-sm py-1.5 px-3.5 font-semibold tracking-wide">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay:0.1, ease: "easeOut" }}
              className="space-y-7"
            >
              <div className="space-y-3.5">
                <p className="text-base font-semibold text-primary tracking-wider uppercase">{product.category}</p>
                <h1 className="text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">{product.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
                <div className="flex items-center space-x-2 pt-1.5">
                  <div className="flex items-center text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-current' : 'text-muted-foreground/30'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(150+ Reviews)</span>
                </div>
              </div>
              
              <p className="text-5xl font-display font-semibold text-primary">${product.price}</p>

              {product.status === "inStock" ? (
                <div className="space-y-6 pt-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-base font-semibold text-foreground">Quantity:</span>
                    <div className="flex items-center border border-border rounded-lg overflow-hidden shadow-sm">
                      <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-11 w-11 rounded-none border-r border-border hover:bg-primary/10">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-7 text-lg font-semibold text-foreground">{quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-11 w-11 rounded-none border-l border-border hover:bg-primary/10">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddToCart} // ✅ Add this line
                    size="lg"
                    className="w-full btn-primary text-lg py-4 shadow-lg hover:shadow-primary/30 flex items-center group/cartbtn"
                  >
                    <ShoppingBag className="h-5 w-5 mr-3 group-hover/cartbtn:animate-pulse" />
                    Add to Cart
                  </Button>

                </div>
              ) : (
                <Button size="lg" variant="outline" disabled className="w-full text-lg py-4 cursor-not-allowed">
                  {product.status === "comingSoon" ? "Notify Me When Available" : "Out of Stock"}
                </Button>
              )}

              <div className="flex items-center space-x-4 pt-3">
                <Button variant="outline" onClick={handleWishlist} className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary flex-1 text-base py-3 font-semibold">
                  <Heart className="h-5 w-5 mr-2.5" /> Add to Wishlist
                </Button>
                <Button variant="outline" onClick={handleShare} className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary flex-1 text-base py-3 font-semibold">
                  <Share2 className="h-5 w-5 mr-2.5" /> Share
                </Button>
              </div>
               <div className="flex items-center text-sm text-green-main pt-2">
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  <span>Secure Transaction & Quality Assured Products</span>
                </div>

              <div className="space-y-1.5 pt-5">
                <AccordionItem title="Key Benefits" isOpen={openAccordion === 'benefits'} onToggle={() => handleAccordionToggle('benefits')}>
                  <ul className="list-none space-y-2.5 pl-1">
                    {product.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-main mr-3 flex-shrink-0 mt-1" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
                <AccordionItem title="Full Ingredients" isOpen={openAccordion === 'ingredients'} onToggle={() => handleAccordionToggle('ingredients')}>
                  <p>{product.ingredients?.join(', ')}.</p>
                  <p className="mt-2.5 text-xs italic">*Our commitment to transparency ensures you know exactly what's in your product. Free from parabens, sulfates, and harmful chemicals.</p>
                </AccordionItem>
                <AccordionItem title="How to Use" isOpen={openAccordion === 'usage'} onToggle={() => handleAccordionToggle('usage')}>
                  <p>{product.howToUse}</p>
                </AccordionItem>
                 <AccordionItem title="Shipping & Returns" isOpen={openAccordion === 'shipping'} onToggle={() => handleAccordionToggle('shipping')}>
                  <p>We offer complimentary standard shipping on orders over $75. Expedited options available. Not delighted? We provide a 30-day return policy for unopened products. See our FAQs for details.</p>
                </AccordionItem>
              </div>
            </motion.div>
          </div>

          {relatedProducts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y:40 }}
              animate={{ opacity: 1, y:0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="mt-24 lg:mt-32"
            >
              <h2 className="text-4xl font-display font-bold text-foreground mb-12 text-center">
                You Might Also Adore
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct._id} className="card-hover bg-card overflow-hidden group">
                    <Link to={`/product/${relatedProduct.id}`} className="block">
                      <div className="relative h-80 bg-muted/40">
                        <img   
                          src={relatedProduct._id === 1 ? "https://storage.googleapis.com/hostinger-horizons-assets-prod/3271a3af-83a5-4b91-a7b1-58d1978fa9d4/fc0aadef6556030140ba44161c44ce87.webp" : placeholderImage}
                          className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105 p-5" 
                          alt={relatedProduct.name}
                           />
                      </div>
                      <CardContent className="p-6 space-y-2.5">
                        <h3 className="text-xl font-display text-foreground truncate group-hover:text-primary transition-colors">{relatedProduct.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 h-10">{relatedProduct.description}</p>
                        <div className="flex justify-between items-center pt-2.5">
                          <span className="text-2xl font-display font-semibold text-primary">${relatedProduct.price.toFixed(2)}</span>
                          <Button variant="outline" size="default" className="border-primary text-primary hover:bg-primary/10 font-semibold">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
// import React from 'react'
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { useAdminProductContext } from '../contexts/AdminProductContext';

// const ProductDetail = () => {


//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <p>{product.description}</p>
//       {/* Add more fields as needed */}
//     </div>
//   );
// };

// export default ProductDetail;
