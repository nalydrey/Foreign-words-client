import { Routes, Route, useNavigate } from "react-router-dom"
import { Layout } from "./Components/Layout/Layout"
import { Home } from "./Components/pages/Home"
import { Game } from "./Components/pages/Game"
import { Setting } from "./Components/pages/Setting"
import { UserForm } from "./Components/pages/UserForm"
import { Path } from "./enums/Path"
import { AllWords } from "./Components/pages/AllWords"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/toolkitHooks"
import { Storage } from "./enums/Storage"
import { createUser, getMe, login } from "./slices/currentUserSlice"
import { FormModel } from "./models/formModel"

function App() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.currentUser.user)
  

  useEffect(()=>{
    if(currentUser){
      navigate(Path.HOME)
    }

  }, [currentUser?.id])

  useEffect(()=>{
    const userId = localStorage.getItem(Storage.USER_ID)
    if(userId){
      dispatch(getMe(+userId))
    }
  },[])

  const handlerLogin = (form: FormModel) => {
    dispatch(login(form))
  }
  const handlerRegister = (form: FormModel) => {
    dispatch(createUser(form))
  }

  return (
   <>
    <Routes>
      <Route path={Path.HOME} element={ <Layout/>}>
        <Route index element = {<Home/>}/>
        <Route path={Path.SETTING} element= {<Setting/>}/>
        <Route path={Path.GAME} element= {<Game/>}/>
        <Route path={Path.LOGIN} element= {<UserForm 
                                            title="Login" 
                                            linkText="I don't have an account"
                                            pathTo={Path.REGISTER}
                                            onSubmit={handlerLogin}
                                          />}/>
        <Route path={Path.REGISTER} element= {<UserForm 
                                                title="Register" 
                                                linkText="I already have an account"
                                                pathTo={Path.LOGIN}
                                                onSubmit={handlerRegister}
                                              />}/>
        <Route path={Path.WORDS} element= {<AllWords/>}/>
      </Route>
    </Routes>
   </>
  )
}

export default App
