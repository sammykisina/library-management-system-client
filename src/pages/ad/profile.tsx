import {
  Button,
  CreateOrEditLibrarian,
  SpinnerLoader,
  Table,
  Title,
  Widget,
} from "@/components";
import React from "react";
import { librarianAtoms } from "@/atoms";
import { useRecoilState } from "recoil";
import { useUsers } from "@/hooks";

const Profile = () => {
  /**
   * page states
   */
  const { globalLibrarianState, showCreateOrEditLibrarianState } =
    librarianAtoms;
  const [showCreateOrEditLibrarian, setShowCreateOrEditLibrarian] =
    useRecoilState(showCreateOrEditLibrarianState);
  const {
    librarians,
    isFetchingLibrarians,
    modifyUsersDataForUsersTable,
    librariansTableColumns,
  } = useUsers();

  return (
    <section className="h-full xs:h-[36rem] lg:h-[39rem]">
      {/* title and creation button */}
      <div className="flex  items-center justify-between">
        <Title title="LIBRARIANS." />

        <Button
          title="Create a Librarian"
          form="medium"
          intent="primary"
          type="button"
          purpose={() => setShowCreateOrEditLibrarian(true)}
        />
      </div>

      {/* the  body */}
      <section className="mt-5">
        {isFetchingLibrarians ? (
          <div className="flex items-center justify-center xs:h-[36rem] lg:h-[39rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : librarians?.length > 0 ? (
          <Table
            data={modifyUsersDataForUsersTable(librarians)}
            columns={librariansTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[28rem] lg:h-[31.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[26.5rem] lg:h-[31rem]">
            No Librarians Created Yet.
          </div>
        )}
      </section>

      <Widget
        widgetState={showCreateOrEditLibrarian}
        component={<CreateOrEditLibrarian />}
        widgetStyles="w-[90vw] h-fit"
      />
    </section>
  );
};

export default Profile;
