const express = require("express");
const multer = require("multer");
const { uploadLetter, getLetters } = require("../controllers/letterController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload-letter", upload.single("file"), uploadLetter);
router.get("/get-letters/:userId", getLetters);

module.exports = router;
