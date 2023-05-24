import { useAuth, useUsers } from "@/hooks";
import type { FC } from "react";
import { Button, SpinnerLoader } from "@/components";
import { addDays, format, isPast, isBefore } from "date-fns";

type BorrowBookProps = {
  bookId: number;
  currentBookBorrowsIds: number[];
  thisBooksBorrowsIdsWithStatedReturnDates: any[];
};

const BorrowBook: FC<BorrowBookProps> = ({
  bookId,
  currentBookBorrowsIds,
  thisBooksBorrowsIdsWithStatedReturnDates,
}) => {
  /**
   * component states
   */
  const { user } = useAuth();
  const { isBorrowingBook, borrowBookMutateAsync } = useUsers();

  return (
    <div>
      {currentBookBorrowsIds.includes(user?.id || 0) ? (
        <div>
          {thisBooksBorrowsIdsWithStatedReturnDates.filter(
            (thisBooksBorrowsIdsWithStatedReturnDate) => {
              if (thisBooksBorrowsIdsWithStatedReturnDate.dateReturned) {
                return isBefore(
                  new Date(
                    thisBooksBorrowsIdsWithStatedReturnDate.dateReturned
                  ),
                  new Date(thisBooksBorrowsIdsWithStatedReturnDate.dateToReturn)
                );
              }

              if (
                thisBooksBorrowsIdsWithStatedReturnDate.status === "returned" &&
                isPast(
                  new Date(thisBooksBorrowsIdsWithStatedReturnDate.dateToReturn)
                )
              ) {
                return true;
              }
            }
          )?.length > 0 && (
            <Button
              title={
                isBorrowingBook ? (
                  <SpinnerLoader color="fill-white" size="w-4 h-4" />
                ) : (
                  "Borrow"
                )
              }
              form="small"
              type="button"
              intent="primary"
              purpose={() =>
                borrowBookMutateAsync({
                  bookId: bookId,
                  userId: user?.id || 0,
                  borrowBookData: {
                    dateBorrowed: format(new Date(), "EE, MMMM d, yyy"),
                    dateToReturn: format(
                      addDays(new Date(), 7),
                      "EE, MMMM d, yyy"
                    ),
                  },
                })
              }
              disabled={isBorrowingBook}
            />
          )}
        </div>
      ) : (
        <Button
          title={
            isBorrowingBook ? (
              <SpinnerLoader color="fill-white" size="w-4 h-4" />
            ) : (
              "Borrow"
            )
          }
          form="small"
          type="button"
          intent="primary"
          purpose={() =>
            borrowBookMutateAsync({
              bookId: bookId,
              userId: user?.id || 0,
              borrowBookData: {
                dateBorrowed: format(new Date(), "EE, MMMM d, yyy"),
                dateToReturn: format(addDays(new Date(), 7), "EE, MMMM d, yyy"),
              },
            })
          }
          disabled={isBorrowingBook}
        />
      )}
    </div>
  );
};

export default BorrowBook;
