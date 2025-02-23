"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookForm } from "./BookForm";
import { AppDispatch, RootState } from "@/lib/store/store";
import type { BookFormData } from "@/lib/types";
import { Input } from "./Input";
import { Button } from "./Button";
import { Card } from "./Card";
import { addBook, fetchALLBooks, searchBooks } from "@/lib/store/bookSlice";

export function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const sortDirection = useSelector((state: RootState) => state.books.sortDirection);

  const handleSearch = () => {
    if(!searchTerm) return;
    dispatch(searchBooks({ title: searchTerm, sortDirection }));
  };

  const handleAdd = async (formData: BookFormData) => {
    await dispatch(addBook(formData));
    setIsAddModalOpen(false);
  };

  const handleClearAndSearch = () => {
    setSearchTerm("");
    dispatch(fetchALLBooks({ page: 1, size: 10 }));
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-2 relative">
          {/* Search Input with Clear Button */}
          <div className="relative flex-1">
            <Input
              placeholder="Search books by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Search on Enter
              className="w-full pr-10"
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={handleClearAndSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <Button onClick={handleSearch} className="whitespace-nowrap">
            Search
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsAddModalOpen(true)}
          className="whitespace-nowrap text-white border !border-blue-400 hover:!bg-blue-600"
        >
          Add Book
        </Button>
      </div>

      <BookForm
        onSubmit={handleAdd}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Book"
      />
    </Card>
  );
}
