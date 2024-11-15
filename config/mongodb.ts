import mongoose from "mongoose"

//What is the async function

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI  || "")
         //all code after will not execute until a response is given with above function 
        console.log("connected to MongoDB")
        //executes only after database is connected
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
        // if promise response recieve's error it will be logged 
    }
}