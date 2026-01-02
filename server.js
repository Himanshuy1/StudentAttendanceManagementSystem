const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();
connectDB();

app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

app.use("/students", require("./routes/studentRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

