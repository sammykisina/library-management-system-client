import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";
import { useUsers } from "@/hooks";

type DeleteLibrarianProps = {
  librarianId: number;
};

const DeleteLibrarian: FC<DeleteLibrarianProps> = ({ librarianId }) => {
  /**
   * component states
   */
  const { isDeletingLibrarian, deleteLibrarianMutateAsync } = useUsers();

  return (
    <Button
      title={
        isDeletingLibrarian ? (
          <SpinnerLoader color="fill-white" size="w-4 h-4" />
        ) : (
          "Delete"
        )
      }
      intent="danger"
      form="small"
      type="button"
      purpose={() => deleteLibrarianMutateAsync(librarianId)}
      disabled={isDeletingLibrarian}
    />
  );
};

export default DeleteLibrarian;
