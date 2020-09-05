import React from 'react';
import burgLogo from "../../assets/images/burger-logo.png"
import styles from './Logo.module.css'

const Logo = (props: any): any => (
  <div className={styles.Logo}>
    <img src={burgLogo} alt="BurgerLogo"/>
  </div>
)

export default Logo;