import React from 'react'
import Auxil from '../../Hoc/Auxil'
import Backdrop from '../Backdrop/Backdrop'

import styles from './Modal.module.css'


const Modal = (props: any): any => (
  <Auxil>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div
      className={styles.Modal}
      style={{
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? '1' : '0'
      }}  
      >{props.children}
    </div>
  </Auxil>
)

export default Modal;