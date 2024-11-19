"use client"; // Next.js directive to ensure this file is rendered on the client side

import { useState, useEffect } from "react"; // Importing useState hook for state management
import { toast } from "react-hot-toast"; // Importing toast notifications for user feedback
import { useForm } from "react-hook-form"; // React Hook Form for form management
import { zodResolver } from "@hookform/resolvers/zod"; // Zod resolver for React Hook Form to handle schema-based validation
import * as z from "zod"; // Zod for defining validation schemas
import { Button } from "@/components/ui/button"; // UI component for buttons
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"; // UI components for form structure and labels
import {
  MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger
} from "@/components/ui/multi-select"; // UI components for multi-selection dropdown
import { useAddDealContext } from '@/components/DealContext'; // Import context for deal data
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import {selectServicesSchema} from '@/lib/validation'


// Type definition for form data using Zod inference
type ServicesFormData = z.infer<typeof selectServicesSchema>;

export default function AvailabilityForm() {
  const [loading, setLoading] = useState(false); // State to handle loading state for submit button
  const router = useRouter(); // Initialize the router

  // Accessing the context to get the current deal data
  const { updatedNewDealDetails, newDealData } = useAddDealContext();

  // Initialize React Hook Form with Zod validation schema
  const form = useForm<ServicesFormData>({
    resolver: zodResolver(selectServicesSchema),
    defaultValues: {
      services: newDealData?.services || [], // Default to the services in newDealData or an empty array
    },
  });

  // Real-time form change handler to update context
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Update the context with the latest form values whenever they change
      updatedNewDealDetails({
        ...newDealData,
        services: value.services, // Update the services with the new value
      });
    });

    // Cleanup the subscription on unmount
    return () => subscription.unsubscribe();
  }, [form, updatedNewDealDetails, newDealData]);

  // Handler for form submission
  const onSubmit = async (data: ServicesFormData) => {
    setLoading(true);
    try {
      // Show success toast
      toast.success("Services selected: " + data.services.join(", "));

      // Navigate to the next step
      router.push("/booking/step-two");
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen px-4">
      <div className="w-full max-w-3xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)} // Triggers onSubmit on form submission
            className="space-y-8 max-w-3xl mx-auto py-10 flex flex-col justify-between"
          >
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
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-full"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select services" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {/* Predefined options for the multi-select (services) */}
                          <MultiSelectorItem value={"E-File Manicure"}>E-File Manicure</MultiSelectorItem>
                          <MultiSelectorItem value={"E-file Pedicure"}>E-file Pedicure</MultiSelectorItem>
                          <MultiSelectorItem value={"Extensions"}>Extensions</MultiSelectorItem>
                          <MultiSelectorItem value={"Nail Removal"}>Nail Removal</MultiSelectorItem>
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormDescription>Select multiple options.</FormDescription>
                  <FormMessage /> {/* Displays validation messages if any */}
                </FormItem>
              )}
            />

            {/* Submit button */}
            <div className="mt-auto">
              <Button
                type="submit"
                disabled={loading} // Disable button while loading
                className="border-2 p-2 rounded-md bg-black text-white border-slate-200"
              >
                {loading ? "Submitting..." : "Next"} {/* Change text based on loading state */}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
