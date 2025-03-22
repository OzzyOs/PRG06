import mongoose from "mongoose"; // import mongoose library

export const connectDB = async () => {

    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI); // Try to make a connection with my (in .env defined) mongoDB.
        console.log(`MongoDB Connected: ${conn.connection.host}`) // Console log the successful connection.
    }

    catch (error) // If connection fails

    {
        console.error(`Error: ${error.message}`); // Log an error message.
        process.exit(1);
    }
};