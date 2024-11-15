'use server';

import UserModel from "@/models/user-models"; // Import the User model for MongoDB operations
import { currentUser } from "@clerk/nextjs/server"; // Import currentUser to get the logged-in user from Clerk

// Function to create a new user in MongoDB
export const createUser = async () => {
  try {
    const user = await currentUser(); // Retrieve the current logged-in user from Clerk

    // Check if currentUser() returned a user
    if (!user) {
      return {
        success: false,
        message: "No user is currently logged in", // Return an error message if no user is logged in
      };
    }

    // Create an object to be saved in MongoDB based on the Clerk user data
    const mongoDBUserobj = {
      name: `${user.firstName} ${user.lastName}`, // Concatenate first and last name
      clerkUserId: user.id, // Clerk's unique user ID
      email: user.emailAddresses[0].emailAddress, // User's email
      profilePic: user.imageUrl, // User's profile picture URL
      isApproved: true, // Flag to mark the user as approved (can be customized based on your needs)
      isSuperAdmin: false, // Flag to indicate if the user is a super admin
    };

    const newUser = new UserModel(mongoDBUserobj); // Create a new user document from the object

    // Save the new user to MongoDB
    try {
      await newUser.save(); // Save the new user document to MongoDB
      console.log('User saved successfully to MongoDB:', newUser); // Log the success
    } catch (error) {
      console.error('Error saving user to MongoDB:', error); // Log any errors that occur during save
    }

    return {
      success: true, // Return success response
      message: "User created successfully", // Success message
      data: JSON.parse(JSON.stringify(newUser)), // Return the user data (JSON.stringify/parse to ensure it’s plain JSON)
    };
  } catch (error: any) {
    return {
      success: false, // Return failure response if error occurs
      message: error.message, // Return the error message
    };
  }
};

// Function to get user data from MongoDB
export const getUserDataFromMongoDB = async () => {
  try {
    const user = await currentUser(); // Get the current logged-in user from Clerk

    // Check if currentUser() returned a user
    if (!user) {
      return {
        success: false,
        message: "No user is currently logged in", // Error message if no user is logged in
      };
    }

    // Try to find the user in MongoDB by their Clerk user ID
    const userFromMongoDB = await UserModel.findOne({ clerkUserId: user.id });

    if (userFromMongoDB) {
      return {
        success: true, // Return success if user found in MongoDB
        data: JSON.parse(JSON.stringify(userFromMongoDB)), // Return the user data as JSON
      };
    }

    // If user does not exist in MongoDB, create a new user and return their data
    const newUser = await createUser(); // Call createUser to add a new user to MongoDB

    if (newUser.success) {
      return {
        success: true, // Return success if new user created
        data: newUser.data, // Return the new user's data
      };
    } else {
      return {
        success: false, // Return failure if user creation fails
        message: newUser.message, // Return the message from the createUser function
      };
    }
  } catch (error: any) {
    return {
      success: false, // Return failure if an error occurs
      message: error.message, // Return the error message
    };
  }
};

// Function to get all users from MongoDB
export const getAllUsers = async () => {
  try {
    // Fetch all users from MongoDB and sort by creation date in descending order
    const users = await UserModel.find().sort({ createdAt: -1 });

    return {
      success: true, // Return success if users are fetched
      data: JSON.parse(JSON.stringify(users)), // Return the user data as JSON
    };
  } catch (error: any) {
    return {
      success: false, // Return failure if an error occurs
      message: error.message, // Return the error message
    };
  }
};

// Function to update user data in MongoDB
export const updatedYser = async ({ userId, updatedData }: {
  userId: string, // The ID of the user to update
  updateData: Partial<IUser>; // The data to update for the user
}) => {
  try {
    // Find the user by ID and update their data in MongoDB
    const user = await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true, // Option to return the updated document
    });

    revalidatePath("admin/staff"); // Revalidate the path to ensure that the latest data is shown

    return {
      success: true, // Return success if user was updated
      message: "User updated successfully", // Success message
    };
  } catch (error: any) {
    return {
      success: false, // Return failure if an error occurs
      message: error.message, // Return the error message
    };
  }
};
