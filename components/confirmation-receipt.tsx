
//code references https://github.com/sathyaprakash195/shey-hospital-next-udemy

import React from 'react'; 
import { IAppointment } from "@/interfaces"; // Import the IAppointment interface to type the appointment object.

interface IAppointmentReceiptProps {
    appointment: IAppointment; // Define the props for the component with an appointment object.
}

// Component to render the appointment receipt details.
function AppointmentReceipt({ appointment }: IAppointmentReceiptProps) {

  // Helper function to render a property with a label and its corresponding value.
  const renderProperty = ({ label, value }: { label: string, value: any }) => (
    <div className="flex items-center text-sm mt-2 gap-x-2">
      <p className="font-bold text-md">{label + ":"}</p> 
      <span className="text-black">{value}</span>
    </div>
  );

  // Log the appointment details in the console for debugging purposes.
  console.log("Appointment Details:", appointment);

  return (
    <div className="w-full">
      {/* Container to center the content vertically and horizontally. */}
      <div className="flex justify-center items-center min-h-screen rounded-lg">
        <div className="p-5 border rounded flex flex-col items-center w-full max-w-md">
       
          <div className="flex flex-col items-center w-full">
            <hr className="w-full" /> {/* Horizontal line for separation. */}
         
            <h1 className="bg-gray-200 uppercase py-1 px-3 mt-5 text-center">Appointment Details</h1>
          
            <h1 className="py-1 px-3 mt-5 text-center">{`Aloha ${appointment.customer.name}, your appointment has been confirmed`}</h1>
          </div>

          {/* Section to display appointment information like staff, service, date, and time */}
          <div className="flex flex-col gap-3 w-full mt-5">
            {renderProperty({ label: "Nail Tech", value: appointment.staff.name })} 
            {renderProperty({ label: "Service", value: appointment.services.join(", ") })} 
            {renderProperty({ label: "Date", value: appointment.date })} 
            {renderProperty({ label: "Time", value: appointment.time })} 
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentReceipt; 
