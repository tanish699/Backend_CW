const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to log request details
app.use((req, res, next) => {
  const logDetails = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl,
    protocol: req.protocol,
    method: req.method,
    hostname: req.hostname,
    query: req.query,
    headers: req.headers,
    userAgent: req.get("User-Agent"),
  };

  const logLine = JSON.stringify(logDetails) + "\n";

  // Write log to the requests.log file
  const logFilePath = path.join(__dirname, "requests.log");
  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });

  next(); // Pass control to the next middleware/handler
});

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to the Express.js logging server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
