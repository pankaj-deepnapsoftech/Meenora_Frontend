import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx';
import { useAdminProductContext } from '../../contexts/AdminProductContext';
import { useFormik } from 'formik';
import { productValidationSchema } from '../../Validations/ProductValidations';
import LoaderPage from '../../Loader/Loader';
import Pagination from '../../pages/Pagination';

const AdminProductsTab = () => {
  const { productData, PostProductData, DeleteProduct, UpdatedProduct, loading,page,setPage } = useAdminProductContext()
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [edittable, setEdittable] = useState(null)
  const [currIMg, setCuurIMg] = useState(null)
  const filteredProducts = productData?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const formik = useFormik({
    initialValues: edittable || {
      name: '',
      description: '',
      price: '',
      category: '',
      status: '',
      image: '',
      ingredients: '',
      benefits: '',
      howToUse: '',
      concern: '',
      tags: '',
    },
    enableReinitialize: true,
    validationSchema: productValidationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }

      try {
        if (edittable) {
          UpdatedProduct(values._id, formData)
          setIsModalOpen(false)
        } else {
          PostProductData(formData)
          setIsModalOpen(false)
        }
        formik.resetForm()
      } catch (err) {
        console.error('Error uploading product:', err);
      }
    }

  })


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue('image', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleDeleteProduct = (_id) => {
    DeleteProduct(_id)
  };

  // console.log(productData)

  useEffect(() => {
    if (edittable && edittable.image) {
      setImagePreview(edittable.image);
    } else {
      setImagePreview(null);
    }
  }, [edittable]);

  return (
  <>
  {
    loading ? <LoaderPage/> : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground mb-1">
                  Products Management
                </h1>
                <p className="text-muted-foreground text-lg">Manage your product catalog efficiently.</p>
              </div>
              <Button className="btn-primary" onClick={() => { setIsModalOpen(true); setEdittable(null) }}>
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
                        <th className="text-left p-4 font-semibold text-foreground text-sm">Date Added</th>
                        <th className="text-center p-4 font-semibold text-foreground text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product._id} className="border-b whitespace-nowrap border-border hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img
                                className="w-14 h-14 object-contain rounded-md border border-border p-1 bg-white"
                                alt={product.name}
                                src={product.image} />
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
                            <span className="font-semibold text-foreground text-base">
                              ₹{product.price}
                            </span>
                          </td>

                          <td className="p-4">
                            <Badge className={`text-xs font-semibold  tracking-wide ${product.status === "inStock"
                              ? 'bg-green-soft hover:bg-green-soft text-green-dark border border-green-main/30'
                              : product.status === "comingSoon"
                                ? 'bg-yellow-soft hover:bg-yellow-soft  text-yellow-main border border-yellow-main/30'
                                : 'bg-red-soft hover:bg-red-soft text-red-dark border border-red-main/30'
                              }`}>
                              {product.status.charAt(0).toUpperCase() + product.status.slice(1).toLowerCase()}

                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-foreground text-base">
                              {new Date(product.dateAdded).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-primary"
                                onClick={() => { setIsModalOpen(true); setEdittable(product); }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive/70 hover:text-destructive"
                                onClick={() => handleDeleteProduct(product._id)}
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
              <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold font-display text-gray-800 mb-2">
                    {edittable ? "Update Product" : "Add New Product"}
                  </DialogTitle>
                  <p className="text-gray-500 text-sm">Fill in the product details below to list a new item.</p>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="mt-6 space-y-10">
                  {/* Section: Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Aloe Vera Face Gel"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        name="category"
                        placeholder="e.g. Skincare"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {formik.touched.category && formik.errors.category && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.category}</p>
                      )}
                    </div>
                  </div>

                  {/* Section: Pricing & Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      {formik.touched.price && formik.errors.price && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.price}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="inStock">In Stock</option>
                        <option value="featured">Featured Product</option>
                        <option value="comingSoon">Coming Soon</option>
                      </select>
                      {formik.touched.status && formik.errors.status && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.status}</p>
                      )}
                    </div>
                  </div>

                  {/* Section: Product Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      rows="3"
                    />
                    {formik.touched.description && formik.errors.description && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
                    )}
                  </div>

                  {/* Section: Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-sm file:py-2 file:px-4 file:border-0 file:rounded-lg file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-4 w-40 h-40 object-cover rounded-lg border shadow-sm"
                      />
                    )}
                    {formik.touched.image && formik.errors.image && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.image}</p>
                    )}
                  </div>

                  {/* Section: Ingredients, Benefits, How to Use */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                      <textarea
                        name="ingredients"
                        value={formik.values.ingredients}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                      <textarea
                        name="benefits"
                        value={formik.values.benefits}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">How to Use</label>
                      <textarea
                        name="howToUse"
                        value={formik.values.howToUse}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="2"
                      />
                    </div>
                  </div>

                  {/* Section: Concern & Tags */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Concern</label>
                      <input
                        type="text"
                        name="concern"
                        value={formik.values.concern}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                      <input
                        type="text"
                        name="tags"
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="e.g. organic, vegan, dry skin"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                      {edittable ? "Update Product" : "Submit Product"}
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Pagination page={page} setPage={setPage} hasNextPage={productData?.length === 10} />
          </div>
    )
  }
  </>  
  );
};

export default AdminProductsTab;
