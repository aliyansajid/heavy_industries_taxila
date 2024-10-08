const express = require("express");
const {
  createUser,
  getUsers,
  getUsersByIds,
} = require("../controllers/userController");
const router = express.Router();

router.post("/create-user", createUser);
router.get("/get-users", getUsers);
router.get("/get-usersByIds", getUsersByIds);

module.exports = router;
