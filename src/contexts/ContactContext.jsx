import { createContext, useContext, useEffect, useState } from "react";
import axiosHandler from "../config/axiosConfig";
import { toast } from "react-toastify";


const ContactContext = createContext()


const ContactProvider = ({ children }) => {

    const [loading, setLoading] = useState()
    const [contactdata, setContactData] = useState([])
    const [page, setPage] = useState(1)

    const GetContactMessage = async () => {
        setLoading(true)
        try {
            const res = await axiosHandler.get(`/contacts?page=${page}&limit=10`)
            setContactData(res?.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const PostContactData = async (values) => {
        setLoading(true)
        try {
            const res = await axiosHandler.post("/contacts", values)
            toast.success(res?.data?.message)
            GetContactMessage()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const DeleteData = async (_id) => {
        setLoading(true)
        try {
            if (window.confirm("Are you sure you want to delete this message?")) {
                const res = await axiosHandler.delete(`/contacts/${_id}`)
                toast.success(res?.data?.message)
                GetContactMessage()
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        GetContactMessage(page)
    }, [page])

    return (
        <ContactContext.Provider value={{ PostContactData, loading, contactdata, DeleteData, page, setPage }}>
            {children}
        </ContactContext.Provider>
    )
}

export default ContactProvider


export const useContactContext = () => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error("useContactContext must be used within a ContactContextProvider");
    }
    return context;
};