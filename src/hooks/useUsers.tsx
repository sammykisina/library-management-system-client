import { useMemo } from "react";
import useAuth from "./useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { BorrowAPI, UserAPI } from "@/api";
import { types } from "@/types";
import type { z } from "zod";
import { Button, DeleteLibrarian, Notifications } from "@/components";
import { useRouter } from "next/router";
import { borrowAtoms, librarianAtoms } from "@/atoms";
import { useSetRecoilState } from "recoil";

const useUsers = () => {
  /**
   * hook states
   */
  const { globalBorrowState, showReceiveBorrowedBookWidgetState } = borrowAtoms;
  const {
    globalLibrarianState,
    isEditingLibrarianState,
    showCreateOrEditLibrarianState,
  } = librarianAtoms;
  const setGlobalBorrow = useSetRecoilState(globalBorrowState);
  const setShowReceiveBorrowedBookWidget = useSetRecoilState(
    showReceiveBorrowedBookWidgetState
  );
  const setGlobalLibrarian = useSetRecoilState(globalLibrarianState);
  const setShowCreateOrEditLibrarian = useSetRecoilState(
    showCreateOrEditLibrarianState
  );
  const setIsEditingLibrarian = useSetRecoilState(isEditingLibrarianState);

  const router = useRouter();
  const { Borrow } = types;
  type Borrow = z.infer<typeof Borrow>;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const usersTableColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "No Of Books Borrowed",
        accessor: "noOfBooksBorrowed",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
    ],
    []
  );
  const popularBookBorrowsTableColumns = useMemo(
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
        Header: "Added At",
        accessor: "addedAt",
      },
      {
        Header: "No Of Times Borrowed",
        accessor: "count",
      },
    ],
    []
  );
  const librariansTableColumns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
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

  /**
   * Users management routes
   */
  const { data: users, isLoading: isFetchingUsers } = useQuery({
    queryKey: ["users", user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === "admin") {
        return await UserAPI.getUsers();
      }

      return [];
    },
  });

  const { mutateAsync: borrowBookMutateAsync, isLoading: isBorrowingBook } =
    useMutation({
      mutationFn: (data: {
        userId: number;
        bookId: number;
        borrowBookData: Borrow;
      }) => {
        return BorrowAPI.borrowBook(data);
      },

      onSuccess: async (data) => {
        // queryClient.invalidateQueries({ queryKey: ["borrows"] });
        router.push("/us/library-history");
        Notifications.successNotification(data.message);
      },
    });

  const {
    mutateAsync: rejectBookBorrowMutateAsync,
    isLoading: isRejectingBookBorrow,
  } = useMutation({
    mutationFn: (borrowId: number) => {
      return BorrowAPI.rejectBookBorrow(borrowId);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookBorrows"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      Notifications.successNotification(data.message);
    },
  });

  const {
    mutateAsync: approveBookBorrowMutateAsync,
    isLoading: isApprovingBookBorrow,
  } = useMutation({
    mutationFn: (borrowId: number) => {
      return BorrowAPI.approveBookBorrow(borrowId);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookBorrows"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      Notifications.successNotification(data.message);
    },
  });

  const {
    mutateAsync: notifyToReturnBookTodayMutateAsync,
    isLoading: isNotifyingToReturnBookToday,
  } = useMutation({
    mutationFn: (borrowId: number) => {
      return BorrowAPI.notifyToReturnBookToday(borrowId);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookBorrows"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      Notifications.successNotification(data.message);
    },
  });

  const {
    mutateAsync: notifyOfLateReturnMutateAsync,
    isLoading: isNotifyingOfLateReturn,
  } = useMutation({
    mutationFn: (borrowId: number) => {
      return BorrowAPI.notifyOfLateReturn(borrowId);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookBorrows"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      Notifications.successNotification(data.message);
    },
  });

  const { mutateAsync: receiveBookMutateAsync, isLoading: isReceivingBook } =
    useMutation({
      mutationFn: (data: {
        borrowId: number;
        returnBookData: {
          charges: number;
          bookCondition: string;
          dateReturned: string;
        };
      }) => {
        return BorrowAPI.receiveBook(data);
      },

      onSuccess: async (data) => {
        queryClient.invalidateQueries({ queryKey: ["bookBorrows"] });
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        setGlobalBorrow(null);
        setShowReceiveBorrowedBookWidget(false);
        Notifications.successNotification(data.message);
      },
    });

  const {
    mutateAsync: deleteBookBorrowMutateAsync,
    isLoading: isDeletingBookBorrow,
  } = useMutation({
    mutationFn: (borrowId: number) => {
      return BorrowAPI.deleteBookBorrow(borrowId);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookBorrows"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      Notifications.successNotification(data.message);
    },
  });

  const modifyUsersDataForUsersTable = (allUsers: unknown[]) => {
    let modifiedUsers = [] as unknown[];

    allUsers?.map((user: any) => {
      modifiedUsers = [
        ...modifiedUsers,
        {
          name: user?.attributes?.name,
          email: user?.attributes?.email,
          noOfBooksBorrowed: user?.relationships?.bookBorrows?.length,
          createdAt: format(
            new Date(user?.attributes?.createdAt),
            "EE, MMM d, yyy"
          ),
          actions: (
            <div className="flex gap-1">
              <Button
                title="edit"
                form="small"
                type="button"
                intent="primary"
                purpose={() => {
                  setGlobalLibrarian(user);
                  setIsEditingLibrarian(true);
                  setShowCreateOrEditLibrarian(true);
                }}
              />

              <div className={`${user?.id === 1 && "hidden"}`}>
                <DeleteLibrarian librarianId={user?.id} />
              </div>
            </div>
          ),
        },
      ];
    });

    return modifiedUsers;
  };

  const modifyBookBorrowsForPopularBooksTable = (bookBorrows: any) => {
    const modifiedBookBorrows = [] as any[];

    bookBorrows?.map((bookBorrow: any) => {
      const borrow = modifiedBookBorrows?.find(
        (modifiedBookBorrow) =>
          modifiedBookBorrow.isbn ===
          bookBorrow?.relationships?.book?.attributes?.isbn
      );

      if (borrow) {
        borrow.count = borrow.count + 1;
      } else {
        modifiedBookBorrows.push({
          isbn: bookBorrow?.relationships?.book?.attributes?.isbn,
          count: 1,
          name: bookBorrow?.relationships?.book?.attributes?.name,
          addedAt: format(
            new Date(bookBorrow?.relationships?.book?.attributes?.createdAt),
            "EE, MMMM d, yyy"
          ),
        });
      }
    });

    return modifiedBookBorrows;
  };

  /**
   * librarians management functions
   */
  const { data: librarians, isLoading: isFetchingLibrarians } = useQuery({
    queryKey: ["librarians", user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === "admin") {
        return await UserAPI.getLibrarians();
      }

      return [];
    },
  });

  const {
    mutateAsync: storeLibrarianMutateAsync,
    isLoading: isStoringLibrarian,
  } = useMutation({
    mutationFn: (data: { name: string; email: string; password: string }) => {
      return UserAPI.createLibrarian(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["librarians"] });
      setShowCreateOrEditLibrarian(false);
      Notifications.successNotification(data.message);
    },
  });

  const {
    mutateAsync: updateLibrarianMutateAsync,
    isLoading: isUpdatingLibrarian,
  } = useMutation({
    mutationFn: (data: {
      librarianId: number;
      librarianUpdateData: {
        name: string;
        email: string;
        password: string;
      };
    }) => {
      return UserAPI.updateLibrarian(data);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["librarians"] });
      setShowCreateOrEditLibrarian(false);
      Notifications.successNotification(data.message);
    },
  });

  const {
    mutateAsync: deleteLibrarianMutateAsync,
    isLoading: isDeletingLibrarian,
  } = useMutation({
    mutationFn: (librarianId: number) => {
      return UserAPI.deleteLibrarian(librarianId);
    },

    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["librarians"] });
      Notifications.successNotification(data.message);
    },
  });

  return {
    users,
    isFetchingUsers,
    modifyUsersDataForUsersTable,
    usersTableColumns,
    borrowBookMutateAsync,
    isBorrowingBook,
    rejectBookBorrowMutateAsync,
    isRejectingBookBorrow,
    isDeletingBookBorrow,
    deleteBookBorrowMutateAsync,
    approveBookBorrowMutateAsync,
    isApprovingBookBorrow,
    isNotifyingToReturnBookToday,
    notifyToReturnBookTodayMutateAsync,
    isNotifyingOfLateReturn,
    notifyOfLateReturnMutateAsync,
    isReceivingBook,
    receiveBookMutateAsync,
    popularBookBorrowsTableColumns,
    modifyBookBorrowsForPopularBooksTable,
    librarians,
    isFetchingLibrarians,
    librariansTableColumns,
    storeLibrarianMutateAsync,
    isStoringLibrarian,
    updateLibrarianMutateAsync,
    isUpdatingLibrarian,
    deleteLibrarianMutateAsync,
    isDeletingLibrarian,
  };
};

export default useUsers;
