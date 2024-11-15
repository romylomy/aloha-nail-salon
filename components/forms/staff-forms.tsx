// code references https://github.com/adrianhajdin/healthcare and chatgpt used for function to generate appropriate endTimes against the startTime (endTime>StartTime)

import { useEffect, useState } from "react";
// Importing useEffect and useState hooks for managing side effects and local state in the component.

import { useForm } from "react-hook-form";
// Importing the useForm hook to handle form state, validation, and submission.

import { z } from "zod";
// Importing Zod, a schema validation library.

import { zodResolver } from "@hookform/resolvers/zod";
// Importing a Zod resolver to integrate Zod schema validation with react-hook-form.

import { useRouter } from "next/navigation";
// Importing the useRouter hook to handle routing in a Next.js application.

import CustomFormField, { FormFieldType } from "../CustomFormField";
// Importing the CustomFormField component and FormFieldType enum for form fields.

import SubmitButton from "../SubmitButton";
// Importing the SubmitButton component.

import { Form } from "@/components/ui/form";
// Importing Form component from the UI library.

import { UserFormValidation } from "@/lib/validation";
// Importing a Zod schema for form validation.

import { workHours, workDaysobjects } from "@/constants";
// Importing constants for work hours and work days.

import { SelectItem } from "@/components/ui/select";
// Importing the SelectItem component used for dropdown selections.

import { MultiSelectorItem } from "@/components/ui/multi-select";
// Importing the MultiSelectorItem component for multi-select fields.

import { IStaff } from "@/constants";
// Importing the IStaff interface, which defines the structure for staff data.

import { message } from "antd";
// Importing the message component from Ant Design for displaying success or error messages.

import { addStaff, updateStaff } from "@/server-actions/staff";
// Importing server-side actions for adding or updating staff data.

interface StaffFormProps {
  // Defining the props interface for StaffForm.
  type: "add" | "edit"; 
  // `type` determines whether the form is for adding or editing a staff member.
  initialValues?: Partial<IStaff>; 
  // `initialValues` is an optional prop with partial staff data used for pre-filling the form in edit mode.
  setOpen: (open: boolean) => void;
  // `setOpen` is a function to toggle the visibility of the form (e.g., closing the form after submission).
}

export const FormStaff = ({ type = "add", initialValues = {}, setOpen }: StaffFormProps) => {
  // Destructuring props passed into the FormStaff component.

  const router = useRouter();
  // Using the Next.js router to navigate programmatically after submission.

  const [isLoading, setIsLoading] = useState(false);
  // `isLoading` state is used to show a loading indicator during form submission.

  const [filteredEndTimes, setFilteredEndTimes] = useState(workHours);
  // `filteredEndTimes` state dynamically filters available end times based on the selected start time.

  // Initialize the form with react-hook-form and Zod validation
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    // Using the Zod schema for validation with react-hook-form.
    defaultValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      workDays: initialValues?.workDays || "",
      startTime: initialValues?.startTime || "",
      endTime: initialValues?.endTime || "",
      bio: initialValues?.bio || "",
      // Setting default values from initialValues if present, otherwise using empty strings.
    },
  });

  const startTime = form.watch("startTime");
  // Watching the `startTime` field to trigger dynamic updates for end time options.

  useEffect(() => {
    // Effect to update available end times based on the selected start time.
    if (startTime) {
      const startIndex = workHours.findIndex((workHour) => workHour.value === startTime);
      const newEndTimes = workHours.slice(startIndex + 1); // Filter times after the selected start time.
      setFilteredEndTimes(newEndTimes);
    } else {
      setFilteredEndTimes(workHours); // Reset end times if no start time is selected.
    }
  }, [startTime]);
  // The effect runs every time the `startTime` value changes.

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    // Function to handle form submission with async/await.
    setIsLoading(true);
    try {
      const staff = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        workDays: values.workDays,
        startTime: values.startTime,
        endTime: values.endTime,
        bio: values.bio,
        // Preparing staff data from form values.
      };

      let response: any = null;
      if (type === "add") {
        response = await addStaff(staff);
        setOpen(false); // Close form modal on successful addition.
        router.push("/admin/staff"); // Redirect to staff list page.

      } else if (type === "edit" && initialValues?._id) {
        response = await updateStaff({ id: initialValues._id, data: staff });
        setOpen(false); // Close form modal on successful update.
        router.push("/admin/staff"); // Redirect to staff list page.
      }

      if (response && response.success) {
        message.success(response.message); // Show success message.
      } else {
        message.error(response.message || "Failed to save staff data."); // Show error message.
      }
    } catch (error) {
      console.log(error);
      message.error("An error occurred while saving staff data."); // Show error if submission fails.
    }
    setIsLoading(false); // Reset loading state after submission.
  };

  return (
    <Form {...form}>
      {/* Wrapping the form component with react-hook-form's context */}
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {/* Form element with submit handler */}
        
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconAlt="user"
          // Name input field with placeholder and icon.
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconAlt="email"
          // Email input field with placeholder and icon.
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
          // Phone input field with placeholder.
        />

        <CustomFormField
          fieldType={FormFieldType.MULTI_SELECT}
          control={form.control}
          name="workDays"
          label="Work Days"
          placeholder="Select working days"
          // Multi-select field for choosing workdays.
        >
          {workDaysobjects.map((workDaysobject, i) => (
            <MultiSelectorItem key={workDaysobject.label + i} value={workDaysobject.value}>
              <div className="flex cursor-pointer justify-center items-center gap-2">
                <p>{workDaysobject.label}</p>
              </div>
            </MultiSelectorItem>
          ))}
          {/* Dynamically rendering options for workdays. */}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="startTime"
          label="Start Time"
          placeholder="Select start of time"
          // Select field for start time.
        >
          {workHours.map((workHour, i) => (
            <SelectItem key={workHour.label + i} value={workHour.value}>
              <div className="flex cursor-pointer justify-center items-center gap-2">
                <p>{workHour.label}</p>
              </div>
            </SelectItem>
          ))}
          {/* Dynamically rendering options for start time. */}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="endTime"
          label="End Time"
          placeholder="Select ending time"
          // Select field for end time.
        >
          {filteredEndTimes.map((workHour, i) => (
            <SelectItem key={workHour.label + i} value={workHour.value}>
              <div className="flex cursor-pointer justify-center items-center gap-2">
                <p>{workHour.label}</p>
              </div>
            </SelectItem>
          ))}
          {/* Dynamically rendering filtered options for end time. */}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="bio"
          label="Bio"
          placeholder="Tell us about your role and yourself"
          // Textarea field for the bio.
        />

        <SubmitButton
          isLoading={isLoading}
          className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg"
          // Submit button with a loading state and dynamic text based on form type.
        >
          {type === "add" ? "Add Staff" : "Update Staff"}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default FormStaff;
// Exporting the FormStaff component as the default export.
