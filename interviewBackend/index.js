const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB (replace <your_database_url> with your MongoDB connection string)
mongoose.connect(
  "mongodb+srv://dhanush:dhanush@cluster0.cbldq.mongodb.net/interview",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/api", require("./routes/studentApi"));
app.use("/api", require("./routes/teacherApi"));
app.use("/api", require("./routes/marksApi"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
