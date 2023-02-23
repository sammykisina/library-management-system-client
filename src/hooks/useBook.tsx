import { BookAPI, BorrowAPI } from "@/api";
import { bookAtoms, borrowAtoms } from "@/atoms";
import {
  ApproveBookBorrow,
  BookBorrowStatusCell,
  BookStatusCell,
  BorrowBook,
  Button,
  DeleteBook,
  DeleteBookBorrow,
  Notifications,
  NotifyOfLateReturn,
  NotifyToReturnBookToday,
  RejectBookBorrow,
} from "@/components";
import { types } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import type { z } from "zod";
import useAuth from "./useAuth";
import { useMemo } from "react";
import { appUtils } from "@/utils";

const useBook = () => {
  /**
   * hook states
   */
  const { borrowCount } = appUtils;
  const { user } = useAuth();
  const { Book, BookLocation } = types;
  type Book = z.infer<typeof Book>;
  type BookLocation = z.infer<typeof BookLocation>;
  const queryClient = useQueryClient();

  const { showReceiveBorrowedBookWidgetState, globalBorrowState } = borrowAtoms;
  const setShowReceiveBorrowedBookWidget = useSetRecoilState(
    showReceiveBorrowedBookWidgetState
  );
  const setGlobalBorrow = useSetRecoilState(globalBorrowState);

  const {
    globalBookState,
    isEditingBookState,
    showCreateOrEditBookWidgetState,
    showCreateOrEditBookLocationWidgetState,
    isEditingBookLocationState,
    showBookInfoWidgetState,
  } = bookAtoms;
  const setShowCreateOrEditBookWidget = useSetRecoilState(
    showCreateOrEditBookWidgetState
  );
  const setGlobalBook = useSetRecoilState(globalBookState);
  const setIsEditingBook = useSetRecoilState(isEditingBookState);
  const setShowCreateOrEditBookLocationWidget = useSetRecoilState(
    showCreateOrEditBookLocationWidgetState
  );
  const setIsEditingBookLocation = useSetRecoilState(
    isEditingBookLocationState
  );
  const setShowBookInfoWidget = useSetRecoilState(showBookInfoWidgetState);
  const booksTableColumns = useMemo(
    () => [
      {
        Header: "ISBN",
        accessor: "isbn",
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Extra Info",
        columns: [
          {
            Header: "Count",
            accessor: "count",
          },
          {
            Header: "Current Book Count",
            accessor: "currentCount",
          },
          {
            Header: "Status",
            accessor: "status",
            Cell: BookStatusCell,
          },
          {
            Header: "Location (Block, Shelve, Row)",
            accessor: "location",
          },
        ],
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const userBooksTableColumns = useMemo(
    () => [
      {
        Header: "ISBN",
        accessor: "isbn",
      },
      {
        Header: "name",
        accessor: "name",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Extra Info",
        columns: [
          {
            Header: "Status",
            accessor: "status",
            Cell: BookStatusCell,
          },
          {
            Header: "Location (Block, Shelve, Row)",
            accessor: "location",
          },
        ],
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const adminBookBorrowsTableColumns = useMemo(
    () => [
      {
        Header: "ISBN",
        accessor: "isbn",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Borrow Date",
        accessor: "dateBorrowed",
      },
      {
        Header: "Date To Return",
        accessor: "dateToReturn",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: BookBorrowStatusCell,
      },
      {
        Header: "Charges (Late Return / Lose)",
        accessor: "charges",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const userBookBorrowsTableColumns = useMemo(
    () => [
      {
        Header: "ISBN",
        accessor: "isbn",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Borrow Date",
        accessor: "dateBorrowed",
      },
      {
        Header: "Date To Return",
        accessor: "dateToReturn",
      },
      {
        Header: "Charges (Late Return / Lose)",
        accessor: "charges",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: BookBorrowStatusCell,
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  /**
   * hook functions
   */
  const { data: books, isLoading: isFetchingBooks } = useQuery({
    queryKey: ["books", user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === "admin" || role === "user") {
        return await BookAPI.getAllBooks();
      }

      return [];
    },
  });

  const { mutateAsync: storeBookMutateAsync, isLoading: isStoringBook } =
    useMutation({
      mutationFn: (newBookData: Book) => {
        return BookAPI.storeBook(newBookData);
      },

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
        setShowCreateOrEditBookWidget(false);
        Notifications.successNotification(data.message);
      },
    });

  const { mutateAsync: updateBookMutateAsync, isLoading: isUpdatingBook } =
    useMutation({
      mutationFn: (data: { bookId: number; updateBookData: Book }) => {
        return BookAPI.updateBook(data);
      },

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
        setIsEditingBook(false);
        setGlobalBook(null);
        setShowCreateOrEditBookWidget(false);
        Notifications.successNotification(data.message);
      },
    });

  const { mutateAsync: deleteBookMutateAsync, isLoading: isDeletingBook } =
    useMutation({
      mutationFn: (bookId: number) => {
        return BookAPI.deleteBook(bookId);
      },

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
        Notifications.successNotification(data.message);
      },
    });

  const {
    mutateAsync: storeBookLocationMutateAsync,
    isLoading: isStoringBookLocation,
  } = useMutation({
    mutationFn: (data: { bookId: number; bookLocationData: BookLocation }) => {
      return BookAPI.storeBookLocation(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setShowCreateOrEditBookLocationWidget(false);
      setGlobalBook(null);
      setIsEditingBookLocation(false);
      Notifications.successNotification(data.message);
    },
  });

  const { data: bookBorrows, isLoading: isFetchingBookBorrows } = useQuery({
    queryKey: ["bookBorrows", user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === "admin") {
        return await BorrowAPI.getAllBookBorrows();
      }

      return [];
    },
  });

  const modifyBooksDataForBooksTable = (books: any) => {
    let allBooks = [] as any;

    books?.map((book: any) => {
      const location =
        book?.attributes?.block +
        "," +
        book?.attributes?.shelve +
        "," +
        book?.attributes?.row;

      allBooks = [
        ...allBooks,
        {
          isbn: book?.attributes?.isbn,
          name: book?.attributes?.name,
          author: book?.attributes?.author,
          publisher: book?.attributes?.publisher,
          yearOfPublish: book?.attributes?.yearOfPublish,
          price: book?.attributes?.price,
          description: book?.attributes?.description,
          count: book?.attributes?.count,
          pages: book?.attributes?.pages,
          status: book?.attributes?.status,
          currentCount: book?.attributes?.currentCount,
          location: book?.attributes?.block
            ? location
            : user?.role !== "admin"
            ? "Ask librarian For More Information."
            : "Not Created.",

          actions: (
            <>
              <div
                className={`flex items-center gap-1 ${
                  user?.role !== "admin" && "hidden"
                }`}
              >
                <Button
                  title="edit"
                  form="small"
                  type="button"
                  intent="primary"
                  purpose={() => {
                    setIsEditingBook(true);
                    setGlobalBook(book);
                    setShowCreateOrEditBookWidget(true);
                  }}
                />

                <DeleteBook bookId={book?.id} />

                <Button
                  title="Location"
                  form="small"
                  type="button"
                  intent="primary"
                  purpose={() => {
                    book?.attributes?.block
                      ? setIsEditingBookLocation(true)
                      : "";
                    setGlobalBook(book);
                    setShowCreateOrEditBookLocationWidget(true);
                  }}
                />

                <Button
                  title="Info"
                  form="small"
                  type="button"
                  intent="secondary"
                  purpose={() => {
                    setGlobalBook(book);
                    setShowBookInfoWidget(true);
                  }}
                />
              </div>

              <div
                className={`flex items-center gap-2 ${
                  user?.role !== "user" && "hidden"
                }`}
              >
                {book?.attributes?.status === "readin" ? (
                  <span className="rounded-full bg-gray-200/10 px-3 py-1 text-xs capitalize leading-loose text-amber-500 shadow-sm">
                    Read from the library
                  </span>
                ) : (
                  <BorrowBook
                    bookId={book?.id}
                    currentBookBorrowsIds={getThisBooksBorrowsIds(book)}
                    thisBooksBorrowsIdsWithStatedReturnDates={getThisBooksBorrowsIdsWithStatedReturnDates(
                      book
                    )}
                  />
                )}

                <Button
                  title="Info"
                  form="small"
                  type="button"
                  intent="secondary"
                  purpose={() => {
                    setGlobalBook(book);
                    setShowBookInfoWidget(true);
                  }}
                />
              </div>
            </>
          ),
        },
      ];
    });

    return allBooks;
  };

  const modifyBookBorrowsDataForBookBorrowsTable = (bookBorrows: any) => {
    let allBookBorrows = [] as any;

    bookBorrows?.map((bookBorrow: any) => {
      allBookBorrows = [
        ...allBookBorrows,
        {
          isbn: bookBorrow?.relationships?.book?.attributes?.isbn,
          name: bookBorrow?.relationships?.book?.attributes?.name,
          email: bookBorrow?.relationships?.borrower?.attributes?.email,
          dateBorrowed: bookBorrow?.attributes?.dateBorrowed,
          dateToReturn: bookBorrow?.attributes?.dateToReturn,
          charges: bookBorrow?.attributes?.charges,
          status: bookBorrow?.attributes?.status,

          numberOfTimesBorrowed: borrowCount(
            bookBorrows,
            bookBorrow?.relationships?.book?.attributes?.isbn
          ),
          actions:
            user?.role === "admin" ? (
              <div className="flex gap-1">
                {bookBorrow?.attributes?.status === "not approved" && (
                  <div className="flex gap-1">
                    {bookBorrow?.attributes?.status !== "rejected" && (
                      <ApproveBookBorrow borrowId={bookBorrow?.id} />
                    )}
                    {bookBorrow?.attributes?.status !== "rejected" && (
                      <RejectBookBorrow borrowId={bookBorrow?.id} />
                    )}
                  </div>
                )}

                <div className="flex gap-1">
                  {bookBorrow?.attributes?.status ===
                    "approved awaiting return" &&
                    isToday(new Date(bookBorrow?.attributes?.dateToReturn)) && (
                      <NotifyToReturnBookToday borrowId={bookBorrow?.id} />
                    )}

                  {bookBorrow?.attributes?.status ===
                    "approved awaiting return" && (
                    <Button
                      title="Receive Back"
                      form="small"
                      type="button"
                      intent="secondary"
                      purpose={() => {
                        setShowReceiveBorrowedBookWidget(true);
                        setGlobalBorrow(bookBorrow);
                      }}
                    />
                  )}

                  {bookBorrow?.attributes?.status ===
                    "notified to return book today" &&
                    !isToday(new Date(bookBorrow?.attributes?.dateToReturn)) &&
                    isPast(new Date(bookBorrow?.attributes?.dateToReturn)) && (
                      <NotifyOfLateReturn borrowId={bookBorrow?.id} />
                    )}

                  {bookBorrow?.attributes?.status ===
                    "notified of late return" && (
                    <Button
                      title="Receive Back"
                      form="small"
                      type="button"
                      intent="secondary"
                      purpose={() => {
                        setShowReceiveBorrowedBookWidget(true);
                        setGlobalBorrow(bookBorrow);
                      }}
                    />
                  )}

                  {bookBorrow?.attributes?.status ===
                    "notified to return book today" && (
                    <Button
                      title="Receive Back"
                      form="small"
                      type="button"
                      intent="secondary"
                      purpose={() => {
                        setShowReceiveBorrowedBookWidget(true);
                        setGlobalBorrow(bookBorrow);
                      }}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div>
                {!(
                  bookBorrow?.attributes?.status !== "rejected" &&
                  bookBorrow?.attributes?.status !== "not approved"
                ) && <DeleteBookBorrow borrowId={bookBorrow?.id} />}
              </div>
            ),
        },
      ];
    });

    return allBookBorrows;
  };

  const getThisBooksBorrowsIds = (book: any) => {
    const bookBorrowers = new Set();

    book?.relationships?.borrows?.map((borrow: any) => {
      bookBorrowers.add(borrow?.relationships?.borrower?.id);
    });

    return [...bookBorrowers.values()] as number[];
  };

  const getThisBooksBorrowsIdsWithStatedReturnDates = (book: any) => {
    const bookBorrowers = new Set();

    book?.relationships?.borrows?.map((borrow: any) => {
      bookBorrowers.add({
        userId: borrow?.relationships?.borrower?.id,
        dateToReturn: borrow?.attributes?.dateToReturn,
        dateReturned: borrow?.attributes?.dateReturned,
        status: borrow?.attributes?.status,
      });
    });

    return [...bookBorrowers.values()] as any[];
  };

  return {
    books,
    isFetchingBooks,
    booksTableColumns,
    isStoringBook,
    storeBookMutateAsync,
    isUpdatingBook,
    updateBookMutateAsync,
    isDeletingBook,
    deleteBookMutateAsync,
    modifyBooksDataForBooksTable,
    storeBookLocationMutateAsync,
    isStoringBookLocation,
    userBooksTableColumns,
    bookBorrows,
    isFetchingBookBorrows,
    adminBookBorrowsTableColumns,
    modifyBookBorrowsDataForBookBorrowsTable,
    userBookBorrowsTableColumns,
  };
};

export default useBook;
