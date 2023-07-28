import { Routes, Route } from "react-router-dom"
import { Layout } from "./Components/Layout/Layout"
import { Home } from "./Components/pages/Home"
import { Settings } from "./Components/pages/Settings"

function App() {

  return (
   <>
  

    <Routes>
      <Route path="/" element={ <Layout/>}>
        <Route index element = {<Home/>}/>
        <Route path='settings' element= {<Settings/>}/>


      </Route>
    </Routes>
   </>
  )
}

export default App
