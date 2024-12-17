import express from "express";
import {
  bookPackages,
  getAllTour,
  getMyPackages,
  getSpecificTour,
} from "../controllers/packageContoller.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/getAllTours",  getAllTour);
router.get("/packages/:id", authenticateToken, getSpecificTour);
router.get('/getMyPackage/:userId', authenticateToken, getMyPackages)
router.post("/bookPackage", authenticateToken, bookPackages);

export default router;
