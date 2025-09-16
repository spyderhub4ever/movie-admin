import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  image: z
    .any()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0] instanceof File,
      {
        message: "Invalid file upload",
      }
    ),
});

export type UserFormValues = z.infer<typeof userSchema>;
