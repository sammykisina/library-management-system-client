import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";
import { useUsers } from "@/hooks";

type RejectBookBorrowProps = {
  borrowId: number;
};

const RejectBookBorrow: FC<RejectBookBorrowProps> = ({ borrowId }) => {
  /**
   * component states
   */
  const { rejectBookBorrowMutateAsync, isRejectingBookBorrow } = useUsers();


  return (
    <Button
      title={
        isRejectingBookBorrow ? (
          <SpinnerLoader color="fill-white" size="w-4 h-4" />
        ) : (
          "Reject"
        )
      }
      form="small"
      type="button"
      intent="danger"
      purpose={() => rejectBookBorrowMutateAsync(borrowId)}
      disabled={isRejectingBookBorrow}
    />
  );
};

export default RejectBookBorrow;
