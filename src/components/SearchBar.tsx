"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookForm } from './BookForm';
import { AppDispatch, RootState } from '@/lib/store/store';
import type { BookFormData } from '@/lib/types';
import { Input } from './Input';
import { Button } from './Button';
import { Card } from './Card';
import { addBook, searchBooks } from '@/lib/store/bookSlice';

export function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const sortDirection = useSelector((state: RootState) => state.books.sortDirection);

  const handleSearch = () => {
    dispatch(searchBooks({ title: searchTerm, sortDirection }));
  };

  const handleAdd = async (formData: BookFormData) => {
    await dispatch(addBook(formData));
    setIsAddModalOpen(false);
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search books by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
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