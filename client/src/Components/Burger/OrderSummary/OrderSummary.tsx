import React, { Component } from 'react';
import Auxil from '../../../Hoc/Auxil/Auxil'
import Button from '../../UI/Button'


class OrderSummary extends Component<any,any> {
  // componentDidUpdate() {
  //   console.log('[OrderSummary] will update')
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map((igKey) => {
      return (<li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
        : {(this.props.ingredients as any)[igKey]}
      </li>)
    })

    return (
      <Auxil>
        <h3>Your Order</h3>
        <p>A burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType={'Danger'} clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType={'Success'} clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Auxil>
      )
  }
}

export default OrderSummary;