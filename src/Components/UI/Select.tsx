import { ChevronDownIcon, PlusCircleIcon, TagIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import { Input } from './Input'
import { useFormik } from 'formik'
import {object, string} from 'yup'
import { ButtonImg } from './ButtonImg'


interface SelectProps {
    widthFull?: boolean
    currentValue: string
    initialList: string[]
    firtText: string
    onChangeItem?: (item: string) => void
    onAdd?: (item: string) => void
    onReset?: () => void

}

const initialValues = {
    category: ''
}

export const Select = ({
    widthFull,
    currentValue,
    initialList,
    firtText,
    onChangeItem = () => {},
    onAdd = ()=>{},
    onReset = () => {}
}: SelectProps) => {

    const validationSchema =  object({
        category: string().required('This field must be filled'),
    })

   
    const [isOpen, setOpen] = useState<boolean>(false)
    const [changedCategory, setCategory] = useState<string>(firtText) 
    const [list, setList] = useState<string[]>(initialList)

    useEffect(()=>{
        document.addEventListener('click', closeMenu)
        return () => {
            document.removeEventListener('click', closeMenu)
        }
    },[])

    useEffect(()=>{
        setList(initialList)
    },[initialList])

    const closeMenu = () => {
        setOpen(false)
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (form, opt) => {
            const isExist = initialList.some(item => item === form.category)
            if(!isExist){
                onAdd(form.category)
                setCategory(form.category)
                opt.resetForm()
            }
            else{
                opt.setFieldError('category', 'Name already exist')
            }
        },
        onReset: () => {
            setList(initialList)
            onReset()
        }
    })

    useEffect(()=>{
        console.log(currentValue);
        
        if(currentValue){
            setCategory(currentValue)
        }
        else{
            setCategory(firtText)
        }
    },[currentValue])

    const handlerOpen = (e:MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setOpen(!isOpen)
    }


    const handlerClickItem = (item: string) => {
        setCategory(item)
        onChangeItem(item)
        formik.handleReset('')
    }

    const handleReset = () => {
        setCategory(firtText)
        formik.handleReset('')
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, formik.values.category);
        let regexp = new RegExp(event.target.value, 'i')
        const arr = initialList.filter(item => regexp.test(item))
        setList(arr)
        formik.handleChange(event)
    }


  return (
    <div className={`relative z-10  ${widthFull ? '': 'max-w-[450px]'}`}>
        <button 
            className='border border-gray-500 w-full flex gap-1 p-1 items-center bg-white/10  backdrop-blur-sm rounded-lg px-2 overflow-hidden shadow-light'
            onClick={handlerOpen}
        >
            <div className='w-9 sm:w-10 text-sky-600'>
                <TagIcon/>
            </div>
            <span className='grow text-sky-600 text-xl ssm:text-2xl lg:text-3xl'>{changedCategory}</span>
            <div className={`${isOpen ? ' rotate-180':''} duration-200 w-9  sm:w-10 text-sky-600`}>
                <ChevronDownIcon/>
            </div>
        </button>
        <div 
            className={`absolute -z-10 top-[110%]  w-full ${isOpen ? ' max-h-[500px]':'max-h-0'} duration-300 overflow-auto`}
            onClick={(e)=>{e.stopPropagation()}}
        >
            <div className=' bg-gray-800/80 backdrop-blur-lg rounded-lg p-3 '>
                <div className=''>
                    <form 
                        className=' flex gap-2 items-start '
                        onSubmit={formik.handleSubmit}
                        onReset={handleReset}
                    >
                        <Input
                            widthFull
                            className=''
                            name='category'
                            placeholder='enter new categiry'
                            error={formik.errors.category}
                            value={formik.values.category}
                            onChange={handleChange}
                        />
                        <ButtonImg
                            type='submit'
                            icon={<PlusCircleIcon/>}
                        />
                        <ButtonImg
                            type='reset'
                            icon={<XCircleIcon className='text-red-600'/>}
                        />
                    </form>
                   
                </div>
                <ul className='flex flex-col gap-2'>
                    {
                        list.map(item => {
                            return(
                                <li 
                                    className='duration-300 text-sky-500 text-center border-b-gray-600 text-xl ssm:text-2xl lg:text-3xl border-b  hover:border-b-sky-500 shadow-light p-1 rounded-xl bg-gray-500/70'
                                    onClick = {() => handlerClickItem(item)}
                                >
                                        {item}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>


    </div>
  )
}
