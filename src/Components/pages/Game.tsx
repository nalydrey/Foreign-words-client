import React from 'react'

export const Game = () => {
  return (
    <div className='container mx-auto'>
        <div className='mb-52 mt-5 flex justify-center gap-20'>
            <div className='text-center text-3xl'>
                <h3>Title</h3>
                <div className='border border-gray-800 py-3 px-10 min-w-[150px]  rounded-lg text-2xl font-bold'>
                    1230
                </div>
            </div>
            <div className='text-center text-3xl'>
                <h3>Title</h3>
                <div className='border border-gray-800 py-3 px-10 min-w-[150px]  rounded-lg text-2xl font-bold'>
                    1230
                </div>
            </div>
            <div className='text-center text-3xl'>
                <h3>Title</h3>
                <div className='border border-gray-800 py-3 px-10 min-w-[150px]  rounded-lg text-2xl font-bold'>
                    1230
                </div>
            </div>
            <div className='text-center text-3xl'>
                <h3>Title</h3>
                <div className='border border-gray-800 py-3 px-10 min-w-[150px]  rounded-lg text-2xl font-bold'>
                    1230
                </div>
            </div>
        </div>
        <div className='flex justify-center'>
        <div className='border border-white w-96 h-96 rounded-lg bg-gray-700 flex flex-col'>
            <div className='grow'>
                <span className='text-4xl text-gray-300 text-center flex h-full justify-center items-center'>Text</span>
            </div>
            <div className=' p-3 flex justify-center items-center'>
            <button className='border-2 border-gray-300 px-10 py-3 rounded-lg text-2xl text-gray-300 duration-200 hover:bg-sky-900'>Show</button>
            </div>
        </div>
        </div>
    </div>
  )
}
