import { object, string } from "zod";

const Book = object({
  isbn: string(),
  name: string(),
  author: string(),
  publisher: string(),
  dateOfPublish: string(),
  publisherAddress: string(),
  price: string(),
  description: string(),
  count: string(),
  pages: string(),
  status: string(),
});

const BookLocation = object({
  block: string(),
  shelve: string(),
  row: string(),
});

const Borrow = object({
  dateBorrowed: string(),
  dateToReturn: string(),
});

const types = {
  Book,
  BookLocation,
  Borrow,
};

export default types;
