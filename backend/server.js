// Import env file in root entry file
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

// Import src/entry file from here
import("./src/server.js");
