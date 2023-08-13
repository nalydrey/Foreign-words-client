import {Outlet} from 'react-router-dom'
import { Header } from './Header'
import { useAppDispatch, useAppSelector } from '../../hooks/toolkitHooks'
import { RectButton } from '../UI/RectButton'
import { LockClosedIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { AppSliceInt, menuControl, selectMode } from '../../slices/appSlice'

export const Layout = () => {

  const app = useAppSelector(state => state.app)
  const dispatch = useAppDispatch()

  const handlerMode = (mode: AppSliceInt['mode']) => {
    dispatch(selectMode(mode))
    dispatch(menuControl(false))
  }

  const handlerMenu = () => {
    dispatch(menuControl(false))
  }

  return (
    <>
    <Header/>
      <main className="grow h-full overflow-hidden"><Outlet/></main>
      <div className={`absolute w-screen h-screen duration-300 bg-black/80 flex flex-col top-0 ${app.menu ? ' left-0': '-left-full'}`}>
        <div className=' border-b-2 p-2 border-white'>
          <RectButton
            icon={<XMarkIcon  className='text-red-600'/>}
            onClick={handlerMenu}
          />
        </div>
        <div className='flex justify-center items-center h-full'>
          <ul className='gap-5 flex flex-col text-white text-center '>
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
        </div>
      </div>
  </>
  )
}
