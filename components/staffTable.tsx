// Code references: https://ant.design/components/table and https://www.youtube.com/watch?v=FT234TaUyRQ&list=PLDn5_2K0bUmcukAoUVoREbCmSzNbgKntL

'use client'; 

import React from 'react'; // Import React to use JSX and component logic
import { IStaff } from '@/interfaces'; // Import the IStaff interface to type the staff object
import { Table, Button, message } from 'antd'; // Import Ant Design components (Table, Button, and message for alerts)
import { Trash2 } from "lucide-react"; // Import Trash2 icon from lucide-react for delete button
import FormStaffDialog from '@/components/FormStaffDialog'; // Import FormStaffDialog component to handle staff edit functionality
import { deleteStaff } from "@/server-actions/staff"; // Import deleteStaff function to delete staff from the server
import { useRouter } from "next/navigation"; // Import useRouter to handle page navigation after staff deletion

function StaffTable({ staff }: { staff: IStaff[] }) {

    const router = useRouter(); // Initialize router for page navigation

    // Define the correct order of days in a week (useful for sorting workDays)
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Helper function to sort workDays based on the defined dayOrder array
    const sortWorkDays = (workDays: string[]) => {
        return workDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
    };

    // Function to handle deleting a staff member
    const deleteDoctorHandler = async(id: string) => {
        try {
            // Attempt to delete staff member by their ID
            const { success } = await deleteStaff(id);
            if (success) {
                message.success("Staff deleted successfully"); // Show success message
                router.push("/admin/staff"); // Navigate to the staff list page after deletion
            } else {
                message.error("Failed to delete staff"); // Show error message if deletion fails
            }
        } catch (error: any) {
            message.error(error.message); // Show error message if there's an exception
        }
    };

    // Columns configuration for the Ant Design Table component
    const columns = [
        {
            title: 'Name', // Column header for staff name
            dataIndex: 'name', // Data field for staff name
            key: 'name', // Unique key for the column
            render: (text) => <a style={{ color: 'black', fontWeight: 'bold', fontSize: '1.5rem' }}>{text}</a>, // Render name with custom styles
        },
        {
            title: 'Work Days', // Column header for work days
            dataIndex: 'workDays', // Data field for work days
            key: 'workDays', // Unique key for the column
            render: (workDays: string[]) => (
                <div>
                    {sortWorkDays(workDays).map((day, index) => ( // Map over sorted work days and render them
                        <div key={index}>{day}</div> // Render each day in a div
                    ))}
                </div>
            ),
        },
        {
            title: 'Start Time', // Column header for start time
            dataIndex: 'startTime', // Data field for start time
            key: 'startTime', // Unique key for the column
        },
        {
            title: 'End Time', // Column header for end time
            dataIndex: 'endTime', // Data field for end time
            key: 'endTime', // Unique key for the column
        },
        {
            title: 'Actions', // Column header for actions
            dataIndex: 'actions', // Data field for actions
            key: 'actions', // Unique key for the column
            render: (_: any, row: IStaff) => ( // Render the actions for each staff member
                <div className="flex gap-5">
                    <FormStaffDialog 
                        type="edit" // Type of dialog (edit staff member)
                        staffId={row._id} // Pass staff ID to the dialog
                    />
                    {/* Render the delete button */}
                    <Button 
                        onClick={() => deleteDoctorHandler(row._id)} // Call delete function on click
                        size="small" 
                        icon={<Trash2 size={14} />} // Use trash icon for delete action
                    />
                </div>
            ),
        },
    ];

    return (
        <Table
            dataSource={staff} // Provide staff data as the data source for the table
            columns={columns} // Provide columns configuration
            rowKey="_id" // Use _id as the unique key for each row
            pagination={false} // Disable pagination
        />
    );
}

export default StaffTable; 

