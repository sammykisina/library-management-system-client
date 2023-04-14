import { borrowAtoms } from "@/atoms";
import {
  Button,
  Notifications,
  Select,
  SpinnerLoader,
  Title,
  WidgetHeader,
} from "@/components";
import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { differenceInDays, format, isPast } from "date-fns";
import { bookManagementConstants } from "@/constants";
import { useUsers } from "@/hooks";

const ReceiveBackBookWidget = () => {
  /**
   * component states
   */
  const { isReceivingBook, receiveBookMutateAsync } = useUsers();
  const { globalBorrowState, showReceiveBorrowedBookWidgetState } = borrowAtoms;
  const [globalBorrow, setGlobalBorrow] = useRecoilState(globalBorrowState);
  const setShowReceiveBorrowedBookWidget = useSetRecoilState(
    showReceiveBorrowedBookWidgetState
  );
  const { bookReturnCondition } = bookManagementConstants;
  const lateReturnCharges =
    differenceInDays(
      new Date(),
      new Date(globalBorrow?.attributes?.dateToReturn)
    ) * 5;

  const [selectedBookCondition, setSelectedBookCondition] = useState({
    name: "",
    value: "",
  });

  /**
   * component functions
   */
  const onSubmit = () => {
    if (selectedBookCondition.value === "") {
      Notifications.errorNotification("Select the returned book condition.");
      return;
    }

    let charges = 0;
    if (selectedBookCondition.value === "has given") {
      charges = isPast(new Date(globalBorrow?.attributes?.dateToReturn))
        ? lateReturnCharges
        : 0;
    } else {
      charges =
        (isPast(new Date(globalBorrow?.attributes?.dateToReturn))
          ? lateReturnCharges
          : 0) + globalBorrow?.relationships?.book?.attributes?.price;
    }

    console.log({
      charges: charges,
      bookCondition: selectedBookCondition?.value,
      dateReturned: format(new Date(), "EE, MMMM d, yyy"),
    });

    receiveBookMutateAsync({
      borrowId: globalBorrow?.id,
      returnBookData: {
        charges: charges,
        bookCondition: selectedBookCondition?.value,
        dateReturned: format(new Date(), "EE, MMMM d, yyy"),
      },
    });
  };

  return (
    <section>
      <WidgetHeader
        close={() => {
          setGlobalBorrow(null);
          setShowReceiveBorrowedBookWidget(false);
          // clearForm();
        }}
        title="Receiving A Borrowed Book."
      />

      {/* body */}
      <form className="flex flex-col gap-6 px-2">
        <div className="flex  w-full flex-col gap-4 py-3 scrollbar-hide">
          {/* book info */}
          <div className="flex flex-col gap-y-2 rounded-md border border-primary/10 py-4 px-2">
            <Title title="Book Information." />

            <div>
              <span>{globalBorrow?.relationships?.book?.attributes?.name}</span>
              <span>
                {" "}
                [{globalBorrow?.relationships?.book?.attributes?.isbn}]
              </span>
            </div>
          </div>

          {/* borrower info */}
          <div className="flex flex-col gap-y-2 rounded-md border border-primary/10 py-4 px-2">
            <Title title="Borrower Information." />

            <div>
              <span>
                {globalBorrow?.relationships?.borrower?.attributes?.name}
              </span>
              <span>
                {" "}
                [{globalBorrow?.relationships?.borrower?.attributes?.email}]
              </span>
            </div>
          </div>

          {/* charges */}
          <div className="flex flex-col gap-y-2 rounded-md border border-primary/10 py-4 px-2">
            <Title title="Charges Incase of Late Returns." />

            {isPast(new Date(globalBorrow?.attributes?.dateToReturn)) ? (
              <div>
                <div>
                  <span>Number Of Days After The Set Day Of Return:</span>
                  <span>
                    {" "}
                    {differenceInDays(
                      new Date(),
                      new Date(globalBorrow?.attributes?.dateToReturn)
                    )}
                  </span>
                </div>

                <div>
                  <span>Charges Per Day:</span>
                  <span> 5 (USD)</span>
                </div>

                <div>
                  <span>Total Cost Of Late Return:</span>
                  <span> {lateReturnCharges} (USD)</span>
                </div>
              </div>
            ) : (
              <span>No Charges</span>
            )}
          </div>

          {/* book condition */}
          <div className="rounded-md border border-primary/10 py-4 px-2">
            <div className="flex items-center gap-2">
              <span className="text-secondary">Book Condition</span>
              <Select
                multiple={false}
                options={bookReturnCondition}
                select_wrapper_styles="border  rounded-[0.9rem] py-2 w-full"
                select_panel_styles="max-h-[15rem] bg-white border border-dark shadow-md"
                selected={selectedBookCondition}
                setSelected={setSelectedBookCondition}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            title={
              isReceivingBook ? <SpinnerLoader color="fill-white" /> : "Receive"
            }
            type="button"
            purpose={onSubmit}
            intent="primary"
          />
        </div>
      </form>
    </section>
  );
};

export default ReceiveBackBookWidget;
