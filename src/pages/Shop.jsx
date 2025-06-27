import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Filter, Search, Grid, List, X, ShoppingCart, Star, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { useAdminProductContext } from '../contexts/AdminProductContext';

const Shop = () => {
  const { productData } = useAdminProductContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const placeholderImage = "https://storage.googleapis.com/hostinger-horizons-assets-prod/3271a3af-83a5-4b91-a7b1-58d1978fa9d4/ff29976cca7dcad09825798e79b09247.webp";

  // Extract unique categories
  const allCategories = Array.from(
    new Set(productData?.map((p) => p.category).filter(Boolean))
  );

  const preferredCategories = ["Hair Growth", "Hair Damage", "Hair Styling", "Curl Care"];

  const dynamicCategories = Array.from(
    new Set(productData?.map((p) => p.category).filter(Boolean))
  );

  const allDisplayCategories = Array.from(new Set([
    ...preferredCategories,
    ...dynamicCategories
  ]));

  const shopCategories = allDisplayCategories.map((name) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  }));


  const filteredProducts = useMemo(() => {
    let filtered = productData || [];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
        product.concern?.toLowerCase().replace(/\s+/g, '-') === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, productData]);

  const handleAddToCart = (product) => {
    if (!product.inStock) {
      toast({
        title: "Product Not Available",
        description: "This product is coming soon. Stay tuned for updates!",
        variant: "destructive"
      });
      return;
    }

    addToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <>
      <Helmet>
        <title>Shop Our Collection - Natural Beauty Products | Meenora</title>
        <meta name="description" content="Browse Meenora's exclusive collection of natural skincare and hair care products. Filter by category and find your perfect match." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Discover Your Radiance
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Indulge in nature's finest ingredients, meticulously crafted for unparalleled results and a luxurious experience.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Filters Sidebar */}
            <aside className={`lg:w-80 ${showFilters ? 'fixed inset-0 z-40 bg-background/95 backdrop-blur-md p-6 overflow-y-auto lg:static lg:bg-transparent lg:p-0' : 'hidden lg:block'}`}>
              <Card className={`p-6 sticky top-24 bg-card border-border/70 shadow-xl ${showFilters ? 'lg:shadow-none' : ''}`}>
                {showFilters && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                )}
                <div className="space-y-8">
                  {/* Search */}
                  <div>
                    <label htmlFor="search-products" className="text-lg font-display text-foreground mb-3 block">
                      Find Your Product
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="search-products"
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 text-base py-3"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-lg font-display text-foreground mb-3 block">
                      Categories
                    </h3>
                    <div className="space-y-2.5">
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          if (showFilters) setShowFilters(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-base ${selectedCategory === 'all'
                          ? 'bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90'
                          : 'text-muted-foreground hover:bg-primary/10 hover:text-primary font-medium'
                          }`}
                      >
                        All Products
                      </button>
                      {shopCategories.map((category) => (
                        <button
                          key={category.slug}
                          onClick={() => {
                            setSelectedCategory(category.slug);
                            if (showFilters) setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-base ${selectedCategory === category.slug
                            ? 'bg-primary text-primary-foreground font-semibold shadow-md hover:bg-primary/90'
                            : 'text-muted-foreground hover:bg-primary/10 hover:text-primary font-medium'
                            }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>

                  </div>

                  {/* Sort By */}
                  <div>
                    <label htmlFor="sort-by" className="text-lg font-display text-foreground mb-3 block">
                      Sort By
                    </label>
                    <select
                      id="sort-by"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-3 border-border bg-input text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                    </select>
                  </div>
                </div>
              </Card>
            </aside>

            {/* Product List */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-8">

                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden border-primary text-primary hover:bg-primary/10 font-semibold"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </Button>
                  <p className="text-muted-foreground text-sm">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-5 w-5" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* No products */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <Search className="h-20 w-20 text-muted-foreground/40 mx-auto mb-8" />
                  <p className="text-muted-foreground text-2xl font-display mb-2">No treasures found matching your desires.</p>
                  <p className="text-muted-foreground/80 text-lg">Try adjusting your filters or search terms to uncover hidden gems.</p>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6' : 'space-y-6'}>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className={`card-hover bg-card shadow-lg hover:shadow-primary/20 overflow-hidden group flex flex-col h-full ${viewMode === 'list' ? 'sm:flex-row' : ''}`}>
                        <div className={`relative ${viewMode === 'list' ? 'sm:w-60 flex-shrink-0' : ''}`}>
                          <NavLink to={`/products/${product._id}`}>
                            <img
                              src={product.image || placeholderImage}
                              alt={product.name}
                              className={`object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out ${viewMode === 'list' ? 'w-full h-full sm:h-60' : 'w-full h-80'}`}
                            />
                          </NavLink>
                          <div className="absolute top-4 left-4 space-y-2">
                            {product.tags?.includes("Bestseller") && (
                              <Badge className="bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold tracking-wide">Bestseller</Badge>
                            )}
                            {product.status === "comingSoon" && (
                              <Badge className="bg-yellow-500 text-white px-3 py-1 text-xs font-semibold tracking-wide">Coming Soon</Badge>
                            )}
                            {!product.status === "inStock" && !product.status === "comingSoon" && (
                              <Badge variant="destructive" className="px-3 py-1 text-xs font-semibold tracking-wide">Out of Stock</Badge>
                            )}
                          </div>
                          <div className="absolute top-4 right-4">
                            <Button variant="outline" size="icon" className="bg-card/80 border-border backdrop-blur-sm">
                              <Heart className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>

                        <CardContent className={`p-5 flex flex-col flex-grow ${viewMode === 'list' ? 'flex-1 space-y-2' : 'space-y-3'}`}>
                          <h3 className="text-xl font-display text-foreground group-hover:text-primary transition-colors">
                            <NavLink to={`/products/${product._id}`}>{product.name}</NavLink>
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center space-x-1 text-primary">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-current' : 'text-muted-foreground/30'}`} />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">(150+)</span>
                          </div>
                          <div className="  items-center justify-between mt-auto pt-2">
                            <p className="text-2xl  font-display font-semibold text-primary">
                              ₹{product.price?.toFixed(2)}
                            </p>
                            <Button
                              onClick={() => handleAddToCart(product)}
                              disabled={product.status === "comingSoon"}
                              className="btn-primary flex justify-center w-full"
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
