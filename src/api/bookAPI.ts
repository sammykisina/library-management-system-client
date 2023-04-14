import { types } from "@/types";
import type { z } from "zod";
import { API } from "./api";

const { Book, BookLocation } = types;
type Book = z.infer<typeof Book>;
type BookLocation = z.infer<typeof BookLocation>;

const BookAPI = {
  getAllBooks: async () =>
    API.get("/users/books?include=borrows.book,borrows.borrower"),
  storeBook: async (newBookData: Book) => API.post("/admin/books", newBookData),
  updateBook: async (data: { bookId: number; updateBookData: Book }) =>
    API.patch(`/admin/books/${data.bookId}`, data.updateBookData),
  deleteBook: async (bookId: number) => API.delete(`/admin/books/${bookId}`),
  storeBookLocation: async (data: {
    bookId: number;
    bookLocationData: BookLocation;
  }) => API.post(`/admin/books/${data.bookId}/location`, data.bookLocationData),
};

export default BookAPI;
