
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImagePlus, Edit3, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAdminBannerContext } from '../../contexts/AdminBannerContext';
import {  useFormik } from 'formik';


const AdminBannerTab = () => {
  const { PostBannerData, BannerData, DeleteBannerData, UpdatedBannerData } = useAdminBannerContext();
  const [showModal, setShowModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
 const [editTable,setEdittable] = useState(null)
  const formik = useFormik({
    initialValues:editTable || {
      heading: '',
      description: '',
      page: '',
      status: 'active',
      image: '',
    },
    // validationSchema: Yup.object({
    //   heading: Yup.string().required('Heading is required'),
    //   description: Yup.string(),
    //   page: Yup.string()
    //     .oneOf(['home', 'shop', 'about'], 'Invalid page')
    //     .required('Page is required'),
    //   status: Yup.string()
    //     .oneOf(['active', 'inactive'], 'Invalid status')
    //     .required('Status is required'),
    //   image: Yup.string().required('Image URL is required'),
    // }),
    enableReinitialize:true,
    onSubmit: (values) => {
       const formData = new FormData();
       for(let key in values){
        formData.append(key,values[key])
       }
      if(editTable){
        UpdatedBannerData(editTable._id,formData)
      }else{
        PostBannerData(formData)
      }
      setShowModal(false)
    },
  });

 const handleDelete = (_id) =>{
  console.log(_id)
   DeleteBannerData(_id)
 }

  useEffect(() => {
    if (editTable && editTable.image) {
      setImagePreview(editTable.image);
    } else {
      setImagePreview(null);
    }
  }, [editTable]);

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
        <Button className="btn-primary" onClick={() =>{ setShowModal(true); setEdittable(null)}}>
          <ImagePlus className="mr-2 h-5 w-5" /> Add New Banner
        </Button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md whitespace-nowrap rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Heading</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Page</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date Added</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {BannerData?.map((banner) => (
              <tr key={banner.id} className="hover:bg-gray-50 transition">
                {/* Image */}
                <td className="px-6 py-4">
                  <img
                    src={banner.image}
                    alt={banner.heading}
                    className="h-16 w-20 object-contain rounded-md border"
                  />
                </td>

                {/* Heading */}
                <td className="px-6 py-4 text-gray-800 font-medium">{banner.heading}</td>

                {/* Page */}
                <td className="px-6 py-4 text-gray-600 capitalize">{banner.page}</td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${banner.status === "active" ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {banner.status === "active" ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 capitalize">{new Date(banner.updatedAt).toLocaleDateString()}</td>

              
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => {setShowModal(true);setEdittable(banner)}}
                    className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    <Edit3 className="h-4 w-4 mr-1" /> 
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)} 
                    className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {BannerData?.length === 0 && (
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




      <div className={`fixed right-0 -top-8 z-50 h-full md:w-1/2 max-[800px]:w-[80vw] bg-white shadow-2xl rounded-l-lg p-6 overflow-y-auto transition-transform duration-500 ease-in-out transform ${showModal ? 'translate-x-0' : 'translate-x-full'}`}>

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Banner</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Heading</label>
            <input
              type="text"
              name="heading"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.heading}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.heading && formik.errors.heading && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.heading}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Page */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Page</label>
            <select
              name="page"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.page}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Page</option>
              <option value="home">Home</option>
              <option value="shop">Shop</option>
              <option value="about">About</option>
            </select>
            {formik.touched.page && formik.errors.page && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.page}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select
              name="status"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.status}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>

            {/* File Input */}
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition">
                Choose Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(e) => { 
                    const file = e.currentTarget.files[0];
                    if (file) {
                      formik.setFieldValue("image", file);
                      const previewURL = URL.createObjectURL(file);
                      setImagePreview(previewURL);
                    }
                  }}
                  className="hidden"
                />
              </label>

              {formik.values.image && typeof formik.values.image === 'object' && (
                <span className="text-gray-600 text-sm">{formik.values.image.name}</span>
              )}
            </div>

            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.image}</p>
            )}

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Selected preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>


    </motion.div>
  );
};

export default AdminBannerTab;
