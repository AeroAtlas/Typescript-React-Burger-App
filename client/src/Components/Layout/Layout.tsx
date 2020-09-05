import React from 'react'
import Auxil from '../Hoc/Auxil'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import styles from './Layout.module.css'

const Layout = (props: any): any => {
  return (
    <Auxil>
      <Toolbar />
      <SideDrawer />
      <main className={styles.Content}>
        {props.children}
      </main>
    </Auxil>
  )
}

export default Layout;