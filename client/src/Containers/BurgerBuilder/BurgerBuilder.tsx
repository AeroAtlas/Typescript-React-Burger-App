import React, { Component, Fragment } from 'react'
// import Auxil from '../../Components/Hoc/Auxil'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

interface IngredientsObj {
  salad: "string"|"number",
  bacon: "string"|"number",
  cheese: "string"|"number",
  meat: "string"|"number",
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

class BurgerBuilder extends Component<any,any>{
  
  public readonly state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4
  }

  public addIngredientHandler = (type: any): any => {
    //? Turn type into a keyof ingredientsObj 
    const key: (keyof IngredientsObj) = type;
    const oldCount: any = (this.state.ingredients as any)[key];

    //? Create new ingredients list with updated count
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[key] = updatedCount;

    //? Create new price with (old price) + (price from this ingredient)
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[key];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    })
  }

  public removeIngredientHandler = (type: any): any => {
    //? Turn type into a keyof ingredientsObj 
    const key: (keyof IngredientsObj) = type;
    const oldCount: any = (this.state.ingredients as any)[key];

    //? Check for empty arrays and return if true
    if (oldCount <= 0) { return; };

    //? Create new ingredients list with updated count
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[key] = updatedCount;

    //? Create new price with (old price) - (price from this ingredient)
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[key];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    })
  }


  render() {
    const disableInfo = { ...this.state.ingredients }
    for (let key in disableInfo) {
      (disableInfo as any)[key] = (disableInfo as any)[key] <= 0 //*replaces array values with true or false
    }

    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo} />
      </Fragment>
    )
  }

}

export default BurgerBuilder;