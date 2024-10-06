const express = require("express");
const scannerController = require("../controllers/scannerController");

const router = express.Router();

router.post("/create-scanner", scannerController.createScannerEntry);

module.exports = router;
