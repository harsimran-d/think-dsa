"use client";

import { motion } from "motion/react";
import { ClipboardList, Brain, BarChart } from "lucide-react";

const steps = [
  {
    title: "Step 1: Initial Assessment",
    description:
      "Take a short test to determine your problem-solving baseline.",
    icon: <ClipboardList size={40} className="text-blue-500" />,
  },
  {
    title: "Step 2: AI-Powered MCQs",
    description:
      "Answer real-time questions that adapt based on your thinking.",
    icon: <Brain size={40} className="text-orange-500" />,
  },
  {
    title: "Step 3: Get Personalized Feedback",
    description: "AI evaluates your strengths and suggests improvement areas.",
    icon: <BarChart size={40} className="text-green-500" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-24">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center rounded-xl bg-gray-100 p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {step.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-2 text-center text-sm text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
