import React from 'react'
import SideBar from './side-bar'

function Layout({children}) {
  return (
    <div>
      <SideBar />
      {children}
    </div>
  )
}

export default Layout
