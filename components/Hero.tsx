
"use client";
import { motion } from "motion/react";
import { Plus, ArrowRight, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroSectionOne() {
  const router = useRouter();
  return (
    <div className="min-h-screen pt-8 md:pt-20 lg:pt-30 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white min-h-[600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          
          {/* Left Side - Hero Content */}
          <div className="lg:col-span-4 order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 lg:mb-0"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-black leading-tight mb-4 md:mb-6">
                CALORIE<br />
                COUNTER
              </h1>
              
              <p className="text-gray-700 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Manage Your Daily Food Diary,<br />
                Track Your Activities<br />
                And Lose Weight Successfully
              </p>
              
              <button className="bg-yellow-400 text-black px-4 md:px-6 py-2 md:py-3 rounded-full font-medium hover:bg-yellow-500 transition-colors flex items-center gap-2 text-sm md:text-base" onClick={() => router.push('/features')}>
                Go to the app <ArrowRight size={18} />
              </button>
            </motion.div>
            
            {/* Dashed Separator */}
            <div className="border-b border-dashed border-gray-300 my-8 md:my-12 lg:my-16"></div>
            
            {/* Stats Section */}
            <div className="flex flex-wrap items-center justify-between gap-4 md:gap-6">
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-base md:text-lg font-bold text-black">50 mln +</div>
                <div className="text-xs md:text-sm text-gray-600">people</div>
              </div>
              
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-base md:text-lg font-bold text-black">6 000 +</div>
                <div className="text-xs md:text-sm text-gray-600">recipes</div>
              </div>
              
              <div className="text-center relative flex-1 min-w-[100px] flex justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-dashed border-yellow-400 rounded-full flex flex-col items-center justify-center">
                  <div className="text-sm md:text-lg font-bold text-black">87 000 +</div>
                  <div className="text-xs text-gray-600">reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Summary Card */}
          <div className="lg:col-span-4 order-3 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-blue-50 rounded-2xl p-4 md:p-6 mb-4 md:mb-6"
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-semibold text-black">Summary</h3>
                <button className="text-blue-600 text-xs md:text-sm">More</button>
              </div>
              
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="200"
                      strokeDashoffset="80"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-xl md:text-2xl font-bold text-black">1031</div>
                    <div className="text-xs md:text-sm text-gray-600">Remaining</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nutrition Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-semibold text-black">Nutrition</h3>
                <Plus size={18} className="text-gray-600" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm md:text-base">Lunch</span>
                  <span className="text-gray-900 font-medium text-sm md:text-base">374 / 702 kcal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm md:text-base">Dinner</span>
                  <span className="text-gray-900 font-medium text-sm md:text-base">0 / 702 kcal</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm md:text-base">Snacks</span>
                  <span className="text-gray-900 font-medium text-sm md:text-base">0 kcal</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Cards */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6 order-2 lg:order-3">
            
            {/* Recipes Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-50 rounded-2xl p-4 md:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-semibold text-black">Recipes</h3>
                <ArrowRight size={18} className="text-gray-600" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm md:text-base">Breakfast, Lunch, Dinner</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm md:text-base">High Protein</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm md:text-base">Low Carb, Low Calorie</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm md:text-base">Vegetarian</span>
                </div>
              </div>
            </motion.div>

            {/* Measurements Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-blue-50 rounded-2xl p-4 md:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-semibold text-black">Measurements</h3>
                <button className="text-blue-600 text-xs md:text-sm">More</button>
              </div>
              
              <div className="mb-4">
                <div className="text-xs md:text-sm text-gray-600 mb-2">Weight</div>
                <div className="flex items-center justify-between">
                  <button className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center">
                    <Minus size={14} className="text-gray-600" />
                  </button>
                  <div className="text-xl md:text-2xl font-bold text-black">54,1 kg</div>
                  <button className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center">
                    <Plus size={14} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Activities Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gray-50 rounded-2xl p-4 md:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-semibold text-black">Activities</h3>
                <button className="text-blue-600 text-xs md:text-sm">More</button>
              </div>
              
              <div>
                <div className="text-xs md:text-sm text-gray-700">2 041 steps, 15 km, 73 kcal</div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
