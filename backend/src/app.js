import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
const app = express();

// Global middleware

// 1) Cors middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// 2) Req Data Configuration
// Use to set in Advance
// req data -> must be sent always in json form , with limit of 16kb
app.use(
  express.json({
    limit: "16kb",
  })
);

// 3) Url encoded data Configuration
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// 4) Middleware For setting static folder
// Public -> temp local storage
app.use(express.static("public"));

// 5) Cookie-Parser : For reading cookie from req which sent by browser
app.use(cookieParser());

export { app };
