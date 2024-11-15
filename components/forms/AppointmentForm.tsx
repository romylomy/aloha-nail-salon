
// code references https://github.com/adrianhajdin/healthcare on how he makes reusable forms 

"use client"; // This is a Next.js directive to indicate that the file will be rendered on the client side

import { useState } from "react"; // Importing the useState hook for managing state
import { toast } from "react-hot-toast"; // Importing toast notifications for user feedback
import { useForm } from "react-hook-form"; // Importing React Hook Form to manage forms and validation
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver for integrating Zod validation with React Hook Form
import * as z from "zod"; // Importing Zod for schema validation
import { IStaff } from "@/interfaces"; // Importing the IStaff interface from the project
import { Alert, message } from "antd"; // Importing components from Ant Design for alerts and messages
import { checkStaffAvailability, saveAppointment } from "@/server-actions/appointments"; // Server actions for checking availability and saving appointments
import AvailableStaff from "@/components/available-staff"; // Component to display available staff members
import AvailabilityForm from "@/components/forms/availabilityForm"; // Component for the availability form
import PatientForm from "@/components/forms/patient-form"; // Component for the patient form
import { availabilitySchema, ClientFormValidation } from "@/lib/validation"; // Zod schemas for validating the availability and patient forms
import { yearMonthFormat } from "@/lib/utils"; // Utility function for formatting dates
import { useRouter } from "next/navigation"; // Next.js router for navigating between pages

export default function AppointmentForm() {
  // State for holding available staff, error messages, and the selected staff member
  const [availableStaffs, setAvailableStaffs] = useState<IStaff[]>([]);
  const [error, setError] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);
  const router = useRouter(); // Router instance for page navigation

  // Form instance for the availability form, using Zod for validation
  const availabilityForm = useForm<z.infer<typeof availabilitySchema>>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      services: ["React"], // Default value for services (can be changed as needed)
    },
  });

  // Form instance for the patient form, also using Zod for validation
  const patientForm = useForm<z.infer<typeof ClientFormValidation>>({
    resolver: zodResolver(ClientFormValidation),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "", // Default values for patient information
    },
  });

  // Function to handle submission of the availability form
  const handleAvailabilitySubmit = async (values: z.infer<typeof availabilitySchema>) => {
    try {
      setError(""); // Reset error state
      const { success, data } = await checkStaffAvailability({
        date: values.date, // Passing the selected date and time for availability check
        time: values.time,
      });

      if (!success || !data.length) {
        // If no staff is available, set the error message
        setError("No staff available for the given slot");
      } else {
        // Otherwise, update the available staff list
        setAvailableStaffs(data);
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred."); // Show a toast notification for any errors
    }
  };

  // Function to handle staff selection
  const handleStaffSelection = (staff: IStaff) => {
    setSelectedStaff(staff); // Set the selected staff in the state
    availabilityForm.setValue("staff", staff._id); // Set the selected staff's ID in the form
    availabilityForm.setValue("staffName", staff.name); // Set the selected staff's name in the form
  };

  // Function to handle the final form submission (combining both forms)
  const handleFinalSubmit = async () => {
    const isAvailabilityValid = await availabilityForm.trigger(); // Trigger validation for the availability form
    const isPatientValid = await patientForm.trigger(); // Trigger validation for the patient form

    if (isAvailabilityValid && isPatientValid) {
      // If both forms are valid, combine their values into one object
      const availabilityValues = availabilityForm.getValues();
      const patientValues = patientForm.getValues();

      const appointmentSubmission = {
        ...availabilityValues,
        ...patientValues,
        selectedStaff: selectedStaff ? selectedStaff._id : null, // Include selected staff ID if available
      };

      try {
        const date = yearMonthFormat(availabilityValues.date, "UTC"); // Format the date
        const response = await saveAppointment({
          clientDetails: patientValues, // Save the appointment with the combined form values
          date: date,
          time: availabilityValues.time,
          staffId: selectedStaff?._id || " ", // Use the selected staff ID, or a blank string if none
          services: availabilityValues.services,
        });

        if (!response.success) {
          throw new Error(response.message); // If there's an error, throw it
        }

        router.push(`/appointment-confirmation?id=${response.data._id}`); // Navigate to the confirmation page
      } catch (error: any) {
        message.error(error.message); // Show an error message if the submission fails
      }
    }
  };

  const time = availabilityForm.watch("time"); // Watch the time field in the availability form

  return (
    <div>
      <AvailabilityForm form={availabilityForm} onSubmit={handleAvailabilitySubmit} /> {/* Availability form component */}

      {error && (
        <Alert message={error} type="error" showIcon closable className="mt-5" /> // Show an error alert if there's an issue
      )}

      {availableStaffs.length > 0 && (
        <AvailableStaff
          time={time}
          staffList={availableStaffs}
          selectedStaff={selectedStaff}
          setSelectedStaff={handleStaffSelection} // Available staff component to select a staff member
        />
      )}

      {selectedStaff && (
        <div>
          <PatientForm form={patientForm} /> {/* Patient form component */}
          <button onClick={handleFinalSubmit} className="btn-primary">
            Confirm and Submit
          </button>
        </div>
      )}
    </div>
  );
}
