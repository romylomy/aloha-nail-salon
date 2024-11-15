// code references https://github.com/adrianhajdin/healthcare on how he makes reusable forms 

"use client"; // Next.js directive to ensure this file is rendered on the client side

import { useState } from "react"; // Importing useState hook for state management
import { toast } from "react-hot-toast"; // Importing toast notifications for user feedback
import { useForm } from "react-hook-form"; // React Hook Form for form management
import { zodResolver } from "@hookform/resolvers/zod"; // Zod resolver for React Hook Form to handle schema-based validation
import * as z from "zod"; // Zod for defining validation schemas
import { cn } from "@/lib/utils"; // Utility function for class name concatenation
import { Button } from "@/components/ui/button"; // UI component for buttons
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"; // UI components for form structure and labels
import {
  MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger
} from "@/components/ui/multi-select"; // UI components for multi-selection dropdown
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"; // UI components for select dropdown
import { format } from "date-fns"; // Utility function to format dates
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // UI components for date picker popover
import { Calendar } from "@/components/ui/calendar"; // Calendar component for date selection
import { Calendar as CalendarIcon } from "lucide-react"; // Icon component for the calendar icon
import { IStaff } from "@/interfaces"; // Interface for staff data
import { Alert } from "antd"; // Ant Design Alert component for error messages
import { checkStaffAvailability } from "@/server-actions/appointments"; // Server action to check staff availability
import { workHours } from "@/constants/index"; // Predefined working hours
import AvailableStaff from "@/components/available-staff"; // Component for displaying available staff
import PatientForm from "@/components/forms/patient-form"; // Form component for patient details
import { UseFormReturn } from "react-hook-form"; // Type for the form hook return object

// Props interface to define the expected shape of the AvailabilityForm component props
interface AvailabilityFormProps {
  form: UseFormReturn<{ date: Date; time: string }, any>; // Form type definition with date and time fields
  onSubmit: (data: { date: Date; time: string }) => void; // Function type for handling form submission
}

// Functional component to render the availability form
export default function AvailabilityForm({ form, onSubmit }: AvailabilityFormProps) {
  return (
    <Form {...form}>
      {/* Form element for handling the form submit action */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        {/* Field for selecting services (multi-select dropdown) */}
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <FormControl>
                {/* Multi-selector component for choosing services */}
                <MultiSelector
                  values={field.value} // Bound to form field value
                  onValuesChange={field.onChange} // Updates the form value on change
                  loop
                  className="max-w-xs"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select services" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {/* Predefined options for the multi-select (services) */}
                      <MultiSelectorItem value={"E-File ManiCure"}>E-File ManiCure</MultiSelectorItem>
                      <MultiSelectorItem value={"E-file Pedicure"}>E-file Pedicure</MultiSelectorItem>
                      <MultiSelectorItem value={"Extenstions"}>Extenstions</MultiSelectorItem>
                      <MultiSelectorItem value={"Nail Removal"}>Nail Removal</MultiSelectorItem>

                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormDescription>Select multiple options.</FormDescription> {/* Description for the form field */}
              <FormMessage /> {/* Displays validation messages if any */}
            </FormItem>
          )}
        />

        {/* Field for selecting time (dropdown) */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}> {/* Select component for choosing time */}
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a timeslot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Loop through the workHours array to create selectable time options */}
                  {workHours.map((workHour, i) => (
                    <SelectItem key={i} value={workHour.value}>{workHour.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select a time slot</FormDescription> {/* Description for the form field */}
              <FormMessage /> {/* Displays validation messages if any */}
            </FormItem>
          )}
        />

        {/* Field for selecting date (date picker) */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    {/* Button to trigger the date picker popover */}
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground" // Conditional styling if no date is selected
                      )}
                    >
                      {/* Display selected date or a placeholder */}
                      {field.value ? (
                        format(field.value, "PPP") // Format the date to a readable string
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> {/* Calendar icon */}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  {/* Calendar component for selecting a date */}
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange} // Update the form field value on date selection
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Pick the appointment date.</FormDescription> {/* Description for the form field */}
              <FormMessage /> {/* Displays validation messages if any */}
            </FormItem>
          )}
        />
        
        {/* Submit button to check availability */}
        <Button type="submit">Check availability</Button>

      </form>
    </Form>
  );
}
