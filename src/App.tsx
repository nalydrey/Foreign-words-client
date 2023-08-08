import { Routes, Route, useNavigate } from "react-router-dom"
import { Layout } from "./Components/Layout/Layout"
import { Home } from "./Components/pages/Home"
import { Game } from "./Components/pages/Game"
import { Setting } from "./Components/pages/Setting"
import { Login } from "./Components/pages/Login"
import { Path } from "./enums/Path"
import { AllWords } from "./Components/pages/AllWords"
import { Register } from "./Components/pages/Register"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/toolkitHooks"
import { Storage } from "./enums/Storage"
import { getMe } from "./slices/currentUserSlice"

function App() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.currentUser.user)
  console.log('reset');
  

  useEffect(()=>{
    console.log(currentUser);
    
    if(currentUser){
      console.log('!');
      navigate(Path.HOME)
    }

  }, [currentUser])

  useEffect(()=>{
    const userId = localStorage.getItem(Storage.USER_ID)
    if(userId){
      dispatch(getMe(+userId))
    }
  },[])

  return (
   <>
    <Routes>
      <Route path={Path.HOME} element={ <Layout/>}>
        <Route index element = {<Home/>}/>
        <Route path={Path.SETTING} element= {<Setting/>}/>
        <Route path={Path.GAME} element= {<Game/>}/>
        <Route path={Path.LOGIN} element= {<Login/>}/>
        <Route path={Path.REGISTER} element= {<Register/>}/>
        <Route path={Path.WORDS} element= {<AllWords/>}/>
      </Route>
    </Routes>
   </>
  )
}

export default App
