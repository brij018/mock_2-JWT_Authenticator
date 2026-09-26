import Manager from "../model/Manager.js";

const addManager = async (req, res) => {
  try {
    const manager = await Manager.create(req.body);
    res.status(201).json({
      success: true,
      message: "Manager inserted successfully",
      manager,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find();
    res.json({
      success: true,
      count: managers.length,
      managers,
      users: managers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getManagerById = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    if (!manager) {
      return res
        .status(404)
        .json({ success: false, message: "Manager not found" });
    }
    res.json({ success: true, manager });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndDelete(req.params.id);
    if (!manager) {
      return res
        .status(404)
        .json({ success: false, message: "Manager not found" });
    }
    res.json({
      success: true,
      message: "Manager deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!manager) {
      return res
        .status(404)
        .json({ success: false, message: "Manager not found" });
    }
    res.json({
      success: true,
      message: "Manager updated successfully",
      manager,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const searchManager = async (req, res) => {
  try {
    const key =
      req.params.key || req.query.q || req.query.search || req.query.key || "";
    const query = key
      ? {
          $or: [
            { name: { $regex: key, $options: "i" } },
            { email: { $regex: key, $options: "i" } },
            { phone: { $regex: key, $options: "i" } },
            { designation: { $regex: key, $options: "i" } },
          ],
        }
      : {};

    const managers = await Manager.find(query);
    res.json({
      success: true,
      count: managers.length,
      managers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPaginatedManagers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Manager.countDocuments();
    const managers = await Manager.find().skip(skip).limit(limit);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      managers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteMultipleManagers = async (req, res) => {
  try {
    const ids = req.body.ids || req.body;
    const result = await Manager.deleteMany({ _id: { $in: ids } });
    res.json({
      success: true,
      message: `${result.deletedCount} manager(s) deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  addManager,
  getAllManagers,
  getManagerById,
  deleteManager,
  updateManager,
  searchManager,
  getPaginatedManagers,
  deleteMultipleManagers,
};
