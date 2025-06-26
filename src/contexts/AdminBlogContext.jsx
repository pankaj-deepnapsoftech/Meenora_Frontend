import { createContext, useContext, useEffect, useState } from "react";
import axiosHandler from "../config/axiosConfig";
import { toast } from "react-toastify";

const AdminBlogContext = createContext();

const AdminBlogProvider = ({ children }) => {
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)

    const GetBlogData = async () => {
        setLoading(true);
        try {
            const res = await axiosHandler.get(`/blogs?page=${page}&limit=10`);
           
            setBlogData(res?.data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch blogs.");
        } finally {
            setLoading(false);
        }
    };

    const postBlogData = async (formData) => {
        setLoading(true);
        try {
            const res = await axiosHandler.post('/blogs', formData);
            toast.success(res?.data?.message);
            GetBlogData();
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to post blog.");
        } finally {
            setLoading(false);
        }
    };

    const UpdatedBlogData = async (_id, formData) => {
        setLoading(true);
        try {
            const res = await axiosHandler.put(`/blogs/${_id}`, formData);
            toast.success(res?.data.message);
            GetBlogData();
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update blog.");
        } finally {
            setLoading(false);
        }
    };

    const DeleteBlogData = async (_id) => {
        if (window.confirm("Are you sure you want to delete this blog data?")) {
            setLoading(true);
            try {
                const res = await axiosHandler.delete(`/blogs/${_id}`);
                toast.success(res?.data?.message);
                GetBlogData();
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Failed to delete blog.");
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        GetBlogData(page);
    }, [page]);

    return (
        <AdminBlogContext.Provider value={{
            blogData,
            postBlogData,
            UpdatedBlogData,
            DeleteBlogData,
            loading,
           page,setPage
        }}>
            {children}
        </AdminBlogContext.Provider>
    );
};

export default AdminBlogProvider;

export const useAdminBlogContext = () => {
    const context = useContext(AdminBlogContext);
    if (!context) {
        throw new Error('useAdminBlogContext must be used within an AdminBlogProvider');
    }
    return context;
};
