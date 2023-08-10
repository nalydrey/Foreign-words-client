import {ReactNode} from 'react'

interface RectButtonProps {
    icon: ReactNode
    onClick: ()=>void
}

export const RectButton = ({
    icon,
    onClick
}: RectButtonProps) => {
  return (
    <button 
        className='border w-10 h-10 rounded-lg duration-300 hover:bg-gray-500 active:bg-gray-700 p-1 shadow-light'
        onClick={onClick}
    >
        <div className='text-white w-full h-full'>
            {icon}
        </div>
    </button>
  )
}
