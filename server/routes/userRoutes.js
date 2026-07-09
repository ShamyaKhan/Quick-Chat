const express = require("express");
const protectRoute = require("../middlewares/auth");
const {
  signUp,
  login,
  updateProfile,
  checkAuth,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

module.exports = router;
