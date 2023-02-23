import React from "react";
import {
  Widget,
  SpinnerLoader,
  Table,
  Title,
  BookInfoWidget,
} from "@/components";
import { useRecoilValue } from "recoil";
import { bookAtoms } from "@/atoms";
import { useBook, useUsers } from "@/hooks";

const Students = () => {
  /**
   * component states
   */
  const {
    books,
    isFetchingBooks,
    modifyBooksDataForBooksTable,
    userBooksTableColumns,
  } = useBook();
  const { showBookInfoWidgetState } = bookAtoms;
  const showBookInfoWidget = useRecoilValue(showBookInfoWidgetState);

  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title */}
      <Title title="Search By: [Title, Name, ISBN, Or Author]" />

      {/* the  body */}
      <section className="mt-5">
        {isFetchingBooks ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : books?.length > 0 ? (
          <Table
            data={modifyBooksDataForBooksTable(books)}
            columns={userBooksTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[28rem] lg:h-[31.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Books Created Yet.
          </div>
        )}
      </section>

      <Widget
        widgetState={showBookInfoWidget}
        component={<BookInfoWidget />}
        widgetStyles="w-[90vw] h-fit"
      />
    </section>
  );
};

export default Students;
