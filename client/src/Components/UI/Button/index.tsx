import React from 'react';

import styles from './style.module.css'

const Button = (props: any): any => (
  <button className={[styles.Button, styles[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>
)

export default Button;