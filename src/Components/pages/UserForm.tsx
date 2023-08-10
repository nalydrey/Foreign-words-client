import {useEffect} from 'react'
import { KeyIcon, PaperAirplaneIcon, UserIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ButtonMain } from '../UI/ButtonMain'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import { FormModel } from '../../models/formModel'
import { Input } from '../UI/Input'
import { Link, useLocation } from 'react-router-dom'


const initialValues: FormModel = {
  nikName: '',
  password: ''
}

interface UserFormProps {
  title: string
  pathTo?: string
  linkText?: string
  onSubmit: (form: FormModel) => void
}

export const UserForm = ({
  title,
  pathTo = '',
  linkText,
  onSubmit
}: UserFormProps) => {


  const location = useLocation()

  const validationSchema =  object({
    password: string().required('This field must be filled'),
    nikName: string().required('This field must be filled')
})


  const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: () => {
          console.log('SUBMIT');
          onSubmit(formik.values)
      },
    }
  )

  useEffect(()=>{
    formik.resetForm()
  },[location.pathname])

    
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='max-w-[450px] p-2'>
        <h1 className='text-center text-4xl text-sky-500 mb-5 font-medium'>{title}</h1>
        <form action="" className='flex flex-col gap-3 '
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <Input
            icon={<UserIcon/>}
            name='nikName'
            error={formik.touched.nikName ? formik.errors.nikName : ''}
            value={formik.values.nikName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            icon={<KeyIcon/>}
            name='password'
            type='password'
            error={formik.touched.password ? formik.errors.password : ''}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className='flex gap-5'>
            <ButtonMain
              type='submit'
              className='w-full'
              startIcon = {<PaperAirplaneIcon/>}
              title='Send'
            />
            <ButtonMain
              type='reset'
              className='w-full'
              startIcon = {<XMarkIcon/>}
              title='Cancel'
            />
          </div>
        </form>
        <div className='text-center pt-5 text-sky-500 text-2xl hover:underline'>
          <Link to={pathTo}>{linkText}</Link>
        </div>
      </div>
    </div>
  )
}