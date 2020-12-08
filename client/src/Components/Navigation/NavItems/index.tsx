import React from 'react';
import NavItem from './NavItem';
import styles from './style.module.css';

const NavItems = () => (
  <ul className={styles.NavItems}>
    <NavItem link="/" active>Burger Builder</NavItem>
    <NavItem link="/">Checkout</NavItem>
  </ul>
)

export default NavItems;