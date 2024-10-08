const express = require("express");
const multer = require("multer");
const { createDraft, getDraftById } = require("../controllers/draftController");
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

router.post("/create-draft", upload.single("file"), createDraft);
router.get("/get-draft/:id", getDraftById);

module.exports = router;
