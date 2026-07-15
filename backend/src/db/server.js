import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${[process.env.DB_NAME]}`
    );

    console.log(
      `MONGODB CONNECTED SUCCESSFULLY AT HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB :: connectionError :: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
