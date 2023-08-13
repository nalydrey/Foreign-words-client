import {useEffect, useState} from 'react'
import { WordItem } from '../UI/WordItem'
import { useAppDispatch, useAppSelector } from '../../hooks/toolkitHooks'
import { changeStatus, createWord, deleteWord, editWord, getWords } from '../../slices/wordsSlice'
import { WordFields, WordForm } from '../Boxes/WordForm'
import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid'

const initialValues: WordFields = {
  foreignText: '',
  translatedText: '',
  category: 'not chosen'
}


export const AllWords = () => {

  
  
  
  const dispatch = useAppDispatch()
  const words = useAppSelector(state => state.words.container)
  const loadingWord = useAppSelector(state => state.words.isLoading)
  const currentUser = useAppSelector(state => state.currentUser.user)


  const [editId, setEditId] = useState<null | number>(null)
  const [editForm, setEditForm] = useState<WordFields>(initialValues)
  const [isOpen, setOpen] = useState<boolean>(false)
  

  
    useEffect(()=>{
      dispatch(getWords(''))
    },[])

 



  const handlerChangeLearn = (id: number, needsToLearn: boolean) => {
    dispatch(changeStatus({id, needsToLearn}))
  }
  
  const handlerChangeNew = (id: number, isNew: boolean) => {
    dispatch(changeStatus({id, isNew}))
  }
  const handlerDelete = (id: number) => {
    dispatch(deleteWord(id))    
  }
 

  const handlerEdit = (id: number, obj:WordFields) => {
    console.log(obj);
    
    setEditForm(obj)
    setEditId(id)
  }

    const handlerSubmit = (form: WordFields) => {
      console.log('onSubmit');
      
      
      if(editId){
        dispatch(editWord({id: editId,  word:{...form}}))
      }
      else{
        currentUser &&
        dispatch(createWord({userId: currentUser.id, word:{...form}}))
      }
      setEditId(null)
      setEditForm(initialValues)
      setOpen(false)
    }
  
    const handlerReset = () => {
      console.log('r');
      
      setOpen(false)
    }

 

  return (
   <div className='container mx-auto flex flex-col gap-5 items-center h-full '>
      <button 
        className={`bg-gray-700/60 md:hidden  w-full border border-gray-500 shadow-deep rounded-b-lg mt-1 backdrop-blur-sm text-sky-500 flex justify-between items-center max-w-3xl`}
        onClick={()=>{setOpen(!isOpen)}}
      >
        <div className={`w-10 h-10 duration-500 ${isOpen? ' -rotate-180':''}`}>
          <ChevronDoubleDownIcon/>
        </div>
        <span className='text-lg font-bold'>Add New Word</span>
        <div className={`w-10 h-10  duration-500 ${isOpen? ' rotate-180':''}`}>
          <ChevronDoubleDownIcon/>
        </div>
      </button>
      <div className={`absolute  md:hidden z-30 container shadow-deep border-gray-500  bg-gray-800/90 rounded-lg  ${isOpen ? 'top-0 -translate-y-0': 'top-0 -translate-y-full'} border duration-300` }>
        <WordForm
          isLoading={loadingWord}
          formName='wordAbsolute'
          editedWordId={editId}
          editedForm={editForm}
          onSubmit={handlerSubmit}
          onReset={handlerReset}
        />
      </div>
      <div className={` hidden md:block`}>
        <WordForm
          isLoading={loadingWord}
          formName='word'
          editedWordId={editId}
          editedForm={editForm}
          onSubmit={handlerSubmit}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 w-full gap-5 max-h-full justify-items-center overflow-auto px-3'>
        {
          !!words.length ?
          words.map(word => 
            <WordItem
              key={word.id}
              {...word}
              {...word.meta}
              onDelete={handlerDelete}
              onEdit={handlerEdit}
              onChangeLearn={handlerChangeLearn}
              onChangeNew={handlerChangeNew}
            />
          )
          :
          <p className='text-5xl'>No words, while</p>
        }
      </div>
   </div>
  )
}
