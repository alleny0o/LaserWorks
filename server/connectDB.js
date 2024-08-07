import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MONGODB: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

export default connectDB;