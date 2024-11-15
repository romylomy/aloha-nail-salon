

import mongoose from "mongoose"; 
// Import the mongoose library to interact with MongoDB
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It provides a straight-forward way to model data in MongoDB with a schema-based solution.
// Mongoose allows us to define models for MongoDB collections with specific structures (schemas),
// and provides powerful methods for querying, updating, and validating data in MongoDB.

// Define the schema for the appointment document
const appointmentSchema = new mongoose.Schema({

  date: {
    type: String,  
    required: true,  
  },
  
  time: {
    type: String,  
    required: true,  
  },
  
  // The staff associated with the appointment (references the 'staff' model)
  staff: {
    type: mongoose.Schema.Types.ObjectId,  // The staff field stores the ObjectId of the referenced staff document
    ref: "staff",  // Refer to the 'staff' model (ensure the model name matches)
    required: true,  // The staff field is required for the appointment
  },
  
  // The customer associated with the appointment (references the 'customer' model)
  customer: {
    type: mongoose.Schema.Types.ObjectId,  // The customer field stores the ObjectId of the referenced customer document
    ref: "customer",  // Refer to the 'customer' model (ensure the model name matches)
    required: true,  // The customer field is required for the appointment
  },
  
  // A list of services associated with the appointment (e.g., ['Nail Care', 'Pedicure'])
  services: {
    type: [String], 
    required: true,  
  },
  
  status: {
    type: String,  
    enum: ["pending", "approved", "cancelled"],  // The status can only be one of these three values
    default: "approved",  // The default value for the status is 'approved'
  },
}, { timestamps: true });  // Automatically add 'createdAt' and 'updatedAt' fields to each appointment document

// Create the appointment model, or reuse the existing one if it already exists
const AppointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);

export default AppointmentModel;
