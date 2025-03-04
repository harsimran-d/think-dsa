import { Request, Response } from "express";
import { prisma } from "../lib/db";

const getCachedLearningPath = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const cachedPath = await prisma.cachedLearningPath.findUnique({
    where: { userId },
  });

  if (!cachedPath) {
    res.status(404).json({ message: "No cached learning path found" });
    return;
  }

  res.json({
    learningPath: cachedPath.cachedPath,
    lastUpdated: cachedPath.updatedAt,
  });
};

const updateCachedLearningPath = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { learningPath } = req.body;
  if (!learningPath) {
    res.status(400).json({ message: "Learning path is required" });
    return;
  }

  const updatedPath = await prisma.cachedLearningPath.upsert({
    where: { userId },
    update: { cachedPath: learningPath, updatedAt: new Date() },
    create: { userId, cachedPath: learningPath },
  });

  res.json({
    message: "Cached learning path updated",
    learningPath: updatedPath.cachedPath,
  });
};

const deleteCachedLearningPath = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  await prisma.cachedLearningPath.deleteMany({
    where: { userId },
  });

  res.json({ message: "Cached learning path deleted" });
};

export {
  getCachedLearningPath,
  updateCachedLearningPath,
  deleteCachedLearningPath,
};
