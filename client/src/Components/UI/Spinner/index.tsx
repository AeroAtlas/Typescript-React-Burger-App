import React from 'react';
import styles from './style.module.css';

const Spinner = (): any => (
  <div className={styles.Spinner}>
    <div className={styles.Dot1}></div>
    <div className={styles.Dot2}></div>
  </div>
)

export default Spinner;