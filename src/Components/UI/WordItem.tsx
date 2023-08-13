import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { Switch } from "./Switch"
import { WordFields } from "../Boxes/WordForm"



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
    <div className="group z-[2] h-full relative max-w-[900px] w-full flex flex-col shadow-deep rounded-xl">
      <div className=' bg-gray-700 rounded-t-xl p-2 flex flex-col grow justify-between md:text-lg lg:flex-row lg:gap-3 lg:text-xl text-sky-500  gap-1'>
              <p className='px-2 border h-full bg-gray-600 border-gray-400 rounded-lg w-full  font-medium'>{foreignText}</p>
              <p className='px-2 border h-full bg-gray-600 border-gray-400 rounded-lg w-full  font-medium'>{translatedText}</p>
      </div>
      <div className="rounded-b-xl bg-gray-400 flex flex-col justify-between gap-2  px-5 py-1 font-medium">
        <ul className="grid md:grid-cols-3 md:gap-16">
          <li className="flex justify-between w-full md:max-w-[200px]">
            <p>Total counter:</p>
            <p> {showCounter}</p>
          </li>
          <li className="flex justify-between w-full md:max-w-[200px]">
            <p>Properly counter:</p>
            <p> {properlyCounter}</p>
          </li>
          <li className="flex justify-between w-full md:max-w-[200px]">
            <p>Category:</p>
            <p> {category}</p>
          </li>
        </ul>
        <div className="flex gap-5 justify-between items-center border-t border-gray-500 pt-1 ">
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
          <div className="flex gap-3">
            <button 
              className="h-7 w-7"
              onClick={() => onEdit(id, {foreignText, translatedText, category})}
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
    </div>
    
  )
}
