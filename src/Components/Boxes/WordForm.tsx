import { useEffect, useState } from 'react'
import { Input } from '../UI/Input'
import { ArrowUpCircleIcon, ArrowUturnLeftIcon, ArrowUturnRightIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { Select } from '../UI/Select'
import { useFormik } from 'formik'
import {object, string} from 'yup'
import { ButtonMain } from '../UI/ButtonMain'

export interface WordFields {
    foreignText: string
    translatedText: string
    category: string
  }
  
  const initialValues: WordFields = {
    foreignText: '',
    translatedText: '',
    category: ''
  }

  interface WebFormProps {
    isLoading?: boolean  
    formName: string
    editedForm: WordFields
    editedWordId: number | null
    onSubmit: (form: WordFields) => void
    onReset?: () => void
  }

export const WordForm = ({
    isLoading,
    formName,
    editedForm,
    editedWordId,
    onSubmit,
    onReset = () => {}
}: WebFormProps) => {

    const [list, setList] = useState<string[]>(['person', 'nature', 'home', 'cars'])


    const validationSchema =  object({
        foreignText: string().required('This field must be filled'),
        translatedText: string().required('This field must be filled'),
      })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (form,func) => {
          console.log('sub');
          
          if(!form.category) form.category = 'none'
            onSubmit(form)
            func.resetForm()
        },
        onReset: () => {
          onReset()
        }
      })

    useEffect (()=> {
        if(editedWordId){
            Object.entries(editedForm).forEach(field => {
                formik.setFieldValue(field[0], field[1])
        })}
    }, [editedWordId])
     

    const handlerChangeItem = (item: string) => {
        console.log(item);
        formik.setFieldValue('category', item)
    
      }
    
      const handlerAddNewCategory = (item: string) => {
        formik.setFieldValue('category', item)
        setList([item, ...list])
      }
    
      const handlerResetCategory = () => {
        formik.setFieldValue('category', '')
      }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5 max-w-[1200px] w-full items-center p-2'>
        <form 
            id={formName}
            className=' col-span-1 md:col-span-2 flex flex-col md:flex-row md:gap-5 w-full' 
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
        >
            <Input
            widthFull
            name='foreignText'
            icon ={<ArrowUturnRightIcon/>}
            placeholder='enter foreign word'
            value={formik.values.foreignText}
            onChange={formik.handleChange}
            />
            <Input
            widthFull
            name='translatedText'
            icon ={<ArrowUturnLeftIcon/>}
            placeholder='enter native word'
            value={formik.values.translatedText}
            onChange={formik.handleChange}
            />
        </form>
        <Select
            initialList={list}
            currentValue = {formik.values.category}
            widthFull
            firtText={"Category isn't changed"}
            onAdd={handlerAddNewCategory}
            onChangeItem={handlerChangeItem}
            onReset={handlerResetCategory}
        />
        <div className='flex gap-5 justify-center mt-5 md:mt-0'>
            <ButtonMain
                isLoading = {isLoading}
                startIcon={<ArrowUpCircleIcon className='text-green-500'/>}
                form={formName}
                title='Save'
                type='submit'
            />
            <ButtonMain
                startIcon={<XCircleIcon className='text-red-600'/>}
                form={formName}
                title='Cancel'
                type='reset'
            />
        </div>
    </div>
  )
}
