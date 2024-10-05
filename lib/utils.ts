import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createDepartmentSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  employees: z.array(z.string(), {
    required_error: "Please select at least one employee",
  }),
  description: z.string().optional(),
});

export const createUserSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  username: z.string({ required_error: "Username is required" }),
  designation: z.string({ required_error: "Designation is required" }),
  rank: z.string({ required_error: "Rank is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  role: z.string({ required_error: "Please select a role" }),
});

export const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
  role: z.string({ required_error: "Please select a role" }),
});

export const uploadFormSchema = z
  .object({
    subject: z.string({ required_error: "Subject is required" }),
    reference: z.string({ required_error: "Reference is required" }),
    confirm_reference: z.string({
      required_error: "Confirm Reference is required",
    }),
    priority: z.string({ required_error: "Please select an option" }),
    upload: z.string({ required_error: "Please select a file" }),
  })
  .superRefine(({ confirm_reference, reference }, ctx) => {
    if (confirm_reference !== reference) {
      ctx.addIssue({
        code: "custom",
        message: "Confirm Reference must match the Reference",
        path: ["confirm_reference"],
      });
    }
  });

export const writeSchema = z.object({
  subject: z
    .string({ required_error: "Subject is required" })
    .max(50, "Subject cannot be more than 50 characters"),
  draft: z
    .string({ required_error: "Draft is required" })
    .max(50, "Draft cannot be more than 50 characters"),
});

export const sendSchema = z.object({
  upload: z.string({ required_error: "Please select a file" }),
  priority: z.string({ required_error: "Please select an option" }),
  remarks: z.string().optional(),
});

export const sendLetterSchema = z.object({
  department: z.string({ required_error: "Please select a department" }),
  employees: z.string({
    required_error: "Please select at least one employee",
  }),
});
