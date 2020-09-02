import React from 'react'
import styles from './BuildControl.module.css'
import classes from './BuildControl.module.css';

const BuildControl = (props: any): any => {
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{props.label}</div>
    <button className={styles.Less}>Less</button>
    <button className={styles.More}>More</button>
  </div>
}

export default BuildControl;