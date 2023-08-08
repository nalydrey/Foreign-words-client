import {ReactNode} from 'react'



interface ButtonProps {
    icon: ReactNode
    onClick: () => void
}

export const Button = ({
    icon,
    onClick
}: ButtonProps) => {
  return (
    <button 
        className="border-4 bg-gray-500 border-gray-700 w-12 h-12 rounded-lg flex justify-center items-center p-1 duration-300 hover:bg-sky-500 active:bg-sky-600"
        onClick={()=>onClick()}
   >
        {icon}
    </button>
  )
}
