const Pagination = ({ page, setPage, hasNextPage }) => {
    return (
        <div className="flex items-center justify-between m-auto w-1/2 mt-6 gap-4">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`px-4 py-2 rounded-md border transition duration-200 
            ${page === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-primary text-background hover:bg-primary/90"
                    }`}
            >
                Prev
            </button>

            <span className="text-sm text-gray-600 font-medium">Page {page}</span>

            <button
                disabled={!hasNextPage}
                onClick={() => setPage(page + 1)}
                className={`px-4 py-2 rounded-md border transition duration-200 
            ${!hasNextPage
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-primary text-background hover:bg-primary/90"
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
  