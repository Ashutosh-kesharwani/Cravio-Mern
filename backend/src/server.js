import connectDB from "./db/server.js";
// Test loading or env variable
console.log(process.env.PORT);

connectDB();
