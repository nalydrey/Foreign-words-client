import React from 'react'
import { Counter } from './Counter'
import { Settings } from '../../models/settingModel'

interface SettingItemProps {
    title: string
    name: keyof Settings
    value: number | boolean
    onMinus: (name: keyof Settings, value: number | boolean)=>void
    onPlus: (name: keyof Settings, value: number | boolean)=>void
}

export const SettingItem = ({
    title,
    name,
    value,
    onPlus,
    onMinus
}: SettingItemProps) => {
  return (
    <div className='flex justify-between items-center border-b-2 py-2 gap-5'>
        <h5 className='text-xl font-bold text-sky-500'>{title}</h5>
        <Counter
            name={name}
            value={value}
            onPlus={() => onPlus(name, value)}
            onMinus={() => onMinus(name, value)}
        />
    </div>
  )
}
