
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

const initialBlogPosts = [
  {
    id: '1',
    title: 'The Ultimate Guide to Glowing Skin',
    slug: 'ultimate-guide-glowing-skin',
    author: 'Dr. Anya Sharma',
    date: '2025-05-20',
    status: 'published',
    category: 'Skincare Tips',
    tags: ['glowing skin', 'skincare routine', 'natural beauty'],
    excerpt: 'Discover the secrets to achieving naturally radiant skin with our expert tips and product recommendations...',
    featuredImage: 'https://images.unsplash.com/photo-1590080919404-1097805994ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    content: 'Full blog content here...', 
  },
  {
    id: '2',
    title: 'Top 5 Ingredients for Healthy Hair',
    slug: 'top-5-ingredients-healthy-hair',
    author: 'Rohan Verma',
    date: '2025-06-10',
    status: 'draft',
    category: 'Hair Care',
    tags: ['hair health', 'natural ingredients', 'hair growth'],
    excerpt: 'Learn about the most effective natural ingredients that can transform your hair health and promote growth...',
    featuredImage: 'https://images.unsplash.com/photo-1567940945034-7a7a2a38f7d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    content: 'Full blog content here...',
  },
];

const AdminBlogTab = () => {
  const [posts, setPosts] = useState(initialBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '', slug: '', author: 'Admin', category: 'General', tags: '', 
    excerpt: '', content: '', status: 'draft', featuredImage: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
    setEditingPost(null);
    setFormData({ title: '', slug: '', author: 'Admin', category: 'General', tags: '', excerpt: '', content: '', status: 'draft', featuredImage: '' });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({ ...post, tags: post.tags.join(', ') });
    setImagePreview(post.featuredImage || null);
    setIsModalOpen(true);
  };
  
  const handleDeletePost = (postId) => {
    toast({
      title: 'Confirm Deletion',
      description: `Are you sure you want to delete this blog post? This action cannot be undone.`,
      action: (
        <Button variant="destructive" size="sm" onClick={() => {
          setPosts(prev => prev.filter(p => p.id !== postId));
          toast({ title: 'Blog Post Deleted', description: `The post has been removed.` });
        }}>
          Yes, Delete
        </Button>
      ),
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
      date: editingPost ? editingPost.date : new Date().toISOString().split('T')[0], 
    };

    if (editingPost) {
      setPosts(prev => prev.map(p => p.id === editingPost.id ? { ...p, ...postData, id: editingPost.id } : p));
      toast({ title: "Blog Post Updated!", description: `"${postData.title}" has been updated.` });
    } else {
      const newPost = { ...postData, id: Date.now().toString() };
      setPosts(prev => [newPost, ...prev]);
      toast({ title: "Blog Post Added!", description: `"${newPost.title}" has been added.` });
    }
    setIsModalOpen(false);
    setImagePreview(null);
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
            <DialogTitle className="text-2xl font-display">{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
            <DialogDescription>
              {editingPost ? `Update details for "${editingPost.title}".` : 'Fill in the details for your new blog post.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-6 py-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} className="border border-gray-300" onChange={handleInputChange} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="slug">Slug (URL-friendly)</Label>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleInputChange} className="border border-gray-300" placeholder="e.g., my-awesome-post" />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" value={formData.author} onChange={handleInputChange} className="border border-gray-300" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={formData.category} onChange={handleInputChange} className="border border-gray-300" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select id="status" name="status" value={formData.status} onChange={handleInputChange} className="w-full input border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" name="tags" value={formData.tags} onChange={handleInputChange} className="border border-gray-300" />
            </div>
            <div>
              <Label htmlFor="featuredImageUpload">Featured Image</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-sky-500 border-dashed rounded-md">
                <div className="space-y-3 text-center">
                  {/* Image Preview */}
                  <div className="relative w-full flex justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Selected image preview"
                        className="h-40 w-full max-w-xs object-contain rounded-lg shadow-md"
                      />
                    ) : formData.featuredImage && typeof formData.featuredImage === 'string' && formData.featuredImage.startsWith('https://') ? (
                      <img
                        src={formData.featuredImage}
                        alt="Current featured image"
                        className="h-40 w-full max-w-xs object-contain rounded-lg border border-sky-300 shadow-md"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 w-full max-w-xs rounded-lg border-2 border-dashed border-sky-400 bg-gray-100 text-gray-500">
                        <UploadCloud className="h-8 w-8 mb-2" />
                        <p className="text-sm font-medium">Click or drag to upload an image</p>
                        <p className="text-xs text-gray-400">(Max size: 5MB, JPG/PNG)</p>
                      </div>
                    )}
                  </div>


                  {/* Upload Controls */}
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
                        onChange={handleImageUpload}
                      />
                    </label>
                    <span>or drag and drop</span>
                  </div>

                  {/* File Guidelines */}
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF — max size 10MB</p>
                </div>

              </div>
            </div>
            <div>
              <Label htmlFor="excerpt">Excerpt (Short summary)</Label>
              <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows={3} className="border border-gray-300" />
            </div>
            <div>
              <Label htmlFor="content">Main Content (Markdown supported)</Label>
              <Textarea id="content" name="content" value={formData.content} onChange={handleInputChange} rows={10} className="border border-gray-300" />
            </div>
            <ModalFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit" className="btn-primary">{editingPost ? 'Save Changes' : 'Create Post'}</Button>
            </ModalFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminBlogTab;
