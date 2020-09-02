import React from 'react'
import Auxil from '../Hoc/Auxil'

const Layout = (props: any): any => {
  return (
    <Auxil>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main>
        {props.children}
      </main>
    </Auxil>
  )
}

export default Layout;