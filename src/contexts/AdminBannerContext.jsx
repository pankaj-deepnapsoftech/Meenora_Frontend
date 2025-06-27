import { createContext, useContext, useEffect, useState } from "react";
import axiosHandler from "../config/axiosConfig";
import { toast } from "react-toastify";


const AdminBannerContext = createContext()

const AdminBannerProvider = ({ children }) => {
    const [BannerData, setBannerData] = useState([])
    const [bannerDataBypage, setBannerDataByPage] = useState([])
    const GetData = async () => {
        try {
            const res = await axiosHandler.get('/banners')
            console.log(res?.data)
            setBannerData(res?.data?.data)
        } catch (error) {

        }
    }
    const GetBannerDataByPage = async (page) => {
        try {
            const res = await axiosHandler.get(`/banners/${page}`);
            setBannerDataByPage((prev) => ({
                ...prev,
                [page]: res?.data?.data || [],
            }));
        } catch (error) {

        }
    }
    const PostBannerData = async (formData) => {
        try {
            const res = await axiosHandler.post('/banners', formData)
            toast.success(res?.data?.message)
            console.log(res?.data.data)
            GetData()
        } catch (error) {
            console.log(error)
        }
    }
    const UpdatedBannerData = async (_id, formData) => {
        // setLoading(true);
        try {
            const res = await axiosHandler.put(`/banners/${_id}`, formData);
            toast.success(res?.data.message);
            GetData()
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to update blog.");
        }
    };

    const DeleteBannerData = async (_id) => {
        if (window.confirm("Are you sure you want to delete this banners data?")) {
            // setLoading(true);
            try {
                const res = await axiosHandler.delete(`/banners/${_id}`);
                toast.success(res?.data?.message);
                GetData()
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Failed to delete blog.");
            }
        }
    };
    useEffect(() => {
        GetData()
    }, [])

    return (
        <AdminBannerContext.Provider value={{ PostBannerData, BannerData, DeleteBannerData, UpdatedBannerData, bannerDataBypage, GetBannerDataByPage }}>
            {children}
        </AdminBannerContext.Provider>
    )
}
export default AdminBannerProvider;



export const useAdminBannerContext = () => {
    const context = useContext(AdminBannerContext);

    if (!context) {
        throw new Error('useAdminBannerContext must be used within an AdminBannerProvider');
    }

    return context;
};