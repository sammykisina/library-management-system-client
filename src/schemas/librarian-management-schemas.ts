import { object, string } from "zod";

const librarianSchema = object({
  name: string({
    required_error: "Name is required.",
  })
    .trim()
    .min(5, { message: "Name should be at least 5 characters" }),
  email: string({
    required_error: "Email is required.",
  })
    .trim()
    .email({
      message: "Enter a valid email.",
    }),
  password: string({
    required_error: "Password is required.",
  }).trim(),
});

const librarianManagementSchemas = {
  librarianSchema,
};

export default librarianManagementSchemas;
