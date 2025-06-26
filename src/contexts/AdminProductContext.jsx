import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosHandler from "../config/axiosConfig";

const AdminProductContext = createContext();

const AdminProductContextProvider = ({ children }) => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
     const [page, setPage] = useState(1)

    const GetProductData = async () => {
        setLoading(true);
        try {
            const res = await axiosHandler.get(`/products?page=${page}&limit=10`);
            setProductData(res?.data);
        } catch (error) {
            console.error(error);
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    const PostProductData = async (formData) => {
        setLoading(true);
        try {
            const res = await axiosHandler.post("/products", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
              });
            toast.success(res?.data?.message);
            GetProductData();
            console.log(res?.data)
        } catch (error) {
            console.error(error);
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    
    const DeleteProduct = async (_id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setLoading(true);
            try {
              const res =   await axiosHandler.delete(`/products/${_id}`);
                toast.success(res?.data?.message);
                GetProductData();
            } catch (error) {
                console.error(error);
                toast.error(error?.message);
            } finally {
                setLoading(false);
            }
        }
    };

    const GetProductById = async (id) => {
        try {
            const res = await axiosHandler.get(`/products/${id}`);
            return res.data; // ✅ return the product data
        } catch (error) {
            console.log(error);
            throw error; // optionally re-throw so the caller can catch it
        }
    };
    
    const UpdatedProduct = async (_id, formData) => {
        setLoading(true);
        try {
            const res = await axiosHandler.put(`/products/${_id}`, formData);
            console.log(res)
            toast.success("Product Updated");
            GetProductData();
        } catch (error) {
            console.error(error);
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetProductData(page);
    }, [page]);

    return (
        <AdminProductContext.Provider
            value={{
                productData,
                loading,
                PostProductData,
                DeleteProduct,
                UpdatedProduct,
                page,
                setPage,
                GetProductById
            }}
        >
            {children}
        </AdminProductContext.Provider>
    );
};

export default AdminProductContextProvider;

export const useAdminProductContext = () => {
    const context = useContext(AdminProductContext);
    if (!context) {
        throw new Error("useAdminProductContext must be used within an AdminProductContextProvider");
    }
    return context;
};
