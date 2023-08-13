import { RectButton } from './RectButton'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

interface CounterProps {
    name: string
    value: number | boolean
    onPlus: (name: string, value: number | boolean)=>void
    onMinus: (name: string, value: number | boolean)=>void
}


export const Counter = ({
    name,
    value,
    onPlus,
    onMinus
}: CounterProps) => {
  return (
    <div className='flex gap-1'>
        <RectButton
            icon={<MinusIcon/>}
            onClick={()=>onMinus(name, value)}
        />
        <div className='border min-w-[80px] rounded-lg bg-black/50 flex justify-center ssm:p-1 '>
            <span className='text-green-500 text-lg ssm:text-2xl font-medium'>{typeof value === 'boolean' ? value ? 'On' : 'Off' : value}</span>
        </div>
        <RectButton
            icon={<PlusIcon/>}
            onClick={()=>onPlus(name, value)}
        />
    </div>
  )
}
