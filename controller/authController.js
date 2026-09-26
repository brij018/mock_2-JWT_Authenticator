import User from "../model/User.js";
import jwt from "jsonwebtoken";
import HttpError from "../middleware/HttpError.js";
import bcrypt from "bcrypt";

const generateToken = async (user) => {
  const token = jwt.sign(
    { id: user._id, userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const addUser = async (req, res) => {
  try {
    const { username, name, email, password, role } = req.body;

    const user = await User.create({
      username: username || name,
      email,
      password,
      role: role || "admin",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = await generateToken(user);
    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const logOut = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
    await req.user.save();
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json({
      success: true,
      message: "Successfully logged out of all devices",
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const targetedUserId = req.params.id || req.user._id;

    const user = await User.findById(targetedUserId);
    if (!user) return next(new HttpError("User Not Found!", 404));
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== user._id.toString()
    ) {
      return next(new HttpError("Unauthorized access", 401));
    }

    let allowedFields = [
      "username",
      "name",
      "password",
      "confirm_password",
      "status",
      "updated_date",
    ];
    if (req.user.role === "admin")
      allowedFields = [...allowedFields, "role", "email"];

    const updates = Object.keys(req.body);
    const invalid = updates.filter((f) => !allowedFields.includes(f));
    if (invalid.length) {
      return next(new HttpError(`Invalid fields: ${invalid.join(", ")}`, 400));
    }
    updates.forEach((field) => {
      if (field === "name") user.username = req.body[field];
      else user[field] = req.body[field];
    });
    user.updated_date = req.body.updated_date || new Date().toISOString();
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const searchUsers = async (req, res) => {
  try {
    const key = req.params.key || req.query.q || req.query.search || "";
    const users = await User.find({
      $or: [
        { username: { $regex: key, $options: "i" } },
        { email: { $regex: key, $options: "i" } },
      ],
    }).select("-password");

    res.json({ success: true, count: users.length, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPaginatedUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit).select("-password");

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMultipleUsers = async (req, res) => {
  try {
    const ids = req.body.ids || req.body;
    const result = await User.deleteMany({ _id: { $in: ids } });
    res.json({
      success: true,
      message: `${result.deletedCount} user(s) deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  addUser,
  login,
  logOut,
  logOutAll,
  getAllUsers,
  deleteUser,
  updateUser,
  searchUsers,
  getPaginatedUsers,
  deleteMultipleUsers,
};
