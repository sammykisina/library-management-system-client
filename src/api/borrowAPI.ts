import { types } from "@/types";
import { API } from "./api";
import type { z } from "zod";

const { Borrow } = types;
type Borrow = z.infer<typeof Borrow>;

const BorrowAPI = {
  getAllBookBorrows: async () =>
    API.get("/admin/books/borrows?include=borrower,book"),

  borrowBook: async (data: {
    bookId: number;
    userId: number;
    borrowBookData: Borrow;
  }) =>
    API.post(
      `/users/${data.userId}/books/${data.bookId}/borrow`,
      data.borrowBookData
    ),

  rejectBookBorrow: (borrowId: number) =>
    API.post(`/admin/books/borrows/${borrowId}/reject`, ""),

  approveBookBorrow: (borrowId: number) =>
    API.post(`/admin/books/borrows/${borrowId}/approve`, ""),

  notifyToReturnBookToday: (borrowId: number) =>
    API.post(
      `/admin/books/borrows/${borrowId}/notify-to-return-book-today`,
      ""
    ),

  notifyOfLateReturn: (borrowId: number) =>
    API.post(`/admin/books/borrows/${borrowId}/notify-of-late-return`, ""),

  receiveBook: (data: {
    borrowId: number;
    returnBookData: {
      charges: number;
      bookCondition: string;
      dateReturned: string;
    };
  }) =>
    API.post(
      `/admin/books/borrows/${data.borrowId}/receive-book`,
      data.returnBookData
    ),

  deleteBookBorrow: (borrowId: number) =>
    API.delete(`/users/borrows/${borrowId}`),
};

export default BorrowAPI;
