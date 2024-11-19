'use client'

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { availabilitySchema } from "@/lib/validation";
import { IStaff } from "@/interfaces";
import { useAddDealContext } from "@/components/DealContext";
import AvailabilityForm from "@/components/forms/availabilityForm";
import { Button } from "@/components/ui/button";
import { checkStaffAvailability } from "@/server-actions/appointments";
import AvailableStaff from "@/components/available-staff";
import SelectedDetails from "@/components/SelectedDetails"; // Import the new component

export default function Home() {
  const { updatedNewDealDetails, newDealData } = useAddDealContext();

  const [availableStaffs, setAvailableStaffs] = useState<IStaff[]>([]);
  const [error, setError] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<IStaff | null>(null);

  // Initialize the form with context state as default values
  const availabilityForm = useForm<z.infer<typeof availabilitySchema>>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      time:  "",
      date: "", // Convert date from string to Date
    },
  });

  const time = useWatch({
    control: availabilityForm.control,
    name: "time",
  });

  // Synchronize form values with `newDealData` when it changes
  useEffect(() => {
    // Ensure the form only resets if the time or date has actually changed
    if (
      newDealData.time !== availabilityForm.getValues("time") ||
      newDealData.date !== availabilityForm.getValues("date")
    ) {
      // Only reset the form if necessary
      availabilityForm.reset({
        time: newDealData.time || "",
        date: newDealData.date ? new Date(newDealData.date) : availabilityForm.getValues("date"), // Preserve current date if no new date is provided
      });
    }
  }, [newDealData, availabilityForm]);

  // Handle staff selection
  const handleStaffSelection = (staff: IStaff) => {
    setSelectedStaff(staff);
    availabilityForm.setValue("staff", staff._id);
    availabilityForm.setValue("staffName", staff.name);

    updatedNewDealDetails({
      staff: staff._id,
      staffName: staff.name,
    });

    localStorage.setItem("staffName" ,staff.name );

    
   
  };

  const handleAvailabilitySubmit = async (values: z.infer<typeof availabilitySchema>) => {
    console.log("Form Values:", values); // Log the values being submitted
    
    try {
      setError(""); // Reset any previous error
      const { success, data } = await checkStaffAvailability({
        date: values.date,
        time: values.time,
      });
    
      if (!success || !data.length) {
        setError("No staff available for the given slot");
      } else {
        setAvailableStaffs(data); // Update available staff if found

        console.log(values.date)
        updatedNewDealDetails({
          time: values.time, // Update the time in the context
          date: values.date, // Update the date in the context
        });
      }
    } catch (error: any) {
      console.error("Error checking availability:", error); // Log error to understand any issues
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  const handleClear = () => {
    availabilityForm.reset({
      time: "",
      date: newDealData.date ? new Date(newDealData.date) : null, // Preserve the date when clearing
    });
    setAvailableStaffs([]);
    setError("");
    setSelectedStaff(null);

    updatedNewDealDetails({
      time: "",
      date: null,
      staff: "",
      availability: [],
    });

    // Clear the localStorage when clearing the form
    localStorage.removeItem("selectedDate");
    localStorage.removeItem("selectedTime");
    localStorage.removeItem("selectedStaff");
  };

  return (
    <div className="text-lg flex flex-col min-h-screen px-4 mt-6">
      <div className="w-full max-w-3xl">
        <SelectedDetails />

        <form onSubmit={availabilityForm.handleSubmit(handleAvailabilitySubmit)}>
          <AvailabilityForm form={availabilityForm} />

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              className="mt-5"
            />
          )}

          <div className="flex justify-between items-center">
            <Button
              type="button"
              onClick={() => availabilityForm.handleSubmit(handleAvailabilitySubmit)()}
            >
              Check availability
            </Button>
            <Button type="button" variant="secondary" onClick={handleClear}>
              Clear
            </Button>
          </div>

          {availableStaffs.length > 0 && (
            <AvailableStaff
              time={time}
              staffList={availableStaffs}
              selectedStaff={selectedStaff}
              setSelectedStaff={handleStaffSelection}
            />
          )}
        </form>
      </div>

      {/* Conditionally render the SelectedDetails component */}
    </div>
  );
}
