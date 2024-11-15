// code references https://github.com/sathyaprakash195/shey-hospital-next-udemy


'use server'
/*
When you see 'use server', it's essentially telling Next.js that the code following it should 
only be executed on the server. This is part of Next.js's Server Actions, 
which enable you to write server-side functions that are directly called from components,
 but the code runs on the server instead of the client.

*/

// Import the StaffModel and IStaff interface for staff operations
import StaffModel from "@/models/staff-models"
import { IStaff } from "@/interfaces"

// Function to add a new staff member to the database
export const addStaff = async (payload: Partial<IStaff>) => {
    try {
        // Create a new staff document in the database using the provided payload
        await StaffModel.create(payload)
        return {
            success: true,  // Indicate success
            message: "Staff added successfully"
        }
    } catch (error: any) {
        // Handle any errors and return a failure response
        return {
            success: false,
            message: error.message  // Return the error message if the operation fails
        }
    }
}

// Function to get all staff members, sorted by creation date in descending order
export const getStaff = async () => {
    try {
        // Query the StaffModel to get all staff, sorted by creation date
        const staff = await StaffModel.find().sort({ createdAt: -1 })
        return {
            success: true,
            data: JSON.parse(JSON.stringify(staff))  // Return the staff data, ensuring it is properly serialized
        }
    } catch (error: any) {
        // Handle errors and return a failure response
        return {
            success: false,
            message: error.message  // Return the error message if the operation fails
        }
    }
}

// Function to get a specific staff member by their ID
export const getStaffById = async (id: string) => {
    try {
        // Find the staff member by ID using the findById method
        const staff = await StaffModel.findById(id)
        return {
            success: true,
            data: JSON.parse(JSON.stringify(staff))  // Return the staff data, ensuring it is properly serialized
        }
    } catch (error: any) {
        // Handle any errors and return a failure response
        return {
            success: false,
            message: error.message  // Return the error message if the operation fails
        }
    }
}

// Function to update an existing staff member's information
export const updateStaff = async ({ id, data }: { id: string, data: Partial<IStaff> }) => {
    try {
        // Find and update the staff member by ID using the findByIdAndUpdate method
        await StaffModel.findByIdAndUpdate(id, data)
        return {
            success: true,
            message: "Staff updated successfully"  // Return success message after update
        }
    } catch (error: any) {
        // Handle errors and return a failure response
        return {
            success: false,
            message: error.message  // Return the error message if the operation fails
        }
    }
}

// Function to delete a staff member by their ID
export const deleteStaff = async (id: string) => {
    try {
        // Find and delete the staff member by ID using the findByIdAndDelete method
        await StaffModel.findByIdAndDelete(id)
        return {
            success: true,
            message: "Staff deleted successfully"  // Return success message after deletion
        }
    } catch (error: any) {
        // Handle errors and return a failure response
        return {
            success: false,
            message: error.message  // Return the error message if the operation fails
        }
    }
}
