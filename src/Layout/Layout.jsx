import React from 'react'
import Nav from '../Navbar/Nav'
import { Outlet } from 'react-router-dom'

const Layout = ({loggedIn,setLoggedIn}) => {
  return (
    <>
    <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    <Outlet />
    </>
  )
}

export default Layout