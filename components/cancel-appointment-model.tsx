
//code references https://ant.design/components/table and https://www.youtube.com/watch?v=FT234TaUyRQ&list=PLDn5_2K0bUmcukAoUVoREbCmSzNbgKntL 


import React from 'react'; // Import React to use JSX and component logic.
import { IAppointment } from '@/interfaces/index'; // Import the IAppointment interface to type the appointment object.
import { Modal, Alert, Button, message } from 'antd'; // Import Modal, Alert, Button, and message components from Ant Design.
import { updateAppointmentStatus } from "@/server-actions/appointments"; // Import function to update appointment status.
import { useState } from 'react'; // Import useState hook to manage component state.

interface CancelAppointmentModalProps {
  showCancelAppointmentModal: boolean; // Boolean to control modal visibility.
  setShowCancelAppointmentModal: (value: boolean) => void; // Function to toggle modal visibility.
  appointment: IAppointment | null; // Appointment object, allows null value.
}

// Component to display the modal for canceling an appointment.
function CancelAppointmentModal({
  showCancelAppointmentModal, // Modal visibility flag.
  setShowCancelAppointmentModal, // Function to close the modal.
  appointment, // Appointment object to display details in the modal.
}: CancelAppointmentModalProps) {
    
    // State to manage loading state during the cancellation process.
    const [loading, setLoading] = useState(false);

    // Function to handle the appointment cancellation process.
    const handleCancelAppointment = async () => {
        try {
            setLoading(true); // Set loading to true while the operation is in progress.
            // Call the API to update the appointment status to 'cancelled'.
            const { success, message: msg } = await updateAppointmentStatus({
                appointmentId: appointment._id, // Pass the appointment ID.
                status: "cancelled" // Set the status to 'cancelled'.
            });
            if (!success) {
                throw new Error(msg); // Throw an error if the cancellation failed.
            }
            message.success("Appointment cancelled successfully"); // Display a success message.
            setShowCancelAppointmentModal(false); // Close the modal after cancellation.
        } catch (error: any) {
            message.error(error.message); // Display an error message if something goes wrong.
        } finally {
            setLoading(false); // Reset loading state after the operation is complete.
        }
    };

  return (
    <Modal
      title="CANCEL APPOINTMENT" // Modal title.
      open={showCancelAppointmentModal} // Control the visibility of the modal.
      onCancel={() => setShowCancelAppointmentModal(false)} // Close the modal on cancel action.
      centered // Center the modal on the screen.
      footer={null} // Remove default footer buttons.
    >
      {/* Conditionally render the appointment details if the appointment object is not null */}
      {appointment ? (
        // Display a warning message with appointment details.
        <Alert
            message={
                <p className="text-lg">
                Are you sure you want to cancel the appointment with{' '}
                <strong>{appointment.staff?.name}</strong> on{' '}
                <strong>{appointment.date}</strong> at{' '}
                <strong>{appointment.time}</strong> for{' '}
                <strong>{appointment.customer?.name}</strong>?
              </p> // Display staff name, appointment date, time, and customer name.
            }
            type="warning" // Display the alert as a warning.
        />
      ) : (
        <p>Loading appointment details...</p> // Display loading message if appointment data is still loading.
      )}
      
      {/* Buttons for confirming or closing the modal */}
      <div className="mt-5 flex justify-end gap-5">
        <Button
            disable={loading} // Disable the close button while loading.
            onClick={() => setShowCancelAppointmentModal(false)} // Close modal when 'Close' is clicked.
        >
          Close
        </Button>
        <Button
            loading={loading} // Display loading indicator if the cancellation is in progress.
            danger // Apply danger styling (red button).
            type="primary" // Set button type to primary.
            onClick={handleCancelAppointment} // Trigger the cancellation function when clicked.
        >
          Yes, Cancel Appointment
        </Button>
      </div>
    </Modal>
  );
}

export default CancelAppointmentModal; // Export the CancelAppointmentModal component as the default export.
