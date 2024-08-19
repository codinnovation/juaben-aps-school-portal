import React from 'react'
import SideBar from './side-bar'
import FirstHeader from './firstHeader'

function Layout({children}) {
  return (
    <div>
      <SideBar />
      {children}
    </div>
  )
}

export default Layout
