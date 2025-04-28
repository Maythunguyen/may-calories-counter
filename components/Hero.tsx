"use client";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { LayoutGridDemo } from "./LayoutGrid";

export function HeroSectionOne() {
  const router = useRouter();
  return (
    <div className="w-full mx-auto px-10 md:px-20 flex flex-wrap md:flex-nowrap justify-between py-40 gap-10">
      <div className="w-full md:w-[35%] mb-20">
        <h1 className="text-4xl md:text-7xl font-bold dark:text-white">
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
            className="w-60 transform rounded-full bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer"
            onClick={() => router.push('/features')}
            >
              Explore Now
            </button>

          </motion.div>
          <div className="border-b-[1px] border-dashed border-gray-300 mt-20"></div>
          <div className="flex flex-wrap justify-evenly gap-20 md:gap-10 sm:gap-20 mt-20 items-center">
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <p className="text-xl font-bold">50 mln +</p>
              <p className="text-sm text-gray-600">people</p>
            </motion.div>

            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <p className="text-xl font-bold">6 000 +</p>
              <p className="text-sm text-gray-600">recipes</p>
            </motion.div>

            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center w-40 h-40 border-1 border-dashed border-yellow-400 rounded-full">
                <p className="text-xl font-bold">87 000 +</p>
                <p className="text-sm text-gray-600 mt-2">reviews</p>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="w-full md:w-[65%]">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <LayoutGridDemo />
          </motion.div>
        </div> 
    </div>
  );
}

