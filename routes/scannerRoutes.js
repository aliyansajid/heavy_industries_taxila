const express = require("express");
const { createScanner } = require("../controllers/scannerController");

const router = express.Router();

router.post("/create-scanner", createScanner);

module.exports = router;
