import React from 'react';
import styles from './NavItem.module.css'

const NavItem = (props: any): any => (
  <li className={styles.NavItem}>
    <a href={props.link} className={props.active && styles.active}>{props.children}</a>
  </li>
)
export default NavItem;