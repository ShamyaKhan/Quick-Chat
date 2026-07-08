const { v2 } = require("cloudinary");
const { generateToken } = require("../lib/utils");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, bio } = req.body;

    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);

    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account Created!",
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid Credentials!" });
    }

    const token = generateToken(userData._id);

    res.json({ success: true, userData, token, message: "Login Successful!" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const checkAuth = async (req, res) => {
  res.json({ success: true, user: req.user });
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
    } else {
      const upload = await v2.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          profilePic: upload.secure_url,
          bio,
          fullName,
        },
        { new: true },
      );
    }

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = { signUp, login, checkAuth, updateProfile };
