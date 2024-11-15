import mongoose from "mongoose";
// Import the mongoose library to interact with MongoDB
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It provides a straight-forward way to model data in MongoDB with a schema-based solution.
// Mongoose allows us to define models for MongoDB collections with specific structures (schemas),
// and provides powerful methods for querying, updating, and validating data in MongoDB.

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the CustomerModel, or reuse the existing one if it already exists

const CustomerModel = mongoose.models.customer || mongoose.model("customer", customerSchema);

export default CustomerModel;
