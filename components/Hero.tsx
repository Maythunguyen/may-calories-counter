"use client";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function HeroSectionOne() {
  const router = useRouter();
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Calories<br /> Counter
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Manage your Daily Food Dairy, <br/>
        Track your activitites <br/>
        And Loose weight with ease
      </p>

      <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-items-start gap-4"
        >
          <button 
          className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer"
          onClick={() => router.push('/features')}
          >
            Explore Now
          </button>

        </motion.div>
      
    </div>
  );
}

