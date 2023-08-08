import {useEffect, useState} from 'react'
import { WordItem } from '../UI/WordItem'
import { useFormik } from 'formik'
import {object, string} from 'yup'
import { useAppDispatch, useAppSelector } from '../../hooks/toolkitHooks'
import { changeStatus, createWord, deleteWord, editWord, getWords } from '../../slices/wordsSlice'


export interface WordFields {
  foreignText: string
  translatedText: string
}

const initialValues: WordFields = {
  foreignText: '',
  translatedText: ''
}

export const AllWords = () => {
  
  
  const dispatch = useAppDispatch()
  const words = useAppSelector(state => state.words.container)

  const [editId, setEditId] = useState<null | number>(null)
  
    useEffect(()=>{
      dispatch(getWords(''))
    },[])

  const validationSchema =  object({
    foreignText: string().required('Поле должно быть заполнено'),
    translatedText: string().required('Поле должно быть заполнено'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (form,func) => {
      if(editId){
        dispatch(editWord({id: editId,  word:{category:'sss', ...form}}))
      }
      else{
        dispatch(createWord({userId: 1, word:{category:'sss', ...form}}))
      }
      setEditId(null)
      func.resetForm()
    },
  })

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
    // dispatch(deleteWord(id))   
    Object.entries(obj).forEach(field => {
        formik.setFieldValue(field[0], field[1])
    })
    setEditId(id)
  }

  

  return (
   <div className='container mx-auto flex flex-col h-full'>
      <form 
        className='flex justify-center gap-5 mt-5 mb-10' 
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
      >
        <input 
          className='p-2 outline-2 rounded-lg min-w-[130px] text-2xl font-medium border-4 border-sky-700 focus:outline focus:outline-sky-500'
          type="text"
          name ="foreignText"  
          onChange={formik.handleChange}               
          value={formik.values.foreignText}
          placeholder='foreign'
        />
          
        <input 
          className='p-2 outline-2 rounded-lg min-w-[130px] text-2xl font-medium border-4 border-sky-700 focus:outline focus:outline-sky-500'
          type="text" 
          name ="translatedText"  
          onChange={formik.handleChange}      
          value={formik.values.translatedText}
          placeholder='native'
        />
          
        <button 
          className='border border-gray-300 px-10 py-2 rounded-lg min-w-[130px] text-2xl font-medium hover:bg-gray-600 active:bg-gray-700'
          type='submit'
        >
          Save
        </button>
        <button 
          className='border border-gray-300 px-10 py-2 rounded-lg min-w-[130px] text-2xl font-medium hover:bg-gray-600 active:bg-gray-700'
          type='reset'
        >
          Cancel
        </button>
      </form>
      <div className='flex flex-col items-center gap-5 h-full overflow-auto pt-14'>
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
