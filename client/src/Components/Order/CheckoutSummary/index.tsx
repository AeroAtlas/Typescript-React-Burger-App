import React from 'react';
import Burger from '../../Burger';
import Button from '../../UI/Button';
import styles from "./style.module.css"

const checkoutSummary = (props: any): any => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes good</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button btnType="Danger" clicked>CANCEL</Button>
      <Button btnType="Success" clicked>CONTINUE</Button>
    </div>
  )
}

export default checkoutSummary;