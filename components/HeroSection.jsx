"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 mx-auto"
        >
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview
            preparation, and AI-powered tools for job success.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center space-x-4"
        >
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
