const express = require("express");
const protectRoute = require("../middlewares/auth");
const {
  getUsersForSidebar,
  getMessages,
  markMessageAsSeen,
  sendMessage,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

router.get("/:id", protectRoute, getMessages);

router.put("/mark/:id", protectRoute, markMessageAsSeen);

router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
