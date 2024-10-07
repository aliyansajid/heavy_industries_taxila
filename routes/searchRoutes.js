const express = require("express");
const {
  searchLetters,
  searchAttachments,
} = require("../controllers/searchController");

const router = express.Router();

router.get("/", searchLetters);
router.get("/search-attachments", searchAttachments);

module.exports = router;
