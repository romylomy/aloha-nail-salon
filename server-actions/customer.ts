'use server'

import CustomerModel from "@/models/customer-model"

// Function to normalize phone numbers by removing non-numeric characters
const normalizePhone = (phone: string) => {
    return phone.replace(/\D/g, "");
}

// Helper function to escape special characters in a string for regex purposes
const escapeRegex = (string: string) => {
    return string.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&"); // Escapes special characters
}

export const getAllCustomers = async (searchParams: { name: string, phone: string }) => {
    let filtersToApply: any = {}

    // Check if the 'name' search parameter exists and build the filter for name search
    if (searchParams.name) {
        // Trim any extra spaces from the input name
        filtersToApply.name = { 
            // Use escapeRegex to handle special characters in the name
            $regex: escapeRegex(searchParams.name.trim()), 
            $options: "i" // Makes the search case-insensitive.
        }
    }

    // Check if the 'phone' search parameter exists and build the filter for phone search
    if (searchParams.phone) {
        filtersToApply.phone = `+${normalizePhone(searchParams.phone)}`
    }

    console.log('Search Params:', searchParams) // Log input params
    console.log('Filters to Apply:', filtersToApply)  // Debugging the applied filters

    try {
        // Query the database with the filters
        const customers = await CustomerModel.find(filtersToApply).sort({ createdAt: -1 })
        
        // Return the success response with the customer data
        return {
            success: true,
            data: JSON.parse(JSON.stringify(customers)) // Serialize the data to return in a JSON-safe format
        }
    } catch (error: any) {
        // In case of error, return failure response with the error message
        return {
            success: false,
            message: error.message
        }
    }
}
