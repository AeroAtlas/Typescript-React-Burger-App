import React, { Component, Fragment } from 'react'
// import Auxil from '../../Components/Hoc/Auxil'
import Burger from '../../Components/Burger/Burger'

class BurgerBuilder extends Component<any, any>{
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    }
  }


  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <div>Build Controls</div>
      </Fragment>
    )
  }

}

export default BurgerBuilder;