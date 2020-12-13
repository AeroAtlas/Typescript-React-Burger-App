import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './style.module.css';

const NavItem = (props: any): any => (
  <li className={styles.NavItem}>
    {/* className={props.active && styles.active} */}
    <NavLink to={props.link} exact={props.exact} activeClassName={styles.active}>{props.children}</NavLink >
  </li>
)
export default NavItem;