import React from "react";

const BookStatusCell = ({ value }: { value: string }) => {
  return (
    <span
      className={`rounded-full bg-gray-200/10 px-3 py-1 text-xs capitalize leading-loose shadow-sm  ${
        value === "readin" ? "text-indigo-500" : " text-green-500"
      }`}
    >
      {value}
    </span>
  );
};

export default BookStatusCell;
