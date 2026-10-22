import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`,
      { dbName: process.env.DB_NAME }
    );
    console.log(
      `\n MongoDB connected successfully!! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
