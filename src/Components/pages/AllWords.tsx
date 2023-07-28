import React from 'react'
import { WordItem } from '../UI/WordItem'

export const AllWords = () => {
  return (
   <div className='container mx-auto'>
      <div className='flex justify-center gap-5 mt-5 mb-10'>
          <input type="text" className='p-2 outline-2 rounded-lg min-w-[130px] text-2xl font-medium border-4 border-sky-700 focus:outline focus:outline-sky-500'/>
          <input type="text" className='p-2 outline-2 rounded-lg min-w-[130px] text-2xl font-medium border-4 border-sky-700 focus:outline focus:outline-sky-500'/>
          <button className='border border-gray-300 px-10 py-2 rounded-lg min-w-[130px] text-2xl font-medium'>Save</button>
          <button className='border border-gray-300 px-10 py-2 rounded-lg min-w-[130px] text-2xl font-medium'>Cancel</button>
      </div>
      <div className='flex flex-col items-center gap-3'>
        <WordItem/>
        <WordItem/>
        <WordItem/>
      </div>
   </div>
  )
}
