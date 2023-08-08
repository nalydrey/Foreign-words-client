import { Link } from 'react-router-dom'
import { Path } from '../../enums/Path'
import { useAppDispatch, useAppSelector } from '../../hooks/toolkitHooks'
import { logOut } from '../../slices/currentUserSlice'

export const Home = () => {

  const currentUser = useAppSelector(state => state.currentUser.user)
  const dispatch = useAppDispatch()

  const handlerLogOut = () => {
    dispatch(logOut())
  }


  return (
    <div className='h-full flex justify-center items-center '>
        <ul className='text-3xl text-center flex flex-col gap-3 text-white'>
            {
              !currentUser &&
              <>
                <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
                  <Link to={Path.REGISTER}>Register</Link>
                </li>
                <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
                  <Link to={Path.LOGIN}>Log In</Link>
                </li>
              </>
            }
            {
              !!currentUser &&
              <>
                <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
                  <Link to={Path.GAME}>Start</Link>
                </li>
                <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
                  <Link to={Path.WORDS}>Show all words</Link>
                </li>
                <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'
                  onClick={handlerLogOut}
                >
                  <span>Log Out</span>
                </li>
                <li className='hover:text-green-500 cursor-pointer duration-150 font-medium'>
                  <Link to={Path.SETTING}>Setting</Link>
                </li>
              </>
            }
        </ul>
    </div>
  )
}
