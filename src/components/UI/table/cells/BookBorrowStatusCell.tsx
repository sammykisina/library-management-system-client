import React from "react";

const BookBorrowStatusCell = ({ value }: { value: string }) => {
  return (
    <span
      className={`rounded-full bg-gray-200/10 px-3 py-1 text-xs capitalize leading-loose shadow-sm ${
        value === "rejected" && "text-red-500"
      } ${value === "not approved" && "text-amber-500"} ${
        value === "approved awaiting return" && "text-purple-500"
      } ${value === "notified to return book today" && "text-amber-500"} ${
        value === "notified of late return" && "text-amber-500"
      } ${value === "returned" && "text-fuchsia-500"} ${
        value === "reported lost" && "text-red-500"
      }`}
    >
      {value}
    </span>
  );
};

export default BookBorrowStatusCell;
