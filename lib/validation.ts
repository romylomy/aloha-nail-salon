import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  workDays: z
    .array(z.string())
    .min(1, "Select at least 1 workday"),
  startTime: z.string().min(1, "Select starting time"),
  endTime: z.string().min(1, "Select ending time"),
  bio: z
    .string()
    .min(50, "Add more description")
    .max(500, "Add more description")
});

export const ClientFormValidation = z.object({
  customerName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  });



export const availabilitySchema = z.object({
  services: z.array(z.string()).nonempty("Please select at least one item"),
  staff: z.string().optional(), // Staff is optional at first, will be set later
  time: z.string(),
  date: z.coerce.date(),
});


export const newDealInitialValuesSchema = z.object({
  services: z.string.opitional(),
  name: z.string.opitional(),
  staff: z.string.opitional(),
  time: z.string.opitional(),
  date: z.string.opitional(),
  customerName: z.string.opitional(),
  email: z.string.opitional(),
  phone: z.string.opitional(),
})


export const newDealSchema = z.object({
  ...availabilitySchema.shape,
  ...ClientFormValidation.shape
})

export type NewDeal = z.infer(typeof newDealSchema )