import React, { useState } from 'react';
import { useContactContext } from '../../contexts/ContactContext';
import { Badge, Mails, Trash2 } from 'lucide-react';
import LoaderPage from '../../Loader/Loader';
import Pagination from '../../pages/Pagination';

const AdminContactUs = () => {

    const { contactdata, DeleteData,loading,page,setPage } = useContactContext()
    const [expandedMessages, setExpandedMessages] = useState({});
    const toggleMessage = (id) => {
        setExpandedMessages((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleDelete = (_id) => {
        DeleteData(_id)
    }

    return (
    <>
    {
        loading ? <LoaderPage/> : (
                    <div className="">
                        <div className="flex items-center mb-6">
                            <Mails className="text-orange-500 text-2xl mr-3" />
                            <h1 className="text-3xl font-bold text-gray-900">Contact Us Enquiries</h1>
                        </div>


                        <div className="bg-white rounded-lg shadow-md border border-gray-300">

                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="font-semibold text-gray-800 text-lg">All Contact Enquiries</h2>
                            </div>


                            <div className="overflow-x-auto">
                                <table className="min-w-full border-t whitespace-nowrap border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            {["Name", "Email", "Subject", "Message", "Date Added", "Status", "Actions"].map((header) => (
                                                <th
                                                    key={header}
                                                    className="text-left px-5 py-3 text-gray-700 font-semibold text-md tracking-wide"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contactdata && contactdata.length > 0 ? (
                                            contactdata.map((data) => {
                                                const isExpanded = expandedMessages[data._id];
                                                const message = data.message || "";
                                                const showToggle = message.length > 10;

                                                return (
                                                    <tr key={data._id} className="hover:bg-gray-50 transition-colors duration-200">
                                                        <td className="px-5 py-3 text-md text-gray-700 whitespace-nowrap">{data.name}</td>
                                                        <td className="px-5 py-3 text-md text-gray-700 whitespace-nowrap">{data.email}</td>
                                                        <td className="px-5 py-3 text-md text-gray-700 whitespace-nowrap">{data.subject}</td>
                                                        <td className="px-5 py-3 text-md text-gray-700 max-w-xs">
                                                            {showToggle ? (
                                                                <>
                                                                    {isExpanded ? message : message.substring(0, 10) + "... "}
                                                                    <button
                                                                        onClick={() => toggleMessage(data._id)}
                                                                        className="text-blue-600 hover:underline focus:outline-none"
                                                                    >
                                                                        {isExpanded ? "Show less" : "Show more"}
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                message
                                                            )}
                                                        </td>
                                                        <td className="px-5 py-3 text-md text-gray-700 whitespace-nowrap">
                                                            {new Date(data.dateAdded).toLocaleDateString()}
                                                        </td>
                                                        <td className="p-4">
                                                            <div className={`text-[14px] font-semibold px-4 py-1 rounded-md text-center tracking-wide ${data?.status === "unread"
                                                                ? 'bg-green-soft hover:bg-green-soft text-green-dark border border-green-main/30'
                                                                : data?.status === "rea"
                                                                    ? 'bg-yellow-soft hover:bg-yellow-soft  text-yellow-main border border-yellow-main/30'
                                                                    : 'bg-red-soft hover:bg-red-soft text-red-dark border border-red-main/30'
                                                                }`}>
                                                                {data?.status.charAt(0).toUpperCase() + data?.status.slice(1).toLowerCase()}

                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-3 text-md text-gray-700 whitespace-nowrap">
                                                            <button
                                                                onClick={() => handleDelete(data?._id)}
                                                                className="text-red-500 px-3 py-1 rounded-md text-md font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-8 text-gray-400 text-md italic">
                                                    No contact enquiries found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Pagination page={page} setPage={setPage} hasNextPage={contactdata?.length === 10} />
                    </div>
        )
    }
    </>
    );
}

export default AdminContactUs;
