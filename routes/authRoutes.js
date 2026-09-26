import express from "express";
import authController from "../controller/authController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", authController.addUser);
router.post("/login", authController.login);
router.post("/logout", protect, authController.logOut);
router.post("/logoutAll", protect, authController.logOutAll);

router.get("/users/search", protect, adminOnly, authController.searchUsers);
router.get(
  "/users/search/:key",
  protect,
  adminOnly,
  authController.searchUsers,
);
router.get(
  "/users/pagination",
  protect,
  adminOnly,
  authController.getPaginatedUsers,
);
router.post(
  "/users/delete-multiple",
  protect,
  adminOnly,
  authController.deleteMultipleUsers,
);
router.delete(
  "/users/delete-multiple",
  protect,
  adminOnly,
  authController.deleteMultipleUsers,
);

router.get("/users", protect, adminOnly, authController.getAllUsers);
router.put("/users/:id", protect, authController.updateUser);
router.delete("/users/:id", protect, authController.deleteUser);

export default router;
