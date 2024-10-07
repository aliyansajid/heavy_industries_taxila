const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const letterRoutes = require("./routes/letterRoutes");
const searchRoutes = require("./routes/searchRoutes");
const scannerRoutes = require("./routes/scannerRoutes");
const draftRoutes = require("./routes/draftRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/login", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/letters", letterRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/scanner", scannerRoutes);
app.use("/api/draft", draftRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
