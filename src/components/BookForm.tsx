"use client";
import { useState, useEffect } from "react";
import { BookFormData } from "@/lib/types";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => void;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function BookForm({ initialData, onSubmit, isOpen, onClose, title }: BookFormProps) {
  const defaultFormData: BookFormData = {
    title: "",
    author: "",
    country: "",
    language: "",
    link: "",
    pages: "",
    year: "",
  };

  const [formData, setFormData] = useState<BookFormData>(defaultFormData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title ?? "",
        author: initialData.author ?? "",
        country: initialData.country ?? "",
        language: initialData.language ?? "",
        link: initialData.link ?? "",
        pages: initialData.pages ?? "",
        year: initialData.year ?? "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(defaultFormData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <Input name="author" value={formData.author} onChange={handleChange} placeholder="Author" required />
        <Input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
        <Input name="language" value={formData.language} onChange={handleChange} placeholder="Language" required />
        <Input name="link" value={formData.link} onChange={handleChange} placeholder="Link" required />
        <Input name="pages" type="number" value={formData.pages} onChange={handleChange} placeholder="Pages" required />
        <Input name="year" value={formData.year} onChange={handleChange} placeholder="Year" required />

        <div className="flex gap-2 justify-end mt-6">
          <Button type="button" variant="ghost" onClick={onClose} className="text-white">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
