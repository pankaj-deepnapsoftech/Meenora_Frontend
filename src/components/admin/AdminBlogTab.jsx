
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


const AdminBlogTab = () => {

  const { blogData, postBlogData, UpdatedBlogData } = useAdminBlogContext()
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editTable,setEditTable] = useState(null)



  const formik = useFormik({
    initialValues: editTable ||{
      title:'',
      slug:'',
      author: '',
      category: '',
      tags:'',
      excerpt:'',
      content:'',
      status: '',
      featuredImage: '',
    },
    enableReinitialize:true,
    onSubmit: (values) =>{
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
     if(editTable){
       UpdatedBlogData(values._id,values)
     }else{
       postBlogData(values)
     }
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, featuredImage: reader.result })); 
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setFormData(prev => ({ ...prev, featuredImage: editingPost?.featuredImage || '' }));
    }
  };


  const openAddModal = () => {
    // setEditingPost(null);
    // setFormData({ title: '', slug: '', author: 'Admin', category: 'General', tags: '', excerpt: '', content: '', status: 'draft', featuredImage: '' });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    // setEditingPost(post);
    // setFormData({ ...post, tags: post.tags.join(', ') });
    setImagePreview(post.featuredImage || null);
    setIsModalOpen(true);
  };
  



  return (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              {post.featuredImage && (
                <img src={post.featuredImage} alt={post.title} className="rounded-t-lg object-cover h-48 w-full" />
              )}
              {!post.featuredImage && (
                 <div className="rounded-t-lg h-48 w-full bg-muted flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                 </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="text-xs">
                  By {post.author} on {new Date(post.date).toLocaleDateString()} | Category: {post.category}
                </CardDescription>
                <Badge variant={post.status === 'published' ? 'default' : 'secondary'} className="w-fit mt-1 capitalize">
                  {post.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                <div className="mt-2 space-x-1">
                  {post.tags.slice(0,3).map(tag => <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={() => toast({ title: "View Post", description:"🚧 This feature isn't implemented yet. 🚀"})}>
                  <Eye className="mr-1 h-4 w-4" /> View
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEditModal(post)}>
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)}>
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
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
              <Label htmlFor="featuredImageUpload">Featured Image</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-sky-500 border-dashed rounded-md">
                <div className="space-y-3 text-center">
                  <div className="relative w-full flex justify-center">
                    {formik.values.featuredImage && typeof formik.values.featuredImage === 'string' ? (
                      <img
                        src={formik.values.featuredImage}
                        alt="Featured preview"
                        className="h-40 w-full max-w-xs object-contain rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 w-full max-w-xs rounded-lg border-2 border-dashed border-sky-400 bg-gray-100 text-gray-500">
                        <UploadCloud className="h-8 w-8 mb-2" />
                        <p className="text-sm font-medium">Click or drag to upload an image</p>
                        <p className="text-xs text-gray-400">(Max size: 5MB, JPG/PNG)</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center items-center text-sm text-muted-foreground space-x-1">
                    <label
                      htmlFor="featuredImageUpload"
                      className="relative cursor-pointer rounded-md bg-background px-3 py-1.5 font-medium text-primary ring-offset-background transition hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                    >
                      <span>Upload a file</span>
                      <input
                        id="featuredImageUpload"
                        name="featuredImageUpload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.currentTarget.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              formik.setFieldValue('featuredImage', reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <span>or drag and drop</span>
                  </div>

                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF — max size 10MB</p>
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
    </motion.div>
  );
};

export default AdminBlogTab;
