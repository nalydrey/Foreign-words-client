import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import {ChangeEvent, ReactNode, FocusEvent, useState} from 'react'

interface InputProps {
    icon?: ReactNode
    name: string
    error?: string 
    type?: 'text' | 'password'
    value: string | number
    placeholder?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void 
    onBlur?: (event: FocusEvent<HTMLInputElement, Element>) => void 

}


export const Input = ({
    icon,
    name,
    error,
    type = 'text',
    value,
    placeholder,
    onChange,
    onBlur
}: InputProps) => {

    const [isVisible, setVisible] = useState<boolean>(false)

    const mistakeColor = !!error? 'text-red-600': 'text-sky-600'

    const handlerVisible = () => {
        setVisible(!isVisible)
    }



  return (
    <div className=' overflow-hidden'>
        <div className='relative flex gap-1 items-center bg-white/10 ackdrop-blur-sm backdrop-blur-sm rounded-lg px-2 overflow-hidden shadow-light'>
           {
            icon &&
            <label htmlFor={name} className={`w-9 sm:w-12 duration-300 ${mistakeColor}`}>
                {icon}
            </label>
           }
            <input 
                className={`peer w-full py-2 px-2 text-xl sm:text-3xl outline-none ${mistakeColor} bg-transparent placeholder:text-sky-400/50`}
                id = {name}
                type={type === 'password'? isVisible ? 'text' : 'password' : type} 
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete='off'
                onChange={onChange}
                onBlur={onBlur}
            />
            {
                type === 'password' &&
                <label 
                    htmlFor={name} 
                    className={`w-9 sm:w-12  ${mistakeColor}`}
                    onClick={handlerVisible}
                >
                    {isVisible ? <EyeIcon/> : <EyeSlashIcon/>}
                </label>
            }
            <span className={`absolute -z-10 ${!!error ? 'peer-focus:border-red-600': 'peer-focus:border-sky-600'} border-gray-600 border duration-300 w-full h-full top-0 left-0 rounded-lg`}/>
        </div>
        <p className='text-red-500 min-h-[30px] text-xl text-center relative duration-300 -translate-x-0'>
            {error}
        </p>
    </div>
  )
}
