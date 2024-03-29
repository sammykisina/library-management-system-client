import { number, object, string } from "zod";

const loginSchema = object({
  email: string({
    required_error: "Email is required.",
  })
    .trim()
    .email({
      message: "Enter a valid email.",
    }),
  password: string({
    required_error: "Password is required.",
  })
    .trim()
    .min(5),
});

const signupSchema = object({
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
  phone: string({
    required_error: "Phone is required.",
  })
    .trim()
    .min(10, "Phone should be at least 10 characters")
    .max(10, "Phone should be at least 10 characters"),
  password: string({
    required_error: "Password is required.",
  })
    .trim()
    .min(5),
  password_confirm: string({
    required_error: "Password is required.",
  })
    .trim()
    .min(5),
}).refine((data) => data.password === data.password_confirm, {
  message: "Passwords don't match",
  path: ["password_confirm"],
});

const passwordUpdateSchema = object({
  password: string({ required_error: "Password is required." }).trim(),
  confirm: string({ required_error: "Enter password to confirm." }).trim(),
}).refine((data) => data.confirm === data.password, {
  message: "Passwords don't match",
  path: ["confirm"],
});

const authSchemas = { loginSchema, signupSchema, passwordUpdateSchema };

export default authSchemas;
