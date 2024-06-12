import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI || '');
    console.log("connected to db");
  } catch (error) {
    console.log("Error connecting to mongodb:", error.message);
  }
};

export default connectToDb;
