"use client";
import { useState, useEffect } from "react";
import { Book } from "@/lib/types";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { CustomSelect } from "./CustomSelect";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filters) => void;
  books: { data: Book[] } | null;
}

interface Filters {
  title: string;
  author: string;
  country: string;
  year: string;
}

export function FilterModal({ isOpen, onClose, onApplyFilters, books }: FilterModalProps) {
  const [filters, setFilters] = useState<Filters>({
    title: "",
    author: "",
    country: "",
    year: "",
  });

  const [uniqueTitles, setUniqueTitles] = useState<string[]>([]);
  const [uniqueAuthors, setUniqueAuthors] = useState<string[]>([]);
  const [uniqueCountries, setUniqueCountries] = useState<string[]>([]);
  const [uniqueYears, setUniqueYears] = useState<string[]>([]);

  useEffect(() => {
    if (books?.data) {
      const titles = [...new Set(books.data.map((book) => book.title))];
      const authors = [...new Set(books.data.map((book) => book.author))];
      const countries = [...new Set(books.data.map((book) => book.country))];
      const years = [...new Set(books.data.map((book) => book.year))];

      setUniqueTitles(titles);
      setUniqueAuthors(authors);
      setUniqueCountries(countries);
      setUniqueYears(years);
    }
  }, [books]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSubmit = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filter Books">
      <div className="space-y-3">
        <CustomSelect
          options={uniqueTitles}
          value={filters.title}
          onChange={(value) => handleFilterChange("title", value)}
          placeholder="Select Title"
        />
        <CustomSelect
          options={uniqueAuthors}
          value={filters.author}
          onChange={(value) => handleFilterChange("author", value)}
          placeholder="Select Author"
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onClose} className="text-white" variant="ghost">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-blue-600 text-white">
          Apply
        </Button>
      </div>
    </Modal>
  );
}
