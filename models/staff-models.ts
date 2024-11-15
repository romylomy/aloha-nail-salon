import mongoose from 'mongoose';
// Import the mongoose library to interact with MongoDB
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It provides a straight-forward way to model data in MongoDB with a schema-based solution.
// Mongoose allows us to define models for MongoDB collections with specific structures (schemas),
// and provides powerful methods for querying, updating, and validating data in MongoDB.

const staffSchema = new mongoose.Schema(
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
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    workDays: {
      type: [],
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Avoid model overwrite error by checking if the model already exists
const StaffModel = mongoose.models.staff || mongoose.model('staff', staffSchema);

export default StaffModel;