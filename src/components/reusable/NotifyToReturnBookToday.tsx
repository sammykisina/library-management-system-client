import { useUsers } from "@/hooks";
import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";

type NotifyToReturnBookTodayProps = {
  borrowId: number;
};

const NotifyToReturnBookToday: FC<NotifyToReturnBookTodayProps> = ({
  borrowId,
}) => {
  /**
   * component states
   */
  const { isNotifyingToReturnBookToday, notifyToReturnBookTodayMutateAsync } =
    useUsers();

  return (
    <div className="relative">
      <Button
        title={
          isNotifyingToReturnBookToday ? (
            <SpinnerLoader color="fill-white" size="w-4 h-4" />
          ) : (
            "Notify Return Book Today"
          )
        }
        form="small"
        type="button"
        intent="primary"
        purpose={() => notifyToReturnBookTodayMutateAsync(borrowId)}
        disabled={isNotifyingToReturnBookToday}
      />

      <div className=" absolute -top-1 h-4 w-4 animate-pulse rounded-full bg-red-500" />
    </div>
  );
};

export default NotifyToReturnBookToday;
