import React from 'react';
import NavItem from './NavItem';
import styles from './style.module.css';

const NavItems = () => (
  <ul className={styles.NavItems}>
    <NavItem link="/" exact>Burger Builder</NavItem>
    <NavItem link="/orders">Orders</NavItem>
  </ul>
)

export default NavItems;