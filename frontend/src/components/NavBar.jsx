import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const NavBar = () => {
    let nav_items = [{name: 'Home' , path: '/'},{name: 'Add NewTask' , path: '/create-task'}]
    const navigate = useNavigate()
  return (
    <section id='header bg-pink-100 w-full min-h-screen'>
    <div className="div">
        <nav className='w-full min-h-[70px] bg-blue-200 text-white flex items-center justify-evenly'>
            <div className="">
              <p className='font-bold text-gray-500'>Task Tracker</p>
             </div>
            <ul className='text-black flex items-center justify-center gap-5 font-semibold text-gray-600'>
               {nav_items.map((item, i) => <li key={i} className=' hover:text-gray-500' onClick={()=>navigate(item.path)}>{item.name}</li>)}
            </ul>

        </nav>
     </div>
    </section>
  )
}

export default NavBar
  