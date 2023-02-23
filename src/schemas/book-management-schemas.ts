import { object, string } from "zod";

const bookSchema = object({
  name: string().trim().min(1, { message: "Book name is required." }),
  author: string().trim().min(1, { message: "Book author is required." }),
  publisher: string().trim().min(1, { message: "Book publisher is required." }),
  yearOfPublish: string()
    .trim()
    .min(4, { message: "Book Year publisher is required." })
    .max(4, { message: "Enter a valid publish year" }),
  price: string().trim().min(1, { message: "Book price is required." }),
  description: string().trim().min(10, {
    message: "Book description is required. (at least 10 characters)",
  }),
  count: string().trim().min(1, {
    message: "Enter how many books",
  }),
  pages: string().trim().min(1, {
    message: "enter how many pages is the book.",
  }),
});

const bookLocationSchema = object({
  block: string().trim().min(1, { message: "Block name is required." }),
  shelve: string().trim().min(1, { message: "Shelve name is required." }),
  row: string().trim().min(1, { message: "Row is the shelve is required." }),
});

const bookManagementSchemas = {
  bookSchema,
  bookLocationSchema,
};

export default bookManagementSchemas;
