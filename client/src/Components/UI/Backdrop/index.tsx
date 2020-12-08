import React from 'react'

import styles from './style.module.css'

const Backdrop = (props: any): any => (
  props.show
    ? <div className={styles.Backdrop} onClick={props.clicked}></div>
    : null
)

export default Backdrop;
