import { MyUserContext } from 'configs/Contexts'
import React, { useContext } from 'react'

function StudentHome() {
  const [user] = useContext(MyUserContext)
  return (
    <>
      <h1>STUDENT HOME</h1>
    </>
  )
}

export default StudentHome
