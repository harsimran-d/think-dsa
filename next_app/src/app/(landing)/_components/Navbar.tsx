"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed z-50 w-full border-b border-blue-600 bg-blue-700/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" className="text-xl font-bold text-white">
              ThinkDSA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            {["Home", "Features", "How It Works", "FAQ"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                className="text-neutral-300 transition-colors duration-200 hover:text-white"
              >
                {item}
              </Link>
            ))}
            {/* <button className="bg-primary hover:bg-secondary rounded-md px-4 py-2 text-white transition-colors duration-200">
              Start Now
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-300 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-b border-neutral-800 bg-neutral-900 md:hidden"
          >
            <div className="space-y-1 px-2 pt-2 pb-3">
              {[
                "Home",
                "Features",
                "How It Works",
                "Pricing",
                "Testimonials",
                "FAQ",
                "Integrations",
              ].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                  className="block px-3 py-2 text-neutral-300 transition-colors duration-200 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {/* <button className="bg-primary hover:bg-secondary w-full rounded-md px-4 py-2 text-center text-white transition-colors duration-200">
                Start Now
              </button> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
