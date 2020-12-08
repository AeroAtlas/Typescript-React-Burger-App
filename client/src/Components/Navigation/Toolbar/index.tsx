import React from 'react';
import Logo from '../../Logo';
import NavItems from '../NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';
import styles from './style.module.css';


const Toolbar = (props: any): any => (
  <header className={styles.Toolbar}>
    <DrawerToggle clicked={props.toggle}/>
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.DesktopOnly}>
     <NavItems/>
    </nav>
  </header>
)

export default Toolbar;