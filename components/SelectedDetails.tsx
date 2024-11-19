'use client';

import { useEffect, useState } from "react";
import { IStaff } from "@/interfaces"; // Assuming you have an interface for IStaff
import { format } from "date-fns";

const SelectedDetails = () => {
  const [selectedDetails, setSelectedDetails] = useState<{
    date: string | null;
    time: string | null;
    staffName: string | null;
  }>({
    date: null,
    time: null,
    staffName: null,
  });

  useEffect(() => {
    // Fetch data from `booking-form-newDealData` in localStorage
    const storedData = localStorage.getItem("booking-form-newDealData");
    console.log(`This is the stored data ${storedData}`)

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log("This is the parsedData", parsedData); // Logs the object in the console

        setSelectedDetails({
          date: parsedData.date || null,
          time: parsedData.time || null,
          staffName: parsedData.staffName || null, // Assuming `staffName` exists in the stored data
        });
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  // Return early if data is incomplete
  if (!selectedDetails.date || !selectedDetails.time || !selectedDetails.staffName) {
    console.log('selectedDetails is not stored in data base')
    return null; // Don't render anything if the required data is not present
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h3 className="text-xl font-semibold">Selected Appointment Details</h3>
      <div className="mt-4">
        <p>
          <strong>Date:</strong> {format(new Date(selectedDetails.date), "PPP")}
        </p>
        <p>
          <strong>Time:</strong> {selectedDetails.time}
        </p>
        <p>
          <strong>Staff:</strong> {selectedDetails.staffName}
        </p>
      </div>
    </div>
  );
};

export default SelectedDetails;
