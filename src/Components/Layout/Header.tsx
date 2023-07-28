import React from 'react'
import avatar from '../../assets/defaultAva.png'
import { Path } from '../../enums/Path'
import { Link, useLocation } from 'react-router-dom'

export const Header = () => {

  const location = useLocation()
  console.log(location);
  

  return (
    <header className="bg-blue-500">
      <div className=" container mx-auto flex justify-between items-center py-2">
        <div className='text-5xl font-bold text-sky-900 cursor-pointer hover:text-sky-300'>
          <Link to={Path.HOME}>LOGO</Link>
        </div>
        <nav>
          {
            location.pathname === Path.GAME &&
            <ul className='flex gap-5'>
              <li className=' text-2xl font-medium cursor-pointer hover:text-sky-300'>Learn</li>
              <li className=' text-2xl font-medium cursor-pointer hover:text-sky-300'>Repeat 40 last</li>
              <li className=' text-2xl font-medium cursor-pointer hover:text-sky-300'>Repeat all words</li>
            </ul>
          }
        </nav>
        <div className='h-14 w-14 rounded-full shadow-2xl cursor-pointer overflow-hidden'>
          <img src={avatar} alt="" />
        </div>
      </div>
    </header>
  )
}
