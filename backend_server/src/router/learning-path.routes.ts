import express from "express";
import {
  getLearningPath,
  generateLearningPath,
} from "../controllers/learning-path.controller";

const router = express.Router();

router.get("/", getLearningPath);
router.post("/generate", generateLearningPath);

export default router;
