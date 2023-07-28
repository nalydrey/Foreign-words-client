import { Routes, Route } from "react-router-dom"
import { Layout } from "./Components/Layout/Layout"
import { Home } from "./Components/pages/Home"
import { Game } from "./Components/pages/Game"
import { Setting } from "./Components/pages/Setting"
import { Login } from "./Components/pages/Login"
import { Path } from "./enums/Path"
import { AllWords } from "./Components/pages/AllWords"
import { Register } from "./Components/pages/Register"

function App() {

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
