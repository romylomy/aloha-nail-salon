import mongoose from 'mongoose';
// Import the mongoose library to interact with MongoDB
// Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
// It provides a straight-forward way to model data in MongoDB with a schema-based solution.
// Mongoose allows us to define models for MongoDB collections with specific structures (schemas),
// and provides powerful methods for querying, updating, and validating data in MongoDB.

// Define User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Avoid model overwrite error by checking if the model already exists
const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
