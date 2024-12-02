// code references https://github.com/sathyaprakash195/shey-hospital-next-udemy

'use server';
import mongoose from "mongoose";  // Import mongoose for MongoDB interactions
import AppointmentModel from "@/models/appointment-model";  // Import the Appointment model
import StaffModel from "@/models/staff-models";  // Import the Staff model
import { format } from "date-fns";  // Import the date-fns library to handle date formatting
import CustomerModel from "@/models/customer-model";  // Import the Customer model
import { IClient } from "@/interfaces/index";  // Import the IClient interface for type-checking client data
import { revalidatePath } from "next/cache";  




const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken=process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken); // For Twilio's Node.js library

const sendSMS = async ({ content }: { content: string }) => {
  const msgOptions = {
    from: process.env.TWILIO_FROM_NUMBER,
    to: process.env.TO_NUMBER,
    body: content, // Corrected key from `content` to `body` (Twilio expects `body`)
  };

  try {
    const message = await client.messages.create(msgOptions); // Corrected `messsage` typo
    console.log(message);
  } catch (error) {
    console.error(error);
  }
};

// Import revalidation function for Next.js cache handling  trigger a revalidation of a particular route or page, which helps ensure that the page content stays fresh by re-fetching data from the server

// Function to check staff availability based on the date and time of appointment
export const checkStaffAvailability = async ({
    date, time
}: {
    date: Date,  // Accepts a Date object for the appointment date
    time: string  // Accepts a string for the time of the appointment
}) => {
    try {
        // Format the provided date to a consistent format (YYYY-MM-DD)
        const formattedDate = format(date, 'yyyy-MM-dd');
        const dayOfWeek = format(date, 'EEEE');  // Get the day of the week (e.g., "Monday")

        // Step 1: Query the Appointment model to get IDs of staff already booked at the same date and time
        const bookedStaffIds = await AppointmentModel.find({
            date: formattedDate, 
            time: time,
            status: "approved"  // Only consider approved appointments
        }).distinct('staff');  // Get a list of distinct staff IDs that are already booked

        // Step 2: Query the Staff model to find available staff
        const availableStaff = await StaffModel.find({
            _id: { $nin: bookedStaffIds },  // $nin: Exclude staff whose _id is in the bookedStaffIds array (staff already booked for the given date and time)
            workDays: { $in: [dayOfWeek] },  // $in: Check if the day of the week (e.g., "Monday") is present in the staff's workDays array (indicating availability on that day)
            startTime: { $lte: time },  // $lte: Ensure the time provided is less than or equal to the staff's startTime (check if the time is within the staff's working hours)
            endTime: { $gte: time }  // $gte: Ensure the time provided is greater than or equal to the staff's endTime (check if the time is within the staff's working hours)

        });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(availableStaff))  // Return available staff data
            // parse converts a HSON string back into a javascript object
            // stringify coverts an object into a JSON string 
            //process avoids modifying the orginial avaiableStaff data that is directly fetched from the database
        };

    } catch (error) {
        console.error("Availability check error:", error);  // Log any errors
        return {
            success: false,
            error: error.message  // Return the error message
        };
    }
}

// Function to save a new appointment after checking customer details and availability
export const saveAppointment = async ({
    clientDetails,
    date,
    time,
    staffId,
    services,
    fee,
    StaffName
}: {
    clientDetails: Partial<IClient>;  // Client details, may be partial
    date: string;  // Date of appointment
    time: string;  // Time of appointment
    staffId: string;  // Staff ID for the appointment
    services: string[];  
    fee: number,
    StaffName: string// Services for the appointment, as an array of strings
}) => {
    try {
        console.log("Starting saveAppointment...");

        // Step 1: Search for an existing customer based on name, email, or phone
        let client = await CustomerModel.findOne({
            name: clientDetails.name,
            $or: [{ email: clientDetails.email }, { phone: clientDetails.phone }]  
            //The $or operator in MongoDB is used to perform a logical OR operation on an array of conditions. 
            //This means that MongoDB will return documents that match at least one of the conditions specified inside the $or array.
        });

        // Step 2: If the customer does not exist, create a new one
        if (!client) {
            client = await CustomerModel.create(clientDetails);  // Create a new customer entry
        } else {
            // If the customer exists, update their details
            await CustomerModel.updateOne({ _id: clientDetails._id }, clientDetails);
        }

        // Step 3: Save the appointment with the customer and staff details
        const appointment = await AppointmentModel.create({
            date: date,
            time: time,
            staff: staffId,  // Staff assigned to the appointment
            customer: client._id,  // Link the customer by their ID
            services: services,  // List of services for the appointment
            status: "approved",
            fee: fee  // Set the initial appointment status to "approved"
        });

        const schedDate = format( Date(appointment.date), 'PPP')

                
        sendSMS({content:`Aloha ${client.name},

                  Your appointment at Aloha Nail Salon is confirmed! Here are your appointment details:

                            
                - **Date**: ${schedDate} at ${time}
                - **Nail Stylist**: ${StaffName}
                    
                We look forward to seeing you! If you need to reschedule or have any questions, feel free to call us at 587-973-6068
                http://localhost:3000/appointment-confirmation?id=${appointment._id}
 
                  `})


        console.log("Appointment created:", appointment);  // Log the created appointment details
        return { success: true, data: JSON.parse(JSON.stringify(appointment)) };  // Return success with appointment data

    } catch (error: any) {
        console.error("Save appointment error:", error);  // Log any errors
        return { success: false, message: error.message };  // Return the error message
    }
};

