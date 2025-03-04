import { Request, Response } from "express";
import { prisma } from "../lib/db";
import { generateLearningPathAI } from "../services/aiService";

const getLearningPath = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const cachedPath = await prisma.cachedLearningPath.findUnique({
    where: { userId },
  });

  if (cachedPath) {
    res.json({ learningPath: cachedPath.cachedPath, source: "cache" });
    return;
  }

  const learningPath = await prisma.learningPath.findUnique({
    where: { userId },
  });

  if (!learningPath) {
    res.status(404).json({ message: "Learning path not found" });
    return;
  }

  res.json({ learningPath: learningPath.path, source: "AI" });
};

const generateLearningPath = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const progress = await prisma.progress.findUnique({
    where: { userId },
  });

  if (!progress) {
    res.status(404).json({ message: "User progress not found" });
    return;
  }

  const learningPath = await generateLearningPathAI(progress);

  const updatedPath = await prisma.learningPath.upsert({
    where: { userId },
    update: { path: learningPath, updatedAt: new Date() },
    create: { userId, path: learningPath },
  });

  res.json({
    message: "New learning path generated",
    learningPath: updatedPath.path,
  });
};

export { getLearningPath, generateLearningPath };
