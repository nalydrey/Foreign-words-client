import React from 'react'
import { Link } from 'react-router-dom'
import { Path } from '../../enums/Path'

export const Home = () => {
  return (
    <div className='h-full flex justify-center items-center '>
        <ul className='text-3xl text-center flex flex-col gap-3'>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
              <Link to={Path.GAME}>Start</Link>
            </li>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
              <Link to={Path.WORDS}>Show all words</Link>
            </li>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
              <Link to={Path.REGISTER}>Register</Link>
            </li>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
              <Link to={Path.LOGIN}>Log In</Link>
            </li>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
              <Link to={Path.WORDS}>Log Out</Link>
            </li>
            <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
              <Link to={Path.SETTING}>Setting</Link>
            </li>
        </ul>
    </div>
  )
}
