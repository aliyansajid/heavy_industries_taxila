const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require("./routes/departmentRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/login", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
