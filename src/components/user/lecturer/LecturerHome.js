import React, { useContext, useEffect } from 'react'
import LecturerNavbar from './LecturerNavbar'
import { Outlet } from 'react-router-dom'

function LecturerHome() {

  return (
    <>
      <LecturerNavbar/>
      <h1>LECTURER HOME</h1>
      <Outlet />
    </>
  )
}

export default LecturerHome
