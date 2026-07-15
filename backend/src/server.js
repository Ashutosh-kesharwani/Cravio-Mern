import { app } from "./app.js";
import connectDB from "./db/server.js";
// PORT
const PORT = process.env.PORT;

// Process Level Error Handling [Global]

// Synchronous Errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception :: ", error);
  process.exit(1);
});

// Unhandled Promise Rejections [Asynchronous Error]
process.on("unhandledRejection", (error) => {
  console.log(`Unhandled Rejection :: ${error}`);
  process.exit(1);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("\nServer Shutting Down Gracefully");
  process.exit(0);
});

// DB Connection & Server Start
connectDB()
  .then(() => {
    // Express App error
    app.on("error", (error) => {
      console.log(`Express :: ERROR :: ${error}`);
      process.exit(1);
    });

    // Start Server
    const server = app.listen(PORT, () => {
      console.log(`Server listening at  :: http://localhost:${PORT}`);
    });

    //  Server error
    server.on("error", (error) => {
      console.log(`SERVER :: ERROR :: ${error}`);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.log(`DB CONNECTION ERROR :: ${error} `);
    process.exit(1);
  });
