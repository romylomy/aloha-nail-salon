import React from 'react';  // Import React for component rendering
import { IAppointment } from "@/interfaces";  // Import IAppointment interface for appointment data structure
import { Modal } from "antd";  // Import Modal component from Ant Design for creating modal dialogs
import AppointmentReceipt from "@/components/confirmation-receipt";  // Import AppointmentReceipt component for displaying appointment details

// Define the props type for the ViewAppointmentModal component
interface ViewAppointmentModalProps {
    appointment: IAppointment,  // The appointment object containing appointment details
    showViewAppointmentModal: boolean,  // Boolean to control modal visibility
    setShowViewAppointmentModal: (value: boolean) => void  // Function to set the visibility state of the modal
}

// Define the ViewAppointmentModal component which displays the appointment details in a modal
function ViewAppointmentModal({
    appointment,  // The appointment to be displayed in the modal
    showViewAppointmentModal,  // Boolean to control modal visibility
    setShowViewAppointmentModal,  // Function to set the visibility state of the modal
}: ViewAppointmentModalProps) {
    if (!showViewAppointmentModal) return null;  // If the modal is not visible, return null to prevent rendering

    return (
        <Modal
            open={showViewAppointmentModal}  // Control modal visibility based on showViewAppointmentModal state
            onCancel={() => setShowViewAppointmentModal(false)}  // Close modal when cancel button is clicked
            centered  // Center the modal on the screen
            footer={null}  // Remove the default footer (buttons)
            bodyStyle={{
                display: 'flex',  // Use flexbox for centering content vertically and horizontally
                justifyContent: 'center',  // Center content horizontally
                alignItems: 'center',  // Center content vertically
                height: '300px',  // Set the height of the modal's body
                padding: '20px',  // Add padding to the modal's body
            }}
            style={{
                textAlign: 'center',  // Center the text inside the modal
                maxWidth: '600px',  // Set the maximum width of the modal
                margin: '0 auto',  // Center the modal horizontally within the page
            }}
        >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>  {/* Center the content inside the modal */}
                <AppointmentReceipt appointment={appointment} />  {/* Pass appointment details to AppointmentReceipt component to display them */}
            </div>
        </Modal>
    );
}

export default ViewAppointmentModal;  // Export ViewAppointmentModal as the default export
