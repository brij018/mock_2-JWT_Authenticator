import express from "express";
import managerController from "../controller/managerController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminOnly);

router.post("/", managerController.addManager);
router.post("/add", managerController.addManager);

router.get("/search", managerController.searchManager);
router.get("/search/:key", managerController.searchManager);

router.get("/pagination", managerController.getPaginatedManagers);

router.post("/delete-multiple", managerController.deleteMultipleManagers);
router.delete("/delete-multiple", managerController.deleteMultipleManagers);

router.get("/", managerController.getAllManagers);
router.get("/:id", managerController.getManagerById);
router.put("/:id", managerController.updateManager);
router.delete("/:id", managerController.deleteManager);

export default router;
