import React from "react";
import {
  AdminDashboardCard,
  Icon,
  SpinnerLoader,
  Table,
  Title,
} from "@/components";
import { useBook, useUsers } from "@/hooks";
import { isSameMonth } from "date-fns";
import { HiQueueList, HiSquaresPlus, HiUserGroup } from "react-icons/hi2";

const AdminDashboard = () => {
  /**
   * component states
   */
  const {
    users,
    isFetchingUsers,
    popularBookBorrowsTableColumns,
    modifyBookBorrowsForPopularBooksTable,
  } = useUsers();
  const { books, isFetchingBooks, bookBorrows, isFetchingBookBorrows } =
    useBook();
  const usersLastMonth = users?.filter((user: any) =>
    isSameMonth(
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(user?.attributes?.createdAt)
    )
  )?.length;
  const booksLastMonth = books?.filter((book: any) =>
    isSameMonth(
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(book?.attributes?.createdAt)
    )
  )?.length;
  const bookBorrowsLastMonth = bookBorrows?.filter((bookBorrow: any) =>
    isSameMonth(
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(bookBorrow?.attributes?.createdAt)
    )
  )?.length;

  console.log(
    "modifyBookBorrowsForPopularBooksTable",
    modifyBookBorrowsForPopularBooksTable(bookBorrows)
  );

  return (
    <section className="mt-5 w-full p-2">
      {/* title */}
      <div className="flex items-center gap-2 px-3">
        <div className="h-5 w-5 rounded-full bg-primary" />
        <Title
          title="OVERVIEW"
          titleStyles="text-gray-900 text-lg tracking-wider"
        />
      </div>

      {isFetchingUsers || isFetchingBooks || isFetchingBookBorrows ? (
        <div className="flex h-full w-full items-center justify-center">
          <SpinnerLoader color="fill-primary" />
        </div>
      ) : (
        <section>
          <section className="mt-5 flex items-center justify-center gap-1 bg-indigo-100 px-1 py-3 sm:flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
              {/* users */}
              <AdminDashboardCard
                icon={<HiUserGroup className="icon" />}
                numberOfCountLastMonth={usersLastMonth}
                title="Users"
                totalCount={users?.length}
                bgColor="bg-indigo-500/50"
                textColor="text-indigo-500"
              />

              {/* books */}
              <AdminDashboardCard
                title="Books"
                totalCount={books?.length}
                icon={<HiQueueList className="icon" />}
                numberOfCountLastMonth={booksLastMonth}
                bgColor="bg-amber-500/50"
                textColor="text-amber-500"
              />
            </div>

            {/* borrows */}
            <AdminDashboardCard
              title="Borrows"
              totalCount={bookBorrows?.length}
              icon={<HiSquaresPlus className="icon" />}
              numberOfCountLastMonth={bookBorrowsLastMonth}
              bgColor="bg-fuchsia-500/50"
              textColor="text-fuchsia-500"
            />
          </section>

          {/* popular books */}
          <section className="mt-8">
            {/* title */}
            <Title title="Most Popular Books." />

            {/* table */}
            <div className="overflow-y-scroll scrollbar-hide xs:h-[8rem] lg:h-[19rem]">
              {bookBorrows?.length > 0 ? (
                <Table
                  data={modifyBookBorrowsForPopularBooksTable(bookBorrows)}
                  columns={popularBookBorrowsTableColumns}
                  show_filters={false}
                  table_height="h-[32rem] xs:h-[8rem] lg:h-[19rem]"
                />
              ) : (
                <div className="mt-2 flex h-[10rem] items-center justify-center rounded-[2rem] border">
                  No Popular Books Yet
                </div>
              )}
            </div>
          </section>
        </section>
      )}
    </section>
  );
};

export default AdminDashboard;
