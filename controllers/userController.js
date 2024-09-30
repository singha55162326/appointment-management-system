const User = require("../models/User");

// Get all users (Admin only)
const getUsers = async (req, res) => {
  const { page = 1, limit = 10, name, email, role } = req.query;

  // Create a filter object
  let filter = {};

  if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive match
  if (email) filter.email = { $regex: email, $options: "i" }; // Case-insensitive match
  if (role) filter.role = role; // Exact match

  try {
    // Pagination logic
    const users = await User.find(filter)
      .limit(limit * 1) // Convert limit to a number
      .skip((page - 1) * limit); // Skip users based on the current page

    const totalUsers = await User.countDocuments(filter); // Get total count of users matching the filter

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Create a new user (Admin only)
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    if (!["Admin", "Secretary", "Requester"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a user (Admin only)
const updateUser = async (req, res) => {
  const { name, role } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    if (role && ["Admin", "Secretary", "Requester"].includes(role)) {
      user.role = role;
    }

    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a user (Admin only)
const deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
