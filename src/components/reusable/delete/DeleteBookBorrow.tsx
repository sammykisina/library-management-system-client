import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";
import { useUsers } from "@/hooks";

type DeleteBookBorrowProps = {
  borrowId: number;
};
const DeleteBookBorrow: FC<DeleteBookBorrowProps> = ({ borrowId }) => {
  /**
   * component states
   */
  const { isDeletingBookBorrow, deleteBookBorrowMutateAsync } = useUsers();

  return (
    <Button
      title={
        isDeletingBookBorrow ? (
          <SpinnerLoader color="fill-white" size="w-4 h-4" />
        ) : (
          "Delete"
        )
      }
      intent="danger"
      form="small"
      type="button"
      purpose={() => deleteBookBorrowMutateAsync(borrowId)}
      disabled={isDeletingBookBorrow}
    />
  );
};

export default DeleteBookBorrow;
