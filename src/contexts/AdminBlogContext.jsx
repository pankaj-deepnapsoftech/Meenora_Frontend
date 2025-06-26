import { createContext, useContext, useEffect, useState } from "react";
import axiosHandler from "../config/axiosConfig";
import { toast } from "react-toastify";


const AdminBlogContext = createContext()

const AdminBlogProvider = ({ children }) => {

    const [blogData, setBlogData] = useState([])

    const GetBlogData = async () => {
        try {
            const res = await axiosHandler.get('/blogs')
            console.log(res?.data)
            setBlogData(res?.data)
        } catch (error) {
            console.log(error)
        }
    }


    const postBlogData = async (formData) => {
        try {
            const res = await axiosHandler.post('/blogs', formData)
            toast.success(res?.data?.message)
            GetBlogData()
        } catch (error) {
            console.log(error)
            toast.error(error?.data)
        }
    }
    const UpdatedBlogData = async (_id, formData) => {
        try {
            const res = await axiosHandler.put(`/blogs/${_id}`, formData);
            toast.success(res?.data.message)
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        }
    }

    useEffect(() => {
        GetBlogData()
    }, [])

    return (
        <AdminBlogContext.Provider value={{ postBlogData, blogData, UpdatedBlogData }}>
            {children}
        </AdminBlogContext.Provider>
    )
}

export default AdminBlogProvider


export const useAdminBlogContext = () => {
    const context = useContext(AdminBlogContext);

    if (!context) {
        throw new Error('useAdminBlogContext must be used within an AdminBlogProvider');
    }

    return context;
};