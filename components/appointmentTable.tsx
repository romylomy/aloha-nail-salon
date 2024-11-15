//code references https://ant.design/components/table and https://www.youtube.com/watch?v=FT234TaUyRQ&list=PLDn5_2K0bUmcukAoUVoREbCmSzNbgKntL 


'use client'; // Marks this component as a client-side component in Next.js.

import React from 'react'; // Import React to use JSX syntax.
import { ICustomer, IStaff, IAppointment } from '@/interfaces'; // Import interfaces for typing the appointment, customer, and staff objects.
import { Table, Button } from 'antd'; // Import Table and Button components from Ant Design library.
import { formatDateTime } from "@/lib/utils"; // Import a utility function to format date and time.
import { Eye, X } from "lucide-react"; // Import icons for the view and cancel buttons from the lucide-react icon library.
import { useState } from 'react'; // Import useState hook to manage component state.
import ViewAppointmentModal from '@/components/view-appointment-modal'; // Import modal component to view appointment details.
import CancelAppointmentModal from '@/components/cancel-appointment-model'; // Import modal component to cancel appointments.

interface AppointmentsTableProps {
  appointments: IAppointment[]; // Define the expected prop type: an array of appointments.
}

// Main component for displaying the appointments table.
function AppointmentTable({ appointments }: AppointmentsTableProps) {
  // State to handle showing the View Appointment Modal.
  const [showViewAppointmentModal, setShowViewApppointmentModal] = useState(false);
  // State to store the currently selected appointment.
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  // State to handle showing the Cancel Appointment Modal.
  const [showCancelAppointmentModal, setShowCancelAppointmentModal] = useState(false);

  // Define the columns for the Ant Design table component.
  const columns = [
    {
      title: 'Customer Name', // Column title for the customer's name.
      dataIndex: 'customer',  // Specifies the data field for this column.
      render: (customer: ICustomer) => customer.name, // Render the customer's name.
    },
    {
      title: 'Staff Name', // Column title for the staff member's name.
      dataIndex: 'staff',  // Specifies the data field for this column.
      render: (staff: IStaff | undefined) => (staff ? staff.name : 'No staff assigned'), // Display staff name or fallback if none assigned.
    },
    {
      title: 'Services', // Column title for the services.
      dataIndex: 'services', // Specifies the data field for this column.
    },
    {
      title: 'Date & Time', // Column title for the appointment date and time.
      dataIndex: 'time', // Specifies the data field for this column.
      render: (_: string, row: IAppointment) => {
        // Combine date and time into a valid ISO date-time string.
        const dateTime = `${row.date}T${row.time}:00`; // Add seconds to make the format valid.
        return <>{formatDateTime(dateTime, 'America/Edmonton')}</>; // Format and display the date-time based on the time zone.
      },
    },
    {
      title: 'Status', // Column title for the appointment status.
      dataIndex: 'status', // Specifies the data field for this column.
      render: (status: string) => status.toUpperCase(), // Render the status in uppercase.
    },
    {
      title: 'Action', // Column title for the action buttons.
      dataIndex: 'action', // Specifies the data field for this column.
      render: (text: string, record: IAppointment) => (
        // Render action buttons (View and Cancel) for each appointment.
        <div className="flex gap-5">
          {/* View Button */}
          <Button
            icon={<Eye size={12} />} 
            size="small"
            onClick={() => {
              setSelectedAppointment(record); // Set the selected appointment.
              setShowViewApppointmentModal(true); // Show the view appointment modal.
            }}
          >
            View
          </Button>

          {/* Conditional rendering of the Cancel button if the appointment status is 'approved'. */}
          {
            record.status === "approved" && (
              <Button
                icon={<X size={12} />} // X icon for cancel action.
                size="small"
                onClick={() => {
                  setSelectedAppointment(record); // Set the selected appointment.
                  setShowCancelAppointmentModal(true); // Show the cancel appointment modal.
                }}
              >
                Cancel
              </Button>
            )
          }
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Ant Design Table component for displaying appointments */}
      <Table dataSource={appointments} columns={columns} rowKey="_id" /> {/* Set rowKey to use the appointment's unique ID */}

      {/* View Appointment Modal component */}
      <ViewAppointmentModal
        showViewAppointmentModal={showViewAppointmentModal} // Boolean to show or hide the modal.
        setShowViewAppointmentModal={setShowViewApppointmentModal} // Function to control modal visibility.
        appointment={selectedAppointment} // Pass the selected appointment to the modal.
      />

      {/* Cancel Appointment Modal component */}
      <CancelAppointmentModal
        showCancelAppointmentModal={showCancelAppointmentModal} // Boolean to show or hide the cancel modal.
        setShowCancelAppointmentModal={setShowCancelAppointmentModal} // Function to control modal visibility.
        appointment={selectedAppointment} // Pass the selected appointment to the modal.
      />
    </div>
  );
}

export default AppointmentTable; 
