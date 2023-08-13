import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/toolkitHooks'
import { Counter } from '../UI/Counter'
import { SettingItem } from '../UI/SettingItem'
import { ButtonMain } from '../UI/ButtonMain'
import { ArrowDownIcon, ArrowDownTrayIcon } from '@heroicons/react/20/solid'
import { changeSetting, toggleSetting } from '../../slices/currentUserSlice'
import { Settings } from '../../models/settingModel'

type SettingHandler = (name: keyof Settings, value: number | boolean)=>void

export const Setting = () => {

  const currentUser = useAppSelector(state => state.currentUser.user)
  const dispatch = useAppDispatch()

  const handlerPlus: SettingHandler = (name, value) => {
    if(typeof value === 'boolean'){
      dispatch(toggleSetting({name, value}))
    }
    if(typeof value === 'number'){
      dispatch(changeSetting({name, value: value+1}))
    }
    
  }
  
  const handlerMinus: SettingHandler = (name, value) => {
    if(typeof value === 'boolean'){
      dispatch(toggleSetting({name, value}))
    }
    if(typeof value === 'number'){
      dispatch(changeSetting({name, value: value-1}))
    }
  }

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='max-w-[500px] mx-2 shadow-deep bg-gray-700/50 backdrop-blur-sm rounded-lg p-5 flex flex-col gap-5 items-center'>
        <h1 className='text-center text-4xl font-bold text-sky-600'>Settings</h1>
        {
          currentUser &&
          <div className='flex flex-col gap-3'>
            <SettingItem
              name='pause'
              title='Pause'
              value={currentUser.settings.pause}
              onMinus={handlerMinus}
              onPlus={handlerPlus}
            />
            <SettingItem
              name='lastWords'
              title='Learn counter'
              value={currentUser.settings.lastWords}
              onMinus={handlerMinus}
              onPlus={handlerPlus}
            />
            <SettingItem
              name='timer'
              title='Timer'
              value={currentUser.settings.timer}
              onMinus={handlerMinus}
              onPlus={handlerPlus}
            />
          </div>
          
        }
        <ButtonMain
          startIcon={<ArrowDownTrayIcon/>}
          title='Save'
          onClick={()=>{}}
        />
        
      </div>
    </div>
  )
}
