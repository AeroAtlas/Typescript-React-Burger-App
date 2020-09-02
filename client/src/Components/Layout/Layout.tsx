import React from 'react'
import Auxil from '../Hoc/Auxil'
import styles from './Layout.module.css'

const Layout = (props: any): any => {
  return (
    <Auxil>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={styles.Content}>
        {props.children}
      </main>
    </Auxil>
  )
}

export default Layout;