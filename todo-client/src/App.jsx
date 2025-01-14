import { Outlet } from 'react-router-dom'
import Navbar from './Components/Parts/Navbar'
import Footer from './Components/Parts/Footer'
import './App.css'


function App() {

  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
