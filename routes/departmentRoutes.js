const express = require("express");
const { createDepartment } = require("../controllers/departmentController");
const router = express.Router();

router.post("/", createDepartment);

module.exports = router;
