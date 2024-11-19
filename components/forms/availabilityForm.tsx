import { useState, useEffect } from "react"; 
import { toast } from "react-hot-toast"; 
import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import * as z from "zod"; 
import { cn } from "@/lib/utils"; 
import { Button } from "@/components/ui/button"; 
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"; 
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"; 
import { format } from "date-fns"; 
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; 
import { Calendar } from "@/components/ui/calendar"; 
import { Calendar as CalendarIcon } from "lucide-react"; 
import { IStaff } from "@/interfaces"; 
import { Alert } from "antd"; 
import { checkStaffAvailability } from "@/server-actions/appointments"; 
import { workHours } from "@/constants/index"; 
import AvailableStaff from "@/components/available-staff"; 
import PatientForm from "@/components/forms/patient-form"; 
import { UseFormReturn } from "react-hook-form"; 


interface AvailabilityFormProps {
  form: UseFormReturn<{ date: Date; time: string }, any>; // Form type definition with date and time fields
  onSubmit: (data: { date: Date; time: string }) => void; // Function type for handling form submission
}

export default function AvailabilityForm({ form, onSubmit }: AvailabilityFormProps) {
  const [availableStaffs, setAvailableStaffs] = useState<IStaff[]>([]);


  return (
    <Form {...form}>
      {/* Field for selecting time (dropdown) */}
      <FormField
        control={form.control}
        name="time"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Time</FormLabel>
            <Select value={field.value || ""} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a timeslot" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {workHours.map((workHour, i) => (
                  <SelectItem key={i} value={workHour.value}>
                    {workHour.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>Select a time slot</FormDescription>
            <FormMessage />
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
                  selected={field.value} // Ensure the selected date is reflected
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
    </Form>
  );
}
