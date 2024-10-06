const express = require("express");
const { searchLetters } = require("../controllers/searchController");

const router = express.Router();

router.get("/", searchLetters);

module.exports = router;
