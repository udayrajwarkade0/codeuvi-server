
const { z } = require("zod");


// Login Schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});



// Signup Schema
const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must not exceed 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: " Invalid email address" }) // this is valid
    .min(3, { message: "Email must be at least 3 characters" })
    .max(255, { message: "Email must not exceed 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .length(10, { message: "Phone must be exactly 10 digits" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(1025, { message: "Password must not exceed 1025 characters" }),
});

module.exports = { signupSchema, loginSchema };
