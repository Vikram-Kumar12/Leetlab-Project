import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className='bg-slate-900'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Layout