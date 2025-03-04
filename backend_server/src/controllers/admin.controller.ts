import { Request, Response } from "express";
import { prisma } from "../lib/db";

const addQuestion = async (req: Request, res: Response) => {
  const { questionText, category, difficulty } = req.body;

  if (!questionText || !category || !difficulty) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const newQuestion = await prisma.question.create({
    data: { questionText, category, difficulty },
  });

  res
    .status(201)
    .json({ message: "Question added successfully", question: newQuestion });
};

const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingQuestion = await prisma.question.findUnique({ where: { id } });
  if (!existingQuestion) {
    res.status(404).json({ message: "Question not found" });
    return;
  }

  await prisma.question.delete({ where: { id } });

  res.json({ message: "Question deleted successfully" });
};

const getAnalytics = async (req: Request, res: Response) => {
  const totalUsers = await prisma.user.count();
  const totalQuestions = await prisma.question.count();
  const totalResponses = await prisma.userResponse.count();

  res.json({
    totalUsers,
    totalQuestions,
    totalResponses,
    message: "System analytics retrieved successfully",
  });
};

export { addQuestion, deleteQuestion, getAnalytics };
