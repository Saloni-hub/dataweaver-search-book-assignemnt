import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-end mt-6">
      <div className="flex items-center space-x-2 p-2 rounded-lg overflow-x-auto scrollbar-hide">
        <button
          className={`w-[40px] h-[40px]  justify-center rounded-full text-sm font-medium flex items-center gap-1 transition-all ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {startPage > 1 && (
          <>
            <button
              className={`w-[40px] h-[40px]rounded-full text-sm font-medium ${
                currentPage === 1
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-500 text-white"
              }`}
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 py-1 text-gray-500">...</span>}
          </>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`w-[40px] h-[40px] rounded-full text-sm font-medium transition-all ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-500 text-white"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 py-1 text-white">...</span>
            )}
            <button
              className={`w-[40px] h-[40px] rounded-full text-sm font-medium transition-all ${
                currentPage === totalPages
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-500 text-white"
              }`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className={`w-[40px] h-[40px] justify-center rounded-full text-sm font-medium flex items-center gap-1 transition-all ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
