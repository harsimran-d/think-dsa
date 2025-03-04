"use client";

import { useState } from "react";
import { motion } from "motion/react";

const faqs = [
  {
    question: "How does ThinkDSA adapt to my learning style?",
    answer:
      "ThinkDSA uses AI to analyze your responses and adjust questions dynamically. Your learning path is tailored in real-time for the best problem-solving experience.",
  },
  {
    question: "Do I need to know coding to use ThinkDSA?",
    answer:
      "No! ThinkDSA is designed for logic-based learning. You focus on problem-solving and critical thinking, not syntax or coding.",
  },
  {
    question: "Is ThinkDSA free to use?",
    answer:
      "Yes, ThinkDSA offers a free tier with access to core features. We also provide premium plans for advanced analytics and personalized study recommendations.",
  },
  {
    question: "Can I track my progress over time?",
    answer:
      "Absolutely! ThinkDSA provides AI-driven insights into your strengths, weaknesses, and improvement areas so you can track progress effectively.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Get answers to common questions about ThinkDSA
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-lg border border-gray-300 bg-white shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <button
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <svg
                  className={`h-6 w-6 transform text-gray-900 transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <motion.div
                className={`overflow-hidden ${
                  openIndex === index ? "block" : "hidden"
                }`}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="p-6 pt-0 text-gray-700">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        >
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Still have questions?
          </h3>
          <a
            href="#contact"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <span>Contact our support team</span>
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
