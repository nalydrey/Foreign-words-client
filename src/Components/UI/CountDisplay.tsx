
export interface CountDisplayProps {
    title: string
    counter: number
    className?: string
}

export const CountDisplay = ({
    counter,
    title,
    className
}: CountDisplayProps) => {
  return (
    <div className={`text-center font-bold ${className}`}>
        <h3 className='bg-gray-700/90 border border-gray-400 rounded-lg px-5 text-sky-600 mb-1 text-sm md:text-2xl shadow-light'>{title}</h3>
        <div className='border border-gray-400 py-1 sm:py-2 px-10 min-w-[150px]  rounded-lg text-lg sm:text-2xl md:text-3xl text-green-600  bg-black/60 shadow-light'>
            {counter}
        </div>
    </div>
  )
}
