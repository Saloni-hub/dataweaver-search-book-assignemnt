"use client";

import { SearchBar } from "@/components/SearchBar";
import { BookList } from "@/components/BookList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { clearToast } from "@/lib/store/bookSlice";
import Toast from "@/components/Toast";

export default function Home() {
  const { message, type } = useSelector(
    (state: RootState) => state.books.toast
  );
  const dispatch = useDispatch();
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      {message && (
        <Toast
          message={message}
          type={type}
          onClose={() => dispatch(clearToast())}
        />
      )}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Book Search
        </h1>
        <SearchBar />
        <BookList />
      </div>
    </main>
  );
}
