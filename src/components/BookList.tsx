"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Book } from "@/lib/types";
import { AppDispatch, RootState } from "@/lib/store/store";
import {
  fetchALLBooks,
  setSortDirection,
  updateBook,
} from "@/lib/store/bookSlice";
import { Card } from "./Card";
import { Button } from "./Button";
import { Pagination } from "./Pagination";
import { BookForm } from "./BookForm";
import Link from "next/link";
import { SkeletonTable } from "./SketonTabe";
import { FilterModal } from "./FilterModal";

const PAGE_SIZE = 10;

export function BookList() {
  const dispatch = useDispatch<AppDispatch>();
  const { books, sortDirection, loading, error } = useSelector(
    (state: any) => state.books
  );
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  useEffect(() => {
    dispatch(fetchALLBooks({ page: currentPage, size: PAGE_SIZE }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setFilteredBooks(books.data || []);
  }, [books.data]);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (formData: Omit<Book, "id">) => {
    if (selectedBook) {
      await dispatch(updateBook({ id: selectedBook.id, bookData: formData }));
      setIsEditModalOpen(false);
      setSelectedBook(null);
      setCurrentPage(1);
    }
  };

  const handleSort = () => {
    const newSortDirection = sortDirection === "ASC" ? "DESC" : "ASC";
    dispatch(setSortDirection(newSortDirection));
  };

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortDirection === "ASC") {
      return a?.title?.localeCompare(b.title);
    } else {
      return b?.title?.localeCompare(a.title);
    }
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleApplyFilters = (filters: any) => {
    const filtered = books.data.filter((book: any) =>
      Object.entries(filters).every(([key, value]: any) =>
        value
          ? book[key as keyof Book]?.toLowerCase().includes(value.toLowerCase())
          : true
      )
    );
    setFilteredBooks(filtered);
  };

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <Card>
      <div className="flex justify-between items-center my-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Books List
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Filter
          </button>

          <Button onClick={handleSort} className="flex items-center gap-2">
            Sort {sortDirection === "ASC" ? "↓" : "↑"}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border border-gray-700 text-left">
          <thead className="bg-gray-300 text-black">
            <tr>
              <th className="py-5 px-4 font-bold text-lg">Title</th>
              <th className="py-5 px-4 font-bold text-lg">Author</th>
              <th className="py-5 px-4 font-bold text-lg">Link</th>
              <th className="py-5 px-4 font-bold text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonTable rows={10} />
            ) : sortedBooks.length > 0 ? (
              sortedBooks.map((book: any) => (
                <tr
                  key={book.id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="py-3 px-4 text-white">{book.title || "-"}</td>
                  <td className="py-3 px-4 text-white">{book.author || "-"}</td>
                  <td className="py-3 px-4 text-white hover:underline hover:text-blue-500">
                    {book.link ? (
                      <Link href={book.link} target="_blank">
                        {book.link}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Button onClick={() => handleEdit(book)}>Edit</Button>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-3 px-4 text-center text-gray-400"
                  >
                    No books available
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {selectedBook && (
        <BookForm
          title="Edit Book"
          initialData={selectedBook}
          onSubmit={handleUpdate}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      <FilterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApplyFilters={handleApplyFilters}
        books={books}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={books?.pagination?.totalPages}
        onPageChange={setCurrentPage}
      />
    </Card>
  );
}
