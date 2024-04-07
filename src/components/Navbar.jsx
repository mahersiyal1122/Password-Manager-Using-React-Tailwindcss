import React from 'react'
import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className='flex justify-between items-center px-4 py-8 h-14 mycontainer'>
        <div className='logo font-bold text-xl'>
          <span className='text-green-700'>&lt; </span>
          <span>Pass</span>
          <span className='text-green-700'>OP /&gt;</span>
        </div>
       
        <button className='flex justify-center items-center gap-2 rounded-full bg-green-700 py-2 px-3 hover:scale-105 hover:font-medium ring-1 ring-white'>
          <FaGithub className='text-2xl' />
          <a target='_blank' href="https://github.com/mahersiyal1122/Password-Manager-Using-React-Tailwindcss.git">GitHub</a>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
