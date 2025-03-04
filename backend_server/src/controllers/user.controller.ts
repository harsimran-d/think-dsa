import { Request, Response } from "express";
import { prisma } from "../lib/db";

const getProgress = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const progress = await prisma.progress.findUnique({
    where: {
      userId,
    },
    select: {
      strengths: true,
      weaknesses: true,
      lastUpdated: true,
    },
  });
  if (!progress) {
    res.status(404).json({
      message: "Progress not found",
    });
    return;
  }

  res.json(progress);
};

const updateProgress = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const { strengths, weaknesses } = req.body;
  const progress = await prisma.progress.upsert({
    where: {
      userId,
    },
    update: {
      strengths,
      weaknesses,
      lastUpdated: new Date(),
    },
    create: {
      userId,
      strengths,
      weaknesses,
      lastUpdated: new Date(),
    },
    select: {
      strengths: true,
      weaknesses: true,
      lastUpdated: true,
    },
  });

  res.json(progress);
};
const getHistory = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const history = await prisma.userResponse.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      questionId: true,
      correct: true,
      createdAt: true,
    },
  });

  res.json(history);
};

export { getProgress, updateProgress, getHistory };
