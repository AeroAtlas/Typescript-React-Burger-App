import React from 'react';
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems/NavItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxil from '../../Hoc/Auxil'
import styles from './SideDrawer.module.css'


const SideDrawer = (props: any): any => {
  let stylesList = [styles.SideDrawer, (props.open ? styles.Open : styles.Close)]

  return (
    <Auxil>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={stylesList.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Auxil>
  )
}

export default SideDrawer;