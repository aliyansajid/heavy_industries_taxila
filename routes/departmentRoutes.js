const express = require("express");
const {
  createDepartment,
  getDepartments,
} = require("../controllers/departmentController");
const router = express.Router();

router.post("/create-department", createDepartment);
router.get("/get-departments", getDepartments);

module.exports = router;
