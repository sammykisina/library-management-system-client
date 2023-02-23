import { useUsers } from "@/hooks";
import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";

type ApproveBookBorrow = {
  borrowId: number;
};

const ApproveBookBorrow: FC<ApproveBookBorrow> = ({ borrowId }) => {
  /**
   * component states
   */
  const { approveBookBorrowMutateAsync, isApprovingBookBorrow } = useUsers();

  return (
    <Button
      title={
        isApprovingBookBorrow ? (
          <SpinnerLoader color="fill-white" size="w-4 h-4" />
        ) : (
          "APPROVE"
        )
      }
      form="small"
      type="button"
      intent="primary"
      purpose={() => approveBookBorrowMutateAsync(borrowId)}
      disabled={isApprovingBookBorrow}
    />
  );
};

export default ApproveBookBorrow;
