
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label.jsx';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Search, Eye, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter as ModalFooter,
  DialogClose,
} from '@/components/ui/dialog.jsx';
import { useAdminBlogContext } from '../../contexts/AdminBlogContext';
import { useFormik } from 'formik';
import LoaderPage from '../../Loader/Loader';
import Pagination from '../../pages/Pagination';


const AdminBlogTab = () => {

  const { blogData, postBlogData, UpdatedBlogData, DeleteBlogData, loading,page,setPage } = useAdminBlogContext()
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editTable, setEditTable] = useState(null)
  const [imageFile, setImageFile] = useState(null);



  const formik = useFormik({
    initialValues: editTable ? {
      ...editTable,
      tags: editTable.tags?.join(', ') || '', 
    } : {
      title: '',
      slug: '',
      author: '',
      category: '',
      tags: '',
      excerpt: '',
      content: '',
      status: '',
      featuredImage: '',
    },
    
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('slug', values.slug);
      formData.append('author', values.author);
      formData.append('category', values.category);
      formData.append('excerpt', values.excerpt);
      formData.append('content', values.content);
      formData.append('status', values.status);
      formData.append('tags', JSON.stringify(values.tags.split(',').map(tag => tag.trim())));

      if (imageFile) {
        formData.append('featuredImage', imageFile); // This matches `req.file`
      }

      if (editTable) {
        UpdatedBlogData(editTable._id, formData);
      } else {
        postBlogData(formData);
      }

      setIsModalOpen(false);
      formik.resetForm();
      setImageFile(null);
      setEditTable(null);
    }
    
  })

  // { type: String, enum: ['draft', 'published'], default: 'published' },

  const filteredPosts = blogData?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  

  const openAddModal = () => {
    setEditTable(null); 
    setImagePreview(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (post) => {
    setEditTable(post); 
    setImagePreview(post.featuredImage || null);
    setIsModalOpen(true);
  };
  
 const handleDelete = (_id)=>{
   DeleteBlogData(_id)
 }


  return (
   <>
   {
        loading ? <LoaderPage /> : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-1">Blog Management</h1>
                <p className="text-muted-foreground text-lg">Create, edit, and manage your blog posts.</p>
              </div>
              <Button className="btn-primary" onClick={openAddModal}>
                <PlusCircle className="mr-2 h-5 w-5" /> Create New Post
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search posts by title, tag, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 text-base border border-gray-300"
                />
              </div>
              <Button variant="outline" onClick={() => toast({ description: "🚧 Filter feature isn't implemented yet. 🚀" })} className="py-3 bg-primary text-background">
                Filter Posts
              </Button>
            </div>

            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="p-10 text-center">
                  <Edit className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Blog Posts Yet</h3>
                  <p className="text-muted-foreground mb-4">Start by creating your first blog post to engage your audience.</p>
                  <Button className="btn-primary" onClick={openAddModal}>
                    Create New Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
                <div className="overflow-x-auto">
                  <table className=" divide-y divide-gray-200 rounded-lg shadow overflow-auto whitespace-nowrap">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Image</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Author</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Tags</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPosts.map(post => (
                        <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                          <td className="px-2 w-full py-3">
                            {post.featuredImage ? (
                              <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-24 h-14 object-cover  rounded"
                              />
                            ) : (
                              <div className="w-16 h-16 flex items-center justify-center bg-muted rounded">
                                <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium line-clamp-2">{post.title}</td>
                          <td className="px-4 py-3 text-sm">{post.author}</td>
                          <td className="px-4 py-3 text-sm">{new Date(post.dateAdded).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-sm capitalize">{post.category}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                              {post.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap  text-sm space-x-1">
                            {post.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs ">{tag}</Badge>
                            ))}
                          </td>
                          <td className="px-4 py-3 flex w-full text-sm text-right space-x-2">

                            <Button variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-primary" onClick={() => openEditModal(post)}>
                              <Edit className="h-4 w-4 mr-1" />
                            </Button>
                            <Button variant="ghost"
                              size="icon"
                              className="text-destructive/70 hover:text-destructive" onClick={() => handleDelete(post._id)}>
                              <Trash2 className="h-5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

            )}

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display">{editTable ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
                  <DialogDescription>
                    {editTable ? `Update details for "${editTable.title}".` : 'Fill in the details for your new blog post.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="grid gap-6 py-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      className="border border-gray-300"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="slug">Slug (URL-friendly)</Label>
                      <Input
                        id="slug"
                        name="slug"
                        value={formik.values.slug}
                        onChange={formik.handleChange}
                        className="border border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        name="author"
                        value={formik.values.author}
                        onChange={formik.handleChange}
                        className="border border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        className="border border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        className="w-full input border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
                      >
                        <option value="">Select status</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formik.values.tags}
                      onChange={formik.handleChange}
                      className="border border-gray-300"
                    />
                  </div>
                  {/* Featured Image Upload */}
                  <div>
                    <label htmlFor="featuredImageUpload" className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image
                    </label>

                    <div className="flex justify-center rounded-lg border-2 border-dashed border-sky-500 bg-white px-6 pt-5 pb-6">
                      <div className="space-y-4 text-center">

                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Featured Preview"
                            className="h-40 w-full max-w-xs object-contain rounded-md shadow-lg mx-auto"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-40 w-full max-w-xs rounded-md border-2 border-dashed border-sky-300 bg-gray-50 text-gray-500 mx-auto">
                            <UploadCloud className="h-8 w-8 mb-2 text-sky-500" />
                            <p className="text-sm font-medium">Click or drag to upload</p>
                            <p className="text-xs text-gray-400">JPG, PNG, GIF — Max 10MB</p>
                          </div>
                        )}

                        <div className="flex justify-center items-center text-sm text-gray-600 space-x-2">
                          <label
                            htmlFor="featuredImageUpload"
                            className="relative cursor-pointer rounded-md bg-sky-50 px-4 py-2 font-medium text-sky-600 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500"
                          >
                            <span>Upload File</span>
                            <input
                              id="featuredImageUpload"
                              name="featuredImageUpload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageUpload}
                            />
                          </label>
                          <span className="text-gray-400">or drag and drop</span>
                        </div>

                        <p className="text-xs text-gray-400">Recommended dimensions: 1200×628px</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Excerpt (Short summary)</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      value={formik.values.excerpt}
                      onChange={formik.handleChange}
                      rows={3}
                      className="border border-gray-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Main Content (Markdown supported)</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      rows={10}
                      className="border border-gray-300"
                    />
                  </div>

                  <ModalFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="btn-primary">{editTable ? 'Save Changes' : 'Create Post'}</Button>
                  </ModalFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Pagination page={page} setPage={setPage} hasNextPage={blogData.length === 10}/>
          </motion.div>
    )
   }
   </>
  );
};

export default AdminBlogTab;
