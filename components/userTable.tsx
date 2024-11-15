'use client';

/* Client-Side Interactions: The UsersTable component is rendering a table from Ant Design (Table), 
which is a React component meant to run in the browser. It handles client-side interactions 
like sorting, pagination, and filtering. For this reason, the component needs to be marked as 
a client component to enable these browser-side features.*/

import { IUser } from "@/interfaces/index";  // Ensure the import path to IUser is correct (for type definition)
import React, { useState } from 'react';  // Import React and useState hook
import PageTitle from "@/components/page-title";  // Import the PageTitle component for rendering page titles
import { Table, message, Switch } from 'antd';  // Import Ant Design components (Table, message for alerts, Switch for toggling)
import { formatDateTime } from "@/lib/utils";  // Ensure formatDateTime is correctly imported for formatting date/time
import { IUsersStore, usersGlobalStore } from "@/store/users-store";  // Import global store for users and user store type definition

function UsersTable({ users }: { users: IUser[] }) {  // Define the UsersTable component which takes a list of users as prop

    const [loading, setLoading] = useState(false);  // State to track loading status for API calls
    const { currentUserData }: IUsersStore = usersGlobalStore() as any;  // Access current user data from the global store

    // Function to handle user updates (like toggling "Is Approved" or "Is Super Admin")
    const updatedUserHandler = async ({ userId, updatedData }: { userId: string; updatedData: Partial<IUser> }) => {
        try {
            setLoading(true);  // Set loading to true before starting the update
            const { success } = await updateUser({ userId, updatedData });  // Call updateUser API
            if (success) {
                message.success("User updated successfully");  // Show success message if update is successful
            } else {
                message.error("Failed to update user");  // Show error message if update fails
            }
        } catch (error: any) {
            message.error(error.message);  // Show error message in case of any exception
        } finally {
            setLoading(false); 
        }
    };

    // Define table columns for displaying user data
    const columns = [
        {
            title: 'Name',  // Column header for user name
            dataIndex: 'name',  // Field to be displayed for each user
            key: 'name',  // Unique key for the column
        },
        {
            title: "Email",  // Column header for user email
            dataIndex: 'email',  // Field to be displayed for each user
            key: 'email',  // Unique key for the column
        },
        {
            title: 'User Id',  // Column header for user ID
            dataIndex: '_id',  // Field to be displayed for each user
            key: '_id',  // Unique key for the column
        },
        {
            title: 'Created At',  // Column header for user creation date
            dataIndex: 'createdAt',  // Field for creation date
            key: 'createdAt',  // Unique key for the column
            render: (createdAt: string) => <>{formatDateTime(createdAt, 'America/Edmonton')}</>,  // Format creation date using formatDateTime utility
        },
        {
            title: "Is Approved",  // Column header for approval status
            dataIndex: "isApproved",  // Field for approval status
            key: "isApproved",  // Unique key for the column
            render: (isApproved: boolean, row: IUser) => (
                <Switch  // Render a Switch component to toggle approval status
                    checked={isApproved}  // Set the Switch checked state based on isApproved value
                    onChange={(newValue) => updatedUserHandler({ userId: row._id, updatedData: { isApproved: newValue } })}  // Call updatedUserHandler when switch value changes
                />
            ),
        },
        {
            title: "Is Super Admin",  // Column header for Super Admin status
            dataIndex: "isSuperAdmin",  // Field for Super Admin status
            key: "isSuperAdmin",  // Unique key for the column
            render: (isSuperAdmin: boolean, row: IUser) => (
                <Switch  // Render a Switch component to toggle Super Admin status
                    checked={isSuperAdmin}  // Set the Switch checked state based on isSuperAdmin value
                    onChange={(newValue) => updatedUserHandler({ userId: row._id, updatedData: { isSuperAdmin: newValue } })}  // Call updatedUserHandler when switch value changes
                />
            ),
        },
    ];

    // If the current user is not a Super Admin, remove the 'Is Super Admin' column from the table
    if (!currentUserData?.isSuperAdmin) {
        columns.splice(3, 3);  // Remove 'Is Super Admin' and associated columns (start at index 3 and remove 3 columns)
    }

    return (
        <div>
            <PageTitle title='Users' />  {/* Render the page title */}
            <Table 
                dataSource={users}  // Pass the users data as the data source for the table
                columns={columns}  // Pass the columns configuration to the table
                rowKey="_id"  // Use user _id as the unique row key
                loading={loading}  // Set loading state to show loading spinner during API calls
                className='py-3'  // Apply padding to the table
            />
        </div>
    );
}

export default UsersTable;  // Export the UsersTable component as the default export

