const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res.json({ success: false, message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = protectRoute;
