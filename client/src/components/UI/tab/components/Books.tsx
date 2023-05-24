import React from "react";
import {
  TabTitle,
  Button,
  Widget,
  SpinnerLoader,
  Table,
  Title,
  CreateOrEditBookWidget,
  CreateOrEditBookLocationWidget,
  BookInfoWidget,
} from "@/components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { bookAtoms } from "@/atoms";
import { useBook } from "@/hooks";

const Students = () => {
  /**
   * component states
   */
  const {
    books,
    isFetchingBooks,
    modifyBooksDataForBooksTable,
    booksTableColumns,
  } = useBook();
  const {
    showCreateOrEditBookWidgetState,
    showCreateOrEditBookLocationWidgetState,
    showBookInfoWidgetState,
  } = bookAtoms;
  const [showCreateOrEditBookWidget, setShowCreateOrEditBookWidget] =
    useRecoilState(showCreateOrEditBookWidgetState);
  const showCreateOrEditBookLocationWidget = useRecoilValue(
    showCreateOrEditBookLocationWidgetState
  );
  const showBookInfoWidget = useRecoilValue(showBookInfoWidgetState);

  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title and creation button */}
      <div className="flex  items-center justify-between">
        <Title title="BOOKS." />

        <Button
          title="Create A Book"
          form="medium"
          intent="primary"
          type="button"
          purpose={() => setShowCreateOrEditBookWidget(true)}
        />
      </div>

      {/* the  body */}
      <section className="mt-5">
        {isFetchingBooks ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : books?.length > 0 ? (
          <Table
            data={modifyBooksDataForBooksTable(books)}
            columns={booksTableColumns}
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
        widgetState={showCreateOrEditBookWidget}
        component={<CreateOrEditBookWidget />}
        widgetStyles="w-[90vw] h-fit"
      />

      <Widget
        widgetState={showCreateOrEditBookLocationWidget}
        component={<CreateOrEditBookLocationWidget />}
        widgetStyles="w-[90vw] h-fit"
      />

      <Widget
        widgetState={showBookInfoWidget}
        component={<BookInfoWidget />}
        widgetStyles="w-[90vw] h-fit"
      />
    </section>
  );
};

export default Students;
