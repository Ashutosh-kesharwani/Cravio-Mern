import dotenv from "dotenv";
import connectDB from "../src/db/server.js";
import User from "../src/models/user.model.js";

dotenv.config();

/* 
To create admin use this <node scripts/createAdmin.js>
*/

// Connect to DB
await connectDB();

try {
  // Check if admin already exists
  const existingAdmin = await User.findOne({
    email: "admin@gmail.com",
    username: "admin1",
    mobile: "9305217572",
  });

  if (existingAdmin) {
    console.log("Admin already exists.");
    process.exit(0);
  }

  // Create Admin
  const admin = await User.create({
    firstName: "Ashutosh",
    lastName: "Kesharwani",
    email: "admin@gmail.com",
    username: "admin1",
    mobile: "9305217572",
    password: "Admin@123",
    role: "admin",
  });

  console.log("Admin created successfully.");
  console.log({
    id: admin._id,
    email: admin.email,
    role: admin.role,
  });

  process.exit(0);
} catch (error) {
  console.error("Failed to create admin:", error.message);
  process.exit(1);
}
