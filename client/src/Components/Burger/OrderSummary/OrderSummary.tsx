import React from 'react';
import Auxil from '../../Hoc/Auxil'


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
      <p>Continue to Checkout?</p>
    </Auxil>
  )
}

export default OrderSummary;