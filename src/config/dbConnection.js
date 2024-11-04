import mongoose from "mongoose";

/**
 * Connect to the MongoDB database using the URI from the environment variable.
 * Log an error message if the connection fails and exit with a status code of 1.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log("DB Connected", conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;