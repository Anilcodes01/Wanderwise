import express from "express";
import {
  addTour,
  deletePackage,
  updatePackage,
} from "../controllers/adminController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/addPackage", authenticateToken, addTour);
router.delete("/packages/:id", authenticateToken, deletePackage);
router.put("/updatePackage/:id", authenticateToken, updatePackage);

export default router;
