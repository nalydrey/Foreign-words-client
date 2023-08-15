import { XCircleIcon } from '@heroicons/react/20/solid'
import {useState, useEffect} from 'react'

interface InfoMessageProps {
    text: string
    onHide: () => void
}

export const InfoMessage = ({
    text,
    onHide=()=>{}
}: InfoMessageProps) => {

    const [isShow, setShow] = useState<boolean>(false)
    const [currentTimer, setTimer] = useState<number | null>(null)


    

  
    useEffect(()=>{
        let timer: number | null = null
        if(text){
            setShow(true)
            timer = setTimeout(()=>{
                setShow(false)
                setTimer(null)
                timer && clearTimeout(timer)
            }, 4000)
            setTimer(timer)
        }

        return () => {
            console.log('delete timer');
            timer && clearTimeout(timer)
        }
    },[text])

    const handlerClose = () => {
        setShow(false)
        setTimer(null)
        currentTimer && clearTimeout(currentTimer)
    }

    const handleTransitionEnd = () => {
        if(!isShow){
            onHide()
        }
    }

  return (
    <div className={`absolute text-center ${isShow ? 'top-20': '-top-52'} z-30 duration-300 text-white rounded-lg shadow-deep left-1/2 -translate-x-1/2 w-full max-w-lg border border-gray-300 bg-blue-500/80 p-1`}
        onTransitionEnd={handleTransitionEnd}
    >
        <h3 className=' text-xl font-bold '>Message</h3>
        <p className='my-2 text-xl font-medium'>{text}</p>
        <button className='absolute top-1 right-1'
            onClick={handlerClose}
        >
            <div className='  w-7 h-7' >
                <XCircleIcon className='text-red-600 hover:text-red-400 duration-300'/>
            </div>
        </button>
    </div>
  )
}
