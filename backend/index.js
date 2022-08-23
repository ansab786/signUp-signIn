const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");
const userRoutes = require("./routes/userRoute");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API IS RUNNING.,.");
});

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Api running on port ${PORT}`);
});
