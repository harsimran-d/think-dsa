import express from "express";
import { addQuestion, deleteQuestion } from "../controllers/admin.controller";

const router = express.Router();

router.post("/quesitons/:id", addQuestion);
router.delete("/questions/:id", deleteQuestion);

export default router;
