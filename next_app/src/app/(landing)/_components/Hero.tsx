"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex w-full flex-col items-center bg-gradient-to-br from-blue-500 to-indigo-600 px-6 py-24 text-center text-white">
      <motion.h1
        className="mb-4 text-4xl font-bold md:text-5xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Think First, Code Later: Master Problem-Solving with ThinkDSA
      </motion.h1>

      <motion.p
        className="mb-6 max-w-2xl text-lg md:text-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        An AI-powered, non-coding platform that helps you develop critical
        thinking skills for DSA. Personalized questions. Real-time feedback.
        Smarter learning.
      </motion.p>

      <motion.div
        className="flex flex-col gap-4 md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href={"/signup"}>
          <Button className="bg-orange-500 px-6 py-3 text-lg font-semibold transition-all hover:bg-orange-600">
            Start Learning for Free
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
