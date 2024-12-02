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


// Zod schema definition for the availability form
export const selectServicesSchema = z.object({
  services: z.array(z.string()).nonempty("Please select at least one service."),
  cost:z.number()
});

export const ClientFormValidation = z.object({
  name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  });





  export const availabilitySchema = z.object({
    time: z.string().min(1, "Time is required"), // Ensure time is required and not empty
    date: z.coerce.date().refine((date) => !isNaN(date.getTime()), "Date is required"), // Ensure a valid date is selected
  });
  


// Define the main schema for a "new deal" by combining existing schemas
export const newDealSchema = z.object({
  // Spread operator combines validation rules from two schemas:
  // `availabilitySchema` (e.g., related to service availability)
  // `ClientFormValidation` (e.g., related to client details)
  staff: z.string().min(1, "Select a staff"),
  ...selectServicesSchema.shape,
  ...availabilitySchema.shape,
  ...ClientFormValidation.shape,
});

// Update the schema for initial values if needed
export const newDealInitialValuesSchema = z.object({
  services: z.array(z.string()).optional(), // Align schema with the type
  time: z.string().optional(),
  date: z.string().optional(),
  staff: z.string().optional(),
  customerName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  taxes:z.number().optional(),
  subtotal:z.number().optional(),
  cost: z.number().optional(),
});

// Use Zod's `infer` method to create TypeScript types from the schemas
// These types help ensure form data matches the schemas at compile time

// Type for the "new deal" form's validated data
export type NewDealType = z.infer<typeof newDealSchema>;

// Type for the "new deal" form's initial values
export type NewDealInitialValuesType = z.infer<typeof newDealInitialValuesSchema>;