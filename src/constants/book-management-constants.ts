const bookStatutes = [
  {
    name: "ReadIn",
    value: "readin",
  },
  {
    name: "Borrowable",
    value: "borrowable",
  },
];

const bookReturnCondition = [
  {
    name: "Book is has Given",
    value: "has given",
  },
  {
    name: "Book is not has Given",
    value: "not has given",
  },
  {
    name: "Lost",
    value: "lost",
  },
];

const bookManagementConstants = {
  bookStatutes,
  bookReturnCondition,
};

export default bookManagementConstants;
