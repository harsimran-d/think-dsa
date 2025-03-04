import { Router } from "express";
import { prisma } from "../lib/db";
import { OAuth2Client } from "google-auth-library";
import { createClient } from "redis";
const redis = createClient({
  url: `redis://${process.env.REDIS_HOST || "localhost"}:${
    process.env.REDIS_PORT || 6379
  }`,
});
redis.on("error", (err) => {
  console.error("Redis Client Error:", err);

  if (err.code == "ECONNREFUSED") {
    console.log("Redis server is not running.");
    console.log("Please start the Redis server.");
    process.exit(1);
  }
});
async function initializeRedis() {
  try {
    await redis.connect();
    console.log("Redis connected successfully");
  } catch (err) {
    console.error("Redis Connection Error:", err);
    console.log("Please ensure the Redis server is running.");
    process.exit(1);
  }
}

initializeRedis();

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!
);
const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { email, otp, name } = req.body;
  if (!email || !otp) {
    res.status(400).json({
      message: "email and otp are required",
    });
    return;
  }
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    res.status(409).json({
      message: "User already exists with this email",
    });
    return;
  }
  const valueFromRedis = await redis.get(email);
  const { otp: otpFromRedis, type } = JSON.parse(valueFromRedis || "{}");
  if (otpFromRedis !== otp || type !== "signup") {
    res.status(401).json({
      message: "Invalid OTP",
    });
    return;
  }
  await redis.del(email);

  const user = await prisma.user.create({
    data: {
      email,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

authRouter.post("/signin", async (req, res) => {
  const { email, otp } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const valueFromRedis = await redis.get(email);
  const { otp: otpFromRedis, type } = JSON.parse(valueFromRedis || "{}");

  if (otpFromRedis !== otp || type !== "signin") {
    res.status(401).json({ message: "Invalid OTP" });
    return;
  }
  await redis.del(email);
  res.status(200).json({
    message: "User signed in successfully",

    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});
authRouter.post("/google-signin", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      res.status(400).json({
        message: "idToken is required",
      });
      return;
    }
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });
    const payload = ticket.getPayload();
    if (!payload?.email) {
      res.status(400).json({
        message: "Invalid idToken",
      });
      return;
    }
    const email = payload.email as string;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          email,
        },
        select: {
          id: true,
          email: true,
        },
      });
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } else {
      res.status(200).json({
        message: "User signed in successfully",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

authRouter.post("/send-otp", async (req, res) => {
  const { email, type } = req.body;
  if (!email || !type || !["signup", "signin"].includes(type)) {
    res.status(400).json({
      message: "email and type are required",
    });
    return;
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(email, JSON.stringify({ otp, type }), { EX: 60 * 15 });
  await redis.xAdd("email_otp_notifications", "*", { email, otp, type });
  res.status(200).json({
    message: "OTP sent successfully",
  });
});
export default authRouter;
