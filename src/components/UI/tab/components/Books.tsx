import React from "react";
import {
  TabTitle,
  Button,
  Widget,
  SpinnerLoader,
  Table,
  Title,
} from "@/components";
import { useRecoilState, useRecoilValue } from "recoil";

const Students = () => {
  /**
   * component states
   */

  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title and creation button */}
      <div className="flex  justify-between">
        <Title title="Books." />

        <Button
          title="Create A Book"
          form="medium"
          intent="primary"
          type="button"
          // purpose={() => setShowCreateOrEditStudentWidget(true)}
        />
      </div>

      {/* the  body */}
      <section className="mt-5">
        {/* {isFetchingStudents ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : students?.length > 0 ? (
          <Table
            data={modifyStudentsDataForStudentsTable(students)}
            columns={studentTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[28rem] lg:h-[31.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Students Registered Yet.
          </div>
        )} */}
      </section>

      {/* <Widget
        widgetState={showCreateOrEditStudentWidget}
        component={<CreateOrEditStudentWidget />}
        widgetStyles="w-[90vw] h-fit"
      /> */}

      {/* <Widget
        widgetState={showStudentFullInfoWidget}
        component={<StudentFullInfoWidget />}
        widgetStyles="w-[90vw] h-fit"
      /> */}
    </section>
  );
};

export default Students;
