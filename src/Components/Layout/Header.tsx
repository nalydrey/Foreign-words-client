import React from 'react'
import avatar from '../../assets/defaultAva.png'
import { Path } from '../../enums/Path'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/toolkitHooks'
import { AppSliceInt, menuControl, selectMode } from '../../slices/appSlice'
import { Bars3Icon } from '@heroicons/react/20/solid'

export const Header = () => {

  const location = useLocation()
  console.log(location);
  

  const dispatch = useAppDispatch()
  const app = useAppSelector(state => state.app)

  const handlerMode = (mode: AppSliceInt['mode']) => {
    dispatch(selectMode(mode))
  }

  const handlerMenu = () => {
    dispatch(menuControl(true))
  }
  

  return (
    <header className="bg-blue-500/60">
      <div className=" container mx-auto flex justify-between items-center py-2">
        <div className='text-2xl lg:text-5xl font-bold text-sky-900 cursor-pointer hover:text-sky-300 '>
          <Link to={Path.HOME}>LOGO</Link>
        </div>
        <nav>
          {
            location.pathname === Path.GAME &&
            <ul className='gap-4 lg:gap-5 hidden md:flex'>
              <li className={` text-xl lg:text-2xl font-medium cursor-pointer hover:text-sky-300 ${app.mode === 'learn' ? 'text-green-300':''}`}
                onClick = {() => handlerMode('learn')}
              >Learn</li>
              <li className={` text-xl lg:text-2xl font-medium cursor-pointer hover:text-sky-300 ${app.mode === 'old only' ? 'text-green-300':''}`}
                onClick = {() => handlerMode('old only')}
              >Old only</li>
              <li className={` text-xl lg:text-2xl font-medium cursor-pointer hover:text-sky-300 ${app.mode === 'new only' ? 'text-green-300':''}`}
                onClick = {() => handlerMode('new only')}
              >New Only</li>
              <li className={` text-xl lg:text-2xl font-medium cursor-pointer hover:text-sky-300 ${app.mode === 'last new' ? 'text-green-300':''}`}
                onClick = {() => handlerMode('last new')}
              >Last new</li>
              <li className={` text-xl lg:text-2xl font-medium cursor-pointer hover:text-sky-300 ${app.mode === 'last old' ? 'text-green-300':''}`}
                onClick = {() => handlerMode('last old')}
              >Last old</li>
              <li className={` text-xl lg:text-2xl font-medium cursor-pointer hover:text-sky-300 ${app.mode === 'all' ? 'text-green-300':''}`}
                onClick = {() => handlerMode('all')}
              >All</li>
            </ul>
          }
        </nav>

        {
          location.pathname === Path.GAME &&
          <button 
            className='w-10 h-10 border p-[2px] rounded-lg bg-gray-700/50 text-white shadow-light md:hidden'
            onClick={handlerMenu}
          >
            <Bars3Icon />
          </button>
        }
        
        <div className='h-10 w-10 md:h-14 md:w-14 rounded-full shadow-2xl cursor-pointer overflow-hidden'>
          <img src={avatar} alt="" />
        </div>
      </div>
    </header>
  )
}
