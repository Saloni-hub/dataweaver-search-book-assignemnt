import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookFormData } from '../types';

const API_BASE_URL = 'http://64.227.142.191:8080/application-test-v1.1';

interface ToastState {
  message: string;
  type?: "success" | "error" ;
}

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  sortDirection: 'ASC' | 'DESC';
  toast: ToastState;

}

const initialState: BooksState = {
  books: [],
  loading: true,
  error: null,
  sortDirection: 'ASC',
  toast: { message: "", type: undefined },
}

export const searchBooks = createAsyncThunk(
  'books/searchBooks',
  async ({ title, sortDirection }: { title: string; sortDirection: 'ASC' | 'DESC' }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/books?title=${encodeURIComponent(title)}&DIR=${sortDirection}`);
      if (!response.ok) throw new Error('Failed to fetch books');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

export const fetchALLBooks = createAsyncThunk(
  'books/fetchAllBooks',
  async ({ page, size }: { page: number; size: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/books?page=${page}&pageSize=${size}`);
      if (!response.ok) throw new Error('Failed to fetch books');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);


export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData: BookFormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();

      if (data.status !== 200) throw new Error(data.message || 'Failed to add book');

      await dispatch(fetchALLBooks({ page: 1, size: 10 }));

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);


export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, bookData,page=1,size=10 }: { id: number; bookData: BookFormData,page?: number; size?: number }, thunkAPI) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookData, id }),
      });

      if (!response.ok) throw new Error('Failed to update book');

      await response.json();

      thunkAPI.dispatch(fetchALLBooks({ page, size }));

      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);


const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSortDirection: (state, action: PayloadAction<'ASC' | 'DESC'>) => {
      state.sortDirection = action.payload;
    },
    clearToast: (state) => {
      state.toast = { message: "", type: undefined };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchALLBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchALLBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchALLBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(searchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      })
      
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.toast = { message: "Book added successfully!", type: "success" };
      })      
      .addCase(updateBook.fulfilled, (state) => {
        state.loading = false;
        state.toast = { message: "Book updated successfully!", type: "success" };
      });
      
  },
});

export const { setSortDirection,clearToast } = booksSlice.actions;
export default booksSlice.reducer;
