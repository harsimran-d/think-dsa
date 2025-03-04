import { Request, Response } from "express";
import { prisma } from "../lib/db";

const getNextQuestion = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const userResponses = await prisma.userResponse.findMany({
    where: { userId },
    select: { questionId: true, correct: true },
    orderBy: { responseTime: "desc" },
    take: 10,
  });

  const incorrectQuestions = userResponses
    .filter((response) => !response.correct)
    .map((response) => response.questionId);

  let nextQuestion;
  if (incorrectQuestions.length > 0) {
    nextQuestion = await prisma.question.findFirst({
      where: { id: { in: incorrectQuestions } },
    });
  } else {
    nextQuestion = await prisma.question.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }

  if (!nextQuestion) {
    res.status(404).json({ message: "No questions available" });
    return;
  }

  res.json(nextQuestion);
};

const submitAnswer = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { questionId, userAnswer } = req.body;
  if (!questionId || !userAnswer) {
    res.status(400).json({ message: "Question ID and answer are required" });
    return;
  }

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });

  if (!question) {
    res.status(404).json({ message: "Question not found" });
    return;
  }

  const correct = userAnswer.trim().toLowerCase() === "expected-correct-answer";
  await prisma.userResponse.create({
    data: {
      userId,
      questionId,
      userAnswer,
      correct,
    },
  });

  res.json({ message: "Answer submitted", correct });
};

const getQuestionHistory = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const history = await prisma.userResponse.findMany({
    where: { userId },
    select: {
      id: true,
      questionId: true,
      correct: true,
      responseTime: true,
    },
    orderBy: { responseTime: "desc" },
  });

  res.json(history);
};

export { getNextQuestion, submitAnswer, getQuestionHistory };
