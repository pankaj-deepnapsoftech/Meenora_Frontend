import React from 'react';
import { motion } from 'framer-motion';
import { useAdminBlogContext } from '../contexts/AdminBlogContext';

const Blog = () => {
    const { blogData } = useAdminBlogContext();
 console.log(blogData)
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-16 mt-20 min-h-[calc(100vh-20rem)]"
        >
            <h1 className="text-4xl md:text-5xl font-bold font-display text-center mb-12 text-gray-800 dark:text-gray-100">
                Latest <span className="text-primary">Blogs</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogData?.length > 0 ? (
                    blogData.map((blog, index) => (
                        <article
                            key={index}
                            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition duration-300"
                        >
                            {blog.featuredImage ? (
                                <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="h-48 w-full object-cover"
                                />
                            ) : (
                                <div className="h-48 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 text-sm">
                                    No Image Available
                                </div>
                            )}

                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100 line-clamp-2">
                                    {blog.title}
                                </h2>

                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                                    <span>By {blog.author}</span> &middot;{" "}
                                    <span>{new Date(blog.dateAdded).toLocaleDateString()}</span> &middot;{" "}
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {blog.status}
                                    </span>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4 mb-4 flex-grow">
                                    {blog.content}
                                </p>

                                <div className="mt-auto pt-2 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-1">
                                    <span className="mr-1 font-medium">Tags:</span>
                                    {blog.tags && blog.tags.length > 0 ? (
                                        blog.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">No tags</span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No blog posts found.</p>
                )}
            </div>
        </motion.div>
    );
};

export default Blog;
