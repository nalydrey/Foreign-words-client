import React from 'react'

export const Home = () => {
  return (
    <div className='h-full flex justify-center items-center '>
        <ul className='text-3xl text-center flex flex-col gap-3'>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>Start</li>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>Register</li>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>Log In</li>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>Log Out</li>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>Setting</li>
        </ul>
    </div>
  )
}
