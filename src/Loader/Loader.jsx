import React from "react";

const LoaderPage = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
            <div className="flex flex-col items-center">
                <svg
                    className="animate-spin h-12 w-12 text-blue-600 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                </svg>
                <p className="text-blue-600 text-lg font-medium">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default LoaderPage;
