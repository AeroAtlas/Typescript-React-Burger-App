import React, { Component, Fragment } from 'react'
// import Auxil from '../../Components/Hoc/Auxil'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'

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
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  }

  public updatePurchaseState(updatedIngredients: any): void {
    const ingredients = {
      ...updatedIngredients
    }
    const sum = Object.keys(ingredients)
      .map((igKey: string) => (ingredients as any)[igKey])
      .reduce((prev: number, curr: number): number => prev + curr)
    console.log(sum);
    this.setState({purchaseable: sum > 0})
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
    this.updatePurchaseState(updatedIngredients)
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
    this.updatePurchaseState(updatedIngredients)
  }

  public purchaseHandler = () => {
    this.setState({purchasing:true})
  }

  public purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  public purchaseContinueHandler = () => {
    alert('You continue');
  }

  render() {
    const { ingredients, totalPrice, purchaseable, purchasing } = this.state;

    const disableInfo = { ...ingredients }
    for (let key in disableInfo) {
      (disableInfo as any)[key] = (disableInfo as any)[key] <= 0 //*replaces array values with true or false
    }

    return (
      <Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          purchaseable={purchaseable}
          ordered={this.purchaseHandler}
          price={totalPrice}/>
      </Fragment>
    )
  }

}

export default BurgerBuilder;