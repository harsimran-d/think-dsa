import express from "express";
import { getCachedLearningPath } from "../controllers/cache.controller";

const router = express.Router();

router.get("/learning-path:userId", getCachedLearningPath);
export default router;
