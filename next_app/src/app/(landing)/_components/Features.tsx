"use client";

import { motion } from "motion/react";
import { BrainCircuit, ListChecks, LineChart, Terminal } from "lucide-react";

const features = [
  {
    title: "AI-Powered Adaptive Learning",
    description:
      "Questions dynamically adjust based on your thinking patterns. No generic quizzes—just personalized learning!",
    icon: <BrainCircuit size={40} className="text-blue-500" />,
  },
  {
    title: "Step-by-Step Explanations",
    description:
      "Every answer comes with an expert-guided thought process to train your mind.",
    icon: <ListChecks size={40} className="text-orange-500" />,
  },
  {
    title: "Track Your Progress & Weaknesses",
    description:
      "AI identifies your problem-solving strengths and suggests targeted exercises to improve.",
    icon: <LineChart size={40} className="text-green-500" />,
  },
  {
    title: "No Coding, Just Thinking",
    description:
      "ThinkDSA focuses on logic and approach before syntax—perfect for beginners and interview prep.",
    icon: <Terminal size={40} className="text-purple-500" />,
  },
];

export default function Features() {
  return (
    <section className="w-full bg-gray-100 py-24">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose ThinkDSA?
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center rounded-xl bg-white p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {feature.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-center text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
