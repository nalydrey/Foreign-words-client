import React from 'react'

export const WordItem = () => {
  return (
    <div className='bg-gray-600 rounded-lg p-3 flex justify-between max-w-[800px] w-full gap-10'>
        <div className='flex grow gap-5 items-center'>
            <p className='p-2 border border-gray-400 rounded-lg w-full text-2xl font-medium'>Foreign Word</p>
            <p className='p-2 border border-gray-400 rounded-lg w-full text-2xl font-medium'>Native Word</p>
        </div>
        <div className='flex gap-3'>
            <button className='border border-gray-300 px-10 py-2 rounded-lg min-w-[130px] text-2xl font-medium'>Edit</button>
            <button className='border border-gray-300 px-10 py-2 rounded-lg min-w-[130px] text-2xl font-medium'>Delete</button>
        </div>
    </div>
  )
}
