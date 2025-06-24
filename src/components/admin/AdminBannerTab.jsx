
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImagePlus, Edit3, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AdminBannerTab = () => {
  // Mock data for banners
  const banners = [
    { id: 1, name: 'Homepage Hero Banner', imageUrl: 'https://storage.googleapis.com/hostinger-horizons-assets-prod/3271a3af-83a5-4b91-a7b1-58d1978fa9d4/fc0aadef6556030140ba44161c44ce87.webp', active: true, page: 'Home' },
    { id: 2, name: 'Summer Sale Banner', imageUrl: 'https://images.unsplash.com/photo-1551218394-0a1552d79353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', active: false, page: 'Shop' },
  ];

  const handleAction = (action, bannerName) => {
    toast({
      title: `Banner Action: ${action}`,
      description: `🚧 "${action}" for banner "${bannerName}" isn't implemented yet. You can request this feature! 🚀`,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-1">
            Banner Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage promotional banners for your website.
          </p>
        </div>
        <Button className="btn-primary" onClick={() => handleAction('Add New Banner', '')}>
          <ImagePlus className="mr-2 h-5 w-5" /> Add New Banner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <Card key={banner.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <img src={banner.imageUrl} alt={banner.name} className="rounded-t-lg object-cover h-48 w-full mb-4" />
              <CardTitle className="text-xl">{banner.name}</CardTitle>
              <CardDescription>
                Status: <span className={`font-semibold ${banner.active ? 'text-green-main' : 'text-red-main'}`}>
                  {banner.active ? 'Active' : 'Inactive'}
                </span> | Page: {banner.page}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleAction('Edit', banner.name)}>
                <Edit3 className="mr-1 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleAction('Delete', banner.name)}>
                <Trash2 className="mr-1 h-4 w-4" /> Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
       {banners.length === 0 && (
        <Card>
          <CardContent className="p-10 text-center">
            <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Banners Found</h3>
            <p className="text-muted-foreground mb-4">Start by adding a new banner to promote your products.</p>
            <Button className="btn-primary" onClick={() => handleAction('Add New Banner', '')}>
             Add New Banner
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default AdminBannerTab;
