import { SpinnerLoader, Table, Title } from "@/components";
import { useBook, useProfile } from "@/hooks";
import React from "react";

const LibraryHistory = () => {
  /**
   * component states
   */
  const { profile, isFetchingProfile } = useProfile();
  const {
    modifyBookBorrowsDataForBookBorrowsTable,
    userBookBorrowsTableColumns,
  } = useBook();

  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title */}
      <Title title="YOUR HISTORY." />

      <section className="mt-5">
        {isFetchingProfile ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : profile?.relationships?.bookBorrows?.length > 0 ? (
          <Table
            data={modifyBookBorrowsDataForBookBorrowsTable(
              profile?.relationships?.bookBorrows
            )}
            columns={userBookBorrowsTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[28rem] lg:h-[31.5rem]"
          />
        ) : (
          <p className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border px-3 text-center xs:h-[26.5rem] lg:h-[31rem]">
            All books you have borrowed and those yet to be approved for
            borrowing will appear here.
          </p>
        )}
      </section>
    </section>
  );
};

export default LibraryHistory;
