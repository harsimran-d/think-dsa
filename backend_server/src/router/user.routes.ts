import express from "express";
import {
  getProgress,
  updateProgress,
  getHistory,
} from "../controllers/user.controller";

const router = express.Router();
router.get("/progress", getProgress);
router.get("/history", getHistory);
router.patch("/update-progress", updateProgress);

export default router;
