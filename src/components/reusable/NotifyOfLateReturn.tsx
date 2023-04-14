import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";
import { useUsers } from "@/hooks";

type NotifyOfLateReturnProps = {
  borrowId: number;
};

const NotifyOfLateReturn: FC<NotifyOfLateReturnProps> = ({ borrowId }) => {
  /**
   * component states
   */
  const { isNotifyingOfLateReturn, notifyOfLateReturnMutateAsync } = useUsers();

  return (
    <div className="relative">
      <Button
        title={
          isNotifyingOfLateReturn ? (
            <SpinnerLoader color="fill-white" size="w-4 h-4" />
          ) : (
            "Notify Of Late Return"
          )
        }
        form="small"
        type="button"
        intent="primary"
        purpose={() => notifyOfLateReturnMutateAsync(borrowId)}
        disabled={isNotifyingOfLateReturn}
      />

      <div className=" absolute -top-1 h-4 w-4 animate-pulse rounded-full bg-red-500" />
    </div>
  );
};

export default NotifyOfLateReturn;
