import React from "react";
import { SpinnerLoader, Table, Title } from "@/components";
import { useUsers } from "@/hooks";

const Users = () => {
  /**
   * page states
   */

  const {
    isFetchingUsers,
    users,
    modifyUsersDataForUsersTable,
    usersTableColumns,
  } = useUsers();

  return (
    <section className="h-full">
      {/* title */}
      <Title title="USERS." />

      {/* the  body */}
      <section className="mt-5">
        {isFetchingUsers ? (
          <div className="flex h-[32rem]  items-center  justify-center xs:h-[27.5rem] lg:h-[28.5rem]">
            <SpinnerLoader color="fill-primary" />
          </div>
        ) : users?.length > 0 ? (
          <Table
            data={modifyUsersDataForUsersTable(users)}
            columns={usersTableColumns}
            show_filters={true}
            table_height="h-[32rem] xs:h-[27.5rem] lg:h-[28.5rem]"
          />
        ) : (
          <div className="flex h-[32rem] flex-col items-center justify-center gap-3 rounded-[2rem] border xs:h-[27.5rem]  lg:h-[28.5rem]">
            No Staff Yet.
          </div>
        )}
      </section>
    </section>
  );
};

export default Users;
