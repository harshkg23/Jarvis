"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

function HeroSection() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold md:text-8xl lg:text-8xl bg-gradient-to-b from-white via-blue-200 to-blue-900 bg-clip-text text-transparent">
            Your AI Career Coach for
          </h1>

          {/* Animated Changing Text with Gradient */}
          <div className="text-3xl md:text-6xl font-bold bg-gradient-to-b from-white via-blue-200 to-blue-900 bg-clip-text text-transparent">
            <TypeAnimation
              sequence={[
                "Professional Success",
                1500,
                "Interview Preparation",
                1500,
                "Personalized Guidance",
                1500,
                "AI-Powered Tools",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          {/* Add spacing below animated text */}
          <div className="mt-4">
            <p className="mx-auto max-w-[600px] text-gray-300 md:text-lg">
              Advance your career with personalized guidance, mock interviews,
              resume & cover letter builders, and real-time industry insights.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold bg-blue-900 text-white hover:brightness-110 hover:scale-105 hover:text-black transition-all  shadow-md"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
