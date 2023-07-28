import {Outlet} from 'react-router-dom'
import { Header } from './Header'

export const Layout = () => {
  return (
    <>
    <Header/>
      <main className="grow"><Outlet/></main>
    <footer className="bg-blue-500">footer</footer>
  </>
  )
}
