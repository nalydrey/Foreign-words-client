import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid"
import { WordFields } from "../pages/AllWords"
import { Button } from "./Button"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { Switch } from "./Switch"



interface WordItemProps {
  id: number
  isNew: boolean
  foreignText: string
  needsToLearn: boolean
  translatedText: string
  category: string
  properlyCounter: number
  showCounter: number
  onDelete: (id: number) => void
  onEdit: (id: number, obj: WordFields) => void
  onChangeLearn: (id: number, val: boolean) => void
  onChangeNew: (id: number, val: boolean) => void
}

export const WordItem = ({
  id,
  isNew,
  foreignText,
  needsToLearn,
  translatedText,
  category,
  showCounter,
  properlyCounter,
  onDelete,
  onEdit,
  onChangeLearn,
  onChangeNew
}:WordItemProps) => {
  return (
    <div className="group z-[2] relative max-w-[900px] w-full flex flex-col shadow-deep rounded-xl">
      <div className=' bg-gray-700 rounded-t-xl p-2 flex justify-between  gap-5'>
              <p className='p-2 border bg-gray-600 border-gray-400 rounded-lg w-full text-2xl font-medium'>{foreignText}</p>
              <p className='p-2 border bg-gray-600 border-gray-400 rounded-lg w-full text-2xl font-medium'>{translatedText}</p>
      </div>
      <div className="rounded-b-xl bg-gray-400 flex justify-between gap-5 px-5 py-1 text-xl font-medium items-center">
        <div className="flex gap-5">
          <Switch
            title="New"
            value={isNew}
            onClick={() => onChangeNew(id, !isNew)}
            
          />
          <Switch
            title="Learning"
            value={needsToLearn}
            onClick={()=>onChangeLearn(id, !needsToLearn)}
          />
        </div>
        <div className="flex gap-5">
          <p>Total counter: {showCounter}</p>
          <p>Properly counter: {properlyCounter}</p>
          <p>Category: {category}</p>
        </div>
        <div className="flex gap-5">
          <button 
            className="h-7 w-7"
            onClick={() => onEdit(id, {foreignText, translatedText})}
          >
            <PencilSquareIcon className="stroke-sky-800"/>
          </button>
          <button 
            className="h-7 w-7"
            onClick={() => onDelete(id)}
          >
            <TrashIcon className="fill-red-600"/>
          </button>
        </div>
      </div>
    </div>
    
  )
}
