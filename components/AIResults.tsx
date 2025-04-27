"use client"
import React from 'react'

interface AIResultsProps {
  result: CalorieResult | null;
}

const AIResults = ({ result }: AIResultsProps) => {


  return (

    <div>
        {result && (
        <div className="flex flex-col gap-3 rounded-3xl bg-gray-200 mt-10 p-6 text-gray-700">
          <div className='flex flex-row justify-between mb-6'>
            <div>
              <h2 className="text-lg font-semibold ">ANALYSIS RESULTS</h2>
            </div>
            <div>
            </div>
          </div>
          
          <div className=' border-t-1 border-dashed border-gray-300 mb-6'></div>

          <div className="mt-2 space-y-1">
            {result.food_items.map((food, i) => (
              <div key={food} className='flex flex-row justify-between text-text border-b-[1px] border-dashed border-gray-300 mt-6 pb-2'>
                <div>
                  {food}
                </div>
                <div>
                  {result.calories_per_item[i]} kcal
                </div>
              </div>
              

            ))}
          </div>
          <div className='flex flex-row justify-between mt-3'>
            <div className="mt-3 font-bold">
              Total calories
            </div>
            <div className="mt-3 font-bold">
              {result.total_calories} kcal
            </div>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default AIResults
