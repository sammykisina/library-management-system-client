import { useBook } from "@/hooks";
import React from "react";
import {
  ReceiveBackBookWidget,
  SpinnerLoader,
  Table,
  Title,
  Widget,
} from "@/components";
import { borrowAtoms } from "@/atoms";
import { useRecoilState } from "recoil";

const Borrows = () => {
  /**
   * component states
   */
  const {
    bookBorrows,
    isFetchingBookBorrows,
    adminBookBorrowsTableColumns,
    modifyBookBorrowsDataForBookBorrowsTable,
  } = useBook();
  const { showReceiveBorrowedBookWidgetState } = borrowAtoms;
  const [showReceiveBorrowedBookWidget, setShowReceiveBorrowedBookWidget] =
    useRecoilState(showReceiveBorrowedBookWidgetState);

  /**
   * component functions
   */
  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title */}
      <Title title="BORROWINGS REQUESTS" />

      <section className="mt-5">
        {isFetchingBookBorrows ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : bookBorrows?.length > 0 ? (
          <Table
            data={modifyBookBorrowsDataForBookBorrowsTable(bookBorrows)}
            columns={adminBookBorrowsTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[28rem] lg:h-[31.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No one has initiated a book borrow process yet.
          </div>
        )}
      </section>

      {/* widgets */}
      <Widget
        widgetState={showReceiveBorrowedBookWidget}
        component={<ReceiveBackBookWidget />}
        widgetStyles="w-[90vw] h-fit"
      />
    </section>
  );
};

export default Borrows;
