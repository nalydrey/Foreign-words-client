import {ReactNode} from 'react'
import preloader from '../../assets/Spinner-1s-197px.svg'

export interface ButtonMainProps {
    type?: 'button' | 'reset' | 'submit'
    isVisible?: boolean
    startIcon?: ReactNode
    endIcon?: ReactNode
    className?: string
    title: string
    isLoading?: boolean
    onClick?: () => void
}

export const ButtonMain = ({
    isVisible = true,
    startIcon,
    endIcon,
    className,
    title,
    isLoading,
    type = 'button',
    onClick
}: ButtonMainProps) => {
  return (
    <button 
        type={type}
        className={`${className} ${isVisible ? '':'hidden'} bg-gray-700 group border-2 flex  items-center border-gray-300 px-3 py-3 rounded-lg sm:text-2xl text-gray-300 duration-200 hover:bg-sky-900 active:bg-sky-800 shadow-light`}
        onClick={onClick}
    >
        <span className={`h-7 w-7 sm:h-8 sm:w-8 ${startIcon ? '' : 'hidden'}`}>
            {isLoading ? <img src={preloader} alt=""/> : startIcon}
        </span>
        <span className='grow font-medium px-3'>{title}</span>
        <span className={`h-6 w-6 sm:h-8 sm:w-8 ${endIcon ? '' : 'hidden'}`}>
            {isLoading ? <img src={preloader} alt=""/> : endIcon}
        </span>
    </button>
  )
}
