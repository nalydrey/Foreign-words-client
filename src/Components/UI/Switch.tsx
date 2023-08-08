
interface SwitchProps {
    title: string
    value: boolean
    onClick: (val: boolean) => void
}

export const Switch = ({
    title,
    value,
    onClick
}: SwitchProps) => {



  return (
    <div className="flex flex-col items-center">
        <h5>{title}</h5>
        <button 
            className={`relative border border-gray-700 my-1 w-7 h-3 rounded-xl duration-300 ${value ? 'bg-green-700  ': 'bg-red-700'}`}
            onClick={()=>{onClick(!value)}}
        >
            <div className={`absolute duration-300 w-5 h-5 rounded-full top-1/2 ${value ? 'left-full':'left-0'}  -translate-y-1/2 -translate-x-1/2 bg-gray-700`}/>
        </button>
    </div>
  )
}
