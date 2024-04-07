import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager_2 from './components/Manager_2'
import Footer from './components/Footer'
function App() {

  return (
    <>
      <Navbar />
      <div className="absolute inset-0 -z-10 w-full h-max min-h-full items-center px-5 py-24 pb-20 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <Manager_2 />
      </div>
      <Footer />
    </>
  )
}

export default App
