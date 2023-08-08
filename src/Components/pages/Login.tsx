import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ButtonMain } from '../UI/ButtonMain'
import { useFormik } from 'formik'
import { FormModel } from '../../models/formModel'
import { useAppDispatch } from '../../hooks/toolkitHooks'
import { createUser, login } from '../../slices/currentUserSlice'



const initialValues: FormModel = {
  nikName: '',
  password: ''
}

export const Login = () => {

  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
        console.log('SUBMIT');
        dispatch(login(formik.values))
    }
  }
  )




  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-96'>
        <h1 className='text-center text-3xl text-white mb-5'>Login</h1>
        <form action="" className='flex flex-col gap-5 '
          onSubmit={formik.handleSubmit}
        >
          <input 
            className='py-2 px-5 text-3xl rounded-xl bg-white/10 text-sky-500 backdrop-blur-sm'
            type="text" 
            name='nikName'
            value={formik.values.nikName}
            onChange={formik.handleChange}
          />
          <input 
            className='py-2 px-5 text-3xl rounded-xl bg-white/10 text-sky-500 backdrop-blur-sm'
            type="text" 
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <div className='flex gap-5'>
            <ButtonMain
              type='submit'
              className='w-full'
              startIcon = {<PaperAirplaneIcon/>}
              title='Send'
              onClick={()=>{}}
            />
            <ButtonMain
              className='w-full'
              startIcon = {<XMarkIcon/>}
              title='Cancel'
              onClick={()=>{}}
            />
          </div>
        </form>
      </div>
    </div>
  )
}