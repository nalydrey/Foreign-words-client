import React from 'react'
import { useAppSelector } from '../../hooks/toolkitHooks'

export const Setting = () => {

  const currentUser = useAppSelector(state => state.currentUser.user)

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='w-96 h-96 shadow-deep bg-gray-700/50 backdrop-blur-sm rounded-lg p-5'>
        <h1 className='text-center mb-5 text-4xl font-bold text-sky-600'>Settings</h1>
        {
          currentUser &&
          <ul>
            <li className='flex gap-10'>
              <p>Pause</p>
              <p>{currentUser.settings.pause}</p>
            </li>
            <li className='flex gap-10'>
              <p>Learn counter</p>
              <p>{currentUser.settings.lastWords}</p>
            </li>
            <li className='flex gap-10'>
              <p>Need to learn</p>
              <p>10</p>
            </li>
            <li className='flex gap-10'>
              <p>Timer</p>
              <p>{currentUser.settings.timer ? 'On': 'Off'}</p>
            </li>
          </ul>
        }
      </div>
    </div>
  )
}
