import React from 'react';
import Auxil from '../../Hoc/Auxil'
import Button from '../../UI/Button/Button'


const OrderSummary = (props: any): any => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey) => {
      return (<li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
        : {(props.ingredients as any)[igKey]}
      </li>)
    })

  
  return (
    <Auxil>
      <h3>Your Order</h3>
      <p>A burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType={'Danger'} clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
    </Auxil>
  )
}

export default OrderSummary;