// Function to retrieve an appointment by its ID
export const getAppointmentById = async (id: string) => {
    try {
        // Step 1: Ensure the provided ID is a valid MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid appointment ID format.");  // If not valid, throw an error
        }

        console.log("Searching for appointment with ID:", id);  // Log the search action

        // Step 2: Fetch the appointment from the database, populate staff and customer fields
        const appointment = await AppointmentModel.findById(id)
            .populate({
                path: "staff",  // Populate the staff field
                strictPopulate: false,  // Disable strict population error
            })
            .populate({
                path: "customer",  // Populate the customer field
                strictPopulate: false,  // Disable strict population error
            });

        console.log("Appointment found:", appointment);  // Log the found appointment
        return {
            success: true,
            data: JSON.parse(JSON.stringify(appointment)),  // Return the found appointment data
        };
    } catch (error: any) {
        console.error("Error retrieving appointment:", error.message);  // Log any errors
        return {
            success: false,
            message: error.message,  // Return the error message
        };
    }
};
// Function to retrieve all appointments, sorted by creation date
export const getAllAppointments = async (searchParams: { date: string, customerName: string, staffName: string }) => {
    try {
        const { date, customerName = '', staffName = '' } = searchParams;
        let mainFilters: any = {};

        // Apply date filter if provided
        if (date) {
            mainFilters.date = date;
        }

        // Logging to detect empty or undefined inputs for better debugging
        if (!staffName) {
            console.log("Staff name is empty, skipping staff filter");
        }
        if (!customerName) {
            console.log("Customer name is empty, skipping customer filter");
        }

        // Fetch staff and customer IDs matching the filters (case-insensitive)
        const [staffIds, customerIds] = await Promise.all([
            staffName 
                ? StaffModel.find({ name: { $regex: staffName, $options: "i" } }).distinct("_id") 
                : [],  // Skip if no staffName provided
            customerName 
                ? CustomerModel.find({ name: { $regex: customerName, $options: "i" } }).distinct("_id") 
                : [],  // Skip if no customerName provided
        ]);

        // Log if staff or customer search returns no results
        if (staffIds.length === 0 && staffName) {
            console.log(`No staff found for name: ${staffName}`);
        }
        if (customerIds.length === 0 && customerName) {
            console.log(`No customers found for name: ${customerName}`);
        }

        // Apply filters for staff if any staff IDs were found
        if (staffIds.length) {
            mainFilters.staff = { $in: staffIds };
        }

        // Apply filters for customers if any customer IDs were found
        if (customerIds.length) {
            mainFilters.customer = { $in: customerIds };
        }

        // Fetch appointments matching the filters and populate necessary data
        const appointments = await AppointmentModel.find(mainFilters)
            .populate({
                path: "staff",
                select: "name",  // Ensure we are getting the 'name' field
            })
            .populate({
                path: "customer",
                select: "name",  // Ensure we are getting the 'name' field
            })
            .sort({ createdAt: -1 });  // Sort appointments by creation date (newest first)

        return {
            success: true,
            data: JSON.parse(JSON.stringify(appointments)),  // Ensure safe data transmission
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};



// Function to update the status of an appointment
export const updateAppointmentStatus = async ({
    appointmentId,
    status,
}: {
    appointmentId: string;  // The appointment ID to update
    status: string;  // The new status for the appointment
}) => {
    try {
        // Update the appointment status in the database
        const appointment = await AppointmentModel.findByIdAndUpdate(
            appointmentId,   // The first parameter is the ID of the appointment to be updated
            { status },       // The second parameter is an object specifying the fields to be updated (in this case, 'status')
            { new: true }     // The third parameter specifies options; 'new: true' ensures the updated document is returned
        );
        revalidatePath("/admin/appointments");  // Revalidate the path for the updated appointments

        return {
            success: true,
            data: JSON.parse(JSON.stringify(appointment)),  // Return the updated appointment data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message,  // Return the error message
        };
    }
};
export const getAppointmentByCustomerId = async (customerId: string) => {
    try {
      console.log("Fetching appointments for customer ID:", customerId);
  
      const appointment = await AppointmentModel.find({ customer: customerId })
        .populate('staff')
        .sort({ createdAt: -1 });
  
      console.log("Fetched appointments:", appointment);
  
      return {
        success: true,
        data: JSON.parse(JSON.stringify(appointment)),
      };
    } catch (error: any) {
      console.error("Error fetching appointments:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  };
  
