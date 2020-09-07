import React, { Component } from 'react'
import Auxil from '../../../Hoc/Auxil/Auxil'
import Backdrop from '../Backdrop/Backdrop'

import styles from './Modal.module.css'


class Modal extends Component<any,any> {

  public shouldComponentUpdate(nextProps: any, nextState: any): any {
      return (nextProps.show !== this.props.show) 
  }

  // public componentWillUpdate() {
  //   console.log('[Modal] will update')
  // }

  render() {
    return (
      <Auxil>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={styles.Modal}
          style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? '1' : '0'
          }}  
          >{this.props.children}
        </div>
      </Auxil>
    )
  }
}

export default Modal;