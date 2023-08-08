import React from 'react'

interface PopupProps {
    isShow: boolean
    onYes: () => void
    onNo: () => void
}

export const Popup = ({
    isShow,
    onYes,
    onNo
}: PopupProps) => {
  return (
    <div className={`absolute top-0 left-0 w-full h-full duration-300 bg-black/60 flex justify-center items-center ${isShow ? '': 'hidden'}`}>
        <div className='bg-gray-800 w-96 rounded-3xl shadow-2xl text-center text-orange-200 p-5 border-4 border-gray-500'>
            <h3 className='text-5xl '>COOL!!!</h3>
            <p className=' text-4xl my-5'>You repeated, some words. Do you want to learn wodrs which you khow bad?</p>
            <div className='flex gap-5 justify-center'>
                <button 
                    className='border-4 px-10 py-1 text-2xl rounded-lg duration-200 hover:bg-gray-500 active:bg-gray-700'
                    onClick={onYes}
                >Yes</button>
                <button 
                    className='border-4 px-10 py-1 text-2xl rounded-lg duration-200 hover:bg-gray-500 active:bg-gray-700'
                    onClick={onNo}
                >No</button>
            </div>
        </div>
    </div>
  )
}
