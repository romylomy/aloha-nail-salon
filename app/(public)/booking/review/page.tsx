'use client';

import { useRouter } from 'next/navigation';
import { useAddDealContext } from '@/components/DealContext';
import { NewDealType } from '@/lib/validation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button'; // UI component for buttons
import { saveAppointment } from '@/server-actions/appointments'; // Server actions for saving appointments
import { yearMonthFormat } from '@/lib/utils'; // Utility function for formatting dates

export default function ReviewForm() {
  const router = useRouter();
  const { newDealData } = useAddDealContext();

  const { services, time, staff, date, customerName, email, phone } = newDealData;
  const StaffId = staff;
  const StaffName = typeof window !== 'undefined' ? localStorage.getItem('staffName') : '';

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const patientValues = {
      name: customerName,
      email: email,
      phone: phone,
    };

    try {
      const formattedDate = yearMonthFormat(date, 'UTC'); // Format the date

      const response = await saveAppointment({
        clientDetails: patientValues, // Save the appointment with the combined form values
        date: formattedDate,
        time: time,
        staffId: StaffId || '', // Use the selected staff ID, or a blank string if none
        services,
      });

      if (!response.success) {
        throw new Error(response.message); // If there's an error, throw it
      }

      router.push(`/appointment-confirmation?id=${response.data._id}`); // Navigate to the confirmation page
    } catch (error: any) {
      console.error('Error saving appointment:', error.message); // Log the error
      alert(error.message); // Show an error alert
    }
  };

  return (
    <div className="py-6 px-4 lg:py-8 lg:px-10 border-2 border-yellow-500 shadow-md rounded-md mt-10">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-2xl font-semibold text-center lg:text-left mb-4">Appointment Details</h3>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-xl font-semibold">{customerName}</p>
            <p className="text-gray-700">Time: {time}</p>
            <p className="text-gray-700">Date: {format( Date(date), 'PPP')}</p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700">Phone: {phone}</p>
            <p className="text-gray-700">Staff: {StaffName}</p>
            <p className="text-gray-700">Services: {services.join(', ')}</p>
          </div>

          <Button type="submit" className="w-full bg-black text-white py-3 px-6 rounded-md mt-6">
            Submit and Confirm
          </Button>
        </form>
      </div>
    </div>
  );
}
