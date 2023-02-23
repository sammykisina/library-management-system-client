import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";
import { useBook } from "@/hooks";

type DeleteBookProps = {
  bookId: number;
};

const DeleteBook: FC<DeleteBookProps> = ({ bookId }) => {
  /**
   * component states
   */
  const { deleteBookMutateAsync, isDeletingBook } = useBook();

  return (
    <Button
      title={
        isDeletingBook ? (
          <SpinnerLoader color="fill-white" size="w-4 h-4" />
        ) : (
          "Delete"
        )
      }
      intent="danger"
      form="small"
      type="button"
      purpose={() => deleteBookMutateAsync(bookId)}
      disabled={isDeletingBook}
    />
  );
};

export default DeleteBook;
