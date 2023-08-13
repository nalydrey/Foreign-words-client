import  { ReactNode } from 'react'

interface ButtonImgProps {
  type: 'button' | 'submit' | 'reset'
  icon: ReactNode
  onClick?: ()=>void
}

export const ButtonImg= ({
  type,
  icon,
  onClick
}: ButtonImgProps) => {
  return (
    <button
        className='border p-1 px-1 rounded-lg border-gray-500 shadow-light text-sky-600 duration-300 hover:text-sky-400 active:shadow-none'
        type={type}
        onClick={onClick}
    >
        <div className='w-8 h-8 ssm:w-9 ssm:h-9 md:w-10 md:h-10'>
          {icon}
        </div>
    </button>
  )
}
