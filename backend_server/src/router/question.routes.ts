import express from "express";
import {
  getNextQuestion,
  submitAnswer,
  getQuestionHistory,
} from "../controllers/question.controller";

const router = express.Router();

router.get("/next", getNextQuestion);
router.post("/submit", submitAnswer);
router.get("/history", getQuestionHistory);
export default router;
