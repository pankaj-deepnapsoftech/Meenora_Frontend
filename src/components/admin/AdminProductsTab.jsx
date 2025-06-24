
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { products as initialProducts, categories } from '@/data/products';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox.jsx';

const AdminProductsTab = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: categories[1]?.name || 'Hair Care', // Default to first actual category
    inStock: true,
    featured: false,
    comingSoon: false,
    ingredients: '',
    benefits: '',
    howToUse: '',
    concern: '',
    tags: ''
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '', description: '', price: '', category: categories[1]?.name || 'Hair Care', 
      inStock: true, featured: false, comingSoon: false, ingredients: '', 
      benefits: '', howToUse: '', concern: '', tags: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      inStock: product.inStock,
      featured: product.featured || false,
      comingSoon: product.comingSoon || false,
      ingredients: product.ingredients?.join(', ') || '',
      benefits: product.benefits?.join(', ') || '',
      howToUse: product.howToUse || '',
      concern: product.concern || '',
      tags: product.tags?.join(', ') || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    // For now, just a toast. In real app, would call API.
    toast({
      title: 'Confirm Deletion',
      description: `Are you sure you want to delete product ID ${productId}? This action cannot be undone.`,
      action: (
        <Button variant="destructive" size="sm" onClick={() => {
          setProducts(prev => prev.filter(p => p.id !== productId));
          toast({ title: 'Product Deleted', description: `Product ID ${productId} has been removed.` });
        }}>
          Yes, Delete
        </Button>
      ),
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      ingredients: formData.ingredients.split(',').map(s => s.trim()).filter(Boolean),
      benefits: formData.benefits.split(',').map(s => s.trim()).filter(Boolean),
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (editingProduct) {
      // Update product
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productData, id: editingProduct.id } : p));
      toast({ title: "Product Updated!", description: `${productData.name} has been updated.` });
    } else {
      // Add new product
      const newProduct = { ...productData, id: Date.now().toString() }; // Simple ID generation
      setProducts(prev => [newProduct, ...prev]);
      toast({ title: "Product Added!", description: `${newProduct.name} has been added.` });
    }
    setIsModalOpen(false);
  };
  
  const productConcerns = [...new Set(initialProducts.map(p => p.concern).filter(Boolean))];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            Products Management
          </h1>
          <p className="text-muted-foreground text-lg">Manage your product catalog efficiently.</p>
        </div>
        <Button className="btn-primary" onClick={openAddModal}>
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products by name, description, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-3 border border-gray-300 text-base"
          />
        </div>
        <Button 
          variant="outline"
          onClick={() => toast({ description: "🚧 Filter feature isn't implemented yet. 🚀" })}
          className="py-3 bg-primary text-background"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filter
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Product</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Category</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Price</th>
                  <th className="text-left p-4 font-semibold text-foreground text-sm">Status</th>
                  <th className="text-center p-4 font-semibold text-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img  
                          className="w-14 h-14 object-contain rounded-md border border-border p-1 bg-white"
                          alt={product.name}
                          src={product.id === 1 ? "https://storage.googleapis.com/hostinger-horizons-assets-prod/3271a3af-83a5-4b91-a7b1-58d1978fa9d4/fc0aadef6556030140ba44161c44ce87.webp" : "https://storage.googleapis.com/hostinger-horizons-assets-prod/3271a3af-83a5-4b91-a7b1-58d1978fa9d4/ff29976cca7dcad09825798e79b09247.webp"} />
                        <div>
                          <h4 className="font-semibold text-foreground text-base">{product.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-1 max-w-xs">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="font-medium">{product.category}</Badge>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-foreground text-base">${product.price.toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={`text-xs font-semibold tracking-wide ${
                        product.inStock 
                          ? 'bg-green-soft text-green-dark border border-green-main/30' 
                          : product.comingSoon 
                            ? 'bg-yellow-soft text-yellow-main border border-yellow-main/30'
                            : 'bg-red-soft text-red-dark border border-red-main/30'
                      }`}>
                        {product.inStock ? 'In Stock' : product.comingSoon ? 'Coming Soon' : 'Out of Stock'}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-muted-foreground hover:text-primary"
                          onClick={() => openEditModal(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive/70 hover:text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
             {filteredProducts.length === 0 && (
                <div className="text-center p-10 text-muted-foreground">
                  <Search className="mx-auto h-10 w-10 mb-2" />
                  No products found matching your search criteria.
                </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? `Update details for ${editingProduct.name}.`
                : 'Fill in the details for the new product.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleFormSubmit} className="grid gap-6 py-4">
            {/* Name & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>

            {/* Category & Concern */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                >
                  {categories
                    .filter((c) => c.id !== 1)
                    .map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <Label htmlFor="concern">Concern (Optional)</Label>
                <select
                  id="concern"
                  name="concern"
                  value={formData.concern}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                >
                  <option value="">None</option>
                  {productConcerns.map((con) => (
                    <option key={con} value={con}>
                      {con}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
              <Input
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                className="w-full border border-gray-300 bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>

            {/* Benefits */}
            <div>
              <Label htmlFor="benefits">Benefits (comma-separated)</Label>
              <Input
                id="benefits"
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                className="w-full border border-gray-300 bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>

            {/* How to Use */}
            <div>
              <Label htmlFor="howToUse">How to Use</Label>
              <Textarea
                id="howToUse"
                name="howToUse"
                value={formData.howToUse}
                onChange={handleInputChange}
                className="w-full border border-gray-300 bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full border border-gray-300 bg-background px-3 py-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { name: 'inStock', checked, type: 'checkbox' },
                    })
                  }
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { name: 'featured', checked, type: 'checkbox' },
                    })
                  }
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="comingSoon"
                  name="comingSoon"
                  checked={formData.comingSoon}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: { name: 'comingSoon', checked, type: 'checkbox' },
                    })
                  }
                />
                <Label htmlFor="comingSoon">Coming Soon</Label>
              </div>
            </div>

            {/* Footer */}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="btn-primary">
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminProductsTab;
