import { app } from "./app.js";
import connectDB from "./db/server.js";

const PORT = process.env.PORT || 5100;

// Process Level Error Handling

// Synchronous Errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception :: ", error);

  process.exit(1);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection :: ", reason);

  process.exit(1);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("\nServer Shutting Down Gracefully");

  process.exit(0);
});

// Database Connection & Server Start

connectDB()
  .then(() => {
    // Express App Errors
    app.on("error", (error) => {
      console.log("Express :: Error :: ${error}");
      process.exit(1);
    });

    // Start Server
    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    // Listen HTTP Server Error
    server.on("error", (error) => {
      console.log(`Server :: Error :: ${error}`);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.log(`src/server.js :: DB CONNECTION ERROR :: ${error} `);
  });
