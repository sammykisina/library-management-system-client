import { useMemo } from "react";
import useAuth from "./useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserAPI } from "@/api";
import type { z } from "zod";
import { APITypes } from "src/types";
import { format } from "date-fns";

const useUsers = () => {
  /**
   * hook states
   */
  const { user } = useAuth();
  const { APIUser } = APITypes;
  type User = z.infer<typeof APIUser>;
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
        Header: "Created At",
        accessor: "createdAt",
      },
    ],
    []
  );
  // const queryClient = useQueryClient();
  //  queryClient.invalidateQueries({ queryKey: ["intakes"] });

  /**
   * hook functions
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

  const modifyUsersDataForUsersTable = (allUsers: unknown[]) => {
    let modifiedUsers = [] as unknown[];

    allUsers?.map((user: any) => {
      modifiedUsers = [
        ...modifiedUsers,
        {
          name: user?.attributes?.name,
          email: user?.attributes?.email,
          createdAt: format(
            new Date(user?.attributes?.createdAt),
            "EE, MMM d, yyy"
          ),
        },
      ];
    });

    return modifiedUsers;
  };

  return {
    users,
    isFetchingUsers,
    modifyUsersDataForUsersTable,
    usersTableColumns,
  };
};

export default useUsers;